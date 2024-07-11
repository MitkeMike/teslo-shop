import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  // Create a logger instance for the ProductsService class to log any errors
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {

    try {
      // Create a new product
      const product = this.productRepository.create(createProductDto);
      // Save the product to the database
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.hanldeDBException(error);
    }

  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private hanldeDBException(error: any) {
    if (error.code === '23505') 
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check the logs for more information');
  }
}
