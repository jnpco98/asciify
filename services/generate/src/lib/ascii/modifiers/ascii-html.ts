import escapeHTML from 'escape-html';
import tinyColor from 'tinycolor2';
import { AsciiText } from './ascii-text';
import { AsciiOutputModifierApplyParams, Color, AsciiOutputModifierResult } from './ascii-output-modifier';
import { AsciiOptions } from '../ascii-options';

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

  protected colorMode: ColorMode;
  protected gap: number;

  public constructor() {
    super();
    // Initialize classes first
    this.containerClass = 'ascii';

    // Use classes for stylesheets
    this.setStyleSheet({
      [this.getContainerClass()]: {
        background: `${AsciiOptions.COLOR_SET.GREY}`,
        overflow: 'auto',
        ['text-align']: 'center',
        ['font-weight']: 'bold',
        ['white-space']: 'pre',
        ['box-sizing']: 'border-box',
        ['font-size']: '0.8rem',
        ['line-height']: 1.2,
        ['font-family']: 'monospace'
      },
      [`${this.getContainerClass()} span`]: {
        display: 'inline-block',
        ['box-sizing']: 'border-box',
      }
    });

    // Update settings
    this.setGap(0);
    this.setColorMode('default');
  }

  protected transformColor(color: Color, colorMode: ColorMode): Color {
    let { r, g, b, a } = color;
    if (colorMode === 'monochromatic') {
      const monochrome = Math.round(0.21 * r + 0.72 * g + 0.07 * b);
      (r = monochrome), (g = monochrome), (b = monochrome);
    } else if (colorMode === 'black') {
      (r = 0), (g = 0), (b = 0);
    }
    return { r, g, b, a };
  }

  public apply(params: AsciiOutputModifierApplyParams, characterRamp: string): AsciiOutputModifierResult {
    const { luminance, colors, info } = params;

    let html = `<pre class="${this.getContainerClass()}">`;

    for (let i = 0; i < luminance.length; i++) {
      let { r, g, b, a } = this.transformColor({ ...colors[i] }, this.getColorMode());
      
      const color = tinyColor({ r, g, b, a: a }).toHexString();

      html += `<span style="color:${color}">${escapeHTML(this.getColorCharacter(characterRamp, luminance[i]))}</span>`;
      if((i + 1) % info.width === 0) html += '\n';
    }

    html += `</pre>`;

    return {
      style: this.createCssStyleSheet([this.getStyleSheet()]),
      ascii: html
    };
  }

  protected createCssStyleSheet(styleSheets: StyleSheet[]): string {
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

  public setStyleSheet(styleSheet: StyleSheet): void {
    this.styleSheet = styleSheet;
  }

  public getStyleSheet(): StyleSheet {
    return this.styleSheet;
  }

  public getContainerClass(): string {
    return this.containerClass;
  }

  public setColorMode(colorMode: ColorMode): void {
    if (colorMode === 'black' || colorMode === 'monochromatic')
      this.colorMode = colorMode;
    else this.colorMode = 'default';
  }

  public getColorMode(): ColorMode {
    return this.colorMode;
  }

  public setGap(gap: number): void {
    this.styleSheet[`${this.getContainerClass()} span`]['margin-right'] = `${gap}px`;
    this.styleSheet[`${this.getContainerClass()} span`]['margin-bottom'] = `${gap}px`;
  }

  public getGap(): number {
    let gap = this.styleSheet[`${this.getContainerClass()} span`]['margin-right'];
    if(typeof gap === 'number') return gap;

    if(gap && typeof gap === 'string') {
      const pixel = gap.split('px').shift() || '';
      return !isNaN(parseInt(pixel)) ? parseInt(pixel) : 0;
    }
    return 0;
  }

  public modifierAllowsMinify(): boolean {
    return true;
  }

  public getStyle(element: string, property: string): string | number {
    return this.styleSheet[element][property];
  }

  public setStyle(element: string, property: StyleSheetProperty): void {
    this.styleSheet[element] = { ...this.styleSheet[element], ...property };
  }
}
