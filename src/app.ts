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