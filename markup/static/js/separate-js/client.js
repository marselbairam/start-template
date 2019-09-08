// Common scripts

$(function() {
  document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false); // Disable overscroll on iPhone
});

function isTouchDevice() {
  let isTouchDevice = false;

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isTouchDevice = true;
  }

  return isTouchDevice;
}

function getScrollbarWidth() {
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
}

function initWOW() {
  new WOW().init();
}

function initMFP() {
  $('.popup-open').magnificPopup({
    type: 'inline',
    removalDelay: 1000,
    mainClass: 'animated fadeIn',
    callbacks: {
      beforeClose: function() {
        $('.mfp-bg, .mfp-wrap').addClass('fadeOut');
      },
      open: function() {
        scrollLock.disablePageScroll();
      },
      close: function() {
        scrollLock.enablePageScroll();
      }
    },
    midClick: true,
  });
}

function yandexMapInit(coords) {
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

function initPhoneMask() {
  $('input[type="tel"]').mask('+7(999)999-99-99');
}

function initPriceSlider() {
  if ($('.js-range-slider')) {
    var $rangeSlider = $('.js-range-slider');

    $rangeSlider.ionRangeSlider({
      'type': 'double',
      'min': '990',
      'max': '92990',
      'from': '990',
      'to': '92990',
      'hide_min_max': true,
      'hide_from_to': true
    });

    $rangeSlider.on('change', function() {
      var $inp = $(this),
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

    var $dataRangeSlider = $('.js-range-slider').data('ionRangeSlider');

    $('#min-price-int').on('change', function () {
      $dataRangeSlider.update({
        from: $(this).val()
      });
    });

    $('#max-price-int').on('change', function () {
      $dataRangeSlider.update({
        to: $(this).val()
      });
    });
  }
}

function initNiceSelect() {
  $('select.nice-select').niceSelect();
}

function initFlatpickr() {
  $('.datepicker').flatpickr({
    'locale': 'ru',
    'dateFormat': 'd.m.y'
  });
}

function validateSampleForm() {
  $('.sample-form').validate({
    errorPlacement: function(error, element) {
      return true;
    },
    rules: {
      password: {
        minlength: 6,
        maxlength: 255
      },
    }
  });
}

// Other scripts

$(document).ready(function() {
});

$(window).on('load', function() {
});
