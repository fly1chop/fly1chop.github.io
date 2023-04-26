import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';
import ToolTip, { ToolTipProps } from '../base/Tooltip';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useState } from 'react';

const NavList = () => {
  const windowWidth = useWindowWidth();
  const [position, setPosition] = useState<ToolTipProps['position']>('left');

  if (windowWidth) {
    if (windowWidth <= parseInt(styles.tabletWidth)) {
      if (position === 'left') {
        setPosition('right');
      }
    } else {
      if (position === 'right') {
        setPosition('left');
      }
    }
  }

  return (
    <ul className={styles.navList}>
      <li>
        <ToolTip title="Home" position={position}>
          <Link href="/">
            <Image src="/home.svg" alt="Home" fill aria-label="home" />
          </Link>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="Github" position={position}>
          <a href="https://github.com/fly1chop">
            <Image src="/github.svg" alt="github" fill aria-label="github" />
          </a>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="LinkedIn" position={position}>
          <a href="https://www.linkedin.com/in/janejiwonro/">
            <Image
              src="/linkedin.svg"
              alt="LinkedIn"
              fill
              aria-label="LinkedIn"
            />
          </a>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="Resume" position={position}>
          <Link href="/resume">
            <Image src="/resume.svg" alt="Resume" fill aria-label="resume" />
          </Link>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="Portfolio" position={position}>
          <Link href="/portfolio">
            <Image
              src="/portfolio.svg"
              alt="Portfolio"
              fill
              aria-label="portfolio"
            />
          </Link>
        </ToolTip>
      </li>
    </ul>
  );
};

export default NavList;
