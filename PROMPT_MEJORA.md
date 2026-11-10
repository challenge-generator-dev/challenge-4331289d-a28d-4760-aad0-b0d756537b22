# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/middlewares/validation.middleware.ts` — `ValidationError.map`: Se invoca `map` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/exceptions/bad-request.exception.ts` — `ValidationError.forEach`: Se invoca `forEach` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261110090352996), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construccion de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para catálogo de productos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación de endpoint básico — objetivo: Crear un endpoint que liste todos los productos del catálogo. — entregable (NO resolver): Endpoint que devuelve la lista de productos en formato JSON.
- Fase 2: Validación de entradas y manejo de errores — objetivo: Agregar validaciones a los endpoints y manejar los errores de manera centralizada. — entregable (NO resolver): Endpoint con validaciones de entrada y manejo centralizado de errores.
- Fase 3: Optimización y decisiones de diseño — objetivo: Optimizar el rendimiento del endpoint y tomar decisiones de diseño informadas. — entregable (NO resolver): Documento que describe las mejoras de rendimiento y la decisión de diseño tomada.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "product-catalog-api",
  "version": "1.0.0",
  "description": "API REST para catálogo de productos",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.0",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "reflect-metadata": "^0.2.2",
    "sqlite3": "^5.1.7",
    "typeorm": "^0.3.20",
    "inversify": "^6.0.2",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.2",
    "@types/sqlite3": "^3.1.11",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.12",
    "ts-jest": "^29.1.5",
    "supertest": "^7.0.0",
    "@types/supertest": "^6.0.2",
    "ts-node": "^10.9.2"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "tests"]
}

// === ARCHIVO: src/models/product.model.ts ===
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@Entity()
@Unique(['name'])
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @Column({ type: 'integer' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  category!: string;

  constructor(id?: number, name?: string, price?: number, stock?: number, category?: string) {
    if (id !== undefined) this.id = id;
    if (name !== undefined) this.name = name;
    if (price !== undefined) this.price = price;
    if (stock !== undefined) this.stock = stock;
    if (category !== undefined) this.category = category;
  }
}

export class ProductDTO {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public stock: number,
    public category: string
  ) {}
}

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;

  @IsNotEmpty()
  @IsString()
  category!: string;
}

export class UpdateProductDTO {
  @IsString()
  name?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price?: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock?: number;

  @IsString()
  category?: string;
}

// === ARCHIVO: src/repositories/products.repository.ts ===
import { Product } from '../models/product.model';
import { DataSource, Repository } from 'typeorm';
import { injectable } from 'inversify';
import 'reflect-metadata';

export interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Partial<Product>): Promise<Product | null>;
  delete(id: number): Promise<void>;
}

@injectable()
export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor(dataSource: DataSource) {
    if (!dataSource || !dataSource.isInitialized) {
      throw new Error('DataSource no está inicializada');
    }
    this.repository = dataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.repository.find({
        order: {
          id: 'ASC',
          name: 'ASC'
        }
      });
    } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${(error as Error).message}`);
    }
  }

  async findById(id: number): Promise<Product | null> {
    if (!id || id <= 0) {
      return null;
    }
    try {
      return await this.repository.findOneBy({ id });
    } catch (error) {
      throw new Error(`Error al buscar producto por ID: ${(error as Error).message}`);
    }
  }

  async findByName(name: string): Promise<Product | null> {
    if (!name || name.trim().length === 0) {
      return null;
    }
    try {
      return await this.repository.findOneBy({ name: name.trim() });
    } catch (error) {
      throw new Error(`Error al buscar producto por nombre: ${(error as Error).message}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      if (!product.name || !product.category || product.price === undefined || product.stock === undefined) {
        throw new Error('Faltan campos requeridos para crear el producto');
      }
      return await this.repository.save(product);
    } catch (error) {
      throw new Error(`Error al crear producto: ${(error as Error).message}`);
    }
  }

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    if (!id || id <= 0) {
      return null;
    }
    try {
      const updateResult = await this.repository.update(id, product);
      if (updateResult.affected === 0) {
        return null;
      }
      return await this.repository.findOneBy({ id });
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${(error as Error).message}`);
    }
  }

  async delete(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error('ID de producto inválido para eliminar');
    }
    try {
      const deleteResult = await this.repository.delete(id);
      if (deleteResult.affected === 0) {
        throw new Error('No se encontró el producto a eliminar');
      }
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${(error as Error).message}`);
    }
  }
}

// === ARCHIVO: src/routes/products.ts ===
import { Router, Request, Response, NextFunction } from 'express';
import { ProductsController } from '../controllers/products.controller';

const router = Router();
const productsController = new ProductsController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await productsController.getAllProducts(req, res, next);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await productsController.getProductById(req, res, next);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  await productsController.createProduct(req, res, next);
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await productsController.updateProduct(req, res, next);
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await productsController.deleteProduct(req, res, next);
});

export default router;
export const productsRouter = router;

// === ARCHIVO: src/controllers/products.controller.ts ===
import { Request, Response, NextFunction } from 'express';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../models/product.model';
import { UpdateProductDTO } from '../models/product.model';
import { ProductDTO } from '../models/product.model';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

