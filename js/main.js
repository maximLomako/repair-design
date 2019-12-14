/*
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
*/
$(document).ready(function () {
  const modalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
  var modal = $('.modal'),
      modalDialog = $('.modal__dialog'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close');
  modalDialog.on('click', modalClick)
   modalBtn.on('click', function () {
      modal.toggleClass('modal--visible')
     });
    closeBtn.on('click', function () {
      modal.toggleClass('modal--visible')
    });
  modal.on('click', (event) => {
    modal.toggleClass('modal--visible')})
  $("#toTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });


  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('#toTop:hidden').stop(true, true).fadeIn();
    } else {
      $('#toTop').stop(true, true).fadeOut();
    }
  });
});

$(document).keydown(function (e) {
  var code = e.keyCode || e.which,
      modal = $('.modal');
  if (code == 27) modal.toggleClass('modal--visible')
});






