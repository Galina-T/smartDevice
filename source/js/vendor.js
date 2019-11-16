'use strict';

(function () {
  function checkElem(node) {
    return node !== null;
  }

  function lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
  }

  window.vendor = {
    checkElem: checkElem,
    lockScroll: lockScroll,
    unlockScroll: unlockScroll
  };
})();
