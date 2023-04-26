import Header from '@/components/layout/header';
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
interface PageProps {
  recordMap: ExtendedRecordMap;
  metadata: PostResponse;
}

const PostDetailPage = ({ recordMap, metadata }: PageProps) => {
  if (!recordMap) {
    return null;
  }

  const pageBlock = recordMap.block[metadata.id];
  const toc = getPageTableOfContents(pageBlock.value as PageBlock, recordMap);

  return (
    <>
      <Header title={metadata.title} />
      <div className={styles.post}>
        <NotionContent
          recordMap={recordMap}
          title={metadata.title}
          tags={metadata.tags}
          date={metadata.date}
        />
        <aside>
          <TableOfContent toc={toc} />
        </aside>
      </div>
    </>
  );
};

export default PostDetailPage;

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as Params;
  const { recordMap, metadata } = await getSinglePostBySlug(slug);

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
