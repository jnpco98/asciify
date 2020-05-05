export interface Size {
  width: number;
  height: number;
}

export class AsciiOptions {
  public static readonly DEFAULT_WIDTH = 50;
  public static readonly MAX_WIDTH = 300;

  public static readonly DEFAULT_HEIGHT = 50;
  public static readonly MAX_HEIGHT = 300;

  public static readonly CHARACTER_RAMP_PRESETS = {
    CLEAN: `@80GCLft1i;:,. `,
    CLEAN_2: `BS#&@$%*!:. `,
    MINIMAL: `@#8&o:*. `,
    DETAILED: `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:," ^\`'. `,
    COLORED: `@`
  }

  public static readonly DEFAULT_BG = {
    DARK: 'rgba(77, 77, 77, 1)',
    LIGHT: 'rgba(255, 255, 255, 1)'
  }

  private characterRamp: string;

  private size: Size;

  private contrast: number;

  private preserveAspectRatio: boolean;

  private inverted: boolean;

  public constructor() {
    this.setCharacterRamp(AsciiOptions.CHARACTER_RAMP_PRESETS.CLEAN);
    this.setSize({
      width: AsciiOptions.DEFAULT_WIDTH,
      height: AsciiOptions.DEFAULT_HEIGHT,
    });
    this.setContrast(1);
    this.setPreserveAspectRatio(true);
    this.setInverted(false);
  }

  public setCharacterRamp(charRamp: string): void {
    this.characterRamp = charRamp;
  }

  public getCharacterRamp(): string {
    return this.characterRamp;
  }

  public setSize(size: Size | null): void {
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

  public getSize(): Size {
    return this.size;
  }

  public setContrast(contrast: number): void {
    this.contrast = contrast;
  }

  public getContrast(): number {
    return this.contrast;
  }

  public setPreserveAspectRatio(preserveAspectRatio: boolean): void {
    this.preserveAspectRatio = preserveAspectRatio;
  }

  public getPreserveAspectRatio(): boolean {
    return this.preserveAspectRatio;
  }

  public setInverted(inverted: boolean): void {
    this.inverted = inverted;
  }

  public getInverted(): boolean {
    return this.inverted;
  }
}
