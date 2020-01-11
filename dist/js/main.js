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
  $("#menu").on("click", "a", function (event) {
    console.log("hey");
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();
    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),
    //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top;
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1500);
  })
});


let check_if_load = false;

$(document).ready(function () {
  const modalClick = (e) => {
    if (e.target.className === "policy__label") {
      $('input[type=checkbox]').trigger('click');
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
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
    secondModal = $('.second__modal'),
    modalDialog = $('.modal__dialog'),
    modalBtn = $('[data-toggle=modal]'),
    closeBtn = $('.modal__close'),
    btn = $('.second__modal__close'),
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

    btn.on('click', function () {
    secondModal.toggleClass('second__modal--visible')
  });
  


  //initialize swiper when document ready
  var sliderProject = new Swiper('.project__swiper', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination--project',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next--project',
      prevEl: '.swiper-button-prev--project',
    },
  })
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');


  next.css('left', prev.width() + 10 + bullets.width() + 10)
  bullets.css('left', prev.width() + 10);
  //slider-end

  // slider 2.0
  var sliderGoal = new Swiper('.goal__swiper', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination--goal',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next--goal',
      prevEl: '.swiper-button-prev--goal',
    },
  });

  $('.goals__tabs-item').on('click', function () {
    $('.goals__tabs-item').removeClass('active');
    $(this).addClass('active');
    const e = $(this).data('index');
    sliderGoal[0].slideTo(e);
    sliderGoal[1].slideTo(e);
  }),

    sliderGoal[0].on('slideChange', () => {
    let e = sliderGoal[0].activeIndex - 1;
    if (e === 6) {
      e = 0;
    };

    $('.goals__tabs-item').removeClass('active');
    $('.goals__tabs-item').eq(e).addClass('active');
  });

  $('.goals__tabs-number').on('click', function () {
      $('.goals__tabs-number').removeClass('__border');
      $(this).addClass('active__border');
      const e = $(this).data('index');
      sliderGoal[0].slideTo(e);
      sliderGoal[1].slideTo(e);
    }),

    sliderGoal[0].on('slideChange', () => {
      let e = sliderGoal[0].activeIndex - 1;
      if (e === 6) {
        e = 0;
      };

      $('.goals__tabs-number').removeClass('active__border');
      $('.goals__tabs-number').eq(e).addClass('active__border');
    });

    var next = $('.swiper-button-next--goal');
    var prev = $('.swiper-button-prev--goal');
    var bullets = $('.swiper-pagination--goal');
    next.css('left', prev.width() + 10 + bullets.width() + 10)
    bullets.css('left', prev.width() + 10);

   var sliderFantasy = new Swiper('.fantasy-swiper', {
     direction: 'vertical',
     noSwipingClass: 'noswipe',
   });

   $('.fantasy__list').on('click', function () {
       $('.fantasy__list').removeClass('active');
       $(this).addClass('active');
       const e = $(this).data('index');
       sliderFantasy.slideTo(e);
       console.log(e);
     });





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
        userQuestion: {
          required: true,
        },
        // compound rule
        userEmail: {
          required: true,
          email: true
        },
        ["policy-checkbox__modal"]: {
          required: true
        },
        ["policy-checkbox__control"]: {
          required: true
        },
        ["policy-checkbox__footer"]: {
          required: true
        },
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
        },
        ["policy-checkbox__modal"]: {
          required: "Поставьте галочку!"
        },
        ["policy-checkbox__control"]: {
          required: "Поставьте галочку!"
        },
        ["policy-checkbox__footer"]: {
          required: "Поставьте галочку!"
        },
      },

      errorPlacement: function (error, element) {
        if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
        }

        error.insertAfter($(element));
      },


      submitHandler: function (form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function () {
            $(form)[0].reset();
            ym('56914903', 'reachGoal', 'submit__form');
            $('.modal--visible').trigger('click'),
            secondModal.toggleClass('second__modal--visible')
            return true;
            
          },
          error: function (jqXHR, textStatus) {
            console.error(jqXHR + " " + textStatus);
          }
        });
      }
    });
  }
  validateForm('.modal__form');
  validateForm('.control__form');
  validateForm('.footer__form');
  validateForm('.advantages__form');


  // маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {
    placeholder: "Ваш телефон"
  });

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '100%',
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


