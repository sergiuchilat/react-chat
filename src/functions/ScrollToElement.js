export const scrollToElement = (el, timeout = 500) => {
  setTimeout(() => {
    el.scrollIntoView({
      behavior: 'smooth',
    });
  }, timeout);
};
