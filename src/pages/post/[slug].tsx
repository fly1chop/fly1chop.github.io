import { getAllPosts, getSingleBlogPostBySlug } from '@/lib/notion';
import { PostDetailResponse } from '@/types/post';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import ReactMarkdown from 'react-markdown';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  post: PostDetailResponse;
}

const PostDetailPage = ({ post }: Props) => {
  const { metadata, markdown } = post;
  return (
    <section>
      <h2>{metadata.title}</h2>
      <p>{metadata.date}</p>
      {metadata.tags.map(tag => (
        <span key={tag.id}>{tag.name}</span>
      ))}
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  );
};

export default PostDetailPage;

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params! as Params;
  const post = await getSingleBlogPostBySlug(slug);

  return {
    props: {
      post
    }
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
