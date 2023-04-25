import { styles, PostGrid, TagList } from '@/components/Home';
import { InferGetStaticPropsType } from 'next';
import { getAllPosts, getDatabaseTags } from '@/lib/notion';
import FiltersProvider from '@/context/filters';
import Header from '@/components/layout/header';

const HomePage = ({
  posts,
  tags
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header />
      <FiltersProvider>
        <div className={styles.home}>
          <PostGrid posts={posts} />
          <TagList tags={tags} />
        </div>
      </FiltersProvider>
    </>
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
    },
    revalidate: 60
  };
}
