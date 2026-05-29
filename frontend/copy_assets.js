const fs = require('fs');
const path = require('path');

// Target directories
const srcDir = path.resolve(__dirname, '../Stich generated ui/Final Design');
const destDirSrc = path.resolve(__dirname, 'src/public');
const destDirRoot = path.resolve(__dirname, 'public');

[destDirSrc, destDirRoot].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Scanning directories in:', srcDir);

if (!fs.existsSync(srcDir)) {
  console.error('Error: Source directory does not exist at ' + srcDir);
  process.exit(1);
}

const folders = fs.readdirSync(srcDir);
let copyCount = 0;

folders.forEach(folder => {
  const folderPath = path.join(srcDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    // Identify image folders
    if (folder.startsWith('img_') || folder.startsWith('snapchat_') || folder.includes('.jpg')) {
      const screenPng = path.join(folderPath, 'screen.png');
      if (fs.existsSync(screenPng)) {
        // Normalize extension: e.g., img_20260516_wa0022.jpg_1 -> img_20260516_wa0022_1.jpg
        let destFileName = folder;
        if (folder.includes('.jpg_')) {
          destFileName = folder.replace('.jpg_', '_') + '.jpg';
        } else if (!folder.endsWith('.jpg')) {
          destFileName = folder + '.jpg';
        }
        
        // Copy to src/public
        const destPathSrc = path.join(destDirSrc, destFileName);
        fs.copyFileSync(screenPng, destPathSrc);
        
        // Copy to public in root
        const destPathRoot = path.join(destDirRoot, destFileName);
        fs.copyFileSync(screenPng, destPathRoot);
        
        // If this is the home page cinematic photo, copy it as Home.jpg too
        if (destFileName === 'img_20260421_wa0057.jpg') {
          fs.copyFileSync(screenPng, path.join(destDirSrc, 'Home.jpg'));
          fs.copyFileSync(screenPng, path.join(destDirRoot, 'Home.jpg'));
          console.log('Copied special Home backdrop: img_20260421_wa0057.jpg -> Home.jpg');
        }
        
        console.log(`Copied: ${folder}/screen.png -> src/public/${destFileName} and public/${destFileName}`);
        copyCount++;
      }
    }
  }
});

console.log(`\nSuccessfully copied and normalized ${copyCount} assets to both public folders!`);
