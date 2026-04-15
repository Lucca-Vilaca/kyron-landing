import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

const sources = [
  { input: 'iphone16-home.jpeg', outBase: 'public/assets/iphone16-home' },
  { input: 'iphone16-onboarding.jpeg', outBase: 'public/assets/iphone16-onboarding' },
  { input: 'iphone16-treinos.jpeg', outBase: 'public/assets/iphone16-treinos' },
  { input: 'iphone16-perfil.jpeg', outBase: 'public/assets/iphone16-perfil' },
];

const MAX_WIDTH = 900;

for (const { input, outBase } of sources) {
  if (!existsSync(input)) {
    console.log(`- ${input} not found, skipping`);
    continue;
  }

  const outAvif = `${outBase}.avif`;
  const outWebp = `${outBase}.webp`;
  mkdirSync(dirname(resolve(outAvif)), { recursive: true });

  const pipeline = sharp(input).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  await pipeline.clone().avif({ quality: 60, effort: 6 }).toFile(outAvif);
  await pipeline.clone().webp({ quality: 78 }).toFile(outWebp);

  console.log(`✓ ${input} → ${outAvif} + ${outWebp}`);
}
