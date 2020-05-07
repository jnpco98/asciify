import sharp from 'sharp';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { AsciiOptions } from '../../lib/ascii/ascii-options';
import { AsciiGenerator } from '../../lib/ascii/ascii-generator';
import { AsciiText } from '../../lib/ascii/modifiers/ascii-text';
import { Response, createResponse } from '../../lib/ascii/utilities/response';
import { getAdjustedRatio } from '../../lib/ascii/utilities/scale';

export type GenerateTextOptions = {
  characterRamp?: string;
  preserveAspectRatio?: boolean;
  pixelCountHorizontal?: number;
  pixelCountVertical?: number;
  inverted?: boolean;
};

interface RequestBody {
  image: string;
  options?: GenerateTextOptions;
};

export async function handler(event: APIGatewayEvent, context: Context): Promise<Response> {
  const body = JSON.parse(event.body || '{}') as RequestBody;
  const image = body.image.split(';base64,').pop() || '';
  const {
    characterRamp,
    preserveAspectRatio,
    pixelCountHorizontal,
    pixelCountVertical,
    inverted
  } = body.options || {};

  try {
    if (!body.image || !body.image.includes(';base64,') || !image.trim().length)
      return createResponse(422, { error: 'Invalid image data' });
  
    const buffer = Buffer.from(image, 'base64');

    const { info } = await sharp(buffer).toBuffer({ resolveWithObject: true });
    const adjustedPixelCountHorizontal = pixelCountHorizontal ? pixelCountHorizontal / 2 : pixelCountHorizontal;
    const adjustedSize = getAdjustedRatio(
      { width: info.width, height: info.height }, 
      { width: adjustedPixelCountHorizontal, height: pixelCountVertical }
    );
  
    /**
     * Setting up the options
     */
    const options = new AsciiOptions();
    if (characterRamp) options.setCharacterRamp(characterRamp);
    options.setInverted(!!inverted);
    options.setPreserveAspectRatio(!!preserveAspectRatio);
    options.setContrast(1.8);

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
    const htmlOutputModifier = new AsciiText();
    
    const asciiGenerator = new AsciiGenerator(buffer, options, htmlOutputModifier);
    const { ascii, style } = await asciiGenerator.generate();
    return createResponse(200, { ascii, style, size: options.getSize() });
  } catch(e) {
    console.error(e);
    return createResponse(422, { error: 'Invalid image data'});
  }
}
