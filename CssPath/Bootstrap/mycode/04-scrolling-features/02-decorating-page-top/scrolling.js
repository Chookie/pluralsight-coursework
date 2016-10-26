(function () {

  var fill = function () {
    $('.fill-screen').css('height', window.innerHeight);
  };

  $(function () {
    // on('load') does not seem to work on chrome, ok on safari.
    fill();
    $(window).on('resize', fill);
    
    setTimeout( function() {
      $('.down-button').css({bottom: '40px'});
    }, 500);
  });
  
})();