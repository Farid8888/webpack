/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./analithycs.ts ***!
  \***********************/
const createAnalitycs = () => {
  let counter = 0;
  let isdestroyed = false;
  const listener = () => counter++;
  document.addEventListener('click', listener);
  return {
    destroy() {
      document.removeEventListener('click', listener);
      isdestroyed = true;
    },
    getClicks() {
      if (isdestroyed) {
        return `analythics is destroyen counter is ${counter}`;
      }
      return counter;
    }
  };
};
window['analithycs'] = createAnalitycs();
/******/ })()
;
//# sourceMappingURL=analithycs..js.map