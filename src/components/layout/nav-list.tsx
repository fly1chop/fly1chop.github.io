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
        <ToolTip title="홈" position={position}>
          <Link href="/">
            <Image
              src="/home.svg"
              alt="Home"
              width={25}
              height={22.63}
              aria-label="home"
            />
          </Link>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="Github" position={position}>
          <a href="https://github.com/fly1chop">
            <Image
              src="/github.svg"
              alt="github"
              width={25}
              height={24.39}
              aria-label="github"
            />
          </a>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="LinkedIn" position={position}>
          <a href="https://www.linkedin.com/in/janejiwonro/">
            <Image
              src="/linkedin.svg"
              alt="LinkedIn"
              width={25}
              height={24.39}
              aria-label="LinkedIn"
            />
          </a>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="이력서" position={position}>
          <Link href="/resume">
            <Image
              src="/resume.svg"
              alt="Resume"
              width={25}
              height={25}
              aria-label="resume"
            />
          </Link>
        </ToolTip>
      </li>
      <li>
        <ToolTip title="포트폴리오" position={position}>
          <Link href="/portfolio">
            <Image
              src="/portfolio.svg"
              alt="Portfolio"
              width={25}
              height={20.83}
              aria-label="portfolio"
            />
          </Link>
        </ToolTip>
      </li>
    </ul>
  );
};

export default NavList;