export class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productsService.getAllProducts();
      const productDTOs: ProductDTO[] = products.map(p => new ProductDTO(p.id, p.name, p.price, p.stock, p.category));
      res.status(200).json(productDTOs);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new BadRequestException('El ID del producto debe ser un número válido');
      }
      const product = await this.productsService.getProductById(id);
      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
      const productDTO = new ProductDTO(product.id, product.name, product.price, product.stock, product.category);
      res.status(200).json(productDTO);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createProductDTO: CreateProductDTO = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      };
      const product = await this.productsService.createProduct(createProductDTO);
      const productDTO = new ProductDTO(product.id, product.name, product.price, product.stock, product.category);
      res.status(201).json(productDTO);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new BadRequestException('El ID del producto debe ser un número válido');
      }
      const updateProductDTO: UpdateProductDTO = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      };
      const product = await this.productsService.updateProduct(id, updateProductDTO);
      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
      const productDTO = new ProductDTO(product.id, product.name, product.price, product.stock, product.category);
      res.status(200).json(productDTO);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new BadRequestException('El ID del producto debe ser un número válido');
      }
      await this.productsService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

// === ARCHIVO: src/services/products.service.ts ===
import { Product } from '../models/product.model';
import { ProductDTO } from '../models/product.model';
import { CreateProductDTO } from '../models/product.model';
import { UpdateProductDTO } from '../models/product.model';
import { ProductsRepository } from '../repositories/products.repository';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ConflictException } from '../exceptions/conflict.exception';
import { DataSource } from 'typeorm';
import { DatabaseConfig } from '../config/database';

export class ProductsService {
  private productsRepository: ProductsRepository;

  constructor(dataSource?: DataSource) {
    let ds: DataSource;
    if (dataSource) {
      ds = dataSource;
    } else {
      if (!DatabaseConfig.isInitialized()) {
        throw new Error('DatabaseConfig no está inicializada. Debe llamar a DatabaseConfig.initialize() primero.');
      }
      ds = DatabaseConfig.getDataSource();
    }
    this.productsRepository = new ProductsRepository(ds);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productsRepository.findAll();
  }

  async getProductById(id: number): Promise<Product | null> {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID del producto debe ser un número positivo');
    }
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async createProduct(dto: CreateProductDTO): Promise<Product> {
    this.validateCreateProductDTO(dto);
    const existingProduct = await this.productsRepository.findByName(dto.name);
    if (existingProduct) {
      throw new ConflictException(`Ya existe un producto con el nombre "${dto.name}"`);
    }
    const product = new Product(0, dto.name, dto.price, dto.stock, dto.category);
    const createdProduct = await this.productsRepository.create(product);
    return createdProduct;
  }

  async updateProduct(id: number, dto: UpdateProductDTO): Promise<Product | null> {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID del producto debe ser un número positivo');
    }
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    if (dto.price !== undefined && dto.price < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }
    if (dto.stock !== undefined && (typeof dto.stock !== 'number' || !Number.isInteger(dto.stock) || dto.stock < 0)) {
      throw new BadRequestException('El stock debe ser un número entero no negativo');
    }
    if (dto.name !== undefined && dto.name !== existingProduct.name) {
      const productWithName = await this.productsRepository.findByName(dto.name);
      if (productWithName && productWithName.id !== id) {
        throw new ConflictException(`Ya existe un producto con el nombre "${dto.name}"`);
      }
    }
    const updatedProduct = await this.productsRepository.update(id, dto);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID del producto debe ser un número positivo');
    }
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    await this.productsRepository.delete(id);
  }

  private validateCreateProductDTO(dto: CreateProductDTO): void {
    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('El nombre del producto es obligatorio');
    }
    if (dto.name.trim().length > 100) {
      throw new BadRequestException('El nombre del producto no puede exceder 100 caracteres');
    }
    if (dto.price === undefined || dto.price === null) {
      throw new BadRequestException('El precio del producto es obligatorio');
    }
    if (typeof dto.price !== 'number' || dto.price < 0) {
      throw new BadRequestException('El precio debe ser un número no negativo');
    }
    if (dto.price > 1000000) {
      throw new BadRequestException('El precio no puede exceder 1,000,000');
    }
    if (dto.stock === undefined || dto.stock === null) {
      throw new BadRequestException('El stock del producto es obligatorio');
    }
    if (typeof dto.stock !== 'number' || !Number.isInteger(dto.stock) || dto.stock < 0) {
      throw new BadRequestException('El stock debe ser un número entero no negativo');
    }
    if (dto.stock > 100000) {
      throw new BadRequestException('El stock no puede exceder 100,000 unidades');
    }
    if (!dto.category || dto.category.trim().length === 0) {
      throw new BadRequestException('La categoría del producto es obligatoria');
    }
    if (dto.category.trim().length > 50) {
      throw new BadRequestException('La categoría no puede exceder 50 caracteres');
    }
  }
}

// === ARCHIVO: src/middlewares/error.middleware.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException } from '../exceptions/http.exception.js';

const logger = {
  error: (message: string, meta?: Record<string, unknown>) => console.error(message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => console.warn(message, meta),
  info: (message: string, meta?: Record<string, unknown>) => console.info(message, meta),
  debug: (message: string, meta?: Record<string, unknown>) => console.debug(message, meta)
};

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path?: string;
  method?: string;
}

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isHttpException = err instanceof HttpException;
  const statusCode = isHttpException ? err.statusCode : 500;
  const message = isHttpException ? err.message : 'Error interno del servidor';
  const errorCode = isHttpException ? err.errorCode : 'INTERNAL_SERVER_ERROR';

  const errorResponse: ErrorResponse = {
    statusCode,
    message,
    error: errorCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  };

  if (statusCode >= 500) {
    logger.error(`[${req.method}] ${req.path} - ${statusCode}: ${message}`, {
      stack: err.stack,
      body: req.body
    });
  } else if (statusCode >= 400) {
    logger.warn(`[${req.method}] ${req.path} - ${statusCode}: ${message}`, {
      body: req.body
    });
  }

  res.status(statusCode).json(errorResponse);
};

