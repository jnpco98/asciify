import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Standard from '@layout/Standard';

type Props = {

}

function Novels() {
  const router = useRouter();
  const { pid } = router.query;
  const [placeholder, setPlaceholder] = useState('');

  console.log(pid)

  async function fetchPlaceholder() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${pid}`);
    const json = await res.json();
    setPlaceholder(JSON.stringify(json));
  }

  useEffect(() => {
    fetchPlaceholder();
  }, []);
  
  return (
    <Standard>
      Novels homepage
      {placeholder}
    </Standard>
  );
}

export default Novels;
