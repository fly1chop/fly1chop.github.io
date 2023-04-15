import { styles, PostGrid, TagList } from '@/components/Home';
import { InferGetStaticPropsType } from 'next';
import { getAllPosts, getDatabaseTags } from '@/lib/notion';
import FiltersProvider from '@/context/filters';

const HomePage = ({
  posts,
  tags
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <FiltersProvider>
      <div className={styles.home}>
        <PostGrid posts={posts} />
        <TagList tags={tags} />
      </div>
    </FiltersProvider>
  );
};

export default HomePage;

export async function getStaticProps() {
  const posts = await getAllPosts();
  const tags = await getDatabaseTags();

  return {
    props: {
      posts,
      tags
    }
  };
}
