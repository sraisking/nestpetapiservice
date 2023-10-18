import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pets/dto/pet.entity';
import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

@Module({
  imports: [
    PetsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any, // "as any" is required because process.env returns string, and TypeORM expects a specific "DatabaseType"
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, // The + converts the string to a number
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      entities: [PetEntity],
      synchronize: true,
    }),
    AuthModule,
    PdfModule,
  ],
  // providers: [PdfService],
  // controllers: [PdfController],
})
export class AppModule { }
//Modules are singleton
//Providers are genrallty services injectable to our controllers
