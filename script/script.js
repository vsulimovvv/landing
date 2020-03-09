document.addEventListener("DOMContentLoaded", () => {
  {
    'use strict';
    // Timer
    function countTimer(deadline) {
      let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

      const addZero = (num) => {
        if (num <= 9) {
          return '0' + num;
        } else {
          return num;
        }
      }

      function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
        return {
          timeRemaining,
          hours,
          minutes,
          seconds
        }
      }

      function updateClock() {
        let timer = getTimeRemaining();
        if (timer.timeRemaining > 0) {
          timerHours.textContent = addZero(timer.hours);
          timerMinutes.textContent = addZero(timer.minutes);
          timerSeconds.textContent = addZero(timer.seconds);
        } else {
          timerHours.textContent = '00';
          timerMinutes.textContent = '00';
          timerSeconds.textContent = '00';
        }
      }
      updateClock();
    }
    setInterval(countTimer, 1000, '10 march 2020');

    // Модальное окно
    const toggleMenu = () => {
      const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');

      const handlerMenu = () => {
        menu.classList.toggle('active-menu');
      }

      btnMenu.addEventListener('click', handlerMenu);
      closeBtn.addEventListener('click', handlerMenu);

      menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    // popup
    const popup = document.querySelector('.popup'); // popup
    const popupContent = document.querySelector('.popup-content'); //popup-content
    const popupBtns = document.querySelectorAll('.popup-btn'); // popup-btns

    const openPopup = () => {
      popup.style.display = 'block'; // показываем попап

      if (document.documentElement.clientWidth > 768) { // проверяем ширину браузера
        const start = Date.now(); // записать в переменную время старта анимации
        let timer = setInterval(() => {
          let timePassed = Date.now() - start; // сколько прошло времени

          if (timePassed >= 800) { // если прошедшее время >= 800, то остановить анимацию
            clearInterval(timer);
            return;
          }

          draw(timePassed);
        });

        let draw = timePassed => {
          let hContent = getComputedStyle(popupContent).height.split('px')[0];
          hContent = -hContent / 2 + 'px';
          console.log(hContent)
          popupContent.style.top = timePassed / 16 + '%';
          popupContent.style.marginTop = hContent;
        }
      }
    }

    popupBtns.forEach(item => {
      item.addEventListener('click', openPopup);
    });

    popup.addEventListener('click', e => {
      if (e.target.matches('.popup-close')) {
        popup.style.display = "none";
      }
    });
  }
});