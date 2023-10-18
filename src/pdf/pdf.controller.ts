import { Controller, Get, Param, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { PetsService } from 'src/pets/pets.service';
@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly petService: PetsService,
  ) { }

  // @Get('generate')
  // generatePdf(@Res() response: Response) {
  //   try {
  //     const buffer = this.pdfService.generatePdf();
  //     console.log(buffer);

  //     response.setHeader('Content-Type', 'application/pdf');
  //     response.setHeader(
  //       'Content-Disposition',
  //       'attachment; filename=sample.pdf',
  //     );
  //     response.send(buffer);
  //   } catch (err) {
  //     console.log(err);
  //     response.status(500).send(err);
  //   }
  // }

  @Get('generate/:id')
  async generatePdf(@Param('id') id: string, @Res() response: Response) {
    const petDetails = await this.petService.getPetById(id);
    console.log(petDetails);
    const content = 'Hello NestJS PDF Generation!';
    try {
      const pdfBuffer = await this.pdfService.generatePdf(content,petDetails);

      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader(
        'Content-Disposition',
        'attachment; filename=nestjs.pdf',
      );
      response.end(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      response.status(500).send('Error generating PDF');
    }
  }
}