// === ARCHIVO: src/middlewares/validation.middleware.ts ===
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { BadRequestException, ValidationError as AppValidationError } from '../exceptions/bad-request.exception.js';

const validatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true
};

export const validateBody = <T>(dtoClass: new () => T): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dto as object, validatorOptions);

    if (errors.length > 0) {
      const validationErrors: AppValidationError[] = errors.map((error: ValidationError) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          field: error.property,
          message: constraints.join(', ')
        };
      });

      throw new BadRequestException(
        'Error de validación en los datos proporcionados',
        { validationErrors }
      );
    }

    req.body = dto;
    next();
  };
};

export const validateParams = <T>(dtoClass: new () => T): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.params);
    const errors: ValidationError[] = await validate(dto as object, validatorOptions);

    if (errors.length > 0) {
      const validationErrors: AppValidationError[] = errors.map((error: ValidationError) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          field: error.property,
          message: constraints.join(', ')
        };
      });

      throw new BadRequestException(
        'Error de validación en los parámetros proporcionados',
        { validationErrors }
      );
    }

    req.params = dto as Record<string, string>;
    next();
  };
};

export const validateQuery = <T>(dtoClass: new () => T): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryValidatorOptions: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: false
    };

    const dto = plainToInstance(dtoClass, req.query);
    const errors: ValidationError[] = await validate(dto as object, queryValidatorOptions);

    if (errors.length > 0) {
      const validationErrors: AppValidationError[] = errors.map((error: ValidationError) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          field: error.property,
          message: constraints.join(', ')
        };
      });

      throw new BadRequestException(
        'Error de validación en los query parameters proporcionados',
        { validationErrors }
      );
    }

    req.query = dto as Record<string, string>;
    next();
  };
};

// === ARCHIVO: src/validators/product.validator.ts ===
import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from 'class-validator';

export const CATEGORIES = [
  'electronics',
  'clothing',
  'food',
  'books',
  'toys',
  'home',
  'sports',
  'other'
] as const;

export type ProductCategory = typeof CATEGORIES[number];

@ValidatorConstraint({ async: false })
export class IsValidPrice implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null) {
      return true;
    }
    if (typeof value !== 'number') {
      return false;
    }
    if (value < 0) {
      return false;
    }
    if (value > 1000000) {
      return false;
    }
    const decimals = value.toString().split('.')[1];
    if (decimals && decimals.length > 2) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'El precio debe ser un número positivo con máximo 2 decimales y no mayor a 1,000,000';
  }
}

@ValidatorConstraint({ async: false })
export class IsValidStock implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null) {
      return true;
    }
    if (typeof value !== 'number') {
      return false;
    }
    if (!Number.isInteger(value)) {
      return false;
    }
    if (value < 0) {
      return false;
    }
    if (value > 100000) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'El stock debe ser un número entero no negativo menor a 100,000';
  }
}

export function IsValidPriceConstraint(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any): boolean {
          if (value === undefined || value === null) {
            return true;
          }
          if (typeof value !== 'number') {
            return false;
          }
          if (value < 0) {
            return false;
          }
          if (value > 1000000) {
            return false;
          }
          const decimals = value.toString().split('.')[1];
          if (decimals && decimals.length > 2) {
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'El precio debe ser un número positivo con máximo 2 decimales y no mayor a 1,000,000';
        }
      }
    });
  };
}

export function IsValidStockConstraint(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any): boolean {
          if (value === undefined || value === null) {
            return true;
          }
          if (typeof value !== 'number') {
            return false;
          }
          if (!Number.isInteger(value)) {
            return false;
          }
          if (value < 0) {
            return false;
          }
          if (value > 100000) {
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'El stock debe ser un número entero no negativo menor a 100,000';
        }
      }
    });
  };
}

export function IsUniqueProductName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        async validate(value: any): Promise<boolean> {
          if (!value || typeof value !== 'string') {
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'El nombre del producto ya existe en el catálogo';
        }
      }
    });
  };
}

export class CreateProductValidator {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  @IsUniqueProductName({ message: 'El nombre del producto ya existe' })
  name!: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  @IsValidPriceConstraint({ message: 'El precio debe ser válido' })
  price!: number;

  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsValidStockConstraint({ message: 'El stock debe ser válido' })
  stock!: number;

  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría es requerida' })
  @IsEnum(CATEGORIES, { message: 'Categoría inválida. Valores permitidos: electronics, clothing, food, books, toys, home, sports, other' })
  category!: string;
}

