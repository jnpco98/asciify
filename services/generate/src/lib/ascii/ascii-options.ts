import { getMaxDimension } from './utilities/scale';

export interface Size {
  width: number;
  height: number;
}

export class AsciiOptions {
  public static readonly DEFAULT_DIMENSION = 10000;
  public static readonly MAX_DIMENSION = 90000;
  public static readonly MAX_DIMENSION_SQRT = Math.sqrt(AsciiOptions.MAX_DIMENSION);

  public static readonly CHARACTER_RAMP_PRESETS = {
    CLEAN: `@80GCLft1i;:,. `,
    CLEAN_2: `BS#&@$%*!:. `,
    MINIMAL: `@#8&o:*. `,
    DETAILED: `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:," ^\`'. `,
    COLORED: `@`,
  };

  public static readonly COLOR_SET = {
    DARK: '#191e2a',
    GREY: '#343a40',
    LIGHT: '#fff',
  };

  private characterRamp: string;

  private size: Size;

  private contrast: number;

  private preserveAspectRatio: boolean;

  private inverted: boolean;

  private widthAdjustment: number;

  public constructor() {
    this.setCharacterRamp(AsciiOptions.CHARACTER_RAMP_PRESETS.CLEAN);

    this.setContrast(1);
    this.setPreserveAspectRatio(true);
    this.setInverted(false);
    this.widthAdjustment = 2;

    this.setSize({
      width: AsciiOptions.MAX_DIMENSION_SQRT,
      height: AsciiOptions.MAX_DIMENSION_SQRT,
    });
  }

  public setCharacterRamp(charRamp: string): void {
    this.characterRamp = charRamp;
  }

  public getCharacterRamp(): string {
    return this.characterRamp;
  }

  public setSize(size: Size, maxDimension?: number): void {
    let { width, height } = size;
    width = width * this.widthAdjustment;
    this.size = getMaxDimension({ width, height }, maxDimension || AsciiOptions.MAX_DIMENSION);
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

  public setWidthAdjustment(widthAdjustment: number): void {
    this.widthAdjustment = widthAdjustment;
  }

  public getWidthAdjustment(): number {
    return this.widthAdjustment;
  }
}
