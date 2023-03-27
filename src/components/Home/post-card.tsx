import Link from 'next/link';

interface Props {
  tags: string[];
  title: string;
  date: string;
  postId: string;
}

const PostCard = ({ tags, title, date, postId }: Props) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <li>
      <Link href={`/post/${postId}`}>
        <ul>
          {tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <h3>{title}</h3>
        <p>{formattedDate}</p>
      </Link>
    </li>
  );
};

export default PostCard;
