'use strict';

(function () {

  var HIDDEN_CLASS = 'hidden';
  var TOGGLE_CLASS = '.page-footer__toggle';
  var TOGGLE_HIDDEN_CLASS = 'page-footer__toggle--close';
  var TOGGLE_SHOW_CLASS = 'page-footer__toggle--open';
  var TEXT_OPEN = 'Развернуть';
  var TEXT_CLOSE = 'Свернуть';

  var itemsToggle = document.querySelectorAll('.item-toggle');
  var btnsToggle = document.querySelectorAll('.page-footer__toggle');

  var btnUnHiddenCollection = document.getElementsByClassName(TOGGLE_SHOW_CLASS);

  var footerNav = document.querySelector('.footer-nav');
  var footerContacts = document.querySelector('.footer-contacts');

  var btnToggleInFooterNav = footerNav.querySelector('.page-footer__toggle');
  var btnToggleInFooterContacts = footerContacts.querySelector('.page-footer__toggle');
  var footerNavList = document.querySelector('.footer-nav__list');
  var footerContactsList = document.querySelector('.footer-contacts__list');

  var elements = [itemsToggle, btnsToggle, footerNav, footerContacts, btnToggleInFooterNav, btnToggleInFooterContacts, footerNavList, footerContactsList];

  var isOk = elements.every(window.vendor.checkElem);

  if (!isOk) {
    return;
  }

  function replaceBtn(btn) {
    btn.classList.toggle(TOGGLE_HIDDEN_CLASS);
    btn.classList.toggle(TOGGLE_SHOW_CLASS);

    var btnText = btn.innerText;

    btn.innerText = btnText === TEXT_OPEN ? TEXT_CLOSE : TEXT_OPEN;
  }

  function replaceClass(el) {
    el.classList.toggle(HIDDEN_CLASS);
  }

  function closeItem(item) {
    if (!item.classList.contains(HIDDEN_CLASS)) {
      replaceClass(item);
    }
    return;
  }

  function transformBtnAndList(btn, list) {

    if (list.classList.contains(HIDDEN_CLASS)) {
      itemsToggle.forEach(closeItem);
      Array.prototype.forEach.call(btnUnHiddenCollection, function (el) {
        replaceBtn(el);
      });
    }
    replaceClass(list);
    replaceBtn(btn);
  }

  function handler(evt) {
    evt.preventDefault();

    var btn = evt.currentTarget.querySelector(TOGGLE_CLASS);
    var list = evt.currentTarget.querySelector('.item-toggle');

    transformBtnAndList(btn, list);
  }

  function addHandlers() {
    footerNav.addEventListener('click', handler);
    footerContacts.addEventListener('click', handler);
  }

  addHandlers();
})();

