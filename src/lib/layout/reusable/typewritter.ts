export const typewritter = (node: HTMLElement, { speed = 4, maxDuration = Infinity, delay = 0 }) => {
  const { textContent } = node;

  if (!textContent) {
    throw new Error("Can't apply typewritter transition to element without text content");
  }

  const duration = Math.min(maxDuration, textContent.length / (speed * 0.01));

  return {
    duration,
    delay,
    tick: (t: number) => {
      const end = Math.trunc(textContent.length * t);
      node.textContent = textContent.slice(0, end);
    }
  };
};