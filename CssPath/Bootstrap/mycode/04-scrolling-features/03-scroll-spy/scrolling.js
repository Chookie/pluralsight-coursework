(function () {

  var fill = function () {
    $('.fill-screen').css('height', window.innerHeight);
  };

  $(function () {
    // on('load') does not seem to work on chrome, ok on safari.
    fill();
    $(window).on('resize', fill);
    
    // Animation
    setTimeout( function() {
      $('.down-button').css({bottom: '40px'});
    }, 500);
    
    // Add Bootstrap Scrollspy
    $('body').scrollspy({ 
      target: '.navbar'
    });
  });
  
})();