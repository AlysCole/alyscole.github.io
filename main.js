$(window).load(function() {
  var $typeElements = $('.to-type');
  var $window = $(window);

  $window.on('scroll resize', checkElInView);
  function checkElInView() {
    var winHeight = $window.height();
    var winTopPos = $window.scrollTop();
    var winBotPos = winTopPos + winHeight;

    $.each($typeElements, function() {
      var $el = $(this);
      var elHeight = $el.outerHeight();
      var elTopPos = $el.offset().top;
      var elBotPos = elTopPos + elHeight;

      if ((elBotPos >= winTopPos) && (elTopPos <= winBotPos)) {
        $el.addClass('type');
        $el.removeClass('to-type');
        $typeElements = $('.to-type');

        var txt = $el.data("text"),
            ind = txt.length;
        
        typeIt($el, txt, ind);
      }
    });

  }

  $window.trigger('scroll');

  // Typing animation for header text
  function typeIt(el, txt, ind) {
    if (ind < 0) return;

    el.text(txt.substring(0, txt.length - ind));
    window.setTimeout((function() {typeIt(el, txt, ind - 1)}),
                      (Math.random() * (80 - 60 + 1) + 80));
  }

  // Smooth scroll
  $(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
});
