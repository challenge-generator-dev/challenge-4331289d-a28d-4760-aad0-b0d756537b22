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