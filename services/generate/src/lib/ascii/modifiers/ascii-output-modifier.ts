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
  apply(params: AsciiOutputModifierApplyParams): { style: string | null; ascii: string };
  modifierAllowsMinify(): boolean;
}
