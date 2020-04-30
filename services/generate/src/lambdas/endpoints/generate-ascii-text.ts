import { APIGatewayEvent, Context } from "aws-lambda";
import { AsciiOptions } from "../../lib/ascii/ascii-options";
import { AsciiGenerator } from "../../lib/ascii/ascii-generator";
import { AsciiText } from "../../lib/ascii/modifiers/ascii-text";

export type GenerateTextOptions = {
  charRamp?: string;
  preserveAspectRatio?: boolean;
  pixelCountHorizontal?: number;
  pixelCountVertical?: number;
}

type RequestBody = {
  image: string,
  options?: GenerateTextOptions;
}

export async function handler(event: APIGatewayEvent, context: Context) {
  const body = JSON.parse(event.body || '{}') as RequestBody;
  const image = body.image.split(';base64,').pop() || '';
  const { charRamp, preserveAspectRatio = true, pixelCountHorizontal = AsciiOptions.DEFAULT_WIDTH, pixelCountVertical = AsciiOptions.DEFAULT_HEIGHT } = body.options || {};

  if(!body.image || !body.image.includes(';base64,') || !image.trim().length) 
    return { statusCode: 401, body: JSON.stringify({ error: new Error('Invalid image data') })}

  const options = new AsciiOptions();
  if(charRamp) options.setCharRamp(charRamp.split(''));
  options.setPreserveAspectRatio(preserveAspectRatio);
  options.setSize({ width: pixelCountHorizontal, height: pixelCountVertical });

  const htmlOutputModifier = new AsciiText();
  
  const buffer = Buffer.from(image, 'base64');
  const asciiGenerator = new AsciiGenerator(buffer, options, htmlOutputModifier);

  try {
    const { ascii, style } = await asciiGenerator.generate();
    return { statusCode: 201, body: JSON.stringify({ ascii, style })};
  } catch (e) {
    return { statusCode: 401, body: JSON.stringify({ error: e })};
  }
}