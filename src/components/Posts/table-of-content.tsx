import useHeadingsDOM from '@/hooks/useHeadingsDOM';
import { TableOfContentsEntry } from 'notion-utils';
import { MouseEvent, useState } from 'react';
import styles from './posts.module.scss';

interface Props {
  toc: TableOfContentsEntry[];
}

const TableOfContent = ({ toc }: Props) => {
  const [current, setCurrent] = useState<number | null>(null);
  const { headings } = useHeadingsDOM();

  const formattedId = (id: string) => {
    return id.replaceAll('-', '');
  };

  const handleNavigateToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    idx: number
  ) => {
    e.preventDefault();
    setCurrent(idx);
    headings[idx].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <nav className={styles.toc}>
      <ul>
        {toc &&
          toc.map((x, idx) => {
            const activeClass = current === idx ? styles.active : '';
            return (
              <li key={x.id} className={activeClass}>
                <a
                  href={`#${formattedId(x.id)}`}
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
