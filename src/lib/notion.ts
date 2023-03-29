import { ResultItem } from '@/types/post';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN
});
const databaseId = process.env.NOTION_DATABASE_ID as string;

export const getAllPosts = async () => {
  const response = await notion.databases.query({
    database_id: databaseId
  });

  console.log(response);

  const posts = response.results.map(result =>
    getAllPostsMetaData(result as ResultItem)
  );

  return posts;
};

// const getAllPostsMetaData = (post: ResultItem) => {
//   return {
//     id: post.id,
//     date: post.created_time,
//     title: post.properties.Name.title[0].plain_text,
//     tags: post.properties.Tags.multi_select
//   };
// };

const getAllPostsMetaData = (post: ResultItem) => {
  return {
    title: post.properties.Name.title[0].plain_text,
    tags: post.properties.Tags.multi_select,
    date: post.created_time,
    slug: post.properties.Slug.formula.string
  };
};

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getSingleBlogPostBySlug = async (slug: string) => {
  const response = await notion.databases.query({
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

  console.log(response);

  const page = response.results[0];

  const metadata = getAllPostsMetaData(page as ResultItem);
  const mdblocks = await n2m.pageToMarkdown(slug);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString
  };
};
