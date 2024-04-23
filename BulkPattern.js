const fs = require('fs');


function replacePatternInFile(filePath, pattern, replacement) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        let matchIndex = 1;
        const replacedData = data.replace(pattern, (match) => {
            const replacedMatch = `${replacement}${matchIndex}png`;
            matchIndex++;
            return replacedMatch;
        });

        fs.writeFile(filePath, replacedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Replacement successful.');
        });
    });
}

const filePath = '/path/to/your/md/file.md';
const pattern = /\/Users\/srijankc\/Desktop\/CotivitiProject\/extracted_images/g;

replacePatternInFile(filePath, pattern, '/images/claims');
