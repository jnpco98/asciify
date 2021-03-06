import sharp from 'sharp';
import { minify, Options as MinifyOptions } from 'html-minifier';
import { AsciiOptions } from './ascii-options';
import {
  AsciiOutputModifier,
  AsciiOutputModifierApplyParams,
  AsciiOutputModifierResult,
} from './modifiers/ascii-output-modifier';
import { AsciiText } from './modifiers/ascii-text';

export class AsciiGenerator {
  private image: Buffer;

  private asciiOptions: AsciiOptions;
  private outputModifier: AsciiOutputModifier;

  private minifySettings: MinifyOptions;

  public constructor(
    image: Buffer,
    asciiOptions: AsciiOptions,
    outputModifier?: AsciiOutputModifier
  ) {
    this.minifySettings = {
      minifyCSS: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeTagWhitespace: true,
    };
    this.setImage(image);
    this.setAsciiOptions(asciiOptions);
    this.setOutputModifier(outputModifier || new AsciiText());
  }

  public async generate(minifyHtml: boolean = true): Promise<AsciiOutputModifierResult> {
    const asciiImageData = await this.getAsciiImageData();
    const characterRamp = this.asciiOptions.getInverted()
      ? this.asciiOptions.getCharacterRamp().split('').reverse().join('')
      : this.asciiOptions.getCharacterRamp();
    const output = this.getOutputModifier().apply(asciiImageData, characterRamp);

    return {
      style:
        this.getOutputModifier().modifierAllowsMinify() && minifyHtml
          ? minify(output.style || '', this.minifySettings)
          : output.style,
      ascii:
        this.getOutputModifier().modifierAllowsMinify() &&
        minifyHtml &&
        typeof output.ascii === 'string'
          ? minify(output.ascii, this.minifySettings)
          : output.ascii,
    };
  }

  private async getAsciiImageData(): Promise<AsciiOutputModifierApplyParams> {
    const { width, height } = this.asciiOptions.getSize();
    const contrast = this.asciiOptions.getContrast();
    const background = AsciiOptions.COLOR_SET.DARK;

    const { data, info } = await sharp(this.image)
      .resize(width, height, {
        fit: this.asciiOptions.getPreserveAspectRatio() ? sharp.fit.inside : sharp.fit.fill,
      })
      .linear(contrast, -(128 * contrast) + 128)
      .flatten({ background })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const luminance = [];
    const colors = [];

    for (let i = 0; i < data.length; i += 4) {
      const color = 0.21 * data[i] + 0.71 * data[i + 1] + 0.07 * data[i + 2];
      const alpha = data[i + 3] / 255;
      luminance.push(color * alpha);
      colors.push({ r: data[i], g: data[i + 1], b: data[i + 2], a: alpha });
    }

    return { luminance, info, colors };
  }

  public setImage(image: Buffer): void {
    this.image = image;
  }

  public getImage(): Buffer {
    return this.image;
  }

  public setAsciiOptions(asciiOptions: AsciiOptions): void {
    this.asciiOptions = asciiOptions;
  }

  public getAsciiOptions(): AsciiOptions {
    return this.asciiOptions;
  }

  public setOutputModifier(outputModifier: AsciiOutputModifier): void {
    this.outputModifier = outputModifier;
  }

  public getOutputModifier(): AsciiOutputModifier {
    return this.outputModifier;
  }
}
