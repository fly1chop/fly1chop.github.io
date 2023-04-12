import { useState } from 'react';
import Tag from '../base/Tag';
import styles from './home.module.scss';

const tags = ['Next', 'React', 'JS', 'TS', 'HTML'];

const TagList = () => {
  const [filters, setFilters] = useState<string[]>([]);

  const handleSelect = (tag: string) => {
    if (filters.includes(tag)) {
      setFilters(filters.filter(x => x !== tag));
    } else {
      setFilters([...filters, tag]);
    }
  };

  return (
    <div className={styles.tagList}>
      <ul>
        {tags.map(tag => (
          <button key={tag} onClick={() => handleSelect(tag)}>
            <Tag name={tag} fill={filters.includes(tag)} size="large" />
          </button>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
