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
    setInterval(countTimer, 1000, '20 march 2020');

    // модальное окно
    const toggleMenu = () => {

      const menu = document.querySelector("menu");
      const btnMenu = document.querySelector('.menu');

      const handlerMenu = () => {
        if (screen.width > 768) {
          menu.classList.toggle("active-menu");
        } else {
          if (
            !menu.style.transform ||
            menu.style.transform === `translate(-100%)`
          ) {
            menu.style.transform = `translate(0)`;
          } else {
            handlerMenu();
          }
        }
      };

      btnMenu.addEventListener('click', handlerMenu);

      menu.addEventListener('click', function (event) {
        let target = event.target;
        if (target.matches('.close-btn') || target.closest('li')) {
          handlerMenu();
        }
      });
    };

    toggleMenu();

    // popup
    const popup = document.querySelector('.popup'), // popup
      popupContent = document.querySelector('.popup-content'), //popup-content
      popupBtns = document.querySelectorAll('.popup-btn'); // popup-btns

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
          popupContent.style.top = timePassed / 16 + '%';
          popupContent.style.marginTop = hContent;
        }
      }
    }

    popupBtns.forEach(item => {
      item.addEventListener('click', openPopup);
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = "none";
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = "none";
        }
      }
    });
  }

  // Табы
  const tabs = () => {

    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    // функция меняющая контент
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  }

  tabs();


  // slider
  const slider = () => {

    const slides = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content'),
      ul = document.querySelector('.portfolio-dots');

    const createDots = () => {

      for (let i = 0; i < slides.length; i++) {
        const li = document.createElement('li');
        if (i === 0) {
          li.className = 'dot dot-active';
        }
        else {
          li.className = 'dot';
        }
        ul.appendChild(li);
      }
    }
    createDots();

    let dot = document.querySelectorAll('.dot');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slides, currentSlide, 'zportfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 10000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (
        event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')
      ) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (
        event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')
      ) {
        startSlide();
      }
    });

    startSlide();
  }

  slider();
});