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


  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
 
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');


  next.css('left', prev.width() + 10 + bullets.width()+ 10)
  bullets.css('left', prev.width() + 10)
  
  //slider-end

  new WOW().init();
  
  //Валидация формы
  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
      },
      userPhone: "required",
      // правило-объект
      userEmail: {
        required: true,
        email: true
      }
    }, //сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв"

      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email",
      }
    }
  });
  // Маска для номера телефона
  $('[type=tel]').mask('+7(000) 00-00-000', { placeholder: "+7(___) __-__-___" });


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






