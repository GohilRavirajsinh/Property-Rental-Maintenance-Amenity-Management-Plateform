const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Pattern to match template literals `http://localhost:5000/api...`
    const regex = /`http:\/\/localhost:5000\/api([^`]*)`/g;
    
    let newContent = content.replace(regex, '`${import.meta.env.VITE_API_URL || \'http://localhost:5000\'}/api$1`');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Updated ' + filePath);
    }
  }
});
