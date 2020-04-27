import sharp from 'sharp';

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
  apply(params: AsciiOutputModifierApplyParams): string | Buffer;
}

export class AsciiPixel implements AsciiOutputModifier {
  useClass: boolean;
  monochrome: boolean;
  monochromeColor: boolean;
  
  apply(params: AsciiOutputModifierApplyParams): string {
    const { data, colorData, info } = params;
    const colorMap: { [key: string]: string } = {};

    const body = data.reduce((ascii, color, idx) => {
      const { r, g, b } = colorData[idx];
      const colorKey = `asc_${r}_${g}_${b}`;
      colorMap[colorKey] = `rgb(${r}, ${g}, ${b})`

      return `${ascii}<span class="${colorKey}"></span>${(idx + 1) % info.width === 0 ? '</div><div class="ascii__row">' : ''}`
    }, '');

    return `
      <html>
        <head>
          <style>
            .ascii span { width: 1rem; height: 1rem; box-sizing: border-box; display: inline-block; font-family: sans-serif; text-align: center; line-height: 1; margin-right: 1px; }
            .ascii__row { display: flex; box-sizing: border-box; margin-bottom: 1px; }
            ${Object.keys(colorMap).map(styleKey => `.${styleKey} { background: ${colorMap[styleKey]}; color: transparent; }`).join(' ')}
          </style>
        </head>
        <body><div class="ascii"><div class="ascii__row">${body}</div></div></body>
      </html>
    `;
  }
}

export class AsciiHtml implements AsciiOutputModifier {
  useClass: boolean;
  monochrome: boolean;
  monochromeColor: boolean;
  private charRamp: string[];

  constructor(charRamp: string[]) {
    this.charRamp = charRamp;  
  }

  private getColorCharacter(color: number) {
    return this.charRamp[Math.ceil(((this.charRamp.length - 1) * color) / 255)];
  }
  
  apply(params: AsciiOutputModifierApplyParams): string {
    const { data, colorData, info } = params;
    const colorMap: { [key: string]: string } = {};

    const body = data.reduce((ascii, color, idx) => {
      const { r, g, b } = colorData[idx];
      const colorKey = `asc_${r}_${g}_${b}`;
      colorMap[colorKey] = `rgb(${r}, ${g}, ${b})`

      return `${ascii}<span class="${colorKey}">${this.getColorCharacter(color)}</span>${(idx + 1) % info.width === 0 ? '</div><div class="ascii__row">' : ''}`
    }, '');

    return `
      <html>
        <head>
          <style>
            .ascii span { width: 1rem; height: 1rem; box-sizing: border-box; display: inline-block; font-family: sans-serif; text-align: center; line-height: 1; margin-right: 1px; }
            .ascii__row { display: flex; box-sizing: border-box; margin-bottom: 1px; }
            ${Object.keys(colorMap).map(styleKey => `.${styleKey} { color: ${colorMap[styleKey]}; }`).join(' ')}
          </style>
        </head>
        <body><div class="ascii"><div class="ascii__row">${body}</div></div></body>
      </html>
    `;
  }
}

export class AsciiImage implements AsciiOutputModifier {
  monochrome: boolean;
  monochromeColor: boolean;
  private charRamp: string[];

  constructor(charRamp: string[]) {
    this.charRamp = charRamp;  
  }

  apply(params: AsciiOutputModifierApplyParams): Buffer {
    throw new Error("Method not implemented.");
  }
}

export class AsciiText implements AsciiOutputModifier {
  private charRamp: string[];

  constructor(charRamp: string[]) {
    this.charRamp = charRamp;  
  }

  private getColorCharacter(color: number) {
    return this.charRamp[Math.ceil(((this.charRamp.length - 1) * color) / 255)];
  }

  apply(params: AsciiOutputModifierApplyParams): string {
    const { data, info } = params;
    return data.reduce((ascii, color, idx) => `${ascii}${this.getColorCharacter(color)}${(idx + 1) % info.width === 0 ? '\n' : ''}`, '');
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

  private size: Size | null;

  private contrast: number;

  private preserveAspectRatio: boolean;

  constructor(charRamp: string[], size: Size | null, preserveAspectRatio: boolean = true, contrast?: number) {
    this.setCharRamp(charRamp);
    this.setSize(size);
    this.setContrast(contrast);
    this.setPreserveAspectRatio(preserveAspectRatio);
  }

  public setCharRamp(charRamp: string[]) { this.charRamp = charRamp; }
  public getCharRamp() { return this.charRamp; }

  public setSize(size: Size | null){
    if(!size) {
      this.size = null;
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

  constructor(image: Buffer, asciiOptions: AsciiOptions, outputModifier?: AsciiOutputModifier) {
    this.setImage(image);
    this.setAsciiOptions(asciiOptions);
    this.setOutputModifier(outputModifier);
  }

  public async generate() {
    const { data, colorData, info } = await this.getImagePixels();
    const output = this.getOutputModifier().apply({ data, colorData, info });
    require('fs-extra').writeFileSync('so.html', output);
  }

  private async getImagePixels() {
    let image = this.image;

    const size = this.asciiOptions.getSize();
    if(size) {
      const { width, height } = size;
      image = await sharp(this.image).resize(width, height, { fit: sharp.fit.contain }).toBuffer();
    }

    const { data, info } = await sharp(image).flatten({ background: { r: 255, g: 255, b: 255 } }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
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