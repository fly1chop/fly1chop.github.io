import { PostResponse } from '@/types/post';
import PostCard from './post-card';
import styles from './post-grid.module.css';

const PostGrid = ({ posts }: { posts: PostResponse[] }) => {
  return (
    <ul className={styles.grid}>
      {posts.map(post => (
        <PostCard {...post} key={post.id} />
      ))}
    </ul>
  );
};

export default PostGrid;