export class UpdateProductValidator {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  @IsValidPriceConstraint({ message: 'El precio debe ser válido' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsValidStockConstraint({ message: 'El stock debe ser válido' })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsEnum(CATEGORIES, { message: 'Categoría inválida. Valores permitidos: electronics, clothing, food, books, toys, home, sports, other' })
  category?: string;
}

export class ProductIdValidator {
  @IsNumber({}, { message: 'El ID debe ser un número' })
  @IsPositive({ message: 'El ID debe ser positivo' })
  id!: number;
}

export class ProductQueryValidator {
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsEnum(CATEGORIES, { message: 'Categoría inválida' })
  category?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El límite debe ser un número' })
  @IsPositive({ message: 'El límite debe ser positivo' })
  limit?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El offset debe ser un número' })
  @IsPositive({ message: 'El offset debe ser positivo' })
  offset?: number;

  @IsOptional()
  @IsString({ message: 'El orden debe ser una cadena de texto' })
  sortBy?: 'name' | 'price' | 'stock' | 'category';

  @IsOptional()
  @IsString({ message: 'La dirección del orden debe ser una cadena de texto' })
  order?: 'ASC' | 'DESC';
}

// === ARCHIVO: src/exceptions/http.exception.ts ===
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export interface HttpExceptionOptions {
  message?: string;
  errorCode?: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export abstract class HttpException extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly details?: Record<string, unknown>;
  public readonly timestamp: Date;
  public path?: string;

  constructor(options: HttpExceptionOptions) {
    const message = options.message || 'An error occurred';
    super(message);
    
    this.name = this.constructor.name;
    this.statusCode = options.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.errorCode = options.errorCode || 'INTERNAL_ERROR';
    this.details = options.details;
    this.timestamp = new Date();
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON(): Record<string, unknown> {
    const response: Record<string, unknown> = {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      timestamp: this.timestamp.toISOString(),
    };

    if (this.details) {
      response.details = this.details;
    }

    if (this.path) {
      response.path = this.path;
    }

    return response;
  }

  public setPath(path: string): void {
    this.path = path;
  }

  public getHttpStatus(): number {
    return this.statusCode;
  }

  public static isHttpException(error: unknown): error is HttpException {
    return error instanceof HttpException;
  }

  protected static formatValidationErrors(errors: Record<string, string[]>): Record<string, unknown> {
    const formattedErrors: Record<string, string> = {};
    
    for (const [field, messages] of Object.entries(errors)) {
      if (Array.isArray(messages) && messages.length > 0) {
        formattedErrors[field] = messages[0];
      }
    }
    
    return formattedErrors;
  }

  public static fromError(error: Error, statusCode: number = HttpStatusCode.INTERNAL_SERVER_ERROR): HttpException {
    class GenericHttpException extends HttpException {
      constructor(msg: string, code: number) {
        super({ message: msg, statusCode: code, errorCode: 'ERROR_FROM_EXCEPTION' });
      }
    }
    
    return new GenericHttpException(error.message, statusCode);
  }
}

// === ARCHIVO: src/exceptions/bad-request.exception.ts ===
import { HttpException, HttpExceptionOptions, HttpStatusCode } from './http.exception';

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface BadRequestExceptionOptions extends HttpExceptionOptions {
  validationErrors?: ValidationError[];
  field?: string;
}

export class BadRequestException extends HttpException {
  public readonly validationErrors?: ValidationError[];
  public readonly field?: string;

  constructor(message: string = 'Bad Request', options?: BadRequestExceptionOptions) {
    super({
      message,
      statusCode: HttpStatusCode.BAD_REQUEST,
      errorCode: options?.errorCode || 'BAD_REQUEST',
      details: options?.details,
    });

    this.validationErrors = options?.validationErrors;
    this.field = options?.field;
  }

  public static fromValidation(validationErrors: ValidationError[]): BadRequestException {
    const message = validationErrors.length === 1 
      ? validationErrors[0].message 
      : `Validation failed for ${validationErrors.length} fields`;

    const details: Record<string, unknown> = {};
    validationErrors.forEach(error => {
      details[error.field] = {
        message: error.message,
        value: error.value,
      };
    });

    return new BadRequestException(message, {
      errorCode: 'VALIDATION_ERROR',
      details,
      validationErrors,
    });
  }

  public static fromField(field: string, message: string, value?: unknown): BadRequestException {
    return new BadRequestException(message, {
      errorCode: 'FIELD_VALIDATION_ERROR',
      field,
      validationErrors: [{ field, message, value }],
    });
  }

  public static invalidId(id: unknown): BadRequestException {
    return new BadRequestException(`Invalid ID format: ${id}`, {
      errorCode: 'INVALID_ID',
      field: 'id',
    });
  }

  public static missingField(field: string): BadRequestException {
    return new BadRequestException(`Field '${field}' is required`, {
      errorCode: 'MISSING_FIELD',
      field,
    });
  }

  public static invalidValue(field: string, reason: string): BadRequestException {
    return new BadRequestException(`Invalid value for field '${field}': ${reason}`, {
      errorCode: 'INVALID_VALUE',
      field,
    });
  }

  public toJSON(): Record<string, unknown> {
    const response = super.toJSON();
    
    if (this.validationErrors && this.validationErrors.length > 0) {
      response.validationErrors = this.validationErrors;
    }
    
    if (this.field) {
      response.field = this.field;
    }
    
    return response;
  }

  public hasValidationErrors(): boolean {
    return Array.isArray(this.validationErrors) && this.validationErrors.length > 0;
  }

  public getFirstError(): ValidationError | undefined {
    if (this.validationErrors && this.validationErrors.length > 0) {
      return this.validationErrors[0];
    }
    return undefined;
  }
}

// === ARCHIVO: src/exceptions/not-found.exception.ts ===
import { HttpException, HttpExceptionOptions, HttpStatusCode } from './http.exception';

export interface NotFoundExceptionOptions extends HttpExceptionOptions {
  resourceType?: string;
  resourceId?: string | number;
  query?: Record<string, unknown>;
}

export class NotFoundException extends HttpException {
  public readonly resourceType?: string;
  public readonly resourceId?: string | number;
  public readonly query?: Record<string, unknown>;

  constructor(message: string = 'Resource not found', options?: NotFoundExceptionOptions) {
    super({
      message,
      statusCode: HttpStatusCode.NOT_FOUND,
      errorCode: options?.errorCode || 'NOT_FOUND',
      details: options?.details,
    });

    this.resourceType = options?.resourceType;
    this.resourceId = options?.resourceId;
    this.query = options?.query;
  }

  public static forResource(resourceType: string, resourceId: string | number): NotFoundException {
    return new NotFoundException(
      `${resourceType} with ID ${resourceId} not found`,
      {
        errorCode: 'RESOURCE_NOT_FOUND',
        resourceType,
        resourceId,
      }
    );
  }

  public static forProduct(productId: number): NotFoundException {
    return NotFoundException.forResource('Product', productId);
  }

  public static forProductByName(name: string): NotFoundException {
    return new NotFoundException(`Product with name '${name}' not found`, {
      errorCode: 'PRODUCT_NOT_FOUND_BY_NAME',
      resourceType: 'Product',
      query: { name },
    });
  }

  public static forCollection(resourceType: string): NotFoundException {
    return new NotFoundException(
      `No ${resourceType} found`,
      {
        errorCode: 'COLLECTION_EMPTY',
        resourceType,
      }
    );
  }

  public static fromQuery(resourceType: string, query: Record<string, unknown>): NotFoundException {
    return new NotFoundException(
      `${resourceType} not found for the given criteria`,
      {
        errorCode: 'RESOURCE_NOT_FOUND_BY_QUERY',
        resourceType,
        query,
      }
    );
  }

  public toJSON(): Record<string, unknown> {
    const response = super.toJSON();
    
    if (this.resourceType) {
      response.resourceType = this.resourceType;
    }
    
    if (this.resourceId !== undefined) {
      response.resourceId = this.resourceId;
    }
    
    if (this.query) {
      response.query = this.query;
    }
    
    return response;
  }

  public getResourceIdentifier(): string {
    if (this.resourceType && this.resourceId !== undefined) {
      return `${this.resourceType}:${this.resourceId}`;
    }
    if (this.resourceType) {
      return this.resourceType;
    }
    return 'unknown';
  }

  public isEmptyCollection(): boolean {
    return this.errorCode === 'COLLECTION_EMPTY';
  }
}

// === ARCHIVO: src/exceptions/conflict.exception.ts ===
import { HttpException, HttpExceptionOptions } from './http.exception.js';

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflicto de datos', details?: Record<string, unknown>) {
    const options: HttpExceptionOptions = {
      message,
      errorCode: 'CONFLICT',
      statusCode: 409,
      details
    };
    super(options);
    this.name = 'ConflictException';
  }

  static fromDuplicateName(entityName: string, fieldValue: string): ConflictException {
    return new ConflictException(
      `El ${entityName} con '${fieldValue}' ya existe en el sistema`,
      { field: entityName.toLowerCase(), value: fieldValue }
    );
  }

  static fromBusinessRule(rule: string): ConflictException {
    return new ConflictException(
      `Violación de regla de negocio: ${rule}`,
      { rule }
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      statusCode: this.statusCode,
      error: this.errorCode,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
      ...(this.details && { details: this.details })
    };
  }
}

// === ARCHIVO: src/config/database.ts ===
import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';
import { Product } from '../models/product.model';

const databasePath = process.env.DATABASE_PATH || './database/products.db';
const databaseMode = process.env.DATABASE_MODE === 'memory' ? ':memory:' : databasePath;

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: databaseMode,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [Product],
  extra: {
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000
  }
};

