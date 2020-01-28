import 'lazyload-js/lazyload.js';

// WOW
if ($('.wow').length) {
  LazyLoad.js('https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', () => {
    initWOW();
  });
}

// Swiper
if ($('.swiper-container').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/swiper.min.js`, () => {
    initSwiper();
  });
  LazyLoad.css(`${__dynamicPath__}css/separate-css/swiper.min.css`);
}

// Lazyload
if ($('img.lazy').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/lazyload.min.js`, function() {
    lazyLoad();
  });
}

// Dotdotdot
if ($('.dotdotdot-text').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/dotdotdot.min.js`, () => {
    initTitleDots();
  });
}

// Simplebar
if ($('*[data-simplebar]').length) {
  LazyLoad.js(`static/js/separate-js/simplebar.min.js`);
  LazyLoad.css(`static/css/separate-css/simplebar.min.css`);
}

// jQuery validate
if ($('form').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/jquery.validate.min.js`, () => {
    initFormValidate();
  });
}

// jQuery input mask
if ($('input[type="tel"]').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/jquery.inputmask.bundle.min.js`, () => {
    initInputMask();
  });
}

// Nice-select
if ($('.nice-select').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/jquery.nice-select.min.js`, () => {
    initNiceSelect();
  });
  LazyLoad.css(`${__dynamicPath__}css/separate-css/nice-select.min.css`);
}

// Flatpickr
if ($('.datepicker').length) {
  LazyLoad.js([
    `${__dynamicPath__}js/separate-js/flatpickr.min.js`,
    `${__dynamicPath__}js/separate-js/flatpickr-ru.min.js`
  ], () => {
    initFlatpickr();
  });
  LazyLoad.css(`${__dynamicPath__}css/separate-css/flatpickr.min.css`);
}

