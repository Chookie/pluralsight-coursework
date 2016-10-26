(function () {

  var fill = function () {
    $('.fill-screen').css('height', window.innerHeight);
  };

  $(function () {
    // on('load') does not seem to work on chrome, ok on safari.
    fill();
    $(window).on('resize', fill);
  });
  
})();