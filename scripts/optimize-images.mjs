import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

const IPHONE16_VIEWPORT_RATIO = 852 / 393;

const sources = [
  { input: 'iphone16-home.png', outBase: 'public/assets/iphone16-home', maxWidth: 900, cropToViewport: true },
  { input: 'iphone16-midhero.png', outBase: 'public/assets/iphone16-midhero', maxWidth: 900, cropToViewport: false },
];

for (const { input, outBase, maxWidth, cropToViewport } of sources) {
  if (!existsSync(input)) {
    console.log(`- ${input} not found, skipping`);
    continue;
  }

  const outAvif = `${outBase}.avif`;
  const outWebp = `${outBase}.webp`;
  mkdirSync(dirname(resolve(outAvif)), { recursive: true });

  let pipeline = sharp(input).resize({ width: maxWidth, withoutEnlargement: true });

  if (cropToViewport) {
    const meta = await pipeline.clone().metadata();
    const targetHeight = Math.round(meta.width * IPHONE16_VIEWPORT_RATIO);
    if (meta.height > targetHeight) {
      const buf = await pipeline.toBuffer();
      pipeline = sharp(buf).extract({ left: 0, top: 0, width: meta.width, height: targetHeight });
    }
  }

  await pipeline.clone().avif({ quality: 60, effort: 6 }).toFile(outAvif);
  await pipeline.clone().webp({ quality: 78 }).toFile(outWebp);

  console.log(`✓ ${input} → ${outAvif} + ${outWebp}`);
}
