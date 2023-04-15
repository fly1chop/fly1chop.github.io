import { TagResponse } from '@/types/tag';
import { useState } from 'react';
import Tag from '../base/Tag';
import styles from './home.module.scss';

const TagList = ({ tags }: { tags: TagResponse[] }) => {
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
          <button key={tag.id} onClick={() => handleSelect(tag.name)}>
            <Tag
              name={tag.name}
              fill={filters.includes(tag.name)}
              size="large"
            />
          </button>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
