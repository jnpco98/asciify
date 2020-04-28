import { AsciiHtml, StyleSheet } from './ascii-html';
import { AsciiOutputModifierApplyParams } from './ascii-output-modifier';

export class AsciiPixel extends AsciiHtml {
  public constructor() {
    super([]);
    this.styleSheet[this.getElementClass()].color = 'transparent';
  }

  public apply(params: AsciiOutputModifierApplyParams) {
    const { colorData, info } = params;
    const colorMap: StyleSheet = {};

    const html = `
      <div class="${this.getContainerClass()}">
        <div class="${this.getRowClass()}">
          ${colorData.reduce((ascii, color, idx) => {
            let { r, g, b } = { ...color };

            if (this.getMonochromatic()) {
              const greyscale = Math.ceil(0.21 * r + 0.72 * g + 0.07 * b);
              (r = greyscale), (g = greyscale), (b = greyscale);
            }

            const colorKey = `asc_${r}_${g}_${b}`;
            colorMap[colorKey] = { background: `rgb(${r}, ${g}, ${b})` };

            return `
              ${ascii.trim()}
              <span class="${this.getElementClass()} ${colorKey}"></span>
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
}
