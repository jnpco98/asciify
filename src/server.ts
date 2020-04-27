import { AsciiGenerator, AsciiOptions, AsciiText, AsciiHtml, AsciiPixel } from "./core/ascii/ascii-generator";
import fse from 'fs-extra';
import path from 'path';

const image = fse.readFileSync(path.resolve(__dirname, 'test.png'));
const options = new AsciiOptions(AsciiOptions.DEFAULT_CHARACTER_RAMP, { width: 100, height: 100 }, true);

// const outputModifier = new AsciiPixel();
const outputModifier = new AsciiHtml(AsciiOptions.DEFAULT_CHARACTER_RAMP);

const ascii = new AsciiGenerator(image, options, outputModifier);
ascii.generate();