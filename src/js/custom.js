$(document).ready(function () {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.login_container').css('min-height', windowHeight - 89);
  };
  setHeight();
  $(window).resize(function () {
    setHeight();
  });
  $("#menu-toggle").click(function () {
    $(".wrapper").toggleClass("toggle");
    $(".slimscrollsidebar").css({ "overflow-x": "visible", "width": "245px" }).parent().css("overflow", "visible");

  });
  $('.slimscrollsidebar').slimScroll();
});
