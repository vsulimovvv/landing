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

export default toggleMenu;