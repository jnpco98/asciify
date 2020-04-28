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

  public constructor(
    charRamp: string[],
    size: Size | null,
    preserveAspectRatio: boolean = true,
    contrast?: number
  ) {
    this.setCharRamp(charRamp);
    this.setSize(size);
    this.setContrast(contrast);
    this.setPreserveAspectRatio(preserveAspectRatio);
  }

  public setCharRamp(charRamp: string[]) {
    this.charRamp = charRamp;
  }
  public getCharRamp() {
    return this.charRamp;
  }

  public setSize(size: Size | null) {
    if (!size) {
      this.size = {
        width: AsciiOptions.DEFAULT_WIDTH,
        height: AsciiOptions.DEFAULT_HEIGHT,
      };
      return;
    }

    const width =
      Math.abs(size.width) > AsciiOptions.MAX_WIDTH
        ? AsciiOptions.MAX_WIDTH
        : Math.abs(size.width);
    const height =
      Math.abs(size.height) > AsciiOptions.MAX_HEIGHT
        ? AsciiOptions.MAX_HEIGHT
        : Math.abs(size.height);

    this.size = { width, height };
  }
  public getSize() {
    return this.size;
  }

  public setContrast(contrast?: number) {
    this.contrast = contrast || 1;
  }
  public getContrast() {
    return this.contrast;
  }

  public setPreserveAspectRatio(preserveAspectRatio: boolean) {
    this.preserveAspectRatio = preserveAspectRatio;
  }
  public getPreserveAspectRatio() {
    return this.preserveAspectRatio;
  }
}
