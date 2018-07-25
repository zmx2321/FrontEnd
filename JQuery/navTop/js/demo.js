$(document).ready(function() {
  var sch = $(window).height(),
  wah = (sch - 80)
  $('#top_intro').css('height', wah);

  $(window).resize(function() {
    var sch = $(window).height();
    wah = (sch - 80)
    $('#top_intro').css('height', wah);
  });

  im = 'http://wizardwiz.co.uk/ww/one.jpg';
  $('.le-background').css('background-image', 'url(' + im + ')');
       
  $(window).scroll(function(e) {
    var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height(),
        f = 100,
        a = 40,
    imblur = 'http://wizardwiz.co.uk/ww/two.jpg';
    opacityVal = (s / 300);
    titleopac = (s / 450);

    $('.blurred').css('opacity', opacityVal);
    $('.blurred').css('background-image', 'url(' + imblur + ')');
         

    if (s > f) {
      $('#project-list').css('opacity', titleopac);
    }

    else {
      $('#project-list').css('opacity', 0);
    }


    if (s > a) {
      $('.icon-arrow-down ').css('opacity', 0);
      $('.icon-arrow-down ').css('bottom', 20);
    }

    else {
      $('.icon-arrow-down ').css('opacity', 1);
      $('.icon-arrow-down ').css('bottom', 0);
    }
  });
});
       
$(document).ready(function() {
    // Cache selectors for faster performance.
    var $window = $(window),
        $mainMenuBar = $('#mainMenuBar'),
        $mainMenuBarAnchor = $('#mainMenuBarAnchor');
 
    // Run this on scroll events.
    $window.scroll(function() {
        var window_top = $window.scrollTop();
        var div_top = $mainMenuBarAnchor.offset().top;
        if (window_top > div_top) {
            // Make the div sticky.
            $mainMenuBar.addClass('stick');
            $mainMenuBarAnchor.height($mainMenuBar.height());
        }
        else {
            // Unstick the div.
            $mainMenuBar.removeClass('stick');
            $mainMenuBarAnchor.height(0);
        }
    });
});
       