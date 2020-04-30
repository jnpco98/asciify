import { AsciiHtml, StyleSheet } from './ascii-html';
import { AsciiOutputModifierApplyParams, Color } from './ascii-output-modifier';

export class AsciiPixel extends AsciiHtml {
  public constructor() {
    super([]);
    this.styleSheet[this.getElementClass()].color = 'transparent';
    this.setGap(1);
  }

  protected transformColors(color: Color) {
    let { r, g, b } = color;
    if (this.getColorMode() === 'monochromatic') {
      const greyscale = Math.ceil(0.21 * r + 0.72 * g + 0.07 * b);
      (r = greyscale), (g = greyscale), (b = greyscale);
    }
    return { r, g, b };
  }

  // prettier-ignore
  public apply(params: AsciiOutputModifierApplyParams) {
    const { colorData, info } = params;
    const colorMap: StyleSheet = {};

    let html = `<div class="${this.getContainerClass()}"><div class="${this.getRowClass()}">`;
    
    for (let i = 0; i < colorData.length; i++) {
      const color = colorData[i];
      let { r, g, b } = this.transformColors({ ...color });

      const colorKey = `asc_${r}_${g}_${b}`;
      colorMap[colorKey] = { background: `rgb(${r}, ${g}, ${b})` };
      
      html += `<span class="${this.getElementClass()} ${colorKey}"></span>`;
      if((i + 1) % info.width === 0) html += `</div><div class="${this.getRowClass()}">`;
    }

    html += `</div></div>`;

    return {
      style: this.createCssStyleSheet([this.getStyleSheet(), colorMap]),
      ascii: html,
    };
  }
}
