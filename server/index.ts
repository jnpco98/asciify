import express from 'express';
import next from 'next';

async function main() {
  const port = parseInt(process.env.PORT) || 3000;
  const dev = process.env.NODE_ENV !== 'production';

  const app = next({ dev });
  const handle = app.getRequestHandler();

  await app.prepare();
  const server = express();
  server.get('*', (req, res) => handle(req, res));
  server.listen(port, e => {
    if(e) throw new Error(e);
    console.log(`Listening to the server at port: ${port}`);
  })
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});