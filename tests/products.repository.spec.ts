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