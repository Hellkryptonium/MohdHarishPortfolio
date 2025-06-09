import { useEffect, useRef } from "react";

// Konami code sequence: up, up, down, down, left, right, left, right, b, a
const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onSuccess: () => void) {
  const position = useRef(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key;
      if (key === KONAMI_SEQUENCE[position.current]) {
        position.current += 1;
        if (position.current === KONAMI_SEQUENCE.length) {
          onSuccess();
          position.current = 0;
        }
      } else {
        position.current = 0;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSuccess]);
}
