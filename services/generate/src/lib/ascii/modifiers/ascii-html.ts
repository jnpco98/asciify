import escapeHtml from 'escape-html';
import { AsciiText } from './ascii-text';
import { AsciiOutputModifierApplyParams, Color } from './ascii-output-modifier';

export interface StyleSheetProperty {
  [key: string]: string | number;
}

export interface StyleSheet {
  [key: string]: StyleSheetProperty;
}

export type ColorMode = 'default' | 'monochromatic' | 'black';

export class AsciiHtml extends AsciiText {
  protected styleSheet: StyleSheet;

  protected readonly containerClass: string;
  protected readonly rowClass: string;
  protected readonly elementClass: string;

  protected colorMode: ColorMode;
  protected gap: number;

  public constructor(charRamp?: string[]) {
    super(charRamp);

    // Initialize classes first
    this.containerClass = 'ascii';
    this.rowClass = 'ascii__row';
    this.elementClass = 'ascii__row-item';

    // Use classes for stylesheets
    this.setStyleSheet({
      [this.getElementClass()]: {
        width: '1rem',
        height: '1rem',
        display: 'inline-block',
        ['box-sizing']: 'border-box',
        ['font-family']: 'sans-serif',
        ['text-align']: 'center',
        ['margin-right']: '1px',
      },
      [this.getRowClass()]: {
        display: 'flex',
        ['box-sizing']: 'border-box',
        ['margin-bottom']: '1px',
      },
    });

    // Update settings
    this.setGap(0);
    this.setColorMode('default');
  }

  protected transformColors(color: Color) {
    let { r, g, b } = color;
    if (this.getColorMode() === 'monochromatic') {
      const monochrome = Math.ceil(0.21 * r + 0.72 * g + 0.07 * b);
      (r = monochrome), (g = monochrome), (b = monochrome);
    } else if (this.getColorMode() === 'black') {
      (r = 0), (g = 0), (b = 0);
    }
    return { r, g, b };
  }

  // prettier-ignore
  public apply(params: AsciiOutputModifierApplyParams) {
    const { data, colorData, info } = params;
    const colorMap: StyleSheet = {};

    let html = `<div class="${this.getContainerClass()}"><div class="${this.getRowClass()}">`;

    for (let i = 0; i < data.length; i++) {
      const color = data[i];
      let { r, g, b } = this.transformColors({ ...colorData[i] });
      
      const colorKey = `asc_${r}_${g}_${b}`;
      colorMap[colorKey] = { color: `rgb(${r}, ${g}, ${b})` };

      html += `<span class="${this.getElementClass()} ${colorKey}">${escapeHtml(this.getColorCharacter(color))}</span>`;
      if((i + 1) % info.width === 0) html += `</div><div class="${this.getRowClass()}">`;
    }

    html += `</div></div>`;

    return {
      style: this.createCssStyleSheet([this.getStyleSheet(), colorMap]),
      ascii: html,
    };
  }

  protected createCssStyleSheet(styleSheets: StyleSheet[]) {
    let accumulatedStyles = '';
    
    styleSheets.forEach(styleSheet => {
      let styles = '';

      Object.keys(styleSheet).forEach(selector => {
        let selectorStyles = '';

        Object.keys(styleSheet[selector]).forEach(property => {
          selectorStyles += `${property}:${styleSheet[selector][property]};`;
        });
        
        styles += `.${selector}{${selectorStyles}}`;
      });

      accumulatedStyles += styles;
    });

    return accumulatedStyles;
  }

  public setStyleSheet(styleSheet: StyleSheet) {
    this.styleSheet = styleSheet;
  }
  public getStyleSheet() {
    return this.styleSheet;
  }

  public getContainerClass() {
    return this.containerClass;
  }

  public getRowClass() {
    return this.rowClass;
  }

  public getElementClass() {
    return this.elementClass;
  }

  public setColorMode(colorMode: ColorMode) {
    if (colorMode === 'black' || colorMode === 'monochromatic')
      this.colorMode = colorMode;
    else this.colorMode = 'default';
  }
  public getColorMode() {
    return this.colorMode;
  }

  public setGap(gap: number) {
    this.styleSheet[this.getElementClass()]['margin-right'] = `${gap}px`;
    this.styleSheet[this.getRowClass()]['margin-bottom'] = `${gap}px`;
  }

  public getGap() {
    return this.styleSheet[this.getElementClass()]['margin-right'];
  }

  public modifierAllowsMinify() {
    return true;
  }
}
