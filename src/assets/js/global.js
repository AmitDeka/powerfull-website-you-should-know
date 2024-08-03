$(document).ready(function () {
  // Scrolled Shadow on Navbar
  var scroll_pos = 0;
  $(document).scroll(function () {
    scroll_pos = $(this).scrollTop();
    if (scroll_pos > 100) {
      $("#navContainer").addClass("shadow sticky-top");
    } else {
      $("#navContainer").removeClass("shadow sticky-top");
    }
  });

  // Footer year
  const yearCurrent = new Date().getFullYear();
  $("#currentYear").append(yearCurrent);
});
