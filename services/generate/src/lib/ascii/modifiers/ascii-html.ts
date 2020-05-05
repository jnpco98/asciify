import { AsciiText } from './ascii-text';
import { AsciiOutputModifierApplyParams, Color, AsciiOutputModifierResult } from './ascii-output-modifier';

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

  public constructor() {
    super();
    // Initialize classes first
    this.containerClass = 'asc';
    this.rowClass = 'asc__row';
    this.elementClass = 'asc__row-item';

    // Use classes for stylesheets
    this.setStyleSheet({
      [this.getContainerClass()]: {
        background: '#343a40',
        overflow: 'auto',
        ['text-align']: 'center',
        ['font-weight']: 'bold',
        ['white-space']: 'pre',
        ['box-sizing']: 'border-box',
        ['font-size']: '0.8rem',
        ['line-height']: 1.2,
        ['font-family']: 'monospace'
      },
      [this.getElementClass()]: {
        display: 'inline-block',
        ['box-sizing']: 'border-box',
      },
      [this.getRowClass()]: {
        display: 'flex',
        ['box-sizing']: 'border-box',
      },
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

  // prettier-ignore
  public apply(params: AsciiOutputModifierApplyParams, characterRamp: string): AsciiOutputModifierResult {
    const { data, colorData, info } = params;
    const colorMap: StyleSheet = {};

    let html = `<pre class="${this.getContainerClass()}">`;

    for (let i = 0; i < data.length; i++) {
      let { r, g, b, a } = this.transformColor({ ...colorData[i] }, this.getColorMode());
      
      const colorKey = `asc${r}${g}${b}${a * 255}`;
      colorMap[colorKey] = { color: `rgba(${r}, ${g}, ${b}, ${a})` };

      html += `<span class="${this.getElementClass()} ${colorKey}">@</span>`;
      if((i + 1) % info.width === 0) html += '\n';
    }

    html += `</pre>`;

    return {
      style: this.createCssStyleSheet([this.getStyleSheet(), colorMap]),
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

  public getRowClass(): string {
    return this.rowClass;
  }

  public getElementClass(): string {
    return this.elementClass;
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
    this.styleSheet[this.getElementClass()]['margin-right'] = `${gap}px`;
    this.styleSheet[this.getRowClass()]['margin-bottom'] = `${gap}px`;
  }

  public getGap(): number {
    let gap = this.styleSheet[this.getElementClass()]['margin-right'];
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
