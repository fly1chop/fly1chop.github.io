import styles from './tag.module.css';

interface Props {
  name: string;
  fill: boolean;
  size: 'default' | 'large';
}

const Tag = ({ name, fill = true, size = 'default' }: Props) => {
  return <div className={[styles.tag, styles[size]].join(' ')}>{name}</div>;
};

export default Tag;
