const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

async function removeHeaderFooter(inputPath, outputPath, cropTop, cropBottom) {
    // Read the PDF file
    const pdfBytes = await fs.readFile(inputPath);

    // Load the PDF
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pageCount = pdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();

        // Calculate the new dimensions after cropping header and footer
        const newWidth = width;
        const newHeight = height - cropTop - cropBottom;

        // Set the crop box to remove header and footer
        page.setCropBox(0, cropBottom, newWidth, newHeight);
    }

    // Save the modified PDF to a new file
    const modifiedPdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, modifiedPdfBytes);

    console.log('Header and footer removed. Modified PDF saved to:', outputPath);
}

// Example usage: remove 50 units from the top and 50 units from the bottom (adjust as needed)
const inputPath = '/Users/srijankc/Desktop/CotivitiProject/new.pdf';
const outputPath = 'output.pdf';
const cropTop = 40;    // Adjust this value as needed
const cropBottom = 55; // Adjust this value as needed
removeHeaderFooter(inputPath, outputPath, cropTop, cropBottom).catch(error => console.error(error));
