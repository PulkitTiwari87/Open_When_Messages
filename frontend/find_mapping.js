const fs = require('fs');
const path = require('path');

const designDir = path.resolve(__dirname, '../Stich generated ui/Final Design');

console.log('Scanning code.html files in:', designDir);

if (!fs.existsSync(designDir)) {
  console.error('Source directory does not exist!');
  process.exit(1);
}

const folders = fs.readdirSync(designDir);
const urlToFolderMap = {};

folders.forEach(folder => {
  const folderPath = path.join(designDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const codeHtmlPath = path.join(folderPath, 'code.html');
    if (fs.existsSync(codeHtmlPath)) {
      const html = fs.readFileSync(codeHtmlPath, 'utf8');
      
      // Find all Google Photos URLs in this code.html
      const regex = /https:\/\/lh3\.googleusercontent\.com\/aida-public\/[A-Za-z0-9_\-]+/g;
      let match;
      while ((match = regex.exec(html)) !== null) {
        const url = match[0];
        if (!urlToFolderMap[url]) {
          urlToFolderMap[url] = [];
        }
        if (!urlToFolderMap[url].includes(folder)) {
          urlToFolderMap[url].push(folder);
        }
      }
    }
  }
});

console.log('\n--- Found Mappings ---');
console.log(JSON.stringify(urlToFolderMap, null, 2));
