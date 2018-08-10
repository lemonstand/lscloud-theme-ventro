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

    // animate falsh message ('add to cart').  
    $( document ).ajaxSuccess(function( event, request, settings ) {
        if ( $( '.to-cart-flash > .success' ).length ) {
            var customeMsg = $( '.custome-msg' ).text();
            $( '.to-cart-flash > .success' ).addClass( 'pulse' );
            $( '.to-cart-flash > .success' ).text(customeMsg);
            setTimeout(function() { 
                $( '.to-cart-flash > .success' ).addClass( 'zoomOut' );
            }, 2000);
        }
    });


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

        var scrollTop;
        var elementOffset;
        var distance;

        if ( $('.home-box').length ) {
            scrollTop     = $(window).scrollTop(),
            elementOffset = $('.home-box').offset().top,
            distance      = (elementOffset - scrollTop);
        }
        
        if (distance <= 200 && windowWidth() <= 768) {
            $('.home-box-content').show();

            if ( !$('nav').addClass('nav-mobile') ) {
                $('nav').hide();
                $('nav').addClass('nav-mobile');
                $('nav').fadeIn();
            }
            
        }
        if(!$(window).scrollTop() && windowWidth() <= 768) { 
            $('.home-box-content').hide();
            $('nav').hide();
            $('nav').removeClass('nav-mobile');
            $('nav').show();
        }         
    }); // END

    // Star Rating
    $('.rating > span').click(function() {
        var currentId = $(this).attr('id');
        if ( currentId === 'hate' ) {
            $('#hate').addClass('select');
            $( '#dont-like, #ok, #like, #love' ).removeClass('select');
            $('.rating > p').text( 'I hate it' );
            $("#item_rating").val('1');
        }
        if ( currentId === 'dont-like' ) {
            $( '#hate, #dont-like' ).addClass('select');
            $( '#ok, #like, #love' ).removeClass('select');
            $('.rating > p').text( 'I don\'t like it' );
            $("#item_rating").val('2');
        }
        if ( currentId === 'ok' ) {
            $( '#hate, #dont-like, #ok' ).addClass('select');
            $( '#like, #love' ).removeClass('select');
            $('.rating > p').text( 'It\'s ok' );
            $("#item_rating").val('3');
        }
        if ( currentId === 'like' ) {
            $( '#hate, #dont-like, #ok, #like' ).addClass('select');
            $( '#love' ).removeClass('select');
            $('.rating > p').text( 'I like it' );
            $("#item_rating").val('4');
        }
        if ( currentId === 'love' ) {
            $( '#hate, #dont-like, #ok, #like, #love' ).addClass('select');
            $('.rating > p').text( 'I love it' );
            $("#item_rating").val('5');
        }
        
    }); // END

    // Review Modal
    $('.review-header a').click(function() {
        $('#writeModal').modal({
            show: true
        });
    });
    $('#writeModal').on('hidden.bs.modal', function () {
      $('body').css({
          'padding-right':'0'
      });
    }); // END
    

});
