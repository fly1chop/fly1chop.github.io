import { PostResponse } from '@/types/post';
import PostCard from './post-card';
import styles from './home.module.scss';

const PostGrid = ({ posts }: { posts: PostResponse[] }) => {
  return (
    <>
      <p className={styles.countPosts}>{posts.length} posts</p>
      <ul className={styles.postGrid}>
        {posts.map(post => (
          <PostCard {...post} key={post.slug} />
        ))}
      </ul>
    </>
  );
};

export default PostGrid;
