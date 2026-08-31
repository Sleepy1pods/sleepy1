import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

async function main() {
  const files = fs.readdirSync(publicDir);
  console.log('--- Image Optimization Report ---');

  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile() || !/\.(png|jpe?g)$/i.test(file)) continue;

    const initialBuffer = fs.readFileSync(filePath);
    const initialSize = initialBuffer.length;
    const meta = await sharp(initialBuffer).metadata();
    
    // Create temporary optimized buffer
    let pipeline = sharp(initialBuffer);

    // Limit maximum dimensions for web performance (max width 1280, max height 1280)
    if ((meta.width && meta.width > 1280) || (meta.height && meta.height > 1280)) {
      pipeline = pipeline.resize({
        width: meta.width > meta.height ? 1280 : undefined,
        height: meta.height >= meta.width ? 1280 : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    let optimizedBuffer;
    if (meta.format === 'png') {
      // PNG optimization with quantization & maximum compression effort
      optimizedBuffer = await pipeline
        .png({ quality: 80, compressionLevel: 9, effort: 8 })
        .toBuffer();
    } else if (meta.format === 'jpeg') {
      // JPEG optimization
      optimizedBuffer = await pipeline
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
    }

    if (optimizedBuffer && optimizedBuffer.length < initialSize) {
      fs.writeFileSync(filePath, optimizedBuffer);
      const newSize = optimizedBuffer.length;
      const savedPct = (((initialSize - newSize) / initialSize) * 100).toFixed(1);
      console.log(`Optimized ${file}: ${(initialSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${savedPct}%)`);
    } else {
      console.log(`Kept ${file}: ${(initialSize / 1024).toFixed(0)}KB (already optimal)`);
    }
  }
}

main().catch(console.error);
