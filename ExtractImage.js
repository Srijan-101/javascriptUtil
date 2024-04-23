const AsposePdf = require('asposepdfnodejs');
const fs = require('fs');

const pdf_file = '/Users/srijankc/Desktop/CotivitiProject/output.pdf';

const claimsDir = './Claims';
if (!fs.existsSync(claimsDir)) {
    fs.mkdirSync(claimsDir);
}

AsposePdf().then(AsposePdfModule => {
    
    const json = AsposePdfModule.AsposePdfExtractImage(pdf_file, "claims{0}.png",150);
    let currentIndex = 0;

    if (json.errorCode === 0) {
        json.filesNameResult.forEach((fileName, index) => {
            
                currentIndex++;
                const newFileName = `claims${currentIndex}.png`;
                fs.renameSync(fileName, `${claimsDir}/${newFileName}`);
            
        });
    } else {
        console.error(json.errorText);
    }
});