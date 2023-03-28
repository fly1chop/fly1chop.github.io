import { styles, PostGrid, TagList } from '@/components/Home';
import { InferGetStaticPropsType } from 'next';
import { getAllPosts } from '@/utils/notion';

const HomePage = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.home}>
      <PostGrid posts={posts} />
      <TagList />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts
    }
  };
}
