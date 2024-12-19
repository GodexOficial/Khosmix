const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "src/assets/images";
const outputDir = "public/images";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach((file) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  sharp(inputPath)
    .resize(1200, 1200, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(outputPath.replace(/\.[^.]+$/, ".webp"))
    .then(() => console.log(`Optimized: ${file}`))
    .catch((err) => console.error(`Error optimizing ${file}:`, err));
}); 