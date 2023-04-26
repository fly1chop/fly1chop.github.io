import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'];

function useClickAway<T extends HTMLElement>(handler: (e: Event) => void) {
  const ref = useRef<T>(null);
  const savedHandler = useRef(handler);

  if (savedHandler.current === null) savedHandler.current = handler;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e: Event) => {
      if (!(e.target instanceof Node)) return;

      !element.contains(e.target) && savedHandler.current(e);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent, { passive: true });
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  });

  return ref;
}

export default useClickAway;
