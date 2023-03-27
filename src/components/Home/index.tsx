import { dummyPosts } from '@/utils/dummyPosts';
import PostGrid from './post-grid';
import styles from './home.module.css';
import TagList from './tag-list';

const Home = () => {
  return (
    <div className={styles.home}>
      <PostGrid posts={dummyPosts} />
      <TagList />
    </div>
  );
};

export default Home;
