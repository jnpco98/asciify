import escapeHtml from 'escape-html';
import { AsciiText } from './ascii-text';
import { AsciiOutputModifierApplyParams } from './ascii-output-modifier';

export interface StyleSheetProperty {
  [key: string]: string | number;
}

export interface StyleSheet {
  [key: string]: StyleSheetProperty;
}

export class AsciiHtml extends AsciiText {
  protected styleSheet: StyleSheet;
  protected containerClass: string;
  protected rowClass: string;
  protected elementClass: string;

  protected monochromatic: boolean;
  protected gap: number;

  public constructor(charRamp?: string[]) {
    super(charRamp);

    this.setStyleSheet({
      ['ascii span']: {
        width: '1rem',
        height: '1rem',
        display: 'inline-block',
        ['box-sizing']: 'border-box',
        ['font-family']: 'sans-serif',
        ['text-align']: 'center',
        ['margin-right']: '1px',
      },
      ['ascii__row']: {
        display: 'flex',
        ['box-sizing']: 'border-box',
        ['margin-bottom']: '1px',
      },
    });

    this.setGap(0);
    this.setContainerClass('ascii');
    this.setRowClass('ascii__row');
    this.setElementClass('ascii__row-item');
    this.setMonochromatic(false);
  }

  public apply(params: AsciiOutputModifierApplyParams) {
    const { data, colorData, info } = params;
    const colorMap: StyleSheet = {};

    const html = `
      <div class="${this.getContainerClass()}">
        <div class="${this.getRowClass()}">
          ${data.reduce((ascii, color, idx) => {
            let { r, g, b } = { ...colorData[idx] };

            if (this.getMonochromatic()) {
              const monochrome = Math.ceil(0.21 * r + 0.72 * g + 0.07 * b);
              (r = monochrome), (g = monochrome), (b = monochrome);
            }

            const colorKey = `asc_${r}_${g}_${b}`;
            colorMap[colorKey] = { color: `rgb(${r}, ${g}, ${b})` };

            return `
              ${ascii.trim()}
              <span class="${this.getElementClass()} ${colorKey}">${escapeHtml(
              this.getColorCharacter(color)
            )}</span>
              ${
                (idx + 1) % info.width === 0
                  ? `</div><div class="${this.getRowClass()}">`
                  : ''
              }
            `.trim();
          }, '')}
        </div>
      </div>
    `;

    return {
      styles: this.createCssStyleSheet([this.getStyleSheet(), colorMap]),
      data: html,
    };
  }

  protected createCssStyleSheet(styleSheets: StyleSheet[]) {
    let style = '';

    styleSheets.forEach(
      (styleSheet) =>
        (style += Object.keys(styleSheet).reduce(
          (styles, selector) =>
            `${styles}
          .${selector} {
            ${Object.keys(styleSheet[selector]).reduce(
              (elStyles, property) =>
                `${elStyles}${property}:${styleSheet[selector][property]};`,
              ''
            )}
          }
        `,
          ''
        ))
    );

    return style;
  }

  public setStyleSheet(styleSheet: StyleSheet) {
    this.styleSheet = styleSheet;
  }
  public getStyleSheet() {
    return this.styleSheet;
  }

  public setContainerClass(containerClass: string) {
    this.containerClass = containerClass;
  }
  public getContainerClass() {
    return this.containerClass;
  }

  public setRowClass(rowClass: string) {
    this.rowClass = rowClass;
  }
  public getRowClass() {
    return this.rowClass;
  }

  public setElementClass(elementClass: string) {
    this.elementClass = elementClass;
  }
  public getElementClass() {
    return this.elementClass;
  }

  public setMonochromatic(monochromatic?: boolean) {
    this.monochromatic = !!monochromatic;
  }
  public getMonochromatic() {
    return this.monochromatic;
  }

  public setGap(gap: number) {
    this.styleSheet['ascii span']['margin-right'] = `${gap}px`;
    this.styleSheet['ascii__row']['margin-bottom'] = `${gap}px`;
  }

  public getGap() {
    return this.styleSheet['ascii span']['margin-right'];
  }

  public modifierAllowsMinify() {
    return true;
  }
}
