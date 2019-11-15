'use strict';

(function () {

  var OVERLAY_HIDDEN_CLASS = 'modal-cart__overlay--hidden';
  var LOCAL_STORAGE_KEY = 'smartDeviceData';

  var contactBtn = document.querySelector('.header-contacts__btn');
  var modalOverlay = document.querySelector('.modal-cart__overlay');
  var modalCLoseBtn = document.querySelector('.modal-cart__btn--close');
  var inputTextModal = document.querySelector('#name-field-modal');
  var inputTelModal = document.querySelector('#tel-field-modal');
  var inputCommentModal = document.querySelector('#comment-field-modal');
  var submitBtn = document.querySelector('.form__submit');

  function addHadlers() {
    modalCLoseBtn.addEventListener('click', closeModalClickHandler);
    modalOverlay.addEventListener('click', closeModalClickHandlerOverlay);
    submitBtn.addEventListener('click', applyModalHandler);
    document.body.addEventListener('keydown', closeModalKeyDownHandler);
  }

  function removeHandlers() {
    modalCLoseBtn.removeEventListener('click', closeModalClickHandler);
    modalOverlay.removeEventListener('click', closeModalClickHandlerOverlay);
    submitBtn.removeEventListener('click', applyModalHandler);
    document.body.removeEventListener('keydown', closeModalKeyDownHandler);
  }

  function lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
  }

  function closeModalClickHandler(evt) {
    evt.preventDefault();

    modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
    removeHandlers();
    unlockScroll();
  }

  function closeModalClickHandlerOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      evt.preventDefault();
      modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);
      removeHandlers();
      unlockScroll();
    }
  }

  function closeModalKeyDownHandler(evt) {
    if (evt.keyCode === 27) {
      modalOverlay.classList.add(OVERLAY_HIDDEN_CLASS);

      removeHandlers();
      unlockScroll();
    }
  }

  function applyModalHandler(evt) {
    var data = {
      text: inputTextModal.value,
      tel: inputTelModal.value,
      comment: inputCommentModal.value,
    };

    if (data.text === '' || data.tel === '' || data.comment === '') {
      return;
    }
    evt.preventDefault();

    var json = JSON.stringify(data);

    localStorage.setItem(LOCAL_STORAGE_KEY, json);
  }

  contactBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!modalOverlay.classList.contains(OVERLAY_HIDDEN_CLASS)) {
      return;
    }

    modalOverlay.classList.remove(OVERLAY_HIDDEN_CLASS);

    var data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data !== null) {
      var parsedData = JSON.parse(data);
      inputTextModal.value = parsedData.text;
      inputTelModal.value = parsedData.tel;
      inputCommentModal.value = parsedData.comment;
    }

    inputTextModal.focus();
    addHadlers();
    lockScroll();
  });
})();
