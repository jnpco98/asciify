import sharp from 'sharp';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { AsciiOptions } from '../../lib/ascii/ascii-options';
import { AsciiGenerator } from '../../lib/ascii/ascii-generator';
import { AsciiText } from '../../lib/ascii/modifiers/ascii-text';
import { Response, createResponse } from '../../lib/ascii/utilities/response';
import { getRatioDimension } from '../../lib/ascii/utilities/scale';
import fs from 'fs';
import path from 'path';

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
    const size = getRatioDimension(
      { width: info.width, height: info.height }, 
      { width: pixelCountHorizontal, height: pixelCountVertical }
    );
  
    const options = new AsciiOptions();
    if (characterRamp) options.setCharacterRamp(characterRamp);
    options.setInverted(!!inverted);
    options.setPreserveAspectRatio(!!preserveAspectRatio);
    options.setContrast(1.8);
    options.setSize(size, AsciiOptions.DEFAULT_DIMENSION);
  
    const htmlOutputModifier = new AsciiText();
    const asciiGenerator = new AsciiGenerator(buffer, options, htmlOutputModifier);
    const { ascii, style } = await asciiGenerator.generate();
    fs.writeFileSync(path.resolve(__dirname,  'performance.txt'), ascii)
    return createResponse(200, { ascii, style, size: options.getSize() });
  } catch(e) {
    console.error(e);
    return createResponse(422, { error: 'Invalid image data'});
  }
}
