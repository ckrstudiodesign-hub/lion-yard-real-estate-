const fs = require('fs');
let code = fs.readFileSync('src/data/properties.ts', 'utf8');

// Unset all featured
code = code.replace(/featured: true/g, 'featured: false');

// Set exactly 4 new properties to featured: true
const toFeature = [
  'Palm Central Private Residences',
  'Mercedes-Benz Places',
  'Azizi Venice',
  'Sobha Central'
];

for (const name of toFeature) {
  const regex = new RegExp('title: "' + name + '",([\\s\\S]*?)featured: false');
  code = code.replace(regex, 'title: "' + name + '",$1featured: true');
}

fs.writeFileSync('src/data/properties.ts', code);
console.log('Updated featured projects.');
