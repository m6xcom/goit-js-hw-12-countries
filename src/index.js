import './css/style.css';
import errorNotification from './notification';
import fetchCountries from './fetchCountries';
import { data } from 'autoprefixer';
var debounce = require('lodash.debounce');

const input = document.getElementById('name');
const body = document.querySelector('body');
const list = document.createElement('ul');
list.classList.add('coutries-list');
body.insertAdjacentElement('beforeend', list);
const countryDiv = document.createElement('ul');
countryDiv.classList.add('country-div');
body.insertAdjacentElement('beforeend', countryDiv);

input.addEventListener(
  'input',
  debounce(() => {
    if (input.value.length === 0) {
      list.innerHTML = '';
      countryDiv.innerHTML = '';
      return;
    }
    let countryToFind = input.value;
    fetchCountries(countryToFind).then(array => {
      list.innerHTML = '';
      countryDiv.innerHTML = '';
      while (countryDiv.firstChild) {
        countryDiv.removeChild(countryDiv.firstChild);
      }
      if (array.length >= 2 && array.length <= 10) {
        let countriesMarkup = array.reduce((acc, el) => {
          return acc + `<li>${el.name}</li>`;
        }, '');
        list.insertAdjacentHTML('afterbegin', countriesMarkup);
      } else if (array.length === 1) {
        let countryMarkup = array.reduce((acc, el) => {
          return `<h2>${el.name}</h2>
          <img src=${el.flag}></img>
          <span>Capital:<p>${el.capital}</p></span>
          <span>Population:<p>${el.population}</p></span>
          <span class="languages-header">Languages:<ul>${el.languages.reduce(
            (acc, elem) => acc + `<li>${elem.name}</li>`,
            '',
          )}</ul></span>`;
        }, '');
        countryDiv.insertAdjacentHTML('afterbegin', countryMarkup);
      } else if (array.length > 10) {
        errorNotification.specificError();
      }
    });
  }, 500),
);
