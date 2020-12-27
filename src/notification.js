import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';
const { alert, notice, info, success, error } = require('@pnotify/core');
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

function specificError() {
  error({
    text: 'Too many matches found. Please enter a more specific query! ',
    closer: false,
    sticker: false,
    delay: 3000,
  });
}

function noMatchesError() {
  error({
    text: 'No matches found! ',
    closer: false,
    sticker: false,
    delay: 3000,
  });
}
export default { specificError, noMatchesError };
