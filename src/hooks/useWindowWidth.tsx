import { useEffect, useState } from 'react';
import styles from '@/components/layout/layout.module.scss';
// import useDebounce from './useDebounce';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>();
  const breakpoint = parseInt(styles.tabletWidth);

  // using debounce doesn't look great when it's used for changing page layout (the menu button will appear out of sync with real-time window resize)
  // const getWindowWidth = useDebounce(() => {
  //   setWindowWidth(window.innerWidth);
  // }, 300);
  // alternative would be to only setState when I reach target width...

  useEffect(() => {
    const getWindowWidth = () => {
      if (window.innerWidth <= breakpoint) {
        setWindowWidth(window.innerWidth);
      } else if (windowWidth === breakpoint + 1) {
        return;
      } else {
        setWindowWidth(breakpoint + 1);
      }
    };

    if (!windowWidth) {
      getWindowWidth();
    }

    window.addEventListener('resize', getWindowWidth);
    return () => window.removeEventListener('resize', getWindowWidth);
  }, [breakpoint, windowWidth]);

  return windowWidth;
};

export default useWindowWidth;
