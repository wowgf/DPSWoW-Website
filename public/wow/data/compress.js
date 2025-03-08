const fs = require('fs');
const path = require('path');

// Function to compress JSON files
function compressJSONFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directory, file);
      if (path.extname(file) === '.json') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading file:', err);
            return;
          }

          try {
            const jsonData = JSON.parse(data);
            const compressedData = JSON.stringify(jsonData);
            fs.writeFile(filePath, compressedData, 'utf8', err => {
              if (err) {
                console.error('Error writing file:', err);
              } else {
                console.log(`Compressed ${file}`);
              }
            });
          } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
          }
        });
      }
    });
  });
}

// Compress JSON files in the current directory
compressJSONFiles(__dirname);