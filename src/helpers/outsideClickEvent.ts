export const hideOnClickOutside = (element: any) => {
  const outsideClickListener = (event: any) => {
    if (!element.contains(event.target) && isVisible(element)) {
      // or use: event.target.closest(selector) === null
      element.style.display = 'none';
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };

  document.addEventListener('click', outsideClickListener);
};

const isVisible = (elem: any) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
