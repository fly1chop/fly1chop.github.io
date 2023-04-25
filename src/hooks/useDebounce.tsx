import { useEffect, useRef } from 'react';

type Func = (...args: unknown[]) => void;
type Timer = ReturnType<typeof setTimeout>;

const useDebounce = (fn: Func, delay = 1000) => {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      fn(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
};

export default useDebounce;
