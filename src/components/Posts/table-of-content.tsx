import classNames from 'classnames';
import { TableOfContentsEntry } from 'notion-utils';
import { useState } from 'react';
import styles from './posts.module.scss';

interface Props {
  toc: TableOfContentsEntry[];
}

const TableOfContent = ({ toc }: Props) => {
  const [current, setCurrent] = useState(0);

  const formattedId = (id: string) => {
    return id.replaceAll('-', '');
  };

  const handleNavigateToSection = (idx: number) => {
    setCurrent(idx);
  };

  return (
    <nav className={styles.toc}>
      <ul>
        {toc &&
          toc.map((x, idx) => {
            const isActive = classNames({ [styles.active]: current === idx });
            return (
              <li key={x.id} className={isActive}>
                <a
                  href={`#${formattedId(x.id)}`}
                  onClick={() => handleNavigateToSection(idx)}
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
