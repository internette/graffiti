const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const Vibrant = require('node-vibrant');
const originals = path.join(__dirname, '../public/imgs/full_width');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/json/images.geojson')).toString('utf8'));
const files = fs.readdirSync(originals);

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

new Promise((resolve, reject)=> {
  for(file of files){
    file = path.join(originals, file);
    const feature = data.features.map((data_obj, index)=>{ if( new RegExp(file, 'i').test(data_obj.properties.name)) return { obj: data_obj, index: index} }).filter(function(data_obj){ if(data_obj) return data_obj})[0];
  
    Vibrant.from(file).getPalette((err, palette) => {
      feature.obj.properties['primary-color'] = rgbToHex(palette.Vibrant._rgb[0], palette.Vibrant._rgb[1], palette.Vibrant._rgb[2]);
      data.features[feature.index] = feature.obj;
      if(feature.index === (data.features.length - 1)){
        resolve(data);
      }
    });
  }
}).then((json_data)=> {
  fs.writeFileSync(path.join(__dirname, '../public/json/images.geojson'), JSON.stringify(json_data));
});