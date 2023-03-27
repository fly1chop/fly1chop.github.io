import styles from './tag-list.module.css';

const TagList = () => {
  return (
    <div className={styles.tagList}>
      <ul>
        <li>Next</li>
        <li>React</li>
        <li>JS</li>
        <li>TS</li>
        <li>HTML</li>
      </ul>
    </div>
  );
};

export default TagList;
