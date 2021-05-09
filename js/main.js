const swiper1 = new Swiper('.why-buy-img-slider', {
  navigation: {
    nextEl: '.js-why-slider-button',
  },
  effect: 'fade',
  loop: true,
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 5000,
    reverseDirection: true
  },
});
const swiper2 = new Swiper('.why-buy-text-slider', {
  navigation: {
    nextEl: '.js-why-slider-button',
  },
  effect: 'fade',
  loop: true,
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 5000,
    reverseDirection: true
  },
});

const swiper3 = new Swiper('.reviews-slider-1', {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 8,
  autoplay: {
    delay: 5000,
  },

});

const swiper4 = new Swiper('.reviews-slider-2', {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 8,
  autoplay: {
    delay: 5000,
    reverseDirection: true
  },


});

//faq

for (const faqTitle of document.querySelectorAll('.faq-content-item__title')) {
  faqTitle.addEventListener('click', function () {
    const faqItem = this.closest('.faq-content-item');
    faqItem.classList.toggle('faq-content-item--active');
  })
}


let monthlyRevenue = document.querySelector('.js-monthly-revenue'),
  monthlyProfit = document.querySelector('.js-monthly-profit'),
  yearProfit = document.querySelector('.js-year-profit');

monthlyRevenue.textContent = new Intl.NumberFormat('ru-RU').format(monthlyRevenue.getAttribute('data-price'));
monthlyProfit.textContent = new Intl.NumberFormat('ru-RU').format(monthlyProfit.getAttribute('data-price'));
yearProfit.textContent = new Intl.NumberFormat('ru-RU').format(yearProfit.getAttribute('data-price'));


$(function () {
  var handle = $("#custom-handle");
  $("#slider").slider({
    min: 0,
    max: 6,
    value: 1,
    create: function () {
      handle.text($(this).slider("value"));
    },
    slide: function (event, ui) {
      handle.text(ui.value);
      let monthlyRevenueText = Number(monthlyRevenue.getAttribute('data-price')) * ui.value,
        monthlyProfitText = Number(monthlyProfit.getAttribute('data-price')) * ui.value,
        yearProfitText = 12 * monthlyProfitText;
      monthlyRevenue.textContent = new Intl.NumberFormat('ru-RU').format(monthlyRevenueText);
      monthlyProfit.textContent = new Intl.NumberFormat('ru-RU').format(monthlyProfitText);
      yearProfit.textContent = new Intl.NumberFormat('ru-RU').format(yearProfitText);
    }
  });
});

//плавный скролл
$('.scroll-link').on('click', function() {
  let href = $(this).attr('href');

  $('.header-nav').removeClass('header-nav--active');
  $('.hamburger').removeClass('hamburger--active')


  $('html, body').animate({
      scrollTop: $(href).offset().top
  }, {
      duration: 370, 
      easing: "linear"
  });

  return false;
});


//отправка формы

  const ajaxSend = async (formData, action) => {
      const fetchResp = await fetch(action, {
          method: 'POST',
          body: formData
      });
      if (!fetchResp.ok) {
          throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
      }
      return await fetchResp.text();
  };

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
      form.addEventListener('submit', function (e) {
          e.preventDefault();
          const formData = new FormData(this);
          const action = form.getAttribute('action');

          ajaxSend(formData, action)
              .then((response) => {
                  console.log(response);
                  form.reset(); // очищаем поля формы 
                  document.querySelector('.popup-thankyou').classList.add('d-block');
              })
              .catch((err) => {
                console.error(err);
              });
      });
  });


//закрытие popup

document.querySelector('.popup-close').addEventListener('click', function() {
  this.closest('.popup-thankyou').classList.remove('d-block');
});

//hamburger
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function() {
  this.classList.toggle('hamburger--active');
  document.querySelector('.header-nav').classList.toggle('header-nav--active');
})