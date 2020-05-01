import { DefaultTheme } from 'styled-components';
import { lighten, transparentize } from 'polished';

export const BaseTheme: DefaultTheme = {
  screen: {
    innerMaxWidth: '1600px'
  },
  gutterHorizontal: {
    base: '0.8rem',
    xxsmall: '1.9rem',
    xsmall: '2.6rem',
    small: '5.6rem',
    medium: '7rem',
    large: '9rem',
    xlarge: '10rem',
    xxlarge: '10%'
  },
  gutterVertical: {
    base: '1rem',
    xxsmall: '1rem',
    xsmall: '1rem',
    small: '3rem',
    medium: '4rem',
    large: '6rem',
    xlarge: '10rem',
    xxlarge: '12rem'
  },
  font: {
    baseSize: '1rem',

    // Font weight
    light: '200',
    regular: '400',
    bold: '700',

    // Letter spacing
    narrow: '0.03rem',
    default: '0.042rem',
    wide: '0.085rem',

    primary: '"Source Code Pro", Sans-Serif',
    secondary: '"Source Code Pro", Sans-Serif'
  },
  colors: {
    // Standard Colors
    default: '#e8e0f6',
    defaultSubdued: '#e8e0f6',

    // Backgrounds
    background: '#f8f9fa',
    backgroundSecondary: '#ffffff',
    backgroundTertiary: '#dfdde2',

    // Borders
    border: '#b5b5b5',
    borderHover: '#8e63d4',

    // Scheme
    primary: '#8e63d4',
    primaryCompliment: '#5338a8',

    // Hover
    primaryHover: '#5338a8',

    // Disabled
    disabled: 'f8f9fa',

    selection: transparentize(0.8, '#8e63d4'),

    backdrop: transparentize(0.7, '#8e63d4'),

    // Form color sets
    info: '#e8e0f6',
    success: '#b5b5b5',
    warning: '#ff1744',
    error: '#ff1744'
  }
};
