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
});