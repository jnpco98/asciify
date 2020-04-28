import sharp from 'sharp';
import { minify, Options as MinifyOptions } from 'html-minifier';
import escapeHtml from 'escape-html';

const minifySettings: MinifyOptions = {
  minifyCSS: true,
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  removeTagWhitespace: true
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface AsciiOutputModifierApplyParams {
  data: number[];
  colorData: Color[];
  info: sharp.OutputInfo;
}

export interface AsciiOutputModifier {
  apply(params: AsciiOutputModifierApplyParams): { styles: string; data: string; };
  modifierAllowsMinify(): boolean;
}

export class AsciiText implements AsciiOutputModifier {
  protected charRamp: string[];

  constructor(charRamp: string[]) {
    this.charRamp = charRamp;
  }

  protected getColorCharacter(color: number) {
    return this.charRamp[Math.ceil(((this.charRamp.length - 1) * color) / 255)];
  }

  public apply(params: AsciiOutputModifierApplyParams) {
    const { data, info } = params;
    const content = data.reduce((ascii, color, idx) => `${ascii}${this.getColorCharacter(color)}${(idx + 1) % info.width === 0 ? '\n' : ''}`, '');
    return { styles: '', data: content };
  }

  public modifierAllowsMinify() { return false; }
}

interface StyleSheetProperty { 
  [key: string]: string | number;
} 

interface StyleSheet { 
  [key: string]: StyleSheetProperty;
}

export class AsciiHtml extends AsciiText {
  protected styleSheet: StyleSheet;
  protected containerClass: string;
  protected rowClass: string;
  protected elementClass: string;

  protected monochromatic: boolean;
  
  public constructor(charRamp: string[], monochromatic?: boolean) {
    super(charRamp);

    this.setStyleSheet({
      ['ascii span']: {
        width: '1rem',
        height: '1rem',
        display: 'inline-block',
        ['box-sizing']: 'border-box',
        ['font-family']: 'sans-serif',
        ['text-align']: 'center',
        ['margin-right']: '1px'
      },
      ['ascii__row']: {
        display: 'flex',
        ['box-sizing']: 'border-box',
        ['margin-bottom']: '1px'
      }
    });

    this.setContainerClass("ascii")
    this.setRowClass("ascii__row")
    this.setElementClass("ascii__row-item")
    this.setMonochromatic(monochromatic);
  }
  
  public apply(params: AsciiOutputModifierApplyParams) {
    const { data, colorData, info } = params;
    const colorMap: StyleSheet = {};

    const html = `
      <div class="${this.getContainerClass()}">
        <div class="${this.getRowClass()}">
          ${data.reduce((ascii, color, idx) => {
            let { r, g, b } = { ...colorData[idx] };
            
            if(this.getMonochromatic()) {
              const monochrome = Math.ceil((0.21 * r) + (0.72 * g) + (0.07 * b));
              r = monochrome, g = monochrome, b = monochrome;
            }

            const colorKey = `asc_${r}_${g}_${b}`;
            colorMap[colorKey] = { color: `rgb(${r}, ${g}, ${b})` };

            return `
              ${ascii.trim()}
              <span class="${this.getElementClass()} ${colorKey}">${escapeHtml(this.getColorCharacter(color))}</span>
              ${(idx + 1) % info.width === 0 ? `</div><div class="${this.getRowClass()}">` : ''}
            `.trim();
          }, '')}
        </div>
      </div>
    `;
    
    return { styles: this.createCssStyleSheet([this.getStyleSheet(), colorMap]), data: html };
  }

  protected createCssStyleSheet(styleSheets: StyleSheet[]) {
    let style = '';

    styleSheets.forEach(styleSheet => 
      style += Object.keys(styleSheet).reduce((styles, selector) => 
        `${styles}
          .${selector} {
            ${Object.keys(styleSheet[selector]).reduce((elStyles, property) => 
              `${elStyles}${property}:${styleSheet[selector][property]};`, '')}
          }
        `, ''));

    return style;
  }

  public setStyleSheet(styleSheet: StyleSheet) { this.styleSheet = styleSheet; }
  public getStyleSheet() { return this.styleSheet; }
  
  public setContainerClass(containerClass: string) { this.containerClass = containerClass; }
  public getContainerClass() { return this.containerClass; }
  
  public setRowClass(rowClass: string) { this.rowClass = rowClass; }
  public getRowClass() { return this.rowClass }
  
  public setElementClass(elementClass: string) { this.elementClass = elementClass; }
  public getElementClass() { return this.elementClass; }

  public setMonochromatic(monochromatic?: boolean) { this.monochromatic = !!monochromatic; }
  public getMonochromatic() { return this.monochromatic; }


  public modifierAllowsMinify() { return true; }
}

export class AsciiPixel extends AsciiHtml {
  public constructor(greyscale?: boolean) {
    super([], greyscale);
    this.styleSheet['ascii span'].color = 'transparent';
  }

  public apply(params: AsciiOutputModifierApplyParams) {
    const { colorData, info } = params;
    const colorMap: StyleSheet = {};

    const html = `
      <div class="${this.getContainerClass()}">
        <div class="${this.getRowClass()}">
          ${colorData.reduce((ascii, color, idx) => {
            let { r, g, b } = { ...color };

            if(this.getMonochromatic()) {
              const greyscale = Math.ceil((0.21 * r) + (0.72 * g) + (0.07 * b));
              r = greyscale, g = greyscale, b = greyscale;
            }

            const colorKey = `asc_${r}_${g}_${b}`;
            colorMap[colorKey] = { background: `rgb(${r}, ${g}, ${b})` };

            return `
              ${ascii.trim()}
              <span class="${this.getElementClass()} ${colorKey}"></span>
              ${(idx + 1) % info.width === 0 ? `</div><div class="${this.getRowClass()}">` : ''}
            `.trim();
          }, '')}
        </div>
      </div>
    `;

    return { styles: this.createCssStyleSheet([this.getStyleSheet(), colorMap]), data: html };
  }
}

export interface Size {
  width: number;
  height: number;
}

export class AsciiOptions {
  public static readonly DEFAULT_WIDTH = 50;
  public static readonly MAX_WIDTH = 500;
  
  public static readonly DEFAULT_HEIGHT = 50;
  public static readonly MAX_HEIGHT = 500;

  public static readonly DEFAULT_CHARACTER_RAMP = [
    "$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", 
    "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", 
    "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", 
    "u", "n", "x", "r", "j", "f", "t", "/", "\\", "|", "(", 
    ")", "1", "{", "}", "[", "]", "?", "-", "_", "+", "~", 
    "<", ">", "i", "!", "l", "I", ";", ":", ",", "\"", " ", 
    "^", "`", "'", ".", " "
  ];

  private charRamp: string[];

  private size: Size;

  private contrast: number;

  private preserveAspectRatio: boolean;

  public constructor(charRamp: string[], size: Size | null, preserveAspectRatio: boolean = true, contrast?: number) {
    this.setCharRamp(charRamp);
    this.setSize(size);
    this.setContrast(contrast);
    this.setPreserveAspectRatio(preserveAspectRatio);
  }

  public setCharRamp(charRamp: string[]) { this.charRamp = charRamp; }
  public getCharRamp() { return this.charRamp; }

  public setSize(size: Size | null){
    if(!size) {
      this.size = { width: AsciiOptions.DEFAULT_WIDTH, height: AsciiOptions.DEFAULT_HEIGHT };
      return;
    }

    const width = Math.abs(size.width) > AsciiOptions.MAX_WIDTH ? AsciiOptions.MAX_WIDTH : Math.abs(size.width);
    const height = Math.abs(size.height) > AsciiOptions.MAX_HEIGHT ? AsciiOptions.MAX_HEIGHT : Math.abs(size.height);

    this.size = { width, height };
  }
  public getSize() { return this.size; }

  public setContrast(contrast?: number) { this.contrast = contrast || 1; }
  public getContrast() { return this.contrast; }
  
  public setPreserveAspectRatio(preserveAspectRatio: boolean) { this.preserveAspectRatio = preserveAspectRatio; }
  public getPreserveAspectRatio() { return this.preserveAspectRatio; }
}

export class AsciiGenerator {
  private image: Buffer;

  private asciiOptions: AsciiOptions;
  private outputModifier: AsciiOutputModifier;

  public constructor(image: Buffer, asciiOptions: AsciiOptions, outputModifier?: AsciiOutputModifier) {
    this.setImage(image);
    this.setAsciiOptions(asciiOptions);
    this.setOutputModifier(outputModifier);
  }

  public async generate(minifyHtml?: boolean) {
    const { data, colorData, info } = await this.getImagePixels();
    const output = this.getOutputModifier().apply({ data, colorData, info });
    return { 
      style: this.getOutputModifier().modifierAllowsMinify() && minifyHtml ? minify(output.styles, minifySettings) : output.styles,
      data: this.getOutputModifier().modifierAllowsMinify() && minifyHtml ? minify(output.data, minifySettings) : output.data
    };
  }

  private async getImagePixels() {
    let image = this.image;
    const { width, height } = this.asciiOptions.getSize();

    const { data, info } = await sharp(image)
      .resize(width, height, { fit: sharp.fit.inside })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const greyscaleArr = [];
    const colorArr = [];
    
    for(let i = 0; i < data.length; i += 3) {
      const color = (0.21 * data[i]) + (0.71 * data[i + 1]) + (0.07 * data[2]);
      greyscaleArr.push(color);
      colorArr.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
    }

    return { data: greyscaleArr, info, colorData: colorArr };
  }

  public setImage(image: Buffer) { this.image = image; }
  public getImage() { return this.image; }

  public setAsciiOptions(asciiOptions: AsciiOptions) { this.asciiOptions = asciiOptions; }
  public getAsciiOptions() { return this.asciiOptions; }

  public setOutputModifier(outputModifier?: AsciiOutputModifier) { this.outputModifier = outputModifier || new AsciiText(this.asciiOptions.getCharRamp()); }
  public getOutputModifier() { return this.outputModifier; }
}