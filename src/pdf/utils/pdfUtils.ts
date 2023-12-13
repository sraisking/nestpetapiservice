function generateHeader(doc) {
  console.log(__dirname);

  // const imagePath = `${__dirname}/ycf.png`;
  doc
    // .image(imagePath, 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text("Yasmin's care Foundation.", 110, 57)
    .fontSize(10)
    .text('YCF', 200, 50, { align: 'right' })
    .text('Mallikpur', 200, 65, { align: 'right' })
    .text('Sonarpur 700145', 200, 80, { align: 'right' })
    .moveDown();
}
function calculateCost(items) {
  const sum = items.reduce((acc, obj) => acc + parseInt(obj.price), 0);

  return sum;
}
function generateTableRow(doc, y, c1, c2, c3) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: 'right' });
}
function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}
function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;
  doc.font('Helvetica-Bold');
  generateTableRow(doc, invoiceTableTop, 'Item', 'Description', 'Unit Cost');
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(doc, position, item.name, item.description, item.price);
  }
}
function generateCustomerInformation(doc, invoice) {
  const amount = invoice.items?.length > 0 ? calculateCost(invoice.items) : 0;
  doc
    .text(`Invoice Number: ${invoice.id}`, 50, 200)
    .text(`Invoice Date: ${new Date()}`, 50, 215)
    .text(`Balance Due: ${amount}`, 50, 130)
    .text(`Client Name: ${invoice.name}`, 50, 200)
    .text(`Contact: ${invoice.contact}`, 50, 215)
    .text(`Pet status: ${invoice.status}`, 50, 130)
    .moveDown();
}
export { generateHeader, generateCustomerInformation, generateInvoiceTable };
