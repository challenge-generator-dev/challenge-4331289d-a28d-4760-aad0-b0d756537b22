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