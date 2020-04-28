import fse from 'fs-extra';
import path from 'path';
import { AsciiGenerator } from './core/ascii/ascii-generator';
import { AsciiOptions } from './core/ascii/ascii-options';
import { AsciiPixel } from './core/modifiers/ascii-pixel';
import { AsciiHtml } from './core/modifiers/ascii-html';

const image = fse.readFileSync(path.resolve(__dirname, 'test.jpg'));

const options = new AsciiOptions();
// options.setSize({ width: 100, height: 100 });
options.setPreserveAspectRatio(true);

const outputModifier = new AsciiPixel();
// const outputModifier = new AsciiHtml();
outputModifier.setGap(1);
outputModifier.setColorMode('monochromatic');

const ascii = new AsciiGenerator(image, options, outputModifier);

ascii
  .generate(true)
  .then(({ data, style }) => {
    const html = `
    <html>
      <head>
        <style>
          ${style}
        </style>
      </head>
      <body>
        ${data}
      </body>
    </html>
  `;
    require('fs-extra').writeFileSync('so.html', html);
  })
  .catch((e) => console.error(e));
