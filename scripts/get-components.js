const fs = require('fs');

function getComponents() {
  const componentsFiles = fs.readdirSync('./src/components');
  const components = componentsFiles
    .filter(fileName => fileName.indexOf('.') !== 0)
    .map((fileName) => {
      const ext = fileName.split('.')[1];
      const name = fileName
        .split(`.${ext}`)[0]
        .split('-')
        .map(part => part.split('').map((char, index) => (index === 0 ? char.toUpperCase() : char)).join(''))
        .join('');
      return {
        name: `f7${name}`,
        file: fileName,
      };
    });
  return components;
}

module.exports = getComponents;
