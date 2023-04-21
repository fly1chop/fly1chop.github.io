import { PostResponse } from '@/types/post';
import Link from 'next/link';
import Tag from '../base/Tag';
import styles from './home.module.scss';

const PostCard = ({ tags, title, date, slug }: PostResponse) => {
  return (
    <li className={styles.postCard}>
      <Link href={`/post/${slug}`}>
        <ul>
          {tags.map(tag => (
            <li key={tag.id}>
              <Tag name={tag.name} fill={true} size="default" />
            </li>
          ))}
        </ul>
        <h3>{title}</h3>
        <p>{date}</p>
      </Link>
    </li>
  );
};

export default PostCard;
