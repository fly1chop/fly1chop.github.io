import { ResultItem } from '@/types/post';
import { Client } from '@notionhq/client';

export const getAllPosts = async () => {
  const notion = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN
  });
  const databaseId = process.env.NOTION_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: databaseId
  });

  const posts = response.results.map(result =>
    getPageData(result as ResultItem)
  );

  return posts;
};

const getPageData = (post: ResultItem) => {
  return {
    id: post.id,
    date: post.created_time,
    title: post.properties.Name.title[0].plain_text,
    tags: post.properties.Tags.multi_select
  };
};