(function () {

  var OVERLAY_HIDDEN_CLASS = 'overlay--hidden';
  var CHECKBOX_INVALID_CLASS = 'form__agree--invalid';
  var LOCAL_STORAGE_KEY = 'smartDeviceData';
  var ESC_KEY_CODE = 27;
  var onlyNumberRegEx = /^\+?\d[ (-]?\d{3}[ )-]?\d{3}([ -]?\d{2}){2}$/g;

  var modal = document.querySelector('.modal-cart');
  var contactBtn = document.querySelector('.header-contacts__btn');
  var modalOverlay = document.querySelector('.overlay');
  var modalCLoseBtn = modal.querySelector('.modal-cart__btn--close');
  var inputTextModal = modal.querySelector('#name-field-modal');
  var inputTelModal = modal.querySelector('#tel-field-modal');
  var inputCommentModal = modal.querySelector('#comment-field-modal');
  var checkbox = modal.querySelector('#consent-checkbox-modal');
  var submitBtn = modal.querySelector('button[type="submit"]');
  var formAgree = modal.querySelector('.form__agree');

  var feedbackForm = document.querySelector('.feedback');
  var inputTextForm = feedbackForm.querySelector('#name-field');
  var inputTelForm = feedbackForm.querySelector('#tel-field');
  var inputCommentForm = feedbackForm.querySelector('#comment-field');
  var checkboxForm = feedbackForm.querySelector('#consent-checkbox');
  var submitBtnForm = feedbackForm.querySelector('button[type="submit"]');
  var formAgreeForm = feedbackForm.querySelector('.form__agree');

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
    checkbox.addEventListener('click', checkboxModalHandler);
    inputTelModal.addEventListener('input', telInputHandler);
    document.body.addEventListener('keydown', closeModalKeyDownHandler);
  }

  function removeHandlers() {
    modalCLoseBtn.removeEventListener('click', closeModalClickHandler);
    modalOverlay.removeEventListener('mousedown', closeModalClickHandlerOverlay);
    submitBtn.removeEventListener('click', applyModalHandler);
    checkbox.removeEventListener('click', checkboxModalHandler);
    inputTelModal.removeEventListener('input', telInputHandler);
    document.body.removeEventListener('keydown', closeModalKeyDownHandler);
  }

  function hideModal() {
    modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
    removeHandlers();
    unlockScroll();
  }

  function saveToLocalStorage(key, data) {
    var json = JSON.stringify(data);

    localStorage.setItem(key, json);
  }

  function closeModalClickHandler(evt) {
    evt.preventDefault();

    hideModal();
  }

  function showModal() {
    modalOverlay.classList.remove(OVERLAY_HIDDEN_CLASS);
    inputTextModal.focus();
    addHandlers();
    lockScroll();
  }

  function closeModalClickHandlerOverlay(evt) {
    function mouseupHandler(evt_) {
      if (evt_.target === modalOverlay) {
        evt_.preventDefault();
        hideModal();
      }
      modalOverlay.removeEventListener('mouseup', mouseupHandler);
    }

    if (evt.target === modalOverlay) {
      modalOverlay.addEventListener('mouseup', mouseupHandler);
    }
  }

  function closeModalKeyDownHandler(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      hideModal();
    }
  }

  function telInputHandler() {
    inputTelModal.setCustomValidity('');
  }

  function makeCheckboxHandler(formAgreeEl) {
    return function (evt) {
      if (evt.target.checked && formAgreeEl.classList.contains(CHECKBOX_INVALID_CLASS)) {
        formAgreeEl.classList.remove(CHECKBOX_INVALID_CLASS);
      }
    };
  }

  function makeApplyHandler(inputText, inputTel, inputComment, formAgreeEl, checkboxEl, isModal) {
    return function (evt) {
      inputTel.setCustomValidity('');

      if (
        !inputText.checkValidity() ||
        !inputTel.checkValidity() ||
        !inputComment.checkValidity()
      ) {
        return;
      }

      if (!checkboxEl.checked) {
        evt.preventDefault();
        formAgreeEl.classList.add(CHECKBOX_INVALID_CLASS);
        return;
      }

      if (!onlyNumberRegEx.test(inputTel.value.trim())) {
        inputTel.setCustomValidity('Not valid phone number');
        return;
      }

      evt.preventDefault();

      saveToLocalStorage(LOCAL_STORAGE_KEY, {
        text: inputText.value,
        tel: inputTel.value,
        comment: inputComment.value
      });

      inputText.value = '';
      inputTel.value = '';
      inputComment.value = '';

      if (isModal) {
        hideModal();
      }
    };
  }

  var applyModalHandler = makeApplyHandler(inputTextModal, inputTelModal, inputCommentModal, formAgree, checkbox, true);
  var applyFormHandler = makeApplyHandler(inputTextForm, inputTelForm, inputCommentForm, formAgreeForm, checkboxForm, false);
  var checkboxModalHandler = makeCheckboxHandler(formAgree);
  var checkboxFormHandler = makeCheckboxHandler(formAgreeForm);

  submitBtnForm.addEventListener('click', applyFormHandler);
  checkboxForm.addEventListener('click', checkboxFormHandler);

  contactBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (!modalOverlay.classList.contains(OVERLAY_HIDDEN_CLASS)) {
      return;
    }
    showModal();
  });
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
