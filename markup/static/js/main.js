import 'lazyload-js/lazyload.js';

// WOW
if ($('.wow').length) {
  LazyLoad.js('https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', () => {
    initWOW();
  });
}

// Animate
LazyLoad.css('static/css/separate-css/animate.min.css');

// Lazyload
if ($('img.lazy').length) {
  LazyLoad.js('static/js/separate-js/lazyload.min.js', function() {
    lazyLoad();
  });
}

// Owl-carousel
if ($('.owl-carousel').length) {
  LazyLoad.js('static/js/separate-js/owl.carousel.min.js', () => {
    initOwlCarousel();
  });
  LazyLoad.css('static/css/separate-css/owl.carousel.min.css');
}

// Dotdotdot
LazyLoad.js('static/js/separate-js/dotdotdot.min.js', () => {
  initTitleDots();
});

// ScrollLock
LazyLoad.js('https://cdn.jsdelivr.net/npm/scroll-lock@2.1.2/dist/scroll-lock.min.js');

// MFP
LazyLoad.js('static/js/separate-js/jquery.magnific-popup.min.js', () => {
  initMFP();
});
LazyLoad.css('static/css/separate-css/magnific-popup.min.css');

// jQuery validate
if ($('form').length) {
  LazyLoad.js('static/js/separate-js/jquery.validate.min.js', () => {
    initFormValidate();
  });
}

// jQuery input mask
if ($('input').length) {
  LazyLoad.js('static/js/separate-js/jquery.inputmask.bundle.min.js', () => {
    initInputMask();
  });
}

// Nice-select
if ($('.nice-select').length) {
  LazyLoad.js('static/js/separate-js/jquery.nice-select.min.js', () => {
    initNiceSelect();
  });
  LazyLoad.css('static/css/separate-css/nice-select.min.css');
}

// Flatpickr
if ($('.datepicker').length) {
  LazyLoad.js([
    'static/js/separate-js/flatpickr.min.js',
    'static/js/separate-js/flatpickr-ru.min.js'
  ], () => {
    initFlatpickr();
  });
  LazyLoad.css('static/css/separate-css/flatpickr.min.css');
}

// ionRangeSlider
if ($('.js-range-slider').length) {
  LazyLoad.js('static/js/separate-js/ion.rangeSlider.min.js', () => {
    initPriceSlider();
  });
  LazyLoad.css('static/css/separate-css/ion.rangeSlider.min.css');
}

// Yandex Map
if ($('#map').length) {
  LazyLoad.js('https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&load=package.standard&lang=ru-RU', () => {
    yandexMapInit();
  });
}

// Common scripts

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

const initOwlCarousel = () => {};

const initTitleDots = () => {
  $('.title').dotdotdot({
    height: 40
  });
};

const initMFP = () => {
  $('.popup-open').magnificPopup({
    type: 'inline',
    removalDelay: 1000,
    mainClass: 'animated fadeIn',
    callbacks: {
      beforeClose: () => {
        $('.mfp-bg, .mfp-wrap').addClass('fadeOut');
      },
      open: () => {
        scrollLock.disablePageScroll();
      },
      close: () => {
        scrollLock.enablePageScroll();
      }
    },
    midClick: true,
  });
};

const initFormValidate = () => {
  let forms = $('.form');

  if (forms.length) {
    $('form').validate({
      errorPlacement: (error, element) => {
        return true;
      }
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

// Other scripts

$(document).ready(() => {
});

$(window).on('load', () => {
});
