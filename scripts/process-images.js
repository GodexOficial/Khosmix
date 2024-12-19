const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'images';
const targetDir = 'src/assets/images';

// Criar diretório de destino se não existir
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const processImage = async (filename) => {
  const sourcePath = path.join(sourceDir, filename);
  const newFilename = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-\.]/g, '')
    .replace(/\.[^.]+$/, '.webp');
  const targetPath = path.join(targetDir, newFilename);

  try {
    await sharp(sourcePath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(targetPath);

    console.log(`Processed: ${filename} -> ${newFilename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
};

// Processar todas as imagens
const files = [
  'Khosmix.jpg',
  'blackhole.jpg',
  'Miniaturas prog.jpg',
  'Miniaturas Motion.jpg',
  'producer.jpg',
  'idv.jpg',
  'Miniaturas PROD.jpg',
  'Miniaturas Modelagem.jpg',
  'Miniaturas IDV.jpg',
  'Miniatura Design.jpg',
  'Blender.jpg',
  'prog.jpg'
];

Promise.all(files.map(processImage))
  .then(() => {
    // Remover diretório original e script antigo após processamento
    fs.rmSync(sourceDir, { recursive: true, force: true });
    fs.unlinkSync('script.js');
    console.log('Cleanup completed');
  })
  .catch(console.error); 