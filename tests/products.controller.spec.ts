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