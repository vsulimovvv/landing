
  const sendForm = () => {

    const errorMessage = 'Что то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    form.forEach((item) => {

      item.addEventListener('submit', (event) => {

        event.preventDefault();

        item.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const removeMessage = () => {
          statusMessage.textContent = '';
        }

        const formData = new FormData(item);
        let body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            console.log(response);
            statusMessage.textContent = successMessage;
            // item.reset();
            setTimeout(removeMessage, 5000);
          })
          .catch(() => {
            statusMessage.textContent = errorMessage;
            // item.reset();
            setTimeout(removeMessage, 5000);
          });
          item.reset();
      });

      const postData = (body) => {
        return fetch('./server.php', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        });
      }
    });
  };

  export default sendForm;