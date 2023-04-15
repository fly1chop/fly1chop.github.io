import { useFilters } from '@/context/filters';
import { TagResponse } from '@/types/tag';
import Tag from '../base/Tag';
import styles from './home.module.scss';

const TagList = ({ tags }: { tags: TagResponse[] }) => {
  const { filters, setFilters, resetFilters } = useFilters();

  return (
    <div className={styles.tagList}>
      <ul>
        {tags.map(tag => (
          <button key={tag.id} onClick={() => setFilters(tag.name)}>
            <Tag
              name={tag.name}
              fill={filters.includes(tag.name)}
              size="large"
            />
          </button>
        ))}
        {filters.length > 0 && (
          <button className={styles.resetFiltersBtn} onClick={resetFilters}>
            unselect all
          </button>
        )}
      </ul>
    </div>
  );
};

export default TagList;
