const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputImage = path.join(__dirname, '../src/assets/images/Khosmix.jpg');
const outputDir = path.join(__dirname, '../public/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach((size) => {
  sharp(inputImage)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
    .then(() => console.log(`Generated ${size}x${size} icon`))
    .catch((err) => console.error(`Error generating ${size}x${size} icon:`, err));
}); 