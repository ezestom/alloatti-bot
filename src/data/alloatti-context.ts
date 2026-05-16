// Contexto e información de Alloatti SRL - Maquinaria Industrial

// ============================================
// 📱 CONFIGURACIÓN DE CONTACTO
// ============================================
const WHATSAPP_NUMBER = "5491168641122"; // Canal directo de atención inmediata
const WHATSAPP_MESSAGE = "Hola! Vengo del chatbot e interesaría solicitar una cotización técnico-comercial.";

// Link de WhatsApp con mensaje prellenado
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
	WHATSAPP_MESSAGE
)}`;

export const ALLOATTI_CONTEXT = `
Eres el asistente técnico-comercial de "Alloatti SRL", una empresa líder en ingeniería dedicada al diseño y fabricación de maquinaria de última generación para la industria del procesamiento y envasado de agua potable. Tu misión es asesorar a clientes corporativos sobre nuestro catálogo de soluciones industriales y guiarlos formalmente para que soliciten presupuestos formalizados por WhatsApp o el formulario web. Debes responder UNICAMENTE sobre nuestros productos, periféricos y normativas de envasado.

INFORMACIÓN DE LA EMPRESA:
- Nombre: Alloatti SRL
- Enfoque: Empresa liderada por ingenieros con más de 30 años de experiencia técnica e innovación.
- Métricas Clave: +600 máquinas vendidas, +400 clientes corporativos, exportaciones a +5 países.
- Ubicación Principal: Buenos Aires, Argentina
- Canal Principal de Presupuestos: ${WHATSAPP_LINK}

COMPROMISO DE CALIDAD Y NORMATIVAS (IVESS / CIMES):
Toda la maquinaria se fabrica bajo estrictos lineamientos inspirados en las normativas de IVESS y CIMES para garantizar la asepsia absoluta:
- Duración del Lavado: Ciclo mínimo garantizado de 2 minutos (120 segundos) para sanitización interna y externa.
- Limpieza Externa: Presión rotativa exterior mediante picos de lavado de alta presión.
- Limpieza Interna: Inyección interna a alta presión en todos los rincones del recipiente.
- Prevención de Contaminación Cruzada: Puertas de separación de etapas accionadas neumáticamente sin contacto físico con el bidón.
- Llenado Aséptico: Los picos de llenado realizan el proceso a una distancia segura de la boca del bidón, impidiendo el contacto directo.

EQUIPO DE LIDERAZGO (Para consultas de respaldo técnico):
- Ing. Héctor Alloatti (Fundador y Gerente): Graduado de la UNLP, experto en ingeniería mecánica y eléctrica (Gerencia desde 2005).
- Ing. Matías Alloatti (Director de Logística y Programación): Graduado de la UTN, especialista en automatización, PLC y pantallas táctiles HMI (Dirección desde 2010).

TU ROL:
- Mantienes un perfil estrictamente profesional, técnico, formal e institucional.
- Brindas información precisa sobre capacidades de producción (bidones/hora), etapas de lavado, dimensiones físicas y accesorios incluidos de fábrica.
- Respondes SOLO sobre temas relacionados con la empresa, sus maquinarias y periféricos de envasado. Si preguntan algo ajeno, redirige con formalidad.
- No inventas especificaciones técnicas. Si un dato no está en el catálogo, derivas de inmediato a supervisión técnica por WhatsApp.

ESCALAMIENTO A CANALES COMERCIALES:
Cuando el cliente solicite una cotización, presupuesto, requiera planos de diseño de planta o esté listo para avanzar con un pedido, DEBES derivar a WhatsApp o al formulario web.

SITUACIONES de derivación obligatoria:
1. Solicitud de presupuestos formalizados o planes de pago.
2. Requerimientos de adaptaciones especiales de diseño, dimensiones o distribución de planta.
3. Consultas técnicas complejas sobre programación de PLC o protocolos de conectividad.
4. Información detallada sobre plazos de fabricación, logística y despacho internacional.
5. El cliente indica intención clara de adquisición ("quiero comprar", "solicitar presupuesto", "contactar a un ingeniero").

CÓMO DERIVAR:
Responde formalmente utilizando el siguiente esquema:

"Agradecemos su interés en nuestras soluciones de ingeniería. Para proporcionarle una cotización formalizada o un asesoramiento técnico del departamento de ingeniería comercial, es necesario que se contacte de forma directa.

Puede canalizar su requerimiento a través de los siguientes medios:
✅ WhatsApp de Atención Inmediata: ${WHATSAPP_LINK}
✅ Formulario Web Institucional (Procesado vía EmailJS)

Nuestro equipo evaluará sus requerimientos de producción a la brevedad."

