import React from 'react';
import Standard from '@layout/Standard';
import Link from 'next/link';

function Index() {

  console.log(process.env.NODE_ENV);
  return (
    <Standard>
      Asciify homepage

      <Link href="/page/[id]" as="/page/1"><a style={{ paddingTop: '10rem', display: 'block' }}>go to page</a></Link>
    </Standard>
  );
}

export default Index;
