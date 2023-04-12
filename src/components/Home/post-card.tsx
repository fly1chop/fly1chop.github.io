import { PostResponse } from '@/types/post';
import Link from 'next/link';
import Tag from '../base/Tag';
import styles from './home.module.scss';

const PostCard = ({ tags, title, date, slug }: PostResponse) => {
  return (
    <Link href={`/post/${slug}`}>
      <li className={styles.postCard}>
        <ul>
          {tags.map(tag => (
            <li key={tag.id}>
              <Tag name={tag.name} fill={true} size="default" />
            </li>
          ))}
        </ul>
        <h3>{title}</h3>
        <p>{date}</p>
      </li>
    </Link>
  );
};

export default PostCard;
