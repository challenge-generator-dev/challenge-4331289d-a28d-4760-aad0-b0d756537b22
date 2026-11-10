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