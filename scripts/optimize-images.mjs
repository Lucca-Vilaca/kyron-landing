import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

const sources = [
  { input: 'assets-src/iphone16-home.jpeg', outBase: 'public/assets/iphone16-home', maxWidth: 900 },
  { input: 'assets-src/iphone16-onboarding.jpeg', outBase: 'public/assets/iphone16-onboarding', maxWidth: 900 },
  { input: 'assets-src/iphone16-treinos.jpeg', outBase: 'public/assets/iphone16-treinos', maxWidth: 900 },
  { input: 'assets-src/iphone16-perfil.jpeg', outBase: 'public/assets/iphone16-perfil', maxWidth: 900 },
  { input: 'assets-src/kyron-logo.jpeg', outBase: 'public/assets/kyron-logo', maxWidth: 256 },
];

for (const { input, outBase, maxWidth } of sources) {
  if (!existsSync(input)) {
    console.log(`- ${input} not found, skipping`);
    continue;
  }

  const outAvif = `${outBase}.avif`;
  const outWebp = `${outBase}.webp`;
  mkdirSync(dirname(resolve(outAvif)), { recursive: true });

  const pipeline = sharp(input).resize({ width: maxWidth, withoutEnlargement: true });

  await pipeline.clone().avif({ quality: 60, effort: 6 }).toFile(outAvif);
  await pipeline.clone().webp({ quality: 78 }).toFile(outWebp);

  console.log(`✓ ${input} → ${outAvif} + ${outWebp}`);
}
