import './css/style.css';
import errorNotification from './notification';
import fetchCountries from './fetchCountries';
import countriesList from './templates/countries-list.hbs';
import countryMarkup from './templates/country-div.hbs';
var debounce = require('lodash.debounce');

const input = document.getElementById('name');
const list = document.querySelector('.countries-list');
const div = document.querySelector('.country-div');

const removeElems = () => {
  list.innerHTML = '';
  div.innerHTML = '';
};

input.addEventListener(
  'input',
  debounce(() => {
    removeElems();
    let countryToFind = input.value;
    if (countryToFind.length === 0) {
      removeElems();
      return;
    }
    fetchCountries(countryToFind).then(array => {
      if (array.length >= 2 && array.length <= 10) {
        let renderedList = countriesList(array);
        list.insertAdjacentHTML('afterbegin', renderedList);
      } else if (array.length === 1) {
        console.dir(array);
        let countryDiv = countryMarkup(array);
        div.insertAdjacentHTML('afterbegin', countryDiv);
      } else if (array.length > 10) {
        errorNotification.specificError();
      } else if (!array.length) {
        errorNotification.noMatchesError();
      }
    });
  }, 500),
);
