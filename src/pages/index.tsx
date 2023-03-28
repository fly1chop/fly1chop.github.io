import { styles, PostGrid, TagList } from '@/components/Home';
import { Client } from '@notionhq/client';
import { InferGetStaticPropsType } from 'next';
import { ResultItem } from '@/types/post';

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
  const notion = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN
  });
  const databaseId = process.env.NOTION_DATABASE_ID as string;
  const response = await notion.databases.query({
    database_id: databaseId
  });

  const formatResponse = (post: ResultItem) => {
    return {
      id: post.id,
      date: post.created_time,
      title: post.properties.Name.title[0].plain_text,
      tags: post.properties.Tags.multi_select
    };
  };

  const posts = response.results.map(result =>
    formatResponse(result as ResultItem)
  );

  return {
    props: {
      posts
    }
  };
}
