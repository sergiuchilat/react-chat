export const scrollToBottom = (el, timeout = 500) => {
  setTimeout(() => {
    if (el.current) {
      el.current.scroll({
        top: el.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, timeout);
};
