import { styles, TableOfContent, NotionContent } from '@/components/Posts';
import { getAllPosts, getSinglePostBySlug } from '@/lib/notion';
import { PostResponse } from '@/types/post';
import { GetStaticProps } from 'next';
import { ExtendedRecordMap, PageBlock } from 'notion-types';
import { getPageTableOfContents } from 'notion-utils';
import { ParsedUrlQuery } from 'querystring';
interface Params extends ParsedUrlQuery {
  slug: string;
}
interface Props {
  recordMap: ExtendedRecordMap;
  metadata: PostResponse;
}

const PostDetailPage = ({ recordMap, metadata }: Props) => {
  if (!recordMap) {
    return null;
  }

  console.log(metadata);
  const pageBlock = recordMap.block[metadata.id];
  const toc = getPageTableOfContents(pageBlock.value as PageBlock, recordMap);
  console.log(toc);

  return (
    <div className={styles.post}>
      <NotionContent recordMap={recordMap} title={metadata.title} />
      <aside>
        <TableOfContent toc={toc} />
      </aside>
    </div>
  );
};

export default PostDetailPage;

// const notionClient = new Client({
//   auth: process.env.NOTION_ACCESS_TOKEN
// });
// const databaseId = process.env.NOTION_DATABASE_ID as string;

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as Params;
  const { recordMap, metadata } = await getSinglePostBySlug(slug);
  // const response = await notionClient.databases.query({
  //   database_id: databaseId,
  //   filter: {
  //     property: 'Slug',
  //     formula: {
  //       string: {
  //         equals: slug
  //       }
  //     }
  //   }
  // });

  // const page = response.results[0];

  return {
    props: {
      recordMap,
      metadata
    },
    revalidate: 60
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking'
  };
};
