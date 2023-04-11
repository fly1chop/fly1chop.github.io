import Tag from '../base/Tag';
import styles from './home.module.css';

const tags = ['Next', 'React', 'JS', 'TS', 'HTML'];

const TagList = () => {
  return (
    <div className={styles.tagList}>
      <ul>
        {tags.map(tag => (
          <Tag name={tag} fill={true} size="large" key={tag} />
        ))}
      </ul>
    </div>
  );
};

export default TagList;
