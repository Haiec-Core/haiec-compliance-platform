import { useCallback, useEffect, useRef } from "react";

type TimeoutCallback = () => void;

export function useTimeout(
  callback: TimeoutCallback,
  delay: number | null,
  options: { enabled?: boolean } = { enabled: true },
) {
  const savedCallback = useRef<TimeoutCallback | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  const set = useCallback(() => {
    if (delay !== null && options.enabled) {
      timeoutRef.current = setTimeout(() => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }, delay);
    }
  }, [delay, options.enabled]);

  // Clear the timeout
  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Set up the interval and clear it on unmount
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  // Return methods to manually clear and reset the timeout
  return { clear, reset: set };
}
