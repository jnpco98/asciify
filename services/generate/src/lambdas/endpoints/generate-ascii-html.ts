import sharp from 'sharp';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { AsciiOptions } from '../../lib/ascii/ascii-options';
import { AsciiHtml, ColorMode } from '../../lib/ascii/modifiers/ascii-html';
import { AsciiGenerator } from '../../lib/ascii/ascii-generator';
import { GenerateTextOptions } from './generate-ascii-text';
import { Response, createResponse } from '../../lib/ascii/utilities/response';
import { getAdjustedRatio } from '../../lib/ascii/utilities/scale';

interface RequestBody {
  image: string;
  options?: GenerateTextOptions & {
    gap?: number;
    colorMode?: ColorMode;
  };
};

export async function handler(event: APIGatewayEvent, context: Context): Promise<Response> {
  const body = JSON.parse(event.body || '{}') as RequestBody;
  const image = body.image.split(';base64,').pop() || '';
  const {
    gap,
    characterRamp,
    preserveAspectRatio,
    colorMode,
    pixelCountHorizontal,
    pixelCountVertical,
    inverted
  } = body.options || {};

  try {
    if (!body.image || !body.image.includes(';base64,') || !image.trim().length)
      return createResponse(422, { error: 'Invalid image data' });
  
    const buffer = Buffer.from(image, 'base64');

    const { info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
    const adjustedSize = getAdjustedRatio(
      { width: info.width, height: info.height }, 
      { width: pixelCountHorizontal, height: pixelCountVertical }
    );

    /**
     * Setting up the options
     */
    const options = new AsciiOptions();
    options.setCharacterRamp(characterRamp || AsciiOptions.CHARACTER_RAMP_PRESETS.COLORED);
    options.setInverted(!!inverted);
    options.setPreserveAspectRatio(!!preserveAspectRatio);
    options.setContrast(1.1);

    /**
     * If pixelCountHorizontal or pixelCountVertical were specified,
     * Use those values and cap it with the max dimensions
     * 
     * If pixel count are not specified, use the default dimensions
     */
    if(pixelCountHorizontal || pixelCountVertical) options.setSize(adjustedSize, AsciiOptions.MAX_DIMENSION);
    else options.setSize(adjustedSize, AsciiOptions.DEFAULT_DIMENSION);
  
    /**
     * Setting up the modifier
     */
    const htmlOutputModifier = new AsciiHtml();
    htmlOutputModifier.setColorMode(colorMode || 'default');
    htmlOutputModifier.setGap(gap ? Math.abs(gap) : 0);
  
    const asciiGenerator = new AsciiGenerator(buffer, options, htmlOutputModifier);
    const { ascii, style } = await asciiGenerator.generate(true);
    return createResponse(200, { ascii, style, size: options.getSize() });
  } catch(e) {
    console.error(e)
    return createResponse(422, { error: 'Invalid image data'});
  }
}
