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