import { HttpException, HttpExceptionOptions, HttpStatusCode } from './http.exception';

export interface NotFoundExceptionOptions extends HttpExceptionOptions {
  resourceType?: string;
  resourceId?: string | number;
  query?: Record<string, unknown>;
}

export class NotFoundException extends HttpException {
  public readonly resourceType?: string;
  public readonly resourceId?: string | number;
  public readonly query?: Record<string, unknown>;

  constructor(message: string = 'Resource not found', options?: NotFoundExceptionOptions) {
    super({
      message,
      statusCode: HttpStatusCode.NOT_FOUND,
      errorCode: options?.errorCode || 'NOT_FOUND',
      details: options?.details,
    });

    this.resourceType = options?.resourceType;
    this.resourceId = options?.resourceId;
    this.query = options?.query;
  }

  public static forResource(resourceType: string, resourceId: string | number): NotFoundException {
    return new NotFoundException(
      `${resourceType} with ID ${resourceId} not found`,
      {
        errorCode: 'RESOURCE_NOT_FOUND',
        resourceType,
        resourceId,
      }
    );
  }

  public static forProduct(productId: number): NotFoundException {
    return NotFoundException.forResource('Product', productId);
  }

  public static forProductByName(name: string): NotFoundException {
    return new NotFoundException(`Product with name '${name}' not found`, {
      errorCode: 'PRODUCT_NOT_FOUND_BY_NAME',
      resourceType: 'Product',
      query: { name },
    });
  }

  public static forCollection(resourceType: string): NotFoundException {
    return new NotFoundException(
      `No ${resourceType} found`,
      {
        errorCode: 'COLLECTION_EMPTY',
        resourceType,
      }
    );
  }

  public static fromQuery(resourceType: string, query: Record<string, unknown>): NotFoundException {
    return new NotFoundException(
      `${resourceType} not found for the given criteria`,
      {
        errorCode: 'RESOURCE_NOT_FOUND_BY_QUERY',
        resourceType,
        query,
      }
    );
  }

  public toJSON(): Record<string, unknown> {
    const response = super.toJSON();
    
    if (this.resourceType) {
      response.resourceType = this.resourceType;
    }
    
    if (this.resourceId !== undefined) {
      response.resourceId = this.resourceId;
    }
    
    if (this.query) {
      response.query = this.query;
    }
    
    return response;
  }

  public getResourceIdentifier(): string {
    if (this.resourceType && this.resourceId !== undefined) {
      return `${this.resourceType}:${this.resourceId}`;
    }
    if (this.resourceType) {
      return this.resourceType;
    }
    return 'unknown';
  }

  public isEmptyCollection(): boolean {
    return this.errorCode === 'COLLECTION_EMPTY';
  }
}