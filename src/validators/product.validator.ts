import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from 'class-validator';

export const CATEGORIES = [
  'electronics',
  'clothing',
  'food',
  'books',
  'toys',
  'home',
  'sports',
  'other'
] as const;

export type ProductCategory = typeof CATEGORIES[number];

@ValidatorConstraint({ async: false })
export class IsValidPrice implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null) {
      return true;
    }
    if (typeof value !== 'number') {
      return false;
    }
    if (value < 0) {
      return false;
    }
    if (value > 1000000) {
      return false;
    }
    const decimals = value.toString().split('.')[1];
    if (decimals && decimals.length > 2) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'El precio debe ser un número positivo con máximo 2 decimales y no mayor a 1,000,000';
  }
}

@ValidatorConstraint({ async: false })
export class IsValidStock implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null) {
      return true;
    }
    if (typeof value !== 'number') {
      return false;
    }
    if (!Number.isInteger(value)) {
      return false;
    }
    if (value < 0) {
      return false;
    }
    if (value > 100000) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'El stock debe ser un número entero no negativo menor a 100,000';
  }
}

export function IsValidPriceConstraint(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any): boolean {
          if (value === undefined || value === null) {
            return true;
          }
          if (typeof value !== 'number') {
            return false;
          }
          if (value < 0) {
            return false;
          }
          if (value > 1000000) {
            return false;
          }
          const decimals = value.toString().split('.')[1];
          if (decimals && decimals.length > 2) {
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'El precio debe ser un número positivo con máximo 2 decimales y no mayor a 1,000,000';
        }
      }
    });
  };
}

export function IsValidStockConstraint(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any): boolean {
          if (value === undefined || value === null) {
            return true;
          }
          if (typeof value !== 'number') {
            return false;
          }
          if (!Number.isInteger(value)) {
            return false;
          }
          if (value < 0) {
            return false;
          }
          if (value > 100000) {
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'El stock debe ser un número entero no negativo menor a 100,000';
        }
      }
    });
  };
}

export function IsUniqueProductName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        async validate(value: any): Promise<boolean> {
          if (!value || typeof value !== 'string') {
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'El nombre del producto ya existe en el catálogo';
        }
      }
    });
  };
}

export class CreateProductValidator {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  @IsUniqueProductName({ message: 'El nombre del producto ya existe' })
  name!: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  @IsValidPriceConstraint({ message: 'El precio debe ser válido' })
  price!: number;

  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsValidStockConstraint({ message: 'El stock debe ser válido' })
  stock!: number;

  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría es requerida' })
  @IsEnum(CATEGORIES, { message: 'Categoría inválida. Valores permitidos: electronics, clothing, food, books, toys, home, sports, other' })
  category!: string;
}

export class UpdateProductValidator {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  @IsValidPriceConstraint({ message: 'El precio debe ser válido' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsValidStockConstraint({ message: 'El stock debe ser válido' })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsEnum(CATEGORIES, { message: 'Categoría inválida. Valores permitidos: electronics, clothing, food, books, toys, home, sports, other' })
  category?: string;
}

export class ProductIdValidator {
  @IsNumber({}, { message: 'El ID debe ser un número' })
  @IsPositive({ message: 'El ID debe ser positivo' })
  id!: number;
}

export class ProductQueryValidator {
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsEnum(CATEGORIES, { message: 'Categoría inválida' })
  category?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El límite debe ser un número' })
  @IsPositive({ message: 'El límite debe ser positivo' })
  limit?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El offset debe ser un número' })
  @IsPositive({ message: 'El offset debe ser positivo' })
  offset?: number;

  @IsOptional()
  @IsString({ message: 'El orden debe ser una cadena de texto' })
  sortBy?: 'name' | 'price' | 'stock' | 'category';

  @IsOptional()
  @IsString({ message: 'La dirección del orden debe ser una cadena de texto' })
  order?: 'ASC' | 'DESC';
}