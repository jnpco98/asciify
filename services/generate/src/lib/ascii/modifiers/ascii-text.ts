import {
  AsciiOutputModifier,
  AsciiOutputModifierApplyParams,
} from './ascii-output-modifier';
import { AsciiOptions } from '../ascii-options';

export class AsciiText implements AsciiOutputModifier {
  protected charRamp: string[];

  constructor(charRamp?: string[]) {
    this.charRamp = charRamp || AsciiOptions.DEFAULT_CHARACTER_RAMP;
  }

  protected getColorCharacter(color: number) {
    return this.charRamp[Math.ceil(((this.charRamp.length - 1) * color) / 255)];
  }

  public apply(params: AsciiOutputModifierApplyParams) {
    const { data, info } = params;
    const content = data.reduce(
      (ascii, color, idx) =>
        `${ascii}${this.getColorCharacter(color)}${
          (idx + 1) % info.width === 0 ? '\n' : ''
        }`,
      ''
    );
    return { style: '', ascii: content };
  }

  public modifierAllowsMinify() {
    return true;
  }
}
