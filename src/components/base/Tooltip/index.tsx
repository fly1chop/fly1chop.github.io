import { useState } from 'react';
import styles from './tooltip.module.css';

interface Props {
  title: string;
  position: 'top' | 'left' | 'right' | 'bottom';
}

const ToolTip = ({
  children,
  title,
  position
}: React.PropsWithChildren<Props>) => {
  const [isShow, setIsShow] = useState(false);

  const show = () => {
    setIsShow(true);
  };

  const hide = () => {
    setIsShow(false);
  };

  return (
    <div
      className={styles.tooltip__wrapper}
      onMouseEnter={show}
      onFocus={show}
      onMouseLeave={hide}
      onBlur={hide}
    >
      {children}
      {isShow && (
        <div className={[styles.tooltip__body, styles[position]].join(' ')}>
          {title}
        </div>
      )}
    </div>
  );
};

export default ToolTip;

// https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/
