const mod = (z: number, n: number) => {
  const m = ((z % n) + n) % n;
  return m < 0 ? m + Math.abs(n) : m;
};

const unifyTouchEvent = (event: TouchEvent|Touch): number => {
  return (event as TouchEvent).changedTouches ?
      (event as TouchEvent).changedTouches[0].clientX :
      (event as Touch).clientX;
};

export {mod, unifyTouchEvent};
