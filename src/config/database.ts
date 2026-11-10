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