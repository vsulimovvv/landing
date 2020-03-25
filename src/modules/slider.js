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

export default slider;