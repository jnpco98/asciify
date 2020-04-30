import sharp from 'sharp';
import { minify, Options as MinifyOptions } from 'html-minifier';
import { AsciiOptions } from './ascii-options';
import { AsciiOutputModifier } from './modifiers/ascii-output-modifier';
import { AsciiText } from './modifiers/ascii-text';

export const minifySettings: MinifyOptions = {
  minifyCSS: true,
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  removeTagWhitespace: true,
};

export class AsciiGenerator {
  private image: Buffer;

  private asciiOptions: AsciiOptions;
  private outputModifier: AsciiOutputModifier;

  public constructor(
    image: Buffer,
    asciiOptions: AsciiOptions,
    outputModifier?: AsciiOutputModifier
  ) {
    this.setImage(image);
    this.setAsciiOptions(asciiOptions);
    this.setOutputModifier(
      outputModifier || new AsciiText(this.asciiOptions.getCharRamp())
    );
  }

  public async generate(minifyHtml: boolean = true) {
    const { data, colorData, info } = await this.getImagePixels();
    const output = this.getOutputModifier().apply({ data, colorData, info });

    return {
      style:
        this.getOutputModifier().modifierAllowsMinify() && minifyHtml
          ? minify(output.style || '', minifySettings)
          : output.style,
      ascii:
        this.getOutputModifier().modifierAllowsMinify() &&
        minifyHtml &&
        typeof output.ascii === 'string'
          ? minify(output.ascii, minifySettings)
          : output.ascii,
    };
  }

  private async getImagePixels() {
    let image = this.image;
    const { width, height } = this.asciiOptions.getSize();

    const { data, info } = await sharp(image)
      .resize(width, height, {
        fit: this.asciiOptions.getPreserveAspectRatio()
          ? sharp.fit.inside
          : sharp.fit.fill,
      })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const greyscaleArr = [];
    const colorArr = [];

    for (let i = 0; i < data.length; i += 3) {
      const color = 0.21 * data[i] + 0.71 * data[i + 1] + 0.07 * data[2];
      greyscaleArr.push(color);
      colorArr.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
    }

    return { data: greyscaleArr, info, colorData: colorArr };
  }

  public setImage(image: Buffer) {
    this.image = image;
  }
  public getImage() {
    return this.image;
  }

  public setAsciiOptions(asciiOptions: AsciiOptions) {
    this.asciiOptions = asciiOptions;
  }
  public getAsciiOptions() {
    return this.asciiOptions;
  }

  public setOutputModifier(outputModifier: AsciiOutputModifier) {
    this.outputModifier = outputModifier;
  }
  public getOutputModifier() {
    return this.outputModifier;
  }
}
