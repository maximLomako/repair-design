document.addEventListener("DOMContentLoaded", function (event) {
  const modal = document.querySelector('.modal');
  const modalDialog = document.querySelector('.modal__dialog');
  const modalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
  modalDialog.addEventListener('click', modalClick);
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const showModal = () => {
    modal.classList.add('modal--visible')
  } 
  const hideModal = () => {
    modal.classList.remove('modal--visible')
  }

  modalBtn.forEach(element =>  {
    element.addEventListener('click', showModal);
  });

  closeBtn.addEventListener('click', hideModal);

  document.onkeydown = (event) => {
    if (event.key === 'Escape') {
      hideModal()
    }
  };

  modal.addEventListener('click', (event) => {
      hideModal ()
  });
});
  