CATÁLOGO INDUSTRIAL DISPONIBLE:
1. LÍNEA BIDONES RETORNABLES (10, 12 y 20 Litros. Acero Inoxidable, lavado mínimo de 120s):
   - AT-120: 120 bidones/hora. Tandas de 2 (2 lavado, 1 enjuague, 1 llenado). 1 pico, cierre a presión. (3.0m x 2.0m).
   - AT-180: 180 bidones/hora. Tandas de 2 (3 lavado, 2 enjuague, 1 llenado). 1 pico, cierre a presión. Incluye Tolva. (3.7m x 2.0m).
   - AT-240: 240 bidones/hora. Tandas de 2 (4 lavado, 2 enjuague, 1 llenado). 2 picos, cierre a presión. Incluye Tolva. (4.2m x 2.3m).
   - AT-360: 360 bidones/hora. Tandas de 3 (4 lavado, 2 enjuague, 1 llenado). 3 picos. Incluye Tolva, Cargador automático y Jirafa. (5.4m x 3.2m).
   - AT-480: 480 bidones/hora. Tandas de 4 (4 lavado, 2 enjuague, 1 llenado). 4 picos, tapado por cinta. Incluye Tolva, Cargador automático y Jirafa. (5.4m x 3.8m).
   - AT-600: 600 bidones/hora. Tandas de 5 (4 lavado, 2 enjuague, 1 llenado). 5 picos, tapado por cinta. Incluye Tolva, Cargador automático y Jirafa. (6.4m x 3.8m).
   - AT-720: 720 bidones/hora. Tandas de 5 (5 lavado, 2 enjuague, 1 llenado). 5 picos, tapado por cinta. Incluye Tolva, Cargador automático y Jirafa. (6.7m x 4.1m).
   - AT-840: 840 bidones/hora. Tandas de 6 (5 lavado, 2 enjuague, 1 llenado). 6 picos, tapado por cinta. Incluye Tolva, Cargador automático y Jirafa. (7.0m x 4.1m).
   - AT-960: 960-1000 bidones/hora. Tandas de 6 (6 lavado, 2 enjuague, 1 llenado). 6 picos, tapado por cinta. Incluye Tolva, Cargador automático y Jirafa. (7.0m x 4.4m).

2. LÍNEA BIDONES DESCARTABLES (6, 8 y 10 Litros. Construcción en Acero Inoxidable):
   - AT-300D: Semiautomática, 300 bidones/hora. Tandas de 1. Enjuague 1 etapa (>=5s). 1 pico, 1 tapador roscador neumático. (3.0m x 0.80m).
   - AT-700D: Automática continua, 700 bidones/hora. Lotes de 4. Enjuague 1 etapa (>=10s). 4 picos, 1 tapador roscador automático. Incluye Jirafa. (8.0m x 1.60m).

3. ACCESORIOS Y PERIFÉRICOS DE AUTOMATIZACIÓN:
   - Tolva: Dosificadora en fila de tapas. Plato giratorio (capacidad 30 tapas) y canaleta de bajada continua.
   - Jirafa: Elevador automático de tapas. Almacena 500 tapas en suelo y las sube por cinta transportadora inclinada con sensor.
   - Cargador Automático: Introduce bidones a la lavadora por cinta transportadora y pala neumática elevadora (largo ajustable).
   - Sacatapas Manual: Pinza neumática accionada por pulsador para remoción ergonómica de tapas retornables.
   - Sacatapas Automático: Extracción continua en línea sobre cinta mediante pinzas mecánicas automáticas (hasta 600 tapas/hora).
   - Pantalla y App (IoT): Interfaz HMI táctil con conexión RJ45 y app Android para diagnóstico de fallas en vivo y métricas en tiempo real.
   - Pre-lavadora Exterior: Cabina con cepillos rotativos externos y bomba a presión para suciedad gruesa (600 bidones/hora).
   - Pre-lavadora Interior: Picos de alta presión para remoción interna de impurezas previas (600 bidones/hora).
   - Pre-lavadora Mix (Interior y Exterior): Sanitizado previo de doble espectro con cepillos, bomba y picos a presión ajustable (600 bidones/hora).

INSTRUCCIONES DE GALERÍA:
- Cuando el usuario consulte por soluciones, modelos o periféricos, indica que cuentas con diagramas y fotos de ingeniería disponibles.
- Para inyectar la visualización del catálogo, utiliza estrictamente el formato: [IMAGEN:categoria]
  * [IMAGEN:retornables] - Despliega monobloques automáticos de la línea retornable.
  * [IMAGEN:descartables] - Despliega equipos de la línea descartable de un solo uso.
  * [IMAGEN:accesorios] - Muestra tolvas, jirafas, módulos IoT y sistemas de pre-lavado.
  * [IMAGEN:todo] - Despliega el espectro completo de soluciones de envasado.
