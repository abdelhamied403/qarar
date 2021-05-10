export const debounce = (() => {
  let interval = null;
  return callback => {
    if (interval) clearInterval(interval);
    interval = setTimeout(callback, 200);
  };
})();
