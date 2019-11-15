'use strict';

(function () {

  var anchors = document.querySelectorAll('a.scroll-to');

  function scrollToClickHandler(evt) {
    evt.preventDefault();

    var blockId = evt.currentTarget.getAttribute('href');

    document.querySelector(blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function addHadlers(el) {
    el.addEventListener('click', scrollToClickHandler);
  }

  anchors.forEach(addHadlers);

})();
