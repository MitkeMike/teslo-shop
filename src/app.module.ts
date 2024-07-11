import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //Change the entities
      synchronize: true, // Don't use this in production
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
    }),

    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
