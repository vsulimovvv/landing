'use strict';

import setInterval from './modules/countTimer'
import toggleMenu from './modules/toggleMenu'
import popup from './modules/popup'
import tabs from './modules/tabs'
import slider from './modules/slider'
import changeImg from './modules/changeImg'
import calc from './modules/calc'
import sendForm from './modules/sendForm'
import sendForm from './modules/valisAllForm'

// Timer
setInterval(countTimer, 1000, '20 march 2020');
// модальное окно
toggleMenu();
// Табы
tabs();
// Popup
popup();
// slider
slider();
// смена картинок
changeImg();
// calculate 
calc(100);
// валидация
validAllForm();
// send AJAX form
sendForm();