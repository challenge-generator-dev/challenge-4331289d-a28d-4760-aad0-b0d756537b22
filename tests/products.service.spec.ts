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