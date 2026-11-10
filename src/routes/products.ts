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