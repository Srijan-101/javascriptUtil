const fs = require('fs');
const PDFDocument = require('pdf-lib').PDFDocument;

function writePdfBytesToFile(fileName, pdfBytes) {
    return fs.promises.writeFile(fileName, pdfBytes);
}

async function splitPdf(pathToPdf, startPage, endPage) {
    const docmentAsBytes = await fs.promises.readFile(pathToPdf);
    const pdfDoc = await PDFDocument.load(docmentAsBytes);
    const subDocument = await PDFDocument.create();
    for (let i = startPage - 1; i < endPage && i < pdfDoc.getPageCount(); i++) {
        const [copiedPage] = await subDocument.copyPages(pdfDoc, [i]);
        subDocument.addPage(copiedPage);
    }
    const pdfBytes = await subDocument.save();
    await writePdfBytesToFile(`file-${startPage}-${endPage}.pdf`, pdfBytes);
}

(async () => {
    await splitPdf("/Users/srijankc/Desktop/CotivitiProject/Building_Microservices_Designing_Fine-Grained_Systems_(2015).pdf",158,168); // Example: Split pages 3 to 6
})();


