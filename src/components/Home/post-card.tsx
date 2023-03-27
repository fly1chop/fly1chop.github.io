import { PostResponse } from '@/types/post';
import Link from 'next/link';

const PostCard = ({ tags, title, date, id }: PostResponse) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <li>
      <Link href={`/post/${id}`}>
        <ul>
          {tags.map(tag => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
        <h3>{title}</h3>
        <p>{formattedDate}</p>
      </Link>
    </li>
  );
};

export default PostCard;
