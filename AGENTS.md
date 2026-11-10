# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de API REST para catálogo de productos**.

| | |
|---|---|
| Tema | Construccion de APIs REST con Express |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / Express 4.21 |
| Patron arquitectonico | capas estándar con separación de responsabilidades (rutas, controladores, servicios, repositorios, modelos) |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`
- `Express como framework (vinculante: no mezcles otro framework del mismo ecosistema)`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- express 4.21.0
- typescript 5.7.2
- @types/express 5.0.0
- class-validator 0.14.1
- class-transformer 0.5.1
- reflect-metadata 0.2.2
- jest 29.7.0
- @types/jest 29.5.12
- ts-jest 29.1.5
- supertest 7.0.0
- sqlite3 5.1.7
- @types/sqlite3 3.1.11
- typeorm 0.3.20

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Implementación de endpoint básico**: Endpoint que devuelve la lista de productos en formato JSON.
- **Fase 2 — Validación de entradas y manejo de errores**: Endpoint con validaciones de entrada y manejo centralizado de errores.
- **Fase 3 — Optimización y decisiones de diseño**: Documento que describe las mejoras de rendimiento y la decisión de diseño tomada.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Boilerplate del stack (1)

Sin esto el proyecto no compila ni arranca. **Es tu trabajo crearlo**, y no toca nada de lo pedagogico: es andamiaje del stack.

- [ ] **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### 2. Referencias colgando (2)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/middlewares/validation.middleware.ts` — `ValidationError.map`
      Se invoca `map` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/exceptions/bad-request.exception.ts` — `ValidationError.forEach`
      Se invoca `forEach` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (21)

- `package.json`
- `tsconfig.json`
- `src/models/product.model.ts`
- `src/repositories/products.repository.ts`
- `src/routes/products.ts`
- `src/controllers/products.controller.ts`
- `src/services/products.service.ts`
- `src/middlewares/error.middleware.ts`
- `src/middlewares/validation.middleware.ts`
- `src/validators/product.validator.ts`
- `src/exceptions/http.exception.ts`
- `src/exceptions/bad-request.exception.ts`
- `src/exceptions/not-found.exception.ts`
- `src/exceptions/conflict.exception.ts`
- `src/config/database.ts`
- `src/main.ts`
- `src/app.ts`
- `tests/products.controller.spec.ts`
- `tests/products.service.spec.ts`
- `tests/products.repository.spec.ts`
- `src/config/logger.js`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/routes`
- `src/controllers`
- `src/services`
- `src/repositories`
- `src/models`
- `src/middlewares`
- `src/utils`
- `src/validators`
- `src/exceptions`
- `src/config`
- `tests`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar con separación de responsabilidades (rutas, controladores, servicios, repositorios, modelos)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261110090352996), Expone endpoints REST con validacion de entrada y manejo centralizado de errores
- Mision: Exponer el catalogo de productos

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
