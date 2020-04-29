import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Standard from '@layout/Standard';

type Props = {

}

function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [placeholder, setPlaceholder] = useState('');

  console.log(id)

  async function fetchPlaceholder() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const json = await res.json();
    setPlaceholder(JSON.stringify(json));
  }

  useEffect(() => {
    fetchPlaceholder();
  }, [id]);
  
  return (
    <Standard>
      Page homepage
      {placeholder}
    </Standard>
  );
}

export default Page;
