import 'styled-components';

export interface Gutter {
  base: string;
  xxsmall: string;
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  xxlarge: string;
}

export interface Colors {
  // Standard Colors
  default: string;
  defaultSubdued: string;

  // Backgrounds
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  // Borders
  border: string;
  borderHover: string;

  // Scheme
  primary: string;
  primaryCompliment: string;

  // Hover
  primaryHover: string;

  // Disabled
  disabled: string;
  
  selection: string;

  backdrop: string;

  // Form color sets
  info: string;
  success: string;
  warning: string;
  error: string;
}

export interface Fonts {
  baseSize: string;

  // Font weight
  light: string;
  regular: string;
  bold: string;

  // Letter spacing
  narrow: string;
  default: string;
  wide: string;

  // Font Family
  primary: string;
  secondary: string;
}

export interface Screen {
  innerMaxWidth: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    font: Fonts;
    gutterHorizontal: Gutter;
    gutterVertical: Gutter;
    screen: Screen;
  }
}
