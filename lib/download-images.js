import fs from 'fs';
import sharp from 'sharp';

global.fetch = require("node-fetch");

const downloadImages = async () => {
  const base = './data/records';
  const dir = await fs.promises.opendir(base);
  let cnt = 0;
  for await (const entry of dir) {
    const rec = JSON.parse(fs.readFileSync(`${base}/${entry.name}`));
    const image = rec?.images[0];
    const imageFile = `./data/images/${rec.id}.jpg`;
    const thumbFile = `./data/thumb/${rec.id}.jpg`;

    if (image) {
      if (!fs.existsSync(imageFile)) {
        const imageUrl = `https://api.finna.fi${image}`;
        console.log(`Download: ${imageUrl}`);

        const response = await fetch(imageUrl);
        const buffer = await response.buffer();
        fs.writeFileSync(imageFile, buffer);
      }
      if (!fs.existsSync(thumbFile)) {
        console.log(`resize thumbnail: ${thumbFile}`);
        const imageData = fs.readFileSync(imageFile);
        await sharp(imageData)
          .resize(300)
          .toFile(thumbFile);
      }
    }
    cnt++;
    if (cnt > 3) {
      //break;
    }

    if ((cnt % 10) === 0) {
      console.log(cnt);
    }
  }
};

downloadImages();
