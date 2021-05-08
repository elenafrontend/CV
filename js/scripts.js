"use strict";

let header = document.querySelector(".header");
let burgerBtn = document.querySelector(".burger");
let navLinks = document.querySelectorAll(".nav__link");
let anchors = document.querySelectorAll('[href^="#"]');
let skillsItems = document.querySelectorAll(".skills__item");
let skills = document.querySelector(".skills");

// -----------  mobile or not  -----------

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// -----------  header appearance  -----------
window.onscroll = function () {
  if (window.pageYOffset > 100) {
    header.classList.add("header--active");
  } else {
    header.classList.remove("header--active");
  }
};

// -----------  active scroll menu item  -----------

window.addEventListener("scroll", () => {
  let scrollDistance = window.scrollY;

  if (window.innerWidth > 991) {
    let sections = document.querySelectorAll(".section");

    for (let i = 0; i < sections.length; i++) {
      let sectionPosition = sections[i].offsetTop;

      if (sectionPosition - header.clientHeight < scrollDistance) {
        for (let navLink of navLinks) {
          navLink.classList.remove("nav__link--active");
        }

        let navItems = document.querySelectorAll(".nav__item");

        navItems[i].querySelector("a").classList.add("nav__link--active");
      }
    }
  }
});

//-----------  scroll to section  -----------

// для каждой ссылки-якоря добавляем обработчик
for (let anchor of anchors) {
  anchor.addEventListener("click", function (evt) {
    // убираем переход по ссылке
    evt.preventDefault();

    // прокручиваем к секции по id
    let sectionID = anchor.getAttribute("href");
    document.querySelector(sectionID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

//-----------  scroll toggle  -----------

function scrollToggle(elem, classActive) {
  // ширина скролла
  let body = document.body;
  let paddingOffset = window.innerWidth - body.offsetWidth + "px";

  // функция блокировки скролла
  if (elem.classList.contains(classActive)) {
    document.body.style.overflow = "hidden";

    // если десктоп - убираем скачок страницы - компенсируем скролл
    if (!isMobile.any()) {
      body.style.paddingRight = paddingOffset;
      header.style.paddingRight = paddingOffset;
    }
  } else {
    document.body.style.overflow = "";

    // если десктоп - убираем компенсацию скролла
    if (!isMobile.any()) {
      body.style.paddingRight = "0px";
      header.style.paddingRight = "0px";
    }
  }
}

//-----------  burger-menu  -----------

burgerBtn.addEventListener("click", function () {
  header.classList.toggle("header--active-nav");
  burgerBtn.classList.toggle("burger--active");

  // блокируем/возобновляем скролл страницы
  scrollToggle(burgerBtn, "burger--active");
});

// функция закрытия меню бургер
let resetNav = function () {
  if (burgerBtn.classList.contains("burger--active")) {
    burgerBtn.classList.remove("burger--active");
    header.classList.remove("header--active-nav");
    document.body.style.overflow = "";
  }
};

// закрываем бургер при клике на ссылку в меню
for (let navLink of navLinks) {
  navLink.addEventListener("click", function (evt) {
    // убираем переход по ссылке
    evt.preventDefault();

    // снимаем выделение ссылки
    for (let navLink of navLinks) {
      navLink.classList.remove("nav__link--active");
    }

    // если открыто меню-бургер, закрываем его
    resetNav();
  });
}

// закрываем бургер меню при ресайзе окна
window.addEventListener("resize", resetNav);

//-----------  typing text  -----------
// https://mattboldt.com/demos/typed-js/

var typed = new Typed(".typed", {
  strings: ["Lena", "Gumerova Elena"],
  typeSpeed: 90,
  startDelay: 1000,
  backSpeed: 60,

  onComplete: (self) => {
    self.cursor.remove();
  },
});

// -----------  sliders  -----------

// Инициализируем swiper
let swiper = new Swiper(".skills", {
  loop: true,
  speed: 3000,
  slidesPerView: 2.5,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  breakpoints: {
    // when window width is >= 400px
    400: {
      slidesPerView: 3.5,
    },

    576: {
      slidesPerView: 4,
    },

    768: {
      slidesPerView: 5,
    },

    992: {
      slidesPerView: 6,
      speed: 5000,
    },

    1400: {
      slidesPerView: 7,
    },

    1700: {
      slidesPerView: 8,
      speed: 6000,
    },
  },

  grabCursor: true,
  keyboard: true,

  // Стоп при наведении
  /* on: {
    init() {
      this.el.addEventListener("mouseover", () => {
        this.autoplay.stop();
      });

      this.el.addEventListener("mouseout", () => {
        this.autoplay.start();
      });
    },
  }, */
});

// Стоп при наведении

skills.addEventListener("mouseover", () => {
  swiper.autoplay.stop();
});

skills.addEventListener("mouseout", () => {
  swiper.autoplay.start();
});

//-----------  3D cards  -----------
// https://micku7zu.github.io/vanilla-tilt.js/

VanillaTilt.init(document.querySelectorAll(".portfolio__card"), {
  max: 20,
  speed: 600,
  reverse: true,
});
