import { useFilters } from '@/context/filters';
import { TagResponse } from '@/types/tag';
import Tag from '../base/Tag';
import styles from './home.module.scss';

const TagList = ({ tags }: { tags: TagResponse[] }) => {
  const { filters, setFilters } = useFilters();

  return (
    <div className={styles.tagList}>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>
            <button onClick={() => setFilters(tag.name)}>
              <Tag
                name={tag.name}
                fill={filters.includes(tag.name)}
                size="large"
              />
            </button>
          </li>
        ))}
        {filters.length > 0 && (
          <li>
            <button
              className={styles.resetFiltersBtn}
              onClick={() => setFilters('')}
            >
              unselect all
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TagList;
