import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@Entity()
@Unique(['name'])
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @Column({ type: 'integer' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  category!: string;

  constructor(id?: number, name?: string, price?: number, stock?: number, category?: string) {
    if (id !== undefined) this.id = id;
    if (name !== undefined) this.name = name;
    if (price !== undefined) this.price = price;
    if (stock !== undefined) this.stock = stock;
    if (category !== undefined) this.category = category;
  }
}

export class ProductDTO {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public stock: number,
    public category: string
  ) {}
}

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;

  @IsNotEmpty()
  @IsString()
  category!: string;
}

export class UpdateProductDTO {
  @IsString()
  name?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price?: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock?: number;

  @IsString()
  category?: string;
}