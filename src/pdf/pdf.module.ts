import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { PetsModule } from 'src/pets/pets.module';

@Module({
    imports: [PetsModule],
    providers: [PdfService],
    controllers: [PdfController],
})
export class PdfModule { }
