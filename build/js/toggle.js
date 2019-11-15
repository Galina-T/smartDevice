'use strict';

// var HIDDEN_CLASS = 'hidden';
// var TOGGLE_HIDDEN_CLASS = 'page-footer__toggle--close';
// var TOGGLE_SHOW_CLASS = 'page-footer__toggle--open';
// var TEXT_OPEN = 'Развернуть';
// var TEXT_CLOSE = 'Свернуть';

// var footerMenuToggle = document.querySelector('.page-footer__toggle');
// var footerNavList = document.querySelector('.footer-nav__list');
// var footerContactsList = document.querySelector('.footer-contacts__list');

// function closeItem(el) {
//   el.currentTarget.classList.add(HIDDEN_CLASS);
//   el.target.innerText = TEXT_OPEN;
//   el.target.classList.remove(TOGGLE_SHOW_CLASS);
//   el.target.classList.add(TOGGLE_HIDDEN_CLASS);
// }

// function openItem(el) {
//   el.currentTarget.classList.remove(HIDDEN_CLASS);
//   el.target.innerText = TEXT_CLOSE;
//   el.target.classList.remove(TOGGLE_HIDDEN_CLASS);
//   el.target.classList.add(TOGGLE_SHOW_CLASS);
// }


// function closeItemClickHandler(evt) {
//   evt.preventDefault();

//   if (evt.target.classList.contains(footerMenuToggle)) {

//     if (evt.target.innerText === TEXT_OPEN) {
//       openItem(evt);
//     } else {
//       closeItem(evt);
//     }
//   }
// }

// function addHadlers() {
//   footerNavList.addEventListener('click', closeItemClickHandler);
//   footerContactsList.addEventListener('click', closeItemClickHandler);
// }

// addHadlers();

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
