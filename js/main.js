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
      closeBtn = $('.modal__close'),
      submitBtn = $('#submit-form');
  submitBtn.on('click', function () {
    $('.modal__form').submit()
  })
  

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
 console.log(mySwiper);
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');


  next.css('left', prev.width() + 10 + bullets.width()+ 10)
  bullets.css('left', prev.width() + 10)
  //slider-end

  // переключение слайдов по табам из секции 6 

  $('.goals__tabs-item').on('click', function () {
    $('.goals__tabs-item').removeClass('active');
    $(this).addClass('active');
    const e = $(this).data('index');
    mySwiper.slideTo(e);
  })
  console.log(mySwiper);

  mySwiper.on('slideChange',  ()=> {
    let e = mySwiper.activeIndex - 1;
    if (e === 6) {
      e = 0
    };
    $('.goals__tabs-item').removeClass('active');
    $('.goals__tabs-item').eq(e).addClass('active');
  })
  
  new WOW().init();
  
  //Валидация формы modal
  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
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
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не должно быть длиннее 15 символов"

      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email",
      }
      
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          console.log('Ajax сработал'+response);
          
        }
      });
    }
  });

  $('.control__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
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
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не должно быть длиннее 15 символов"

      },
      userPhone: "Заполните поле",
    }
  });

  $('.footer__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      userQustion: "required",
      // правило-объект
      userEmail: {
        required: true,
        email: true
      }
    }, //сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не должно быть длиннее 15 символов"

      },
      userQustion: "Заполните поле",
      userPhone: "Заполните поле",
    }
  });

  // Маска для номера телефона
  $('[type=tel]').mask('+7(000) 00-00-000', { placeholder: "+7(___) __-__-___" });
  
  $('#modal-form').on('submit', function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $(this).serialize(),
      success: function (response) {
        console.log('Прибыли данные: ' + response);
        $('#modal-form')[0].reset();
      },
      error: function (jqXNR, textStatus, errorThrown) {
        console.error(jqXNR + " " + textStatus);
      }
    });
  });

   
  //Карта
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.751574, 37.573856],
        zoom: 9
      }, {
        searchControlProvider: 'yandex#search'
        
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Наш офис',
        balloonContent: 'Вход со двора'
      }, {
        
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/location.png',
        // Размеры метки.
        iconImageSize: [50, 50],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
      });
    myMap.geoObjects
      .add(myPlacemark)
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








