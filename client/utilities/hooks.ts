import { useEffect, MutableRefObject, useState, useCallback } from 'react';
import { debounce } from './delay';

export function useInterval(callback: Function, delay: number) {
  let currentCallback: Function;
  let id = -1;

  useEffect(() => {
    currentCallback = callback;
  }, [callback]);

  useEffect(() => {
    if (delay < 0) {
      clearInterval(id);
      id = -1;
      return null;
    }

    id = setInterval(() => currentCallback(), delay);
    return (): void => clearInterval(id);
  }, [delay]);
}

export function useOnClickOutside(ref: MutableRefObject<Node>, handler: Function) {
  function listener(event: Event) {
    if (
      !ref.current ||
      (event.target instanceof Node && ref.current.contains(event.target))
    ) {
      return;
    }
    handler(event);
  }

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
}

export function useOnResize(handler?: Function) {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [containerSize, setContainerSize] = useState(getSize());

  function handleResize() {
    setContainerSize(getSize());
    if (typeof handler === 'function') handler(containerSize);
  }

  useEffect(() => {
    if (!isClient) return null;
    const debouncedHandleResize = debounce(handleResize, 100, false);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return containerSize;
}

export function useOnElementResize(
  container?: MutableRefObject<HTMLElement>,
  handler?: Function
) {
  function getSize() {
    if (container && container.current) {
      return {
        width: container.current.clientWidth,
        height: container.current.clientHeight
      };
    }
    return { width: 0, height: 0 };
  }

  const [containerSize, setContainerSize] = useState(getSize());

  function handleResize() {
    const currentSize = getSize();
    setContainerSize(currentSize);

    if (typeof handler === 'function') handler(currentSize);
  }

  useEffect(() => {
    if (!container || !container.current || !container.current.clientWidth) return null;
    const debouncedHandleResize = debounce(handleResize, 200, false);
    debouncedHandleResize();
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [container]);

  return containerSize;
}
