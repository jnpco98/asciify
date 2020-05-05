import { APIGatewayEvent, Context } from 'aws-lambda';
import { AsciiOptions } from '../../lib/ascii/ascii-options';
import { AsciiHtml, ColorMode } from '../../lib/ascii/modifiers/ascii-html';
import { AsciiGenerator } from '../../lib/ascii/ascii-generator';
import { GenerateTextOptions } from './generate-ascii-text';
import { Response } from '../response';
import fs from 'fs';
import path from 'path';

interface RequestBody {
  image: string;
  options?: GenerateTextOptions & {
    gap?: number;
    colorMode?: ColorMode;
  };
};

export async function handler(event: APIGatewayEvent, context: Context): Promise<Response> {
  const headers = { 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  const body = JSON.parse(event.body || '{}') as RequestBody;
  const image = body.image.split(';base64,').pop() || '';
  const {
    gap = 0,
    characterRamp,
    preserveAspectRatio = true,
    colorMode = 'default',
    pixelCountHorizontal = AsciiOptions.DEFAULT_WIDTH,
    pixelCountVertical = AsciiOptions.DEFAULT_HEIGHT
  } = body.options || {};

  if (!body.image || !body.image.includes(';base64,') || !image.trim().length)
    return {
      statusCode: 401,
      body: JSON.stringify({ error: new Error('Invalid image data') }), 
      headers
    };

  const options = new AsciiOptions();
  options.setCharacterRamp(AsciiOptions.CHARACTER_RAMP_PRESETS.COLORED);
  if (characterRamp) options.setCharacterRamp(characterRamp);
  options.setPreserveAspectRatio(preserveAspectRatio);
  options.setSize({ width: pixelCountHorizontal, height: pixelCountVertical });
  options.setContrast(1.1);

  const htmlOutputModifier = new AsciiHtml();
  htmlOutputModifier.setColorMode(colorMode);
  htmlOutputModifier.setGap(Math.abs(gap));

  const buffer = Buffer.from(image, 'base64');
  const asciiGenerator = new AsciiGenerator(buffer, options, htmlOutputModifier);

  try {
    const { ascii, style } = await asciiGenerator.generate(true);
    fs.writeFileSync(path.resolve(__dirname,  'something.html'), `<html><head><style>${style}</style></head><body>${ascii}</body></html>`)
    return { statusCode: 201, body: JSON.stringify({ ascii, style, size: options.getSize() }), headers };
  } catch (e) {
    return { statusCode: 422, body: JSON.stringify({ error: e }), headers };
  }
}
