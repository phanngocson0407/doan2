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
    $("html,body").animate({ scrollTop: 0 }, 1000);
  });
});
