'use strict';

(function () {

  var anchors = document.querySelectorAll('a.scroll-to');
  var velocity = 0.4;

  Array.prototype.forEach.call(anchors, function (el) {
    el.addEventListener('click', function (evt) {
      evt.preventDefault();
      var hash = evt.target.hash;
      var pageYOffset = window.pageYOffset;
      var elemYOffset = document.querySelector(hash).getBoundingClientRect().top;

      var start = null;
      function step(timestamp) {
        if (start === null) {
          start = timestamp;
        }

        var progress = timestamp - start;
        var offset =
          elemYOffset < 0
            ? Math.max(pageYOffset - progress / velocity, pageYOffset + elemYOffset)
            : Math.min(pageYOffset + progress / velocity, pageYOffset + elemYOffset);

        window.scrollTo(0, offset);
        if (offset !== pageYOffset + elemYOffset) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }

      requestAnimationFrame(step);
    });
  });
})();

