'use strict';

(function () {

  var HIDDEN_CLASS = 'hidden';
  var TOGGLE_HIDDEN_CLASS = 'page-footer__toggle--close';
  var TOGGLE_SHOW_CLASS = 'page-footer__toggle--open';
  var TEXT_OPEN = 'Развернуть';
  var TEXT_CLOSE = 'Свернуть';

  var itemToggles = document.querySelectorAll('.item-toggle');

  var footerNav = document.querySelector('.footer-nav');
  var footerContacts = document.querySelector('.footer-contacts');
  var btnToggleInFooterNav = footerNav.querySelector('.page-footer__toggle');
  var btnToggleInFooterContacts = footerContacts.querySelector('.page-footer__toggle');

  var footerNavList = document.querySelector('.footer-nav__list');
  var footerContactsList = document.querySelector('.footer-contacts__list');

  var elements = [itemToggles, footerNav, footerContacts, btnToggleInFooterNav, btnToggleInFooterContacts, footerNavList, footerContactsList];

  var isOk = elements.every(window.vendor.checkElem);

  if (!isOk) {
    return;
  }

  // function transformBtnAndList(btn, list) {

  //   btn.classList.toggle(TOGGLE_HIDDEN_CLASS);
  //   btn.classList.toggle(TOGGLE_SHOW_CLASS);

  //   var btnText = btn.innerText;

  //   btn.innerText = btnText === TEXT_OPEN ? TEXT_CLOSE : TEXT_OPEN;

  //   list.classList.toggle(HIDDEN_CLASS);
  // }

  // function handler(evt) {
  //   evt.preventDefault();
  //   transformBtnAndList(btnToggleInFooterNav, footerNavList);
  //   transformBtnAndList(btnToggleInFooterContacts, footerContactsList);
  // }

  // function addHandlers() {
  //   footerNav.addEventListener('click', handler);
  //   footerContacts.addEventListener('click', handler);
  // }

  // addHandlers();
})();

(function () {

  var OVERLAY_HIDDEN_CLASS = 'overlay--hidden';
  var LOCAL_STORAGE_KEY = 'smartDeviceData';
  var ESC_KEY_CODE = 27;
  var onlyNumberRegEx = /^[0-9]*$/;

  var contactBtn = document.querySelector('.header-contacts__btn');
  var modalOverlay = document.querySelector('.overlay');
  var form = modalOverlay.querySelector('form');
  var inputTextModal = form.querySelector('#name-field-modal');
  var inputTelModal = form.querySelector('#tel-field-modal');
  var inputCommentModal = form.querySelector('#comment-field-modal');
  var submitBtn = form.querySelector('.form__submit');
  var modalCLoseBtn = form.querySelector('.modal-cart__btn--close');

  var elements = [contactBtn, modalOverlay, form, modalCLoseBtn, inputTextModal, inputTelModal, inputCommentModal, submitBtn];
  var isOk = elements.every(window.vendor.checkElem);

  if (!isOk) {
    return;
  }

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('login');
  } catch (err) {
    isStorageSupport = false;
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

  contactBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalOverlay.classList.remove(OVERLAY_HIDDEN_CLASS);
    var animationTimeMs = 600;

    setTimeout(function () {
      if (storage) {
        inputTextModal.value = storage;
        inputTelModal.focus();
      } else {
        inputTextModal.focus();
      }
    }, animationTimeMs);
  });

  form.addEventListener('submit', function (evt) {
    if (!inputTextModal.value || !inputTelModal.value || !inputCommentModal.value) {
      evt.preventDefault();
      // modalOverlay.classList.add('modal-error');
      checkValide(inputTextModal);
      checkValide(inputTelModal);
      checkValide(inputCommentModal);
    } else {
      if (isStorageSupport) {
        localStorage.setItem('login', inputTextModal.value);
      }
    }
  });

  modalCLoseBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
    // modalOverlay.classList.remove("modal-error");
    removeInvalide(inputTextModal);
    removeInvalide(inputTelModal);
    removeInvalide(inputCommentModal);
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      evt.preventDefault();
      if (!modalOverlay.classList.contains(OVERLAY_HIDDEN_CLASS)) {
        modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
        // modalOverlay.classList.remove("modal-error");
        removeInvalide(inputTextModal);
        removeInvalide(inputTelModal);
        removeInvalide(inputCommentModal);
      }
    }
  });

})();