export class DatabaseConfig {
  private static instance: DataSource | null = null;

  static getDataSource(): DataSource {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DataSource(dataSourceOptions);
    }
    return DatabaseConfig.instance;
  }

  static async initialize(): Promise<DataSource> {
    const dataSource = DatabaseConfig.getDataSource();
    
    if (!dataSource.isInitialized) {
      try {
        await dataSource.initialize();
        console.log('✓ Conexión a base de datos establecida correctamente');
        console.log(`  Base de datos: ${dataSourceOptions.database}`);
        console.log(`  Modo: ${dataSourceOptions.synchronize ? 'sincronización automática' : 'producción'}`);
      } catch (error) {
        console.error('✗ Error al inicializar la base de datos:', error);
        throw new Error(`Fallo en la conexión a la base de datos: ${error}`);
      }
    }
    
    return dataSource;
  }

  static async close(): Promise<void> {
    if (DatabaseConfig.instance && DatabaseConfig.instance.isInitialized) {
      await DatabaseConfig.instance.destroy();
      DatabaseConfig.instance = null;
      console.log('✓ Conexión a base de datos cerrada correctamente');
    }
  }

  static isInitialized(): boolean {
    return DatabaseConfig.instance?.isInitialized ?? false;
  }
}

export async function createDatabaseConnection(): Promise<DataSource> {
  return DatabaseConfig.initialize();
}

export function getRepository() {
  const dataSource = DatabaseConfig.getDataSource();
  if (!dataSource.isInitialized) {
    throw new Error('La base de datos no está inicializada. Llame a initialize() primero.');
  }
  return dataSource.getRepository(Product);
}

export const AppDataSource: DataSource = DatabaseConfig.getDataSource();

// === ARCHIVO: src/main.ts ===
import 'reflect-metadata';
import { DatabaseConfig } from './config/database';
import { app } from './app';

const PORT = process.env.PORT || 3000;

