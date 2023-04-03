import { getAllPosts, getSingleBlogPostBySlug } from '@/lib/notion';
import { PostDetailResponse } from '@/types/post';
import { Client } from '@notionhq/client';
import { GetStaticProps } from 'next';
import { NotionToMarkdown } from 'notion-to-md';
import { ParsedUrlQuery } from 'querystring';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  post: PostDetailResponse;
  // mdblocks: unknown;
}

interface CodeBlockProps {
  language: string;
  codestring: string;
}

const CodeBlock = ({ language, codestring }: CodeBlockProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SyntaxHighlighter language={language} style={oneDark} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  );
};
const PostDetailPage = ({ post }: Props) => {
  // console.log(mdblocks);
  const { metadata, markdown } = post;
  return (
    <section>
      <h2>{metadata.title}</h2>
      <p>{metadata.date}</p>
      {metadata.tags.map(tag => (
        <span key={tag.id}>{tag.name}</span>
      ))}
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codestring = String(children).replace(/\n$/, '');
            return !inline && match ? (
              <CodeBlock codestring={codestring} language={match[1]} />
            ) : (
              <code className="inline" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </section>
  );
};

export default PostDetailPage;

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as Params;
  const post = await getSingleBlogPostBySlug(slug);
  const notion = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN
  });
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(slug);

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
