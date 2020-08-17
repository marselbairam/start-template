import $ from 'jquery';
import inView from 'in-view';
import LazyLoad from 'vanilla-lazyload';
import { Swiper, Navigation, Lazy, Autoplay } from 'swiper/js/swiper.esm.js';
Swiper.use([Navigation, Lazy, Autoplay]);
import 'swiper/css/swiper.min.css';
import validate from 'jquery-validation';
import InputMask from 'inputmask';
import svg4everybody from 'svg4everybody';

/*
 * Common scripts
 */

const isTouchDevice = () => {
  let isTouchDevice = false;

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isTouchDevice = true;
  }

  return isTouchDevice;
};

const getScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

const initInView = () => {
  inView('.scrl').on('enter', el => {
    el.classList.add('visible');

    if (el.classList.contains('animate-title')) {
      setTimeout(function() {
        el.classList.add('transition-none');
      }, 1800);
    }
  });
  inView.offset(75);
};

const initLazyLoad = () => {
  let lazyLazy = new LazyLoad({
    elements_selector: '.lazy'
  });
  lazyLazy.update();
};

const initFormValidate = () => {
  let defaultForm = $('form');

  if (defaultForm.length) {
    defaultForm.each(function() {
      $(this).validate({
        errorPlacement: function(error, element) {},
        highlight: function (element, errorClass, validClass) {
          $(element).addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          if ($(element).attr('type') === 'email' && $(element).val() === '') {
            $(element).removeClass(errorClass).removeClass(validClass);
          } else {
            $(element).removeClass(errorClass).addClass(validClass);
          }
        },
      });
    });
  }
};

const initInputMask = () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  if (phoneInputs) {
    const config = {
      showMaskOnHover: false,
      clearIncomplete: true,
      onincomplete: function () {
        phoneInputs.forEach(el => {
          if (el.classList.contains('valid') && el.value === '') {
            el.classList.remove('valid');
            el.closest('.input-item')
              .querySelector('.input-item__label')
              .classList.remove('input-item__label_active');
          }
        });
      }
    };

    const im = new InputMask('+7(999)999-99-99', config);
    im.mask(phoneInputs);
  }
};

const yandexMapInit = (coords, zoom, iconImageHref) => {
  let map = $('#map');

  if (map.length) {
    ymaps.ready(function() {
      let myMap = new ymaps.Map('map', {
            center: [coords],
            zoom: zoom,
            controls: ['zoomControl']
          }, {
            searchControlProvider: 'yandex#search'
          }),

          myPlacemark = new ymaps.Placemark([coords], {}, {
            iconLayout: 'default#image',
            iconImageHref: iconImageHref,
            iconImageSize: [142, 95],
            iconImageOffset: [-5, -38]
          });

      myMap.geoObjects.add(myPlacemark);
    });
  }
};

const initSvg4everybody = () => {
  svg4everybody();
};

/*
 * Other scripts
 */

const html = $('html');
const body = $('body');

let previousScrollY = 0;

const disableScroll = () => {
  if (isTouchDevice()) {
    previousScrollY = window.scrollY;
    html.addClass('scroll-lock').css({
      position: 'fixed',
      overflow: 'hidden',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      marginTop: -previousScrollY
    });
  } else {
    body.css('overflow-y', 'hidden');
    if (document.body.scrollHeight > document.documentElement.clientHeight) {
      body.css('padding-right', `${getScrollbarWidth()}px`);
    }
  }
};

const enableScroll = () => {
  if (isTouchDevice()) {
    html.removeClass('scroll-lock').css({
      position: 'static',
      overflow: 'visible',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      marginTop: 0
    });
    window.scrollTo(0, previousScrollY);
  } else {
    body.css({
      overflowY: 'visible',
      paddingRight: '0'
    });
  }
};

const popupToggle = () => {
  $('.popup-open').on('click', function(e) {
    e.preventDefault();
    const popup = $($(this).attr('href'));
    disableScroll();
    popup.addClass('active');
  });

  const hidePopups = () => {
    const popups = $('.popup');
    $('.popup.active').addClass('removing');
    setTimeout(function() {
      enableScroll();
      popups.removeClass('active removing');
    }, 500);
  };

  $('.popup__close-btn').on('click', function() {
    hidePopups();
  });

  $(document).on('mouseup', function(e) {
    if ($('.popup.active').length) {
      let div = $('.popup__content');
      if (!div.is(e.target)
        && div.has(e.target).length === 0) {
        hidePopups();
      }
    }
  });
};

const openPopup = (id) => {
  const popup = $(id);
  disableScroll();
  popup.addClass('active');
};

const inputStates = () => {
  const defaultForm = $('.default-form');

  if (defaultForm.length) {
    const inputs = document.querySelectorAll('.default-form__input'),
        inputsPlaceholder = document.querySelectorAll('.default-form__input-placeholder');

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value !== '') {
        inputsPlaceholder[i].classList.add('default-form__input-placeholder_active');
      }
    }

    for (let i = 0; i < inputs.length; i++) {
      ((n) => {
        inputs[n].addEventListener('click', function() {
          inputsPlaceholder[n].classList.add('default-form__input-placeholder_active');
        });

        inputs[n].addEventListener('focus', function() {
          if (!this.readOnly) {
            inputsPlaceholder[n].classList.add('default-form__input-placeholder_active');
          }
        });

        inputs[n].addEventListener('blur', function() {
          if (inputs[n].value !== '') {
            inputsPlaceholder[n].classList.add('default-form__input-placeholder_active');
          } else {
            inputsPlaceholder[n].classList.remove('default-form__input-placeholder_active');
          }
        });

        inputsPlaceholder[n].addEventListener('click', function() {
          this.classList.add('default-form__input-placeholder_active');
          inputs[n].focus();
        })
      })(i);
    }
  }
};

$(document).ready(function() {
  initSvg4everybody();
});

$(window).on('load', function() {
});
