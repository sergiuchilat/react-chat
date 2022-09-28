export const scrollToBottom = (el, timeout = 400) => {
  setTimeout(() => {
    if (el.current) {
      el.current.scroll({
        top: el.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, timeout);
};
