import {
  AsciiOutputModifier,
  AsciiOutputModifierApplyParams,
  AsciiOutputModifierResult,
} from './ascii-output-modifier';

export class AsciiText implements AsciiOutputModifier {
  protected getColorCharacter(characterRamp: string, color: number): string {
    return characterRamp[Math.ceil(((characterRamp.length - 1) * color) / 255)];
  }

  public apply(
    params: AsciiOutputModifierApplyParams,
    characterRamp: string
  ): AsciiOutputModifierResult {
    const { luminance, info } = params;

    // prettier-ignore
    const content = luminance.reduce(
      (ascii, color, idx) =>
        `${ascii}${this.getColorCharacter(characterRamp, color)}${(idx + 1) % info.width === 0 ? '\n' : ''}`, ''
    );
    return { style: null, ascii: content };
  }

  public modifierAllowsMinify(): boolean {
    return false;
  }
}