async function bootstrap(): Promise<void> {
  try {
    console.log('[BOOTSTRAP] Iniciando configuración de base de datos...');
    await DatabaseConfig.initialize();
    console.log('[BOOTSTRAP] Base de datos inicializada correctamente');

    app.listen(PORT, () => {
      console.log(`[SERVER] Servidor iniciado en http://localhost:${PORT}`);
      console.log(`[SERVER] Endpoints disponibles:`);
      console.log(`  GET    /api/products`);
      console.log(`  GET    /api/products/:id`);
      console.log(`  POST   /api/products`);
      console.log(`  PUT    /api/products/:id`);
      console.log(`  DELETE /api/products/:id`);
    });
  } catch (error) {
    console.error('[BOOTSTRAP] Error fatal al iniciar la aplicación:', error);
    process.exit(1);
  }
}

bootstrap();

process.on('SIGTERM', async () => {
  console.log('[SHUTDOWN] Señal SIGTERM recibida, cerrando conexiones...');
  await DatabaseConfig.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('[SHUTDOWN] Señal SIGINT recibida, cerrando conexiones...');
  await DatabaseConfig.close();
  process.exit(0);
});

// === ARCHIVO: src/app.ts ===
import express, { Request, Response, NextFunction, Application } from 'express';
import { productsRouter } from './routes/products';
import { errorMiddleware } from './middlewares/error.middleware';

export const app: Application = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/products', productsRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Ruta no encontrada',
    error: 'Not Found',
    timestamp: new Date().toISOString(),
    path: _req.path
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorMiddleware(err, _req, res);
});

export default app;

// === ARCHIVO: tests/products.controller.spec.ts ===
import { Request, Response, NextFunction } from 'express';
import { ProductsController } from '../src/controllers/products.controller';
import { ProductsService } from '../src/services/products.service';
import { Product } from '../src/models/product.model';
import { NotFoundException } from '../src/exceptions/not-found.exception';
import { BadRequestException } from '../src/exceptions/bad-request.exception';
import { ConflictException } from '../src/exceptions/conflict.exception';

interface CreateProductDTO {
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface UpdateProductDTO {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockService: jest.Mocked<ProductsService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    stock: 10,
    category: 'Electronics'
  };

