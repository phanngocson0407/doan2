$(document).ready(function () {
  $(".slider-image").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: `<button type='button' class='slick-prev pull-left slider-arrow'> <i class="fa-solid fa-chevron-left"></i> </button>`,
    nextArrow: `<button type='button' class='slick-next pull-right slider-arrow'><i class="fa-solid fa-chevron-right"></i></button>`,
    dots: true,
  });
});
$(document).ready(function () {
  $(".slider-post").slick({
    slidesToShow: 3,
    slidesToScroll: 2,

    prevArrow: `<button type='button' class='slick-prev pull-left post-arrow'> <i class="fa-solid fa-chevron-left"></i> </button>`,
    nextArrow: `<button type='button' class='slick-next pull-right post-arrow'><i class="fa-solid fa-chevron-right"></i></button>`,
  });
});
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#back-top").fadeIn();
    } else {
      $("#back-top").fadeOut();
    }
  });
  $("#back-top").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 500);
  });
});

const header = document.querySelector("header");
const heightHeader = header.offsetHeight;
window.addEventListener("scroll", (e) => {
  const scrollHeight = window.pageYOffset;
  if (heightHeader < scrollHeight) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

const btnbuys = document.querySelectorAll(".js-btn-buy");
const modal = document.querySelector(".js-modal");
const modalcls = document.querySelector(".js-modal-close");
const modalctn = document.querySelector(".modal-container");

function showBuyTickets() {
  modal.classList.add("open");
}
function hide() {
  modal.classList.remove("open");
}
for (const btnbuy of btnbuys) {
  btnbuy.addEventListener("click", showBuyTickets);
}
modalctn.addEventListener("click", function (event) {
  event.stopPropagation();
});
modalcls.addEventListener("click", hide);
modal.addEventListener("click", hide);
