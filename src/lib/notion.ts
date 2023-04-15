import { ResultItem } from '@/types/post';
import { TagResult } from '@/types/tag';
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN
});
const databaseId = process.env.NOTION_DATABASE_ID as string;
const notionReact = new NotionAPI();

export const getDatabaseTags = async () => {
  const response = (await notionClient.databases.retrieve({
    database_id: databaseId
  })) as TagResult;

  const tags = response.properties.Tags.multi_select.options;

  return tags;
};

export const getAllPosts = async () => {
  const response = await notionClient.databases.query({
    database_id: databaseId
  });

  const posts = response.results.map(result =>
    getAllPostsMetaData(result as ResultItem)
  );

  return posts;
};

const getAllPostsMetaData = (post: ResultItem) => {
  const formattedDate = new Date(post.created_time).toLocaleDateString(
    'en-US',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  );

  return {
    title: post.properties.Name.title[0].plain_text,
    tags: post.properties.Tags.multi_select,
    date: formattedDate,
    slug: post.properties.Slug.formula.string,
    id: post.id
  };
};

export const getSinglePostBySlug = async (slug: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug
        }
      }
    }
  });

  const page = response.results[0];
  const metadata = getAllPostsMetaData(page as ResultItem);
  const recordMap = await notionReact.getPage(slug);

  return { metadata, recordMap };
};
