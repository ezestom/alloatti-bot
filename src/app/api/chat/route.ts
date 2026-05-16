import { NextRequest, NextResponse } from "next/server";
import {
	ALLOATTI_CONTEXT,
	getProductsByCategory,
	Product,
} from "@/data/alloatti-context";

interface Message {
	role: string;
	content: string;
}

export async function POST(req: NextRequest) {
	try {
		console.log("=== DEBUG: Inicio de request ===");
		const { messages } = await req.json();
		console.log("Mensajes recibidos:", messages);

		if (!process.env.GEMINI_API_KEY) {
			console.error("❌ API Key no configurada");
			return NextResponse.json(
				{ error: "GEMINI_API_KEY no está configurada" },
				{ status: 500 }
			);
		}
		console.log(
			"✅ API Key configurada (primeros 10 chars):",
			process.env.GEMINI_API_KEY.substring(0, 10) + "..."
		);

		if (!messages || !Array.isArray(messages)) {
			return NextResponse.json(
				{ error: "Se requiere un array de mensajes" },
				{ status: 400 }
			);
		}

		// Agregar el contexto del negocio al inicio de la conversación
		const systemMessage = {
			role: "user",
			parts: [{ text: ALLOATTI_CONTEXT }],
		};

		const firstUserMessage = {
			role: "model",
			parts: [
				{
					text: "Entendido. Soy el asistente técnico-comercial de Alloatti SRL y responderé sobre nuestras soluciones industriales y periféricos de envasado.",
				},
			],
		};

		// Construir el contenido para la API con el contexto
		const contents = [
			systemMessage,
			firstUserMessage,
			...messages.map((msg: Message) => ({
				role: msg.role === "user" ? "user" : "model",
				parts: [{ text: msg.content }],
			})),
		];

		console.log("📦 Contenido preparado:", contents.length, "mensajes");
		console.log("📤 Enviando request a Gemini API v1...");

		// Usar Gemini 2.5 Flash (mejor balance entre rendimiento y límites de uso)
		const modelName = "gemini-2.5-flash";
		console.log("🤖 Usando modelo:", modelName);
		// IMPORTANTE: Usar v1beta porque es donde están disponibles los modelos
		const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;
		console.log(
			"🔗 URL (sin key):",
			apiUrl.substring(0, apiUrl.indexOf("?key="))
		);

		const requestBody = {
			contents: contents,
		};
		console.log("📋 Request body:", JSON.stringify(requestBody, null, 2));

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});

		console.log("✅ Respuesta recibida, status:", response.status);
		console.log(
			"📊 Response headers:",
			Object.fromEntries(response.headers.entries())
		);

		const responseText = await response.text();
		console.log("📄 Response raw text:", responseText.substring(0, 500));

		if (!response.ok) {
			let errorData;
			try {
				errorData = JSON.parse(responseText);
			} catch {
				errorData = { error: { message: responseText } };
			}
			console.error("❌ Error de la API:", errorData);
			throw new Error(
				errorData.error?.message || "Error en la API de Gemini"
			);
		}

		const data = JSON.parse(responseText);
		console.log("✅ Datos parseados correctamente");
		console.log(
			"📦 Data structure:",
			JSON.stringify(data, null, 2).substring(0, 500)
		);

		let text =
			data.candidates?.[0]?.content?.parts?.[0]?.text ||
			"No se pudo obtener respuesta";
		console.log("✅ Texto extraído, longitud:", text.length);

		// Procesar si hay etiquetas de imagen en la respuesta
		let images = null;
		const imageMatches = text.match(/\[IMAGEN:([\w-]+)\]/g);

		if (imageMatches) {
			console.log("🖼️ Etiquetas de imagen encontradas:", imageMatches);

			// Extraer categorías únicas
			const categories = imageMatches
				.map((match: string) => {
					const categoryMatch = match.match(/\[IMAGEN:([\w-]+)\]/);
					return categoryMatch ? categoryMatch[1] : null;
				})
				.filter(Boolean);

			// Obtener productos según las categorías solicitadas
			const allProducts = categories.flatMap((category: string | null) =>
				category ? getProductsByCategory(category) : []
			);

			// Eliminar duplicados por ID
			const uniqueProducts = Array.from(
				new Map(allProducts.map((p: Product) => [p.id, p])).values()
			);

			if (uniqueProducts.length > 0) {
				images = uniqueProducts;
			}

			// Eliminar las etiquetas del texto
			text = text.replace(/\[IMAGEN:[\w-]+\]/g, "").trim();
		}

		return NextResponse.json({
			message: text,
			images: images,
			success: true,
		});
	} catch (error) {
		console.error("❌ ERROR COMPLETO:", error);
		console.error("❌ Tipo de error:", typeof error);

		if (error && typeof error === "object") {
			console.error("❌ Error keys:", Object.keys(error));
			console.error("❌ Error JSON:", JSON.stringify(error, null, 2));
		}

		const errorMessage =
			error instanceof Error ? error.message : "Error desconocido";

		console.error("❌ Mensaje final:", errorMessage);

		return NextResponse.json(
			{
				error: "Error al procesar la solicitud",
				details: errorMessage,
			},
			{ status: 500 }
		);
	}
}
