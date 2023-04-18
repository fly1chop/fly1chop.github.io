import useHeadingsDOM from '@/hooks/useHeadingsDOM';
import { TableOfContentsEntry } from 'notion-utils';
import { MouseEvent, useEffect, useState } from 'react';
import styles from './posts.module.scss';

interface Props {
  toc: TableOfContentsEntry[];
}

const TableOfContent = ({ toc }: Props) => {
  const [current, setCurrent] = useState<string | null>(null);
  const { headings } = useHeadingsDOM();

  const formatId = (id: string) => {
    return id.replaceAll('-', '');
  };

  const handleNavigateToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    idx: number
  ) => {
    e.preventDefault();
    const heading = headings[idx];
    setCurrent(heading.getAttribute('data-id'));
    heading.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting) {
            setCurrent(id);
          }
        });
      },
      { rootMargin: '0% 0% -85% 0%' }
    );

    headings.forEach(heading => {
      observer.observe(heading);
    });
  }, [headings]);

  return (
    <nav className={styles.toc}>
      <ul>
        {toc.map((x, idx) => {
          const formattedId = formatId(x.id);
          const activeClass = current === formattedId ? styles.active : '';
          return (
            <li key={x.id} className={activeClass}>
              <a
                href={`#${formattedId}`}
                onClick={e => handleNavigateToSection(e, idx)}
              >
                {x.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContent;
