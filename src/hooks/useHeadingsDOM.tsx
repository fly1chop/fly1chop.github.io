import { useEffect, useState } from 'react';

const useHeadingsDOM = () => {
  const [headings, setHeadings] = useState<Element[]>([]);

  useEffect(() => {
    setHeadings(Array.from(document.querySelectorAll('h2, h3, h4')));
  }, []);

  return headings;
};

export default useHeadingsDOM;
