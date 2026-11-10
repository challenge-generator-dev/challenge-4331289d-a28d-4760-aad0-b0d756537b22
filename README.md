# Desarrollo de API REST para catálogo de productos

El equipo de desarrollo necesita exponer un catálogo de productos a través de una API REST. La API debe validar las entradas y manejar los errores de manera centralizada. El catálogo incluye productos con atributos como nombre, precio, stock y categoría. Los precios no pueden ser negativos y los nombres no pueden ser duplicados.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construccion de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Implementación de endpoint básico

**Objetivo:** Crear un endpoint que liste todos los productos del catálogo.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Diseña un endpoint que devuelva la lista completa de productos.
- Asegúrate de que el endpoint responda con un código de estado HTTP apropiado en caso de éxito o error.

**Entregable:** Endpoint que devuelve la lista de productos en formato JSON.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que los productos tienen atributos específicos que deben ser incluidos en la respuesta.

</details>

### Fase 2: Validación de entradas y manejo de errores

**Objetivo:** Agregar validaciones a los endpoints y manejar los errores de manera centralizada.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa validaciones para asegurar que los precios no sean negativos y los nombres de los productos no sean duplicados.
- Configura un manejo centralizado de errores para que la API responda consistentemente ante diferentes tipos de errores.

**Entregable:** Endpoint con validaciones de entrada y manejo centralizado de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Considera usar middleware para centralizar la lógica de validación y manejo de errores.

</details>

### Fase 3: Optimización y decisiones de diseño

**Objetivo:** Optimizar el rendimiento del endpoint y tomar decisiones de diseño informadas.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Analiza el rendimiento del endpoint y propone mejoras.
- Evalúa diferentes opciones de diseño para la API y elige la que mejor se ajuste a las necesidades del negocio.

**Entregable:** Documento que describe las mejoras de rendimiento y la decisión de diseño tomada.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de caché para mejorar el rendimiento.
- Evalúa los pros y contras de diferentes enfoques de diseño, como REST vs GraphQL.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un endpoint REST y cuál es su propósito en una API?
- **paraQueSirve**: ¿Para qué sirve la validación de entradas en una API REST?
- **comoSeUsa**: ¿Cómo se usa el manejo centralizado de errores en una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al construir una API REST y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones de diseño implica construir una API REST y cómo se pueden evaluar?

## Criterios de Evaluacion

- Implementación de un endpoint básico que devuelve la lista de productos.
- Validación de entradas para asegurar que los precios no sean negativos y los nombres no sean duplicados.
- Manejo centralizado de errores en la API.
- Documentación de las mejoras de rendimiento y la decisión de diseño tomada.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