  beforeEach(() => {
    mockService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn()
    } as any;

    controller = new ProductsController();
    (controller as any).productsService = mockService;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    mockNext = jest.fn();
  });

  describe('getAllProducts', () => {
    it('debe retornar todos los productos cuando existen', async () => {
      const products: Product[] = [mockProduct];
      mockService.getAllProducts.mockResolvedValue(products);
      mockRequest = {};

      await controller.getAllProducts(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.getAllProducts).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(products);
    });

    it('debe retornar array vacio cuando no hay productos', async () => {
      mockService.getAllProducts.mockResolvedValue([]);
      mockRequest = {};

      await controller.getAllProducts(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    it('debe llamar next con error cuando el servicio falla', async () => {
      const error = new Error('Database error');
      mockService.getAllProducts.mockRejectedValue(error);
      mockRequest = {};

      await controller.getAllProducts(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getProductById', () => {
    it('debe retornar producto cuando existe', async () => {
      mockService.getProductById.mockResolvedValue(mockProduct);
      mockRequest = { params: { id: '1' } };

      await controller.getProductById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.getProductById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
    });

    it('debe llamar next con NotFoundException cuando no existe', async () => {
      mockService.getProductById.mockResolvedValue(null);
      mockRequest = { params: { id: '999' } };

      await controller.getProductById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundException));
    });

    it('debe llamar next con BadRequestException cuando id es invalido', async () => {
      mockRequest = { params: { id: 'invalid' } };

      await controller.getProductById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(BadRequestException));
      expect(mockService.getProductById).not.toHaveBeenCalled();
    });
  });

  describe('createProduct', () => {
    it('debe crear producto cuando los datos son validos', async () => {
      const createDto: CreateProductDTO = {
        name: 'New Product',
        price: 49.99,
        stock: 5,
        category: 'Books'
      };
      mockService.createProduct.mockResolvedValue({ id: 2, ...createDto });
      mockRequest = { body: createDto };

      await controller.createProduct(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.createProduct).toHaveBeenCalledWith(createDto);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('debe llamar next con ConflictException cuando el nombre ya existe', async () => {
      const createDto: CreateProductDTO = {
        name: 'Existing Product',
        price: 49.99,
        stock: 5,
        category: 'Books'
      };
      mockService.createProduct.mockRejectedValue(
        new ConflictException('Product with this name already exists')
      );
      mockRequest = { body: createDto };

      await controller.createProduct(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ConflictException));
    });
  });

  describe('updateProduct', () => {
    it('debe actualizar producto cuando existe', async () => {
      const updateDto: UpdateProductDTO = { price: 79.99 };
      const updatedProduct = { ...mockProduct, price: 79.99 };
      mockService.updateProduct.mockResolvedValue(updatedProduct);
      mockRequest = { params: { id: '1' }, body: updateDto };

      await controller.updateProduct(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.updateProduct).toHaveBeenCalledWith(1, updateDto);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedProduct);
    });

    it('debe llamar next con NotFoundException cuando producto no existe', async () => {
      mockService.updateProduct.mockResolvedValue(null);
      mockRequest = { params: { id: '999' }, body: { price: 79.99 } };

      await controller.updateProduct(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundException));
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar producto cuando existe', async () => {
      mockService.deleteProduct.mockResolvedValue();
      mockRequest = { params: { id: '1' } };

      await controller.deleteProduct(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.deleteProduct).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it('debe llamar next con NotFoundException cuando producto no existe', async () => {
      mockService.deleteProduct.mockRejectedValue(
        new NotFoundException('Product not found')
      );
      mockRequest = { params: { id: '999' } };

      await controller.deleteProduct(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundException));
    });
  });
});

// === ARCHIVO: tests/products.service.spec.ts ===
import { ProductsService } from '../src/services/products.service';
import { ProductsRepository } from '../src/repositories/products.repository';
import { Product } from '../src/models/product.model';
import { NotFoundException } from '../src/exceptions/not-found.exception';
import { ConflictException } from '../src/exceptions/conflict.exception';
import { BadRequestException } from '../src/exceptions/bad-request.exception';
import { DataSource } from 'typeorm';

interface CreateProductDTO {
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface UpdateProductDTO {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

describe('ProductsService', () => {
  let service: ProductsService;
  let mockRepository: jest.Mocked<ProductsRepository>;
  let mockDataSource: jest.Mocked<DataSource>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    stock: 10,
    category: 'Electronics'
  };

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as any;

    mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockRepository)
    } as any;

    service = new ProductsService(mockDataSource as DataSource);
    (service as any).productsRepository = mockRepository;
  });

  describe('getAllProducts', () => {
    it('debe retornar todos los productos del repositorio', async () => {
      const products: Product[] = [mockProduct];
      mockRepository.findAll.mockResolvedValue(products);

      const result = await service.getAllProducts();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(products);
    });

    it('debe retornar array vacio cuando no hay productos', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await service.getAllProducts();

      expect(result).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('debe retornar producto cuando existe', async () => {
      mockRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.getProductById(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it('debe lanzar NotFoundException cuando producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getProductById(999)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar BadRequestException cuando id es invalido', async () => {
      await expect(service.getProductById(0)).rejects.toThrow(BadRequestException);
    });
  });

  describe('createProduct', () => {
    const validDto: CreateProductDTO = {
      name: 'New Product',
      price: 49.99,
      stock: 5,
      category: 'Books'
    };

    it('debe crear producto cuando los datos son validos', async () => {
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ id: 2, ...validDto });

      const result = await service.createProduct(validDto);

      expect(mockRepository.findByName).toHaveBeenCalledWith(validDto.name);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(result.name).toBe(validDto.name);
    });

    it('debe lanzar ConflictException cuando el nombre ya existe', async () => {
      mockRepository.findByName.mockResolvedValue(mockProduct);

      await expect(service.createProduct(validDto)).rejects.toThrow(ConflictException);
    });

    it('debe lanzar BadRequestException cuando el precio es negativo', async () => {
      const invalidDto = { ...validDto, price: -10 };

      await expect(service.createProduct(invalidDto)).rejects.toThrow(BadRequestException);
    });

    it('debe lanzar BadRequestException cuando el stock es negativo', async () => {
      const invalidDto = { ...validDto, stock: -5 };

      await expect(service.createProduct(invalidDto)).rejects.toThrow(BadRequestException);
    });

    it('debe lanzar BadRequestException cuando el nombre esta vacio', async () => {
      const invalidDto = { ...validDto, name: '' };

      await expect(service.createProduct(invalidDto)).rejects.toThrow(BadRequestException);
    });

    it('debe lanzar BadRequestException cuando la categoria es invalida', async () => {
      const invalidDto = { ...validDto, category: 'InvalidCategory' };

      await expect(service.createProduct(invalidDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateProduct', () => {
    const updateDto: UpdateProductDTO = { price: 79.99 };

    it('debe actualizar producto cuando existe', async () => {
      const updatedProduct = { ...mockProduct, price: 79.99 };
      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.update.mockResolvedValue(updatedProduct);

      const result = await service.updateProduct(1, updateDto);

      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(result?.price).toBe(79.99);
    });

    it('debe lanzar NotFoundException cuando producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.updateProduct(999, updateDto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ConflictException cuando el nuevo nombre ya existe', async () => {
      const existingProduct = { ...mockProduct, id: 2, name: 'Existing' };
      const updateWithName = { name: 'Existing' };
      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.findByName.mockResolvedValue(existingProduct);

      await expect(service.updateProduct(1, updateWithName)).rejects.toThrow(ConflictException);
    });

    it('debe lanzar BadRequestException cuando el precio es negativo', async () => {
      mockRepository.findById.mockResolvedValue(mockProduct);
      const invalidDto = { price: -10 };

      await expect(service.updateProduct(1, invalidDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar producto cuando existe', async () => {
      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.delete.mockResolvedValue();

      await service.deleteProduct(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException cuando producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.deleteProduct(999)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar BadRequestException cuando id es invalido', async () => {
      await expect(service.deleteProduct(0)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateCreateProductDTO', () => {
    it('no debe lanzar cuando el DTO es valido', () => {
      const validDto: CreateProductDTO = {
        name: 'Valid Product',
        price: 10,
        stock: 5,
        category: 'Electronics'
      };

      expect(() => (service as any).validateCreateProductDTO(validDto)).not.toThrow();
    });
  });
});

// === ARCHIVO: tests/products.repository.spec.ts ===
import { ProductsRepository, IProductsRepository } from '../src/repositories/products.repository';
import { Product } from '../src/models/product.model';
import { DataSource, Repository } from 'typeorm';

describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let mockDataSource: jest.Mocked<DataSource>;
  let mockTypeormRepository: jest.Mocked<Repository<Product>>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    stock: 10,
    category: 'Electronics'
  };

  beforeEach(() => {
    mockTypeormRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      create: jest.fn()
    } as any;

    mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockTypeormRepository)
    } as any;

    repository = new ProductsRepository(mockDataSource as DataSource);
  });

  describe('findAll', () => {
    it('debe retornar todos los productos', async () => {
      const products: Product[] = [mockProduct];
      mockTypeormRepository.find.mockResolvedValue(products);

      const result = await repository.findAll();

      expect(mockTypeormRepository.find).toHaveBeenCalled();
      expect(result).toEqual(products);
    });

    it('debe retornar array vacio cuando no hay productos', async () => {
      mockTypeormRepository.find.mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe retornar producto cuando existe', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(mockProduct);

      const result = await repository.findById(1);

      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockProduct);
    });

    it('debe retornar null cuando el producto no existe', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(null);

      const result = await repository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('findByName', () => {
    it('debe retornar producto cuando el nombre existe', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(mockProduct);

      const result = await repository.findByName('Test Product');

      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({ where: { name: 'Test Product' } });
      expect(result).toEqual(mockProduct);
    });

    it('debe retornar null cuando el nombre no existe', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(null);

      const result = await repository.findByName('NonExistent');

      expect(result).toBeNull();
    });

    it('debe ser case sensitive en la busqueda', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(null);

      await repository.findByName('test product');

      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({ where: { name: 'test product' } });
    });
  });

  describe('create', () => {
    it('debe crear y guardar un nuevo producto', async () => {
      const newProduct: Product = {
        id: 0,
        name: 'New Product',
        price: 49.99,
        stock: 5,
        category: 'Books'
      };
      const savedProduct = { ...newProduct, id: 2 };

      mockTypeormRepository.create.mockReturnValue(newProduct);
      mockTypeormRepository.save.mockResolvedValue(savedProduct);

      const result = await repository.create(newProduct);

      expect(mockTypeormRepository.create).toHaveBeenCalledWith(newProduct);
      expect(mockTypeormRepository.save).toHaveBeenCalledWith(newProduct);
      expect(result).toEqual(savedProduct);
    });

    it('debe generar id automaticamente', async () => {
      const newProduct: Product = {
        id: 0,
        name: 'New Product',
        price: 49.99,
        stock: 5,
        category: 'Books'
      };
      const savedProduct = { ...newProduct, id: 1 };

      mockTypeormRepository.create.mockReturnValue(newProduct);
      mockTypeormRepository.save.mockResolvedValue(savedProduct);

      const result = await repository.create(newProduct);

      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('debe actualizar producto existente', async () => {
      const updateData: Partial<Product> = { price: 79.99, stock: 15 };
      const updatedProduct = { ...mockProduct, ...updateData };

      mockTypeormRepository.findOne.mockResolvedValue(mockProduct);
      mockTypeormRepository.save.mockResolvedValue(updatedProduct);

      const result = await repository.update(1, updateData);

      expect(mockTypeormRepository.save).toHaveBeenCalled();
      expect(result?.price).toBe(79.99);
      expect(result?.stock).toBe(15);
    });

    it('debe retornar null cuando el producto no existe', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(null);

      const result = await repository.update(999, { price: 79.99 });

      expect(result).toBeNull();
    });

    it('debe preservar campos no actualizados', async () => {
      const updateData: Partial<Product> = { price: 79.99 };

      mockTypeormRepository.findOne.mockResolvedValue(mockProduct);
      mockTypeormRepository.save.mockResolvedValue({ ...mockProduct, ...updateData });

      await repository.update(1, updateData);

      const savedProduct = mockTypeormRepository.save.mock.calls[0][0];
      expect(savedProduct.name).toBe(mockProduct.name);
      expect(savedProduct.category).toBe(mockProduct.category);
    });
  });

  describe('delete', () => {
    it('debe eliminar producto existente', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(mockProduct);
      mockTypeormRepository.remove.mockResolvedValue(mockProduct);

      await repository.delete(1);

      expect(mockTypeormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockTypeormRepository.remove).toHaveBeenCalledWith(mockProduct);
    });

    it('debe lanzar error cuando el producto no existe', async () => {
      mockTypeormRepository.findOne.mockResolvedValue(null);

      await expect(repository.delete(999)).rejects.toThrow();
    });
  });

  describe('interface compliance', () => {
    it('debe implementar IProductsRepository', () => {
      expect(repository).toBeDefined();
      expect(typeof repository.findAll).toBe('function');
      expect(typeof repository.findById).toBe('function');
      expect(typeof repository.findByName).toBe('function');
      expect(typeof repository.create).toBe('function');
      expect(typeof repository.update).toBe('function');
      expect(typeof repository.delete).toBe('function');
    });
  });
});

// === ARCHIVO: src/config/logger.js ===
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] ?? LOG_LEVELS.INFO;

function formatMessage(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length > 0 ? ' ' + JSON.stringify(meta) : '';
  return `[${timestamp}] [${level}] ${message}${metaStr}`;
}

function log(levelName, levelValue, message, meta) {
  if (levelValue <= currentLevel) {
    const formatted = formatMessage(levelName, message, meta);
    if (levelValue === LOG_LEVELS.ERROR) {
      console.error(formatted);
    } else if (levelValue === LOG_LEVELS.WARN) {
      console.warn(formatted);
    } else if (levelValue === LOG_LEVELS.INFO) {
      console.log(formatted);
    } else {
      console.log(formatted);
    }
  }
}

export const logger = {
  error: (message, meta) => log('ERROR', LOG_LEVELS.ERROR, message, meta),
  warn: (message, meta) => log('WARN', LOG_LEVELS.WARN, message, meta),
  info: (message, meta) => log('INFO', LOG_LEVELS.INFO, message, meta),
  debug: (message, meta) => log('DEBUG', LOG_LEVELS.DEBUG, message, meta)
};
```
