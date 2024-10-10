import { useEffect } from "react";

type EventType = MouseEvent | TouchEvent;

const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: (event: EventType) => void) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: EventType) => {
      // Do nothing if mousedown or touchstart started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    const validateEventStart = (event: EventType) => {
      startedWhenMounted = !!ref.current;
      startedInside = !!ref.current && ref.current.contains(event.target as Node);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