// ionRangeSlider
if ($('.js-range-slider').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/ion.rangeSlider.min.js`, () => {
    initPriceSlider();
  });
  LazyLoad.css(`${__dynamicPath__}css/separate-css/ion.rangeSlider.min.css`);
}

// MFP
if ($('.mfp-hide').length) {
  LazyLoad.js(`${__dynamicPath__}js/separate-js/jquery.magnific-popup.min.js`, () => {
    initMFP();
  });
  LazyLoad.css(`${__dynamicPath__}css/separate-css/magnific-popup.min.css`);
}

// ScrollLock
LazyLoad.js(`https://cdn.jsdelivr.net/npm/scroll-lock@2.1.2/dist/scroll-lock.min.js`);

// Yandex Map
if ($('#map').length) {
  LazyLoad.js('https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&load=package.standard&lang=ru-RU', () => {
    yandexMapInit();
  });
}

// svg4everybody
LazyLoad.js(`${__dynamicPath__}js/separate-js/svg4everybody.min.js`, () => {
  svg4everybody();
});

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

const initWOW = () => {
  new WOW().init();
};

const lazyLoad = () => {
  let lazyLazy = new LazyLoad({
    elements_selector: '.lazy',
  });
}

const initSwiper = () => {
  let slider = new Swiper('.swiper-container', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 32,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    preloadImages: false,
    speed: 500,
    navigation: {
      prevEl: '',
      nextEl: ''
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true
  });
};

const initTitleDots = () => {
  let windowWidth = $(window).outerWidth();

  let title = $('.example-title');
  title.dotdotdot({
    height: 60
  });
  if (windowWidth <= 1366) {
    title.dotdotdot({
      height: 50
    });
  }
};

const initMFP = () => {
  $('.popup-open').magnificPopup({
    type: 'inline',
    removalDelay: 1000,
    mainClass: 'animated fadeIn',
    midClick: true,
    callbacks: {
      open: () => {
        scrollLock.disablePageScroll();
        var mfpContainer = $('.mfp-container');

        mfpContainer[0].setAttribute('data-scroll-lock-scrollable', '');
      },
      beforeClose: () => {
        $('.mfp-bg, .mfp-wrap').addClass('fadeOut');
      },
      close: () => {
        scrollLock.enablePageScroll();
      }
    },
    tLoading: 'Загрузка...',
    tClose: 'Закрыть форму',
    closeMarkup: `<span class="mfp-close">
                   <svg class="close js-modal-close" width="24" height="24">
                     <use xlink:href="../static/img/general/svg-symbols.svg#close"></use>
                   </svg>
                 </span>`,
    ajax: {
      tError: 'Ошибка запроса.'
    }
  });

  $('body').on('click', '.js-modal-close', function() {
    $('.modal').magnificPopup('close');
  });
};

const initFormValidate = () => {
  let defaultForm = $('form');

  if (defaultForm.length) {
    defaultForm.each(function() {
      $(this).validate({
        errorPlacement: function(error, element) {},
        invalidHandler: function() {
          setInterval(function() {
            $('input, textarea').each(function() {
              if ($(this).hasClass('error')) {
                $(this).closest('.default-form__input-wrapper').addClass('error');
              } else {
                $(this).closest('.default-form__input-wrapper').removeClass('error');
              }
            });
          }, 100);
        }
      });
    });
  }
};

const initInputMask = () => {
  let phoneInputs = $('input[type="tel"]');

  if (phoneInputs.length) {
    phoneInputs.inputmask({
      'mask': '+7(999)999-99-99'
    });
  }
};

const initNiceSelect = () => {
  let niceSelectItems = $('select.nice-select');

  if (niceSelectItems.length) {
    niceSelectItems.niceSelect();
  }
};

const initFlatpickr = () => {
  let datePickerItems = $('.datepicker');

  if (datePickerItems.length) {
    datePickerItems.flatpickr({
      'locale': 'ru',
      'dateFormat': 'd.m.y'
    });
  }
};

const initPriceSlider = () => {
  let rangeSlider = $('.js-range-slider');

  if (rangeSlider.length) {

    rangeSlider.ionRangeSlider({
      'type': 'double',
      'min': '990',
      'max': '92990',
      'from': '990',
      'to': '92990',
      'hide_min_max': true,
      'hide_from_to': true
    });

    rangeSlider.on('change', function() {
      let $inp = $(this),
          v = $inp.prop('value'),
          min = v.split(';')[0],
          max = v.split(';')[1],
          $minPriceInt = $('#min-price-int'),
          $maxPriceInt = $('#max-price-int');

      $minPriceInt.val(min);
      $maxPriceInt.val(max);

      $minPriceInt.attr('min', min);
      $maxPriceInt.attr('max', max);
    });

    let dataRangeSlider = rangeSlider.data('ionRangeSlider');

    if (dataRangeSlider.length) {
      $('#min-price-int').on('change', () => {
        dataRangeSlider.update({
          from: $(this).val()
        });
      });

      $('#max-price-int').on('change', () => {
        dataRangeSlider.update({
          to: $(this).val()
        });
      });
    }
  }
};

const yandexMapInit = (coords) => {
  let map = $('#map');

  if (map.length) {
    ymaps.ready(function() {
      let myMap = new ymaps.Map('map', {
            center: [coords],
            zoom: 15,
            controls: ['zoomControl']
          }, {
            searchControlProvider: 'yandex#search'
          }),

          myPlacemark = new ymaps.Placemark([coords], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'static/img/general/pin.svg',
            iconImageSize: [142, 95],
            iconImageOffset: [-5, -38]
          });

      myMap.geoObjects.add(myPlacemark);
    });
  }
};

/*
 * Other scripts
 */

const initInputStates = () => {
  let defaultForm = $('.default-form');

  if (defaultForm.length) {
    let inputs = document.querySelectorAll('.default-form__input'),
        inputsPlaceholder = document.querySelectorAll('.default-form__input-placeholder');

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value !== '') {
        inputsPlaceholder[i].classList.add('default-form__input-placeholder_active');
      }
    }

    for (var i = 0; i < inputs.length; i++) {
      (function(n) {
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

$(document).ready(() => {
});

$(window).on('load', () => {
});
