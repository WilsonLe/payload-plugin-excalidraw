import { useCallback, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DebounceResult<T extends (...args: any[]) => any> {
  clear: () => void;
  isPending: () => boolean;
  run: (...args: Parameters<T>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): DebounceResult<T> {
  const timerRef = useRef<null | Timer>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const run = useCallback(
    (...args: Parameters<T>) => {
      clear();
      timerRef.current = setTimeout(() => {
        callback(...args);
        timerRef.current = null;
      }, delay);
    },
    [callback, delay, clear],
  );

  const isPending = useCallback(() => timerRef.current !== null, []);

  return { clear, isPending, run };
}
