import styles from './tag.module.scss';
import classNames from 'classnames';
interface Props {
  name: string;
  fill: boolean;
  size: 'default' | 'large';
}

const Tag = ({ name, fill = true, size = 'default' }: Props) => {
  const tagClass = classNames(styles.tag, styles[size], {
    [styles.fill]: fill
  });

  return <div className={tagClass}>{name}</div>;
};

export default Tag;
