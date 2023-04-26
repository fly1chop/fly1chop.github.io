import styles from './layout.module.scss';
import useWindowWidth from '@/hooks/useWindowWidth';
import NavList from './nav-list';
import { useRef } from 'react';
import useClickAway from '@/hooks/useClickAway';

const Nav = () => {
  const windowWidth = useWindowWidth();
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useClickAway(e => {
    const button = btnRef.current;
    if (!button) return;

    if (!button.classList.contains(styles.active)) return;
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.closest('#menu')) return;

    button.setAttribute('aria-expanded', 'false');
    button.classList.remove(styles.active);
  });

  const handleClick = () => {
    const button = btnRef.current;
    if (!button) return;

    const isOpen = button.classList.contains('active');
    const nextOpenState = String(!isOpen); // TS overrides toString() for booleans

    button.setAttribute('aria-expanded', nextOpenState);
    button.classList.toggle(styles.active);
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
