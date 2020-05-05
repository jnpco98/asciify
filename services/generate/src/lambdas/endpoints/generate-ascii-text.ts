import { APIGatewayEvent, Context } from 'aws-lambda';
import { AsciiOptions } from '../../lib/ascii/ascii-options';
import { AsciiGenerator } from '../../lib/ascii/ascii-generator';
import { AsciiText } from '../../lib/ascii/modifiers/ascii-text';
import { Response } from '../response';

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
  const headers = { 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  const body = JSON.parse(event.body || '{}') as RequestBody;
  const image = body.image.split(';base64,').pop() || '';
  const {
    characterRamp,
    preserveAspectRatio = true,
    pixelCountHorizontal = AsciiOptions.DEFAULT_WIDTH,
    pixelCountVertical = AsciiOptions.DEFAULT_HEIGHT,
    inverted = false
  } = body.options || {};

  if (!body.image || !body.image.includes(';base64,') || !image.trim().length)
    return {
      statusCode: 401,
      body: JSON.stringify({ error: new Error('Invalid image data') }),
      headers
    };

  const options = new AsciiOptions();
  if (characterRamp) options.setCharacterRamp(characterRamp);
  options.setInverted(inverted);
  options.setPreserveAspectRatio(preserveAspectRatio);
  options.setSize({ width: pixelCountHorizontal, height: pixelCountVertical });
  options.setContrast(1.8);

  const htmlOutputModifier = new AsciiText();

  const buffer = Buffer.from(image, 'base64');
  const asciiGenerator = new AsciiGenerator(buffer, options, htmlOutputModifier);

  try {
    const { ascii, style } = await asciiGenerator.generate();
    return { statusCode: 201, body: JSON.stringify({ ascii, style, size: options.getSize() }), headers };
  } catch (e) {
    return { statusCode: 422, body: JSON.stringify({ error: e }), headers};
  }
}
