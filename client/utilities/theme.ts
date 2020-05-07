import { DefaultTheme } from 'styled-components';
import { lighten, transparentize } from 'polished';

export const BaseTheme: DefaultTheme = {
  screen: {
    innerMaxWidth: '60rem'
  },
  gutterHorizontal: {
    base: '0.8rem',
    xxsmall: '2.5rem',
    xsmall: '4rem',
    small: '5rem',
    medium: '5rem',
    large: '5rem',
    xlarge: '5rem',
    xxlarge: '5rem'
  },
  gutterVertical: {
    base: '1rem',
    xxsmall: '1rem',
    xsmall: '1rem',
    small: '3rem',
    medium: '5rem',
    large: '5rem',
    xlarge: '5rem',
    xxlarge: '5rem'
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
    default: '#343a40',
    defaultSubdued: 'lightgray',

    // Backgrounds
    background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23DBAB)',
    backgroundSecondary: 'rgba(255, 255, 255, 0.7)',
    backgroundTertiary: '#fafafa',

    // Borders
    border: 'rgba(52,58,64,0.7)',
    borderHover: 'rgba(52,58,64,1)',

    // Scheme
    primary: 'rgba(52,58,64,1)',
    primaryCompliment: 'rgba(52,58,64,1)',

    // Hover
    primaryHover: 'rgba(52,58,64,1)',

    // Disabled
    disabled: '#f8f9fa',

    selection: 'lightgray',

    backdrop: 'rgba(52,58,64,1)',

    // Form color sets
    info: '#EE7752',
    success: '#23DBAB',
    warning: '#E73C7E',
    error: '#E73C7E'
  }
};
