import sharp from 'sharp';

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface AsciiOutputModifierApplyParams {
  luminance: number[];
  colors: Color[];
  info: sharp.OutputInfo;
}

export interface AsciiOutputModifierResult {
  style: string | null;
  ascii: string;
}

export interface AsciiOutputModifier {
  apply(params: AsciiOutputModifierApplyParams, characterRamp: string): AsciiOutputModifierResult;
  modifierAllowsMinify(): boolean;
}
