// typing text
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

// 3D cards
// https://micku7zu.github.io/vanilla-tilt.js/

VanillaTilt.init(document.querySelectorAll(".portfolio__card"), {
  max: 25,
  speed: 300,
});
