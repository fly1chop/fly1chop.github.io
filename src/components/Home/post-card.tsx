import { PostResponse } from '@/types/post';
import Link from 'next/link';

const PostCard = ({ tags, title, date, slug }: PostResponse) => {
  return (
    <li>
      <Link href={`/post/${slug}`}>
        <ul>
          {tags.map(tag => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
        <h3>{title}</h3>
        <p>{date}</p>
      </Link>
    </li>
  );
};

export default PostCard;
