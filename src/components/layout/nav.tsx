import styles from './layout.module.scss';
import useWindowWidth from '@/hooks/useWindowWidth';
import NavList from './nav-list';
import { useRef } from 'react';
import useClickAway from '@/hooks/useClickAway';

const Nav = () => {
  const windowWidth = useWindowWidth();
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useClickAway(e => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.closest('#menu')) return;

    btnRef.current?.setAttribute('aria-expanded', 'false');
    btnRef.current?.classList.remove(styles.active);
  });

  const handleClick = () => {
    if (btnRef.current === null) return;

    const isOpen = btnRef.current.classList.contains('active');
    const nextOpenState = String(!isOpen); // TS overrides toString() for booleans

    btnRef.current.setAttribute('aria-expanded', nextOpenState);
    btnRef.current.classList.toggle(styles.active);
  };

  return (
    <header className={styles.header}>
      {windowWidth && windowWidth <= parseInt(styles.tabletWidth) ? (
        <button
          className={styles.menuBtn}
          onClick={handleClick}
          ref={btnRef}
          id="menu"
          aria-label="show navigation menu"
        >
          <div />
        </button>
      ) : null}
      <nav className={styles.menuPanel} aria-labelledby="menu" ref={navRef}>
        <NavList />
      </nav>
    </header>
  );
};

export default Nav;
