/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';
  // setTimeout(function(){
  //   $('.animate-up').addClass('animated');
  // }, 500);
  var initProject = function() {
  };
  return {
    init: initProject,
  };
})(window.jQuery, window);

window.jQuery(function() {
  Site.init();
});

/**
 *  @name delete-block
 *  @description description
 *  @version 1.0
 *  @options
 *
 *  @events
 *
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'chart';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.vars = {
        percentElm: that.element.find('[data-percent-inner]'),
      };

      that.element.easyPieChart({
        easing: 'easeOutBounce',
        lineWidth: 10,
        size: 115,
        scaleColor: false,
        barColor: '#aed57c',
        trackColor: '#3b4d4c',
        animate: 2000,
        onStep: function(from, to, percent) {
           that.vars.percentElm.text(Math.round(percent));
        }
      });
    },
    destroy: function() {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    chartValue: 0
  };

  $(function() {
    //$('[data-' + pluginName + ']')[pluginName]();
  });

}(window.jQuery, window));

/**
 *  @name delete-block
 *  @description description
 *  @version 1.0
 *  @options
 *
 *  @events
 *
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'height-auto',
      screenHeight = $(window).outerHeight();

  function height(that) {
    if($(window).innerWidth() <= 768) {
      that.element.css('min-height', '0px');
    } else {
      that.element.css('min-height', screenHeight);
    }
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      height(that);
      $(window).resize(function(){
        height(that);
      });

      // $(window).on('scroll', function(){
      //   var win = $(window).scrollTop(),
      //       offElm = $('.about-block').offset().top,
      //       elm = $('.about-block').outerHeight() + offElm,
      //       offset = win - offElm;

      //   console.log('scroll WWin' + win, '<br>', offset);

      //   if(win > offElm && win < elm) {
      //     console.log('a');
      //     $('.about-block').css('background-position-y', '-' + parseInt(offset/5)+'px');
      //   } else {
      //     $('.about-block').css('background-position-y', '0px');
      //   }
      // });

      //$('.home-block').css('background-position','0% '+parseInt(-x/10)+'px');
    },
    destroy: function() {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(window.jQuery, window));

/**
 *  @name delete-block
 *  @description description
 *  @version 1.0
 *  @options
 *
 *  @events
 *
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'navigation',
      isScroll = false,
      scrollTimeout,
      heightHeader = 65;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }
  function animate(animateSel) {
    if(animateSel.length) {
      for(var i = 0; i < animateSel.length; i ++  ) {
        (function(k){
          setTimeout(function(){
            var curr = animateSel.eq(k);
            curr.addClass('animated');
            if (curr.find('[data-chart]').length) {
              curr.find('[data-chart]').chart();
            }
            if (curr.find('[data-typedtext]').length) {
              curr.find('[data-typedtext]').typedtext();
            }
           }, k*500);
        })(i);
      }
    }
  }
  function backgroundoffset(elmSel, offset) {
    if($(window).outerWidth() > 991) {
      var win = $(window).scrollTop(),
          elmOffset = elmSel.outerHeight() + offset,
          offsetPosition = win - offset;
      if(win > offset && win < elmOffset) {
        elmSel.css('background-position', 'center ' + '-' + parseInt(offsetPosition/3)+'px');
      } else {
        elmSel.css('background-position', 'center 0');
      }
    } else {
      elmSel.css('background-position', 'center 0');
    }
  }
  Plugin.prototype = {
    init: function() {
      var that = this;
      that.vars = {
        navigation: that.element.find('[data-navigation-main]'),
        listMenu: that.element.find('[data-navbar] li'),
        hamburger: that.element.find('[data-hamburger]'),
        lastWidth: $(window).width()
      };

      that.vars.hamburger.on('click', function() {
        that.vars.navigation.toggleClass('opened');
        $(this).toggleClass('opened');
        //$('html, body').toggleClass('showMenu');
      });

      $('[data-scroll-down]').on('click', function(){
        that.vars.listMenu.eq(1).click();
      });

      that.vars.listMenu.on('click', function(e){
        e.preventDefault();
        var self = $(this),
            elm = self.find('a').attr('href'),
            offset = $(elm).offset().top;
        if($(window).outerWidth() < 991) {
          offset = $(elm).offset().top - heightHeader;
        }
        //$('body').removeClass('showMenu');
        that.vars.navigation.removeClass('opened');
        that.vars.hamburger.removeClass('opened');
        that.vars.listMenu.removeClass('active');

        if(!self.hasClass('active')) {
          self.addClass('active');
          isScroll = true;
          $('html, body').stop().animate({
            'scrollTop': offset,
          }, 500, function(){
            isScroll = false;
            var animateBLocks = $(elm).find('.animate');

            if (animateBLocks.length !== animateBLocks.filter('.animated').length) {
              $(window).trigger('scroll.page');
            }
          });
        }
      });

      if(scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(function(){
        $(window).off('scroll.page').on('scroll.page', function(){
          that.vars.listMenu.each(function(){
            var self = $(this),
                elm = self.find('a').attr('href'),
                elmSel = $(elm),
                offset = elmSel.offset().top,
                animateSel = elmSel.find('.animate');

            if($(window).outerWidth() < 991) {
              offset = elmSel.offset().top - heightHeader;
            }

            if (isScroll === false) {
              if(offset <= $(window).scrollTop() + elmSel.outerHeight() /2 && offset + elmSel.outerHeight() >= $(window).scrollTop() + elmSel.outerHeight() /2) {
                self.addClass('active');
                animate(animateSel);
              } else {
                self.removeClass('active');
              }
            }
            backgroundoffset(elmSel, offset);
          });
        }).trigger('scroll.page');
      }, 100);

      var resizeTimeout;

      $(window).resize(function(){
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(function() {
          var currWidth = $(window).width();
          if (currWidth === that.vars.lastWidth) {
            return;
          }
          $(window).trigger('scroll.page');
          that.vars.lastWidth = currWidth;
        }, 400);
      });

    },
    destroy: function() {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(window.jQuery, window));

/**
 *  @name delete-block
 *  @description description
 *  @version 1.0
 *  @options
 *
 *  @events
 *
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'scroll-smooth';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.element.niceScroll({
        scrollspeed: 150,
        mousescrollstep: 38,
        cursorwidth: 7,
        cursorborder: 0,
        cursorcolor: '#2f3742',
        autohidemode: true,
        zindex: 999999999,
        horizrailenabled: false,
        cursorborderradius: 0
      });
    },
    destroy: function() {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(window.jQuery, window));

/**
 *  @name delete-block
 *  @description description
 *  @version 1.0
 *  @options
 *
 *  @events
 *
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'typedtext';


  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.vars = {
        typeElm : that.element.find('[data-tap-text]'),
      };
      if($(window).outerWidth() > 991) {
        that.vars.typeElm.typed({
          strings: ['FRONTEND DEVELOPER - FREELANCER'],
          typeSpeed: 30,
          backDelay: 1000,
          loop: true,
          loopCount: false,
          showCursor: true,
        });
      }
    },
    destroy: function() {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    //$('[data-' + pluginName + ']')[pluginName]();
  });

}(window.jQuery, window));
