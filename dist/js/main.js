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
let check_if_load = false;

$(document).ready(function () {
  const modalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }

  $('#map').mouseenter(function () {
    if (!check_if_load) {
      check_if_load = true;
      loadScript("https://api-maps.yandex.ru/2.1/?apikey=855cdcb8-f608-4649-b239-02a21e9bd816&lang=ru_RU", () => {
        ymaps.ready(initMap);
      });
    }
  });

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
  var mySwiper = new Swiper('.swiper-container', {
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


  next.css('left', prev.width() + 10 + bullets.width() + 10)
  bullets.css('left', prev.width() + 10)
  //slider-end

  // slider 2.0

  $('.goals__tabs-item').on('click', function () {
    $('.goals__tabs-item').removeClass('active');
    $(this).addClass('active');
    const e = $(this).data('index');
    mySwiper[2].slideTo(e);
    mySwiper[3].slideTo(e);
  })

  mySwiper[2].on('slideChange', () => {
    let e = mySwiper[2].activeIndex - 1;
    if (e === 6) {
      e = 0
    };
    $('.goals__tabs-item').removeClass('active');
    $('.goals__tabs-item').eq(e).addClass('active');
  })

  new WOW().init();

  //form validation
  function validateForm(form) {
    $(form).validate({
      errorClass: "invalid",
      errorElement: "div",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2,
          maxlength: 15
        },
        userPhone: {
          required: true,
          minlength: 17
        },
        userQuestion: "required",
        // compound rule
        userEmail: {
          required: true,
          email: true
        }
      },
      messages: {
        userName: {
          required: "Заполните поле",
          minlength: "Слишком короткое имя",
          maxlength: "Имя не должно превышать 15 символов"
        },
        userPhone: {
          required: "Заполните поле",
          minlength: "Некорректно введен номер"
        },
        userQuestion: "Заполните поле",
        userEmail: {
          required: "Заполните поле",
          email: "Введите Ваш email в формате name@domain.com"
        }
      },
      submitHandler: function (form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function () {
            $(form)[0].reset();
            $(form).html('<p>Форма отправлена!</p>');
          },
          error: function (jqXHR, textStatus) {
            console.error(jqXHR + " " + textStatus);
            ym(64742437, 'reachGoal', 'sumbit__form'); return true;
          }
        });
      }
    });
  }
  validateForm('.modal__form');
  validateForm('.control__form');
  validateForm('.footer__form');

  // маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {
    placeholder: "+7 (___) ___-__-__"
  });

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '450',
      width: '100%',
      videoId: 'RHzzLqJWqHs',
      events: {
        'onReady': videoPlay,
      }
    });
  })
  function videoPlay(event) {
    event.target.playVideo();
  }





  modal.on('click', (event) => {
    modal.toggleClass('modal--visible')
  })
  $("#toTop").click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);

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


function loadScript(url, callback) {
  var script = document.createElement("script");

  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { // Другие браузеры
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function initMap() {
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

      iconImageOffset: [-5, -38]
    });
  myMap.geoObjects
    .add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
}


