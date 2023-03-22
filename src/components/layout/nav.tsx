import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import ToolTip from './tooltip';

const Nav = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <ToolTip title="홈" position="left">
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
            <ToolTip title="Github" position="left">
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
            <ToolTip title="LinkedIn" position="left">
              <a href="https://www.linkedin.com/in/janejiwonro/">
                <Image
                  src="/linkedIn.svg"
                  alt="LinkedIn"
                  width={25}
                  height={24.39}
                  aria-label="LinkedIn"
                />
              </a>
            </ToolTip>
          </li>
          <li>
            <ToolTip title="이력서" position="left">
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
            <ToolTip title="포트폴리오" position="left">
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
      </nav>
    </header>
  );
};

export default Nav;
