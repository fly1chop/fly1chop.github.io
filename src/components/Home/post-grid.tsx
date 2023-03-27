import PostCard from './post-card';
import styles from './post-grid.module.css';

interface Post {
  tags: string[];
  title: string;
  date: string;
  postId: string;
}

interface Props {
  posts: Post[];
}

const PostGrid = ({ posts }: Props) => {
  return (
    <div>
      <ul className={styles.grid}>
        {posts.map(post => (
          <PostCard {...post} key={post.postId} />
        ))}
      </ul>
    </div>
  );
};

export default PostGrid;