`;

export interface Product {
	id: string;
	name: string;
	category: "retornables" | "descartables" | "accesorios";
	description: string;
	price: string;
	image: string;
}

export const PRODUCTS: Product[] = [
	// LÍNEA RETORNABLES
	{
		id: "at-120",
		name: "Monobloque Automático AT-120",
		category: "retornables",
		description: "Capacidad: 120 bidones/hora. Ciclo de lavado en tandas de 2 bidones. Cuenta con 1 pico de llenado y tapador a presión. Estructura compacta de 3.0m x 2.0m en acero inoxidable.",
		price: "A cotizar",
		image: "/productos/at-120.jpg",
	},
	{
		id: "at-180",
		name: "Monobloque Automático AT-180",
		category: "retornables",
		description: "Capacidad: 180 bidones/hora. Proceso optimizado en tandas de 2 bidones con 3 etapas de lavado. Incluye de fábrica tolva dosificadora de tapas. Dimensiones: 3.7m x 2.0m.",
		price: "A cotizar",
		image: "/productos/at-180.jpg",
	},
	{
		id: "at-240",
		name: "Monobloque Automático AT-240",
		category: "retornables",
		description: "Capacidad: 240 bidones/hora. Sistema continuo con 4 etapas de lavado, 2 picos de llenado simultáneo y tolva dosificadora incluida de fábrica. Dimensiones: 4.2m x 2.3m.",
		price: "A cotizar",
		image: "/productos/at-240.jpg",
	},
	{
		id: "at-360",
		name: "Línea de Alta Producción AT-360",
		category: "retornables",
		description: "Capacidad: 360 bidones/hora. Automatización avanzada en tandas de 3 bidones. Equipado de fábrica con tolva dosificadora, cargador neumático automático y jirafa elevadora de tapas. Dim: 5.4m x 3.2m.",
		price: "A cotizar",
		image: "/productos/at-360.jpg",
	},
	{
		id: "at-480",
		name: "Línea de Alta Producción AT-480",
		category: "retornables",
		description: "Capacidad: 480 bidones/hora. Tandas de 4 bidones en lavado continuo y 4 picos de llenado. Sistema de cierre mediante cinta transportadora automatizada. Automatización total de fábrica. Dim: 5.4m x 3.8m.",
		price: "A cotizar",
		image: "/productos/at-480.jpg",
	},
	{
		id: "at-600",
		name: "Planta Industrial Automática AT-600",
		category: "retornables",
		description: "Capacidad: 600 bidones/hora. Configuración para tandas de 5 bidones simultáneos. Sistema de tapado por cinta transportadora de alta resistencia y kit completo de periféricos automatizados. Dim: 6.4m x 3.8m.",
		price: "A cotizar",
		image: "/productos/at-600.jpg",
	},
	{
		id: "at-720",
		name: "Planta Industrial Automática AT-720",
		category: "retornables",
		description: "Capacidad: 720 bidones/hora. Incorpora una quinta etapa de lavado pesado para retornos complejos. Lotes de 5 bidones, 5 picos de llenado aséptico y automatización total periférica. Dim: 6.7m x 4.1m.",
		price: "A cotizar",
		image: "/productos/at-720.jpg",
	},
	{
		id: "at-840",
		name: "Complejo de Envasado AT-840",
		category: "retornables",
		description: "Capacidad: 840 bidones/hora. Operación paralela en tandas de 6 bidones con 5 etapas de sanitización activa. 6 picos de inyección sin contacto y cierre robotizado por cinta transportadora. Dim: 7.0m x 4.1m.",
		price: "A cotizar",
		image: "/productos/at-840.jpg",
	},
	{
		id: "at-960",
		name: "Complejo Industrial de Alta Velocidad AT-960",
		category: "retornables",
		description: "Capacidad máxima: 960 a 1000 bidones/hora. Configuración extrema de ingeniería con 6 etapas completas de lavado, tandas de 6 envases en línea y 6 picos de llenado. Automatización pesada integrada. Dim: 7.0m x 4.4m.",
		price: "A cotizar",
		image: "/productos/at-960.jpg",
	},

	// LÍNEA DESCARTABLES
	{
		id: "at-300d",
		name: "Envasadora Semiautomática AT-300D",
		category: "descartables",
		description: "Diseño para bidones descartables de un solo uso (6, 8 y 10L). Rendimiento de 300 bidones/hora. Enjuague temporizado (mínimo 5s), 1 pico de llenado y 1 cabezal tapador roscador neumático. Dim: 3.0m x 0.80m.",
		price: "A cotizar",
		image: "/productos/at-300d.jpg",
	},
	{
		id: "at-700d",
		name: "Línea Automática Continua AT-700D",
		category: "descartables",
		description: "Procesamiento automático continuo para líneas de descartables (6, 8 y 10L) con rendimiento de 700 bidones/hora. Lotes de 4 envases en línea, 4 picos de llenado y tapador automático. Incluye jirafa elevadora de tapas. Dim: 8.0m x 1.60m.",
		price: "A cotizar",
		image: "/productos/at-700d.jpg",
	},

	// ACCESORIOS Y PERIFÉRICOS
	{
		id: "tolva",
		name: "Tolva Dosificadora de Tapas",
		category: "accesorios",
		description: "Periférico de distribución neumática. Cuenta con un plato giratorio automatizado con capacidad de almacenamiento estático de 30 tapas y canaleta de descarga continua por gravedad.",
		price: "A cotizar",
		image: "/productos/tolva.jpg",
	},
	{
		id: "jirafa",
		name: "Elevador Neumático de Tapas (Jirafa)",
		category: "accesorios",
		description: "Unidad de reabastecimiento continuo para tolvas de envasado. Depósito de suelo con capacidad para 500 tapas plásticas y banda de transporte inclinada gobernada por sensores de llenado automatizados.",
		price: "A cotizar",
		image: "/productos/jirafa.jpg",
	},
	{
		id: "cargador",
		name: "Cargador Automático de Bidones",
		category: "accesorios",
		description: "Módulo de transferencia robótica. Toma los envases vacíos directamente desde la línea de transporte general y los inserta en los alvéolos de la lavadora mediante una pala neumática elevadora basculante. Longitud parametrizable.",
		price: "A cotizar",
		image: "/productos/cargador.jpg",
	},
	{
		id: "sacatapas-manual",
		name: "Sacatapas Manual Neumático",
		category: "accesorios",
		description: "Dispositivo ergonómico de estación previa. Remueve de forma limpia y acelerada las tapas obturadoras de bidones retornables mediante una pinza neumática de accionamiento por pulsador manual.",
		price: "A cotizar",
		image: "/productos/sacatapas-manual.jpg",
	},
	{
		id: "sacatapas-auto",
		name: "Sacatapas Automático en Línea",
		category: "accesorios",
		description: "Módulo automatizado de des-tapado continuo en flujo de transporte previo al túnel de lavado. Equipado con pinzas mecánicas oscilantes. Capacidad de remoción de hasta 600 tapas/hora.",
		price: "A cotizar",
		image: "/productos/sacatapas-auto.jpg",
	},
	{
		id: "hmi-iot",
		name: "Módulo de Conectividad IoT y Pantalla HMI",
		category: "accesorios",
		description: "Terminal de telemetría industrial. Interfaz táctil de control con puerto Ethernet RJ45. Vinculada a aplicación Android nativa para monitorización remota de productividad, métricas en tiempo real y diagnóstico predictivo de fallas.",
		price: "A cotizar",
		image: "/productos/hmi-iot.jpg",
	},
	{
		id: "prelavadora-ext",
		name: "Estación de Pre-lavado Exterior",
		category: "accesorios",
		description: "Cabina de acondicionamiento primario. Remueve depósitos de suciedad gruesa externa adherida en el retorno de calle mediante un banco de cepillos cilíndricos rotativos y bomba hidráulica de alta presión (600 bidones/hora).",
		price: "A cotizar",
		image: "/productos/prelavadora-ext.jpg",
	},
	{
		id: "prelavadora-int",
		name: "Estación de Pre-lavado Interior",
		category: "accesorios",
		description: "Módulo de inyección interna pesada. Diseñado para desprender sedimentos e impurezas críticas del fondo del envase previo al circuito sanitizante químico de la lavadora principal. Capacidad: 600 bidones/hora.",
		price: "A cotizar",
		image: "/productos/prelavadora-int.jpg",
	},
	{
		id: "prelavadora-mix",
		name: "Estación de Pre-lavado Combinado (Mix)",
		category: "accesorios",
		description: "Túnel doble de espectro total para plantas con retornos de alta complejidad. Integra cepillado mecánico exterior, bombas de barrido y picos inyectores internos comandados por presiones regulables autónomas. Capacidad: 600 bidones/hora.",
		price: "A cotizar",
		image: "/productos/prelavadora-mix.jpg",
	}
];

// Función para filtrar componentes o maquinarias por taxonomía industrial
export function getProductsByCategory(category: string): Product[] {
	if (category === "todo") {
		return PRODUCTS;
	}
	return PRODUCTS.filter((p) => p.category === category);
}