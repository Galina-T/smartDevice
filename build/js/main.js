'use strict';

(function () {

  var OVERLAY_HIDDEN_CLASS = 'overlay--hidden';
  var LOCAL_STORAGE_KEY = 'smartDeviceData';
  var ESC_KEY_CODE = 27;
  var onlyNumberRegEx = /^\+?\d[ (-]?\d{3}[ )-]?\d{3}([ -]?\d{2}){2}$/gi;

  var contactBtn = document.querySelector('.header-contacts__btn');
  var modalOverlay = document.querySelector('.overlay');
  var modalCLoseBtn = document.querySelector('.modal-cart__btn--close');
  var inputTextModal = document.querySelector('#name-field-modal');
  var inputTelModal = document.querySelector('#tel-field-modal');
  var inputCommentModal = document.querySelector('#comment-field-modal');
  var checkbox = document.querySelector('#consent-checkbox-modal');
  var submitBtn = document.querySelector('.form__submit');

  var elements = [contactBtn, modalOverlay, modalCLoseBtn, inputTextModal, inputTelModal, inputCommentModal, submitBtn];
  var isOk = elements.every(window.vendor.checkElem);

  if (!isOk) {
    return;
  }

  var lockScroll = window.vendor.lockScroll;
  var unlockScroll = window.vendor.unlockScroll;

  function addHandlers() {
    modalCLoseBtn.addEventListener('click', closeModalClickHandler);
    modalOverlay.addEventListener('mousedown', closeModalClickHandlerOverlay);
    submitBtn.addEventListener('click', applyModalHandler);
    inputTextModal.addEventListener('input', inputChangeHandler);
    inputTelModal.addEventListener('input', telChangeHandler);
    inputCommentModal.addEventListener('input', inputChangeHandler);
    document.body.addEventListener('keydown', closeModalKeyDownHandler);
  }

  function removeHandlers() {
    modalCLoseBtn.removeEventListener('click', closeModalClickHandler);
    modalOverlay.removeEventListener('mousedown', closeModalClickHandlerOverlay);
    submitBtn.removeEventListener('click', applyModalHandler);
    inputTextModal.removeEventListener('input', inputChangeHandler);
    inputTelModal.removeEventListener('input', telChangeHandler);
    inputCommentModal.removeEventListener('input', inputChangeHandler);
    document.body.removeEventListener('keydown', closeModalKeyDownHandler);
  }

  function checkValide(el) {
    if (el.value) {
      return;
    }
    el.classList.add('invalid-input');
  }

  function removeInvalide(el) {
    el.classList.remove('invalid-input');
  }

  function closeModalClickHandler(evt) {
    evt.preventDefault();

    modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
    removeHandlers();
    unlockScroll();
  }

  function closeModalClickHandlerOverlay(evt) {
    function mouseupHandler(evt_) {
      if (evt_.target === modalOverlay) {
        evt_.preventDefault();
        modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
        removeHandlers();
        unlockScroll();
      }
      modalOverlay.removeEventListener('mouseup', mouseupHandler);
    }

    if (evt.target === modalOverlay) {
      modalOverlay.addEventListener('mouseup', mouseupHandler);
    }
  }

  function closeModalKeyDownHandler(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);

      removeHandlers();
      unlockScroll();
    }
  }

  function inputChangeHandler(evt) {
    if (!evt.target.checkValidity() && evt.target.value !== '') {
      removeInvalide(evt.target);
    }
  }

  function telChangeHandler(evt) {
    if (!evt.target.checkValidity() && evt.target.value !== '' && onlyNumberRegEx.test(evt.target.value.trim())) {
      removeInvalide(evt.target);
      evt.target.setCustomValidity('');
    }
  }

  function applyModalHandler(evt) {
    inputTelModal.setCustomValidity('');

    if (
      !inputTextModal.checkValidity() ||
      !inputTelModal.checkValidity() ||
      !inputCommentModal.checkValidity() ||
      !checkbox.checkValidity()
    ) {
      checkValide(inputTextModal);
      checkValide(inputTelModal);
      checkValide(inputCommentModal);
      return;
    }

    if (!onlyNumberRegEx.test(inputTelModal.value.trim())) {
      inputTelModal.classList.add('invalid-input');
      inputTelModal.setCustomValidity('Not valid phone number');
      return;
    }

    if (!checkbox.checked) {
      checkbox.setCustomValidity('required');
      return;
    }

    removeInvalide(inputTextModal);
    removeInvalide(inputTelModal);
    removeInvalide(inputCommentModal);

    evt.preventDefault();

    var json = JSON.stringify({
      text: inputTextModal.value,
      tel: inputTelModal.value,
      comment: inputCommentModal.value
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, json);
    inputTextModal.value = '';
    inputTelModal.value = '';
    inputCommentModal.value = '';

    modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
    removeHandlers();
    unlockScroll();
  }

  contactBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (!modalOverlay.classList.contains(OVERLAY_HIDDEN_CLASS)) {
      return;
    }

    modalOverlay.classList.remove(OVERLAY_HIDDEN_CLASS);

    // var data = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if (data !== null) {
    //   var parsedData = JSON.parse(data);
    //   inputTextModal.value = parsedData.text;
    //   inputTelModal.value = parsedData.tel;
    //   inputCommentModal.value = parsedData.comment;
    // }

    inputTextModal.focus();
    addHandlers();
    lockScroll();
  });
})();

(function () {

  var HIDDEN_CLASS = 'hidden';
  var TOGGLE_HIDDEN_CLASS = 'page-footer__toggle--close';
  var TOGGLE_SHOW_CLASS = 'page-footer__toggle--open';
  var TEXT_OPEN = 'Развернуть';
  var TEXT_CLOSE = 'Свернуть';

  var footerNav = document.querySelector('.footer-nav');
  var footerContacts = document.querySelector('.footer-contacts');
  var btnToggleInFooterNav = footerNav.querySelector('.page-footer__toggle');
  var btnToggleInFooterContacts = footerContacts.querySelector('.page-footer__toggle');

  var footerNavList = document.querySelector('.footer-nav__list');
  var footerContactsList = document.querySelector('.footer-contacts__list');

  var elements = [footerNav, footerContacts, btnToggleInFooterNav, btnToggleInFooterContacts, footerNavList, footerContactsList];

  var isOk = elements.every(window.vendor.checkElem);

  if (!isOk) {
    return;
  }

  function transformBtnAndList(btn, list) {

    btn.classList.toggle(TOGGLE_HIDDEN_CLASS);
    btn.classList.toggle(TOGGLE_SHOW_CLASS);

    var btnText = btn.innerText;

    btn.innerText = btnText === TEXT_OPEN ? TEXT_CLOSE : TEXT_OPEN;

    list.classList.toggle(HIDDEN_CLASS);
  }

  function handler(evt) {
    evt.preventDefault();
    transformBtnAndList(btnToggleInFooterNav, footerNavList);
    transformBtnAndList(btnToggleInFooterContacts, footerContactsList);
  }

  function addHandlers() {
    footerNav.addEventListener('click', handler);
    footerContacts.addEventListener('click', handler);
  }

  addHandlers();
})();

(function () {

  var anchors = document.querySelectorAll('a.scroll-to');
  var velocity = 0.4;

  Array.prototype.forEach.call(anchors, function (el) {
    el.addEventListener('click', function (evt) {
      var hash = evt.target.hash;
      var elem = document.querySelector(hash);
      if (elem === null) {
        return;
      }

      evt.preventDefault();
      var pageYOffset = window.pageYOffset;
      var elemYOffset = elem.getBoundingClientRect().top;

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
