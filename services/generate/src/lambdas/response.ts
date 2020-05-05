export interface Response {
  statusCode: number;
  body: string;
  headers?: { [name: string]: string | boolean };
}