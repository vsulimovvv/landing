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
        } else {
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

      prevSlide(slides, currentSlide, 'portfolio-item-active');
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

    startSlide(10000);
  }

  slider();

  // смена картинок
  const changeImg = () => {
    const command = document.querySelector('.command');
    let src;
    command.addEventListener('mouseover', event => {
      if (event.target.matches('img')) {
        src = event.target.getAttribute('src');
        event.target.src = event.target.dataset.img;
      }
    });
    command.addEventListener('mouseout', event => {
      event.target.src = src;
    });
  }
  changeImg();

  // ввод только чисел
  const inputNumber = () => {

    inputTypeNumber = document.querySelectorAll('input[type=number]');

    inputTypeNumber.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  }
  inputNumber();

  // calculate 
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.querySelector('#total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;
      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  }
  calc(100);

  // send-ajax-form
  const sendForm = () => {

    const errorMessage = 'Что то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById('form1');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    form.addEventListener('submit', event => {

      event.preventDefault();
      form.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body, () => {
          statusMessage.textContent = successMessage;
        },
        (error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.readyState === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-type', 'application/json');

      request.send(JSON.stringify(body));

      document.querySelector('form').reset();
    }



    // event.preventDefault();
    // const forms = document.querySelectorAll('form');
    // forms.forEach((item) => {
    //   item.addEventListener('submit', sendForm());
    // });
  };

  sendForm();

  const inputTypeTel = () => {
    const inputTypeTel = document.querySelectorAll('input[type=tel]');
    inputTypeTel.forEach((item) => {
      item.addEventListener('input', () => {
        // item.value = item.value.replace(/[^0-9+]/, '');
        item.value = item.value.replace(/[^\d+]/g, '');
      });
    });
  }
  inputTypeTel();

  const inputForm1 = () => {
    const form1message = document.querySelector('#form1-name');
    form1message.addEventListener('input', () => {
      form1message.value = form1message.value.replace(/[^а-яё\s]/ig, '');
    });
  }
  inputForm1();

  const inputForm2 = () => {
    const form2message = document.querySelector('#form2-message');
    form2message.addEventListener('input', () => {
      form2message.value = form2message.value.replace(/[^а-яё\s]/ig, '');
    });
  }
  inputForm2();

});