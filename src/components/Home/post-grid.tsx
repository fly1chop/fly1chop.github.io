import { PostResponse } from '@/types/post';
import PostCard from './post-card';
import styles from './home.module.css';

const PostGrid = ({ posts }: { posts: PostResponse[] }) => {
  return (
    <ul className={styles.postGrid}>
      {posts.map(post => (
        <PostCard {...post} key={post.id} />
      ))}
    </ul>
  );
};

export default PostGrid;
