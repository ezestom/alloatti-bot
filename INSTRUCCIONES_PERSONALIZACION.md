# ⚙️ Guía de Personalización - Chatbot Industrial Alloatti SRL

## 📝 Configuración del Contexto de Negocio

### 1. Editar Información Institucional
Modifique el archivo `src/data/alloatti-context.ts` con los siguientes parámetros estructurales:

#### Información Básica e Identidad:
- **Nombre:** Asistente Técnico Alloatti SRL
- **Especialidad:** Diseño y fabricación de maquinaria de última generación para el procesamiento y envasado de agua potable.
- **Ubicación:** Buenos Aires, Argentina.
- **Contacto Directo:** +54 9 11 6864-1122 (WhatsApp) / Formulario web vía EmailJS.

#### Enfoque de Calidad y Normativas:
El asistente debe validar rigurosamente que toda la maquinaria cumple con los lineamientos de **IVESS** y **CIMES**:
- Ciclo mínimo de lavado garantizado de 120 segundos.
- Procesos de lavado exterior rotativo e inyección interna a alta presión.
- Sistemas de separación de etapas y picos de llenado sin contacto para evitar contaminación cruzada.

### 2. Mapeo Taxonómico de Productos (Categorías del Sistema)
El chatbot segmentará el catálogo industrial mediante cuatro categorías clave para activar la galería automatizada:

- `retornables`: Modelos automáticos en acero inoxidable para bidones de 10, 12 y 20 litros (Modelos AT-120 a AT-960).
- `descartables`: Línea especializada para envases de un solo uso de 6, 8 y 10 litros (AT-300D y AT-700D).
- `accesorios`: Periféricos de automatización (Tolvas, Jirafas, Cargadores, Sacatapas, Módulos IoT HMI y Pre-lavadoras).
- `todo`: Despliegue completo del catálogo de soluciones de ingeniería.

### 3. Modelo de Datos del Catálogo (`Product[]`)
Estructura técnica para la declaración de arrays en `src/data/alloatti-context.ts`:

```typescript
export const PRODUCTS: Product[] = [
  {
    id: 'at-120',
    name: 'Monobloque Automático AT-120',
    category: 'retornables',
    description: 'Capacidad 120 bidones/hora. Tandas de 2 bidones (2 lavado, 1 enjuague, 1 llenado). Construcción íntegra en Acero Inoxidable.',
    price: 'Consultar Presupuesto',
    image: '/productos/at-120.jpg'
  },
  {
    id: 'at-700d',
    name: 'Línea Automática Continua AT-700D',
    category: 'descartables',
    description: 'Capacidad 700 bidones/hora para descartables (6, 8 y 10L). Lotes de 4 bidones. Incluye jirafa de tapas.',
    price: 'Consultar Presupuesto',
    image: '/productos/at-700d.jpg'
  },
  {
    id: 'hmi-iot',
    name: 'Pantalla HMI & App Conectividad IoT',
    category: 'accesorios',
    description: 'Interfaz táctil con conexión RJ45 y aplicación Android para diagnóstico de fallas en vivo y métricas en tiempo real.',
    price: 'Consultar Presupuesto',
    image: '/productos/hmi-iot.jpg'
  }
];