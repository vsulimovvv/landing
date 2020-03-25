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