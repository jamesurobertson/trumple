import { useEffect } from "react";

const useKeydownListener = ({ onEnter, onDelete, onAddLetter }) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (e.code === "Enter") {
        onEnter();
        return;
      }

      if (e.code === "Backspace") {
        onDelete();
        return;
      }
      const key = e.key.toUpperCase();
      if (key.length === 1 && key >= "A" && key <= "Z") {
        onAddLetter(key);
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onEnter, onDelete, onAddLetter]);
};

export default useKeydownListener;
