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
    elements_selector: '.lazy'
  });
  lazyLazy.update();
};

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
      open: function() {
        scrollLock.disablePageScroll();
        var mfpContainer = $('.mfp-container');

        mfpContainer[0].setAttribute('data-scroll-lock-scrollable', '');
      },
      beforeClose: function() {
        $('.mfp-bg, .mfp-wrap').addClass('fadeOut');
      },
      close: function() {
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
      $('#min-price-int').on('change', function() {
        dataRangeSlider.update({
          from: $(this).val()
        });
      });

      $('#max-price-int').on('change', function() {
        dataRangeSlider.update({
          to: $(this).val()
        });
      });
    }
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
  popupToggle();
});

$(window).on('load', function() {
});
