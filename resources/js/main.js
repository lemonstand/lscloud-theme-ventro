// init hammer jquery plugin
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));

$(window).load(function() {
  var unslider = $('.banner').unslider({
        fluid: true,
        dots: true,
        delay: false
  });

$('.unslider-arrow').click(function() {
    var fn = this.className.split(' ')[1];
    
    //  Either do unslider.data('unslider').next() or .prev() depending on the className
    unslider.data('unslider')[fn]();
});
// Hammer Time gesture control
$('.banner').hammer().bind('swiperight', function() {
  unslider.data('unslider').prev();
});
$('.banner').hammer().bind('swipeleft', function() {
  unslider.data('unslider').next();
});

    
    // Move Login and Cart to top of nav on mobile
    $('.navbar-right').prependTo('.navbar-collapse');

    $( document ).ajaxComplete(function() {
       $(".search-box").focus();
     }

    // Hover on product grid
    $( '.product-button'  )
      .mouseenter(function() {
        $(this).siblings().css({
            'opacity':'.33'
        });
      })
      .mouseleave(function() {
        $(this).siblings().css({
            'opacity':'1'
        });
      });

    // animate falsh message ('add to cart') off screen.  
    $( document ).ajaxSuccess(function( event, request, settings ) {
        if ( $( '.to-cart-flash > .success' ).length ) {
            var customeMsg = $( '.custome-msg' ).text();
            $( '.to-cart-flash > .success' ).addClass( 'pulse' );
            $( '.to-cart-flash > .success' ).text(customeMsg);
            setTimeout(function() { 
                $( '.to-cart-flash > .success' ).addClass( 'zoomOut' );
            }, 2000);
            $( '.main-img' ).zoom();
        }
    });

    $( '.main-img' ).zoom();

    // Show text over featured images on scroll (mobile)
    function windowWidth() {
      var windowWidth    = $(window).width(); 
      return windowWidth; 
    }

    $(window).resize(function() {
        if (windowWidth() > 768) {
            $('.home-box-content').show();
        }
    });

    $(window).scroll(function() {
        var scrollTop     = $(window).scrollTop(),
            elementOffset = $('.home-box').offset().top,
            distance      = (elementOffset - scrollTop);
        if (distance <= 200 && windowWidth() <= 768) {
            $('.home-box-content').show();
        }
        if(!$(window).scrollTop() && windowWidth() <= 768) { 
            $('.home-box-content').hide();
        }         
    }); // END

        

});

