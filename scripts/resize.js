const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const output = path.join(__dirname, '../public/imgs/thumbnails');
const originals = path.join(__dirname, '../public/imgs/full_width');

const files = fs.readdirSync(originals);
for(file of files){
  const file_name = file.split('.');
  execSync(`convert ${path.join(originals, file)} -resize 700 ${path.join(originals, file_name[0])}.${file_name[1]}`);
  execSync(`convert ${path.join(originals, file)} -resize 200 ${path.join(output, file_name[0])}_thumb.${file_name[1]}`);
}