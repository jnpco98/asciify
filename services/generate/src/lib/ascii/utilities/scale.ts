import { Size } from "../ascii-options";

export function getMaxDimension(size: Size, maxDimension: number): Size {
  const { width, height } = size;
  if((width * height) <= maxDimension) return { width: Math.round(width), height: Math.round(height) };
  const scale = Math.sqrt(maxDimension / (width * height));
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

export function getAdjustedRatio(base: Size, adjusted: Partial<Size>): Size {
  let { width, height } = adjusted;
  if(width && height) return { width, height };
  else if(width) return { width, height: width / base.width * base.height }
  else if(height) return { width: height / base.height * base.width, height }
  else return base;
}