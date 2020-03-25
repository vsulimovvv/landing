const validAllForm = () => {

  const inputTypeTel = () => {
    const inputTypeTel = document.querySelectorAll('input[type=tel]');
    inputTypeTel.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^\d+]/g, '');
      });
    });
  }
  inputTypeTel();

  const inputForm1 = () => {
    const form1message = document.querySelector('#form1-name');
    form1message.addEventListener('input', () => {
      form1message.value = form1message.value.replace(/[^а-яА-Я]/ig, '');
    });
  }

  inputForm1();

  const inputForm2 = () => {
    const form2Message = document.querySelector('#form2-message');
    const form2Name = document.querySelector('#form2-name');
    form2Message.addEventListener('input', () => {
      form2Message.value = form2Message.value.replace(/[^а-яА-Я]/ig, '');
    });
    form2Name.addEventListener('input', () => {
      form2Name.value = form2Name.value.replace(/[^а-яА-Я]/ig, '');
    });
  }

  inputForm2();

  const inputNumber = () => {

    inputTypeNumber = document.querySelectorAll('input[type=number]');

    inputTypeNumber.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  }
  inputNumber();
}

export default validAllForm;