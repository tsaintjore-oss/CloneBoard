/**
 * Make logo background transparent using Canvas (no extra deps).
 * Reads PNG, draws to canvas, makes dark pixels transparent, exports PNG.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const srcPath = path.join(projectRoot, 'public', 'logo-cloneboard.png');
const outPath = path.join(projectRoot, 'public', 'logo-cloneboard.png');

// Node 18+ has native ImageDecoder or we use sharp/canvas. Node doesn't have Image by default.
// Use dynamic import of 'sharp' if available, else fallback to manual buffer parsing.
async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (_) {
    console.error('Install sharp for image processing: npm install sharp');
    process.exit(1);
  }

  const image = sharp(srcPath);
  const meta = await image.metadata();
  const { data } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = meta;
  const threshold = 80; // Pixels darker than this become transparent

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = channels === 4 ? data[i + 3] : 255;
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + (channels === 4 ? 3 : 3)] = 0; // alpha = 0
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outPath);
  console.log('Done: public/logo-cloneboard.png (transparent background)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
