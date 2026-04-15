import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const sources = [
  { input: 'iphone16-home.png', outBase: 'public/assets/iphone16-home', maxWidth: 900 },
  { input: 'iphone16-midhero.png', outBase: 'public/assets/iphone16-midhero', maxWidth: 900 },
];

for (const { input, outBase, maxWidth } of sources) {
  const outAvif = `${outBase}.avif`;
  const outWebp = `${outBase}.webp`;
  mkdirSync(dirname(resolve(outAvif)), { recursive: true });

  const pipeline = sharp(input).resize({ width: maxWidth, withoutEnlargement: true });

  await pipeline.clone().avif({ quality: 60, effort: 6 }).toFile(outAvif);
  await pipeline.clone().webp({ quality: 78 }).toFile(outWebp);

  console.log(`✓ ${input} → ${outAvif} + ${outWebp}`);
}
