import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as PDFKit from 'pdfkit';
import { generateCustomerInformation, generateHeader, generateInvoiceTable } from './utils/pdfUtils';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable()
export class PdfService {
  // generatePdf = (): Promise<Buffer> => {
  //   const docDefinition = {
  //     content: ['Hello, pdfmake in NestJS!'],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 0, 0, 10],
  //       },
  //       subheader: {
  //         fontSize: 16,
  //         bold: true,
  //         margin: [0, 10, 0, 5],
  //       },
  //       tableExample: {
  //         margin: [0, 5, 0, 15],
  //       },
  //       tableHeader: {
  //         bold: true,
  //         fontSize: 13,
  //         color: 'black',
  //       },
  //     },
  //   };
  //   return new Promise(async (resolve, reject) => {
  //     const pdfDoc = await pdfMake.createPdf(docDefinition);
  //     pdfDoc.getBuffer((buffer) => {
  //       resolve(buffer);
  //     });
  //   });
  // };
  // generatePdf=()
  async generatePdf(content: string, petDetails: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      let doc = new PDFKit({ bufferPages: true, size: 'A4', margin: 50 });
      const buffers: Buffer[] = [];
      generateHeader(doc);
      generateCustomerInformation(doc, petDetails);
      generateInvoiceTable(doc, petDetails)
      doc.on('data', (buffer) => {
        buffers.push(buffer);
      });

      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      doc.on('error', (error) => {
        reject(error);
      });

      doc.text(content, 100, 100);
      doc.end();
    });
  }
}
