'use strict';

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

function makeHandler(btn, list) {
  return function handler(evt) {
    evt.preventDefault();

    btn.classList.toggle(TOGGLE_HIDDEN_CLASS);
    btn.classList.toggle(TOGGLE_SHOW_CLASS);

    var btnText = btn.innerText;

    btn.innerText = btnText === TEXT_OPEN ? TEXT_CLOSE : TEXT_OPEN;

    list.classList.toggle(HIDDEN_CLASS);
  };
}

function addHadlers() {
  btnToggleInFooterNav.addEventListener('click', makeHandler(btnToggleInFooterNav, footerNavList));
  btnToggleInFooterContacts.addEventListener('click', makeHandler(btnToggleInFooterContacts, footerContactsList));
}

addHadlers();
