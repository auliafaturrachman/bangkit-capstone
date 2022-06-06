const fs = require('fs');
const path = require('path');

const simList = () => {
  const dirPath = path.join(__dirname, 'list-dir.txt');
  const filePath = path.join(__dirname, 'list.txt');
  const arrDir = fs.readFileSync(dirPath).toString().split('\n');
  const arrFile = fs.readFileSync(filePath).toString().split('\n');

  let arrDirFile = [];

  for (i in arrDir) {
    for (j in arrFile) {
      arrDirFile.push(arrDir[i] + arrFile[j]);
    }
  }

  const newFilePath = path.join(__dirname, 'list-modified.txt');
  const newFile = fs.createWriteStream(newFilePath);
  newFile.on('error', function(err) { console.log(err)});
  for (i in arrDirFile) {
    newFile.write(`${arrDirFile[i]}\n`);
  }
  newFile.end();
}


module.exports = simList; 