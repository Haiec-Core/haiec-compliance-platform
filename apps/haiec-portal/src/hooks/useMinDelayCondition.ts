import { useCallback, useEffect, useRef, useState } from "react";

interface UseMinDelayConditionConfig {
  enabled: boolean;
  onComplete: () => void;
  minDelayMs: number;
  condition: boolean;
}

export function useMinDelayCondition({
  enabled,
  onComplete,
  minDelayMs,
  condition,
}: UseMinDelayConditionConfig) {
  const [isDelayMet, setIsDelayMet] = useState(false);
  const hasRunRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Update the ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimeoutSafely = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Effect for handling the minimum delay
  useEffect(() => {
    if (!enabled) {
      clearTimeoutSafely();
      setIsDelayMet(false);
      hasRunRef.current = false;
      return;
    }

    setIsDelayMet(false);
    hasRunRef.current = false;

    timeoutRef.current = setTimeout(() => {
      setIsDelayMet(true);
    }, minDelayMs);

    return clearTimeoutSafely;
  }, [enabled, minDelayMs, clearTimeoutSafely]);

  // Effect for checking conditions and calling onComplete
  useEffect(() => {
    if (enabled && isDelayMet && condition && !hasRunRef.current) {
      hasRunRef.current = true;
      onCompleteRef.current();
    }
  }, [enabled, isDelayMet, condition]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      clearTimeoutSafely();
      hasRunRef.current = false;
    };
  }, [clearTimeoutSafely]);
}
