import { PostResponse } from '@/types/post';
import PostCard from './post-card';
import styles from './home.module.scss';
import { useFilters } from '@/context/filters';

const PostGrid = ({ posts }: { posts: PostResponse[] }) => {
  const { filters } = useFilters();

  const filteredPosts =
    filters.length > 0
      ? posts.filter(post => post.tags.find(tag => filters.includes(tag.name)))
      : posts;

  return (
    <>
      <p className={styles.countPosts}>{filteredPosts.length} posts</p>
      <ul className={styles.postGrid}>
        {filteredPosts.map(post => (
          <PostCard {...post} key={post.slug} />
        ))}
      </ul>
    </>
  );
};

export default PostGrid;
