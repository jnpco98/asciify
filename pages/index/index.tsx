import React from 'react';
import Standard from '@layout/Standard';

function Index() {

  console.log(process.env.NODE_ENV);
  return (
    <Standard>
      Asciify homepage
    </Standard>
  );
}

export default Index;
