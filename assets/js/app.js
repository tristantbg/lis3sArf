/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    isMobile = false,
    $slider = null,
    $draggable = null,
    draggie,
    flkty,
    flickityFirst = true,
    wipe = null;
$root = '/';
var stickyTitles = (function() {
    var $window = $(window),
        $container,
        $stickies;
    var load = function(stickies, container) {
        $container = container;
        if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
            $stickies = stickies.each(function() {
                var $thisSticky = $(this).wrap('<div class="sticky-container" />');
                $thisSticky.data('originalPosition', $thisSticky.offset().top).data('originalHeight', $thisSticky.outerHeight()).parent().height($thisSticky.outerHeight());
            });
            $container.off("scroll.stickies").on("scroll.stickies", function() {
                _whenScrolling();
            });
            $(window).resize(function(event) {
                $(".sticky-container").each(function() {
                    var $thisSticky = $(this).find('.stickytitle');
                    $(this).data('originalPosition', $thisSticky.offset().top).data('originalHeight', $thisSticky.outerHeight()).height($thisSticky.outerHeight());
                });
            });
        }
    };
    var _whenScrolling = function() {
        var $padding = parseInt($container.css('border-left'), 10);
        console.log($padding);
        $stickies.each(function(i) {
            var $thisSticky = $(this),
                $stickyPosition = $thisSticky.data('originalPosition');
            if ($stickyPosition <= $container.scrollTop() + $padding) {
                var $nextSticky = $stickies.eq(i + 1),
                    $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
                $thisSticky.addClass("fixed");
                if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
                    $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
                }
            } else {
                var $prevSticky = $stickies.eq(i - 1);
                $thisSticky.removeClass("fixed");
                if ($prevSticky.length > 0 && $container.scrollTop() + $padding <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
                    $prevSticky.removeClass("absolute").removeAttr("style");
                }
            }
        });
    };
    return {
        load: load
    };
})();
$(function() {
    var app = {
        init: function() {
            $(window).resize(function(event) {
                app.sizeSet();
                if (wipe) {
                    wipe.resize();
                    app.interactSwiper($slider);
                }
            });
            $(document).ready(function($) {
                $body = $('body');
                $ajaxContainer = $('#page_content');
                History.Adapter.bind(window, 'statechange', function() {
                    var State = History.getState();
                    console.log(State);
                    var content = State.data;
                    if (content.type == 'page') {
                        app.loadContent(State.url + '/ajax', $ajaxContainer);
                    }
                });
                $('body').on('click', '[data-target]', function(e) {
                    if (!isMobile) {
                        e.preventDefault();
                        $el = $(this);
                        if ($el.data('target') == "page") {
                            History.pushState({
                                type: 'page'
                            }, $sitetitle + " | " + $el.data('title'), $el.attr('href'));
                        }
                    }
                });
                $body.on('click touchstart', '.feed', function(event) {
                    event.preventDefault();
                    $(this).next('.articles').toggleClass('show');
                });
                if ($body.hasClass('project')) {
                    $(document).on('lazybeforeunveil', function() {
                        if (!$slider) {
                            document.getElementsByClassName("lazyload")[0].addEventListener('load', function(e) {
                                app.loadSwiper();
                            }, true);
                        }
                    });
                }
                app.stickyTitles();
                window.viewportUnitsBuggyfill.init();
                //esc
                $(document).keyup(function(e) {
                    //if (e.keyCode === 27) app.goIndex();
                });
                //left
                $(document).keyup(function(e) {
                    //if (e.keyCode === 37 && wipe) wipe.nextFade();
                });
                //right
                $(document).keyup(function(e) {
                    if (e.keyCode === 39 && wipe) wipe.nextFade();
                });
                $(window).load(function() {
                    app.sizeSet();
                    $(".loader").hide();
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            if (width <= 770 || Modernizr.touch) isMobile = true;
            if (isMobile) {
                if (width >= 770) {
                    location.reload();
                }
            }
        },
        stickyTitles: function(elems) {
            if ($body.hasClass('page') && !isMobile) {
                stickyTitles.load($('.stickytitle'), $ajaxContainer);
            }
        },
        loadSwiper: function() {
            if (!$slider) {
                wipe = new SWWipe(document.getElementsByClassName("slider")[0]);
                $slider = $('.slider');
                app.interactSwiper($slider);
            }
        },
        interactSwiper: function(elem) {
            if ($draggable) {
                $draggable[0].kill();
                $draggable = null;
            }
            elemWidth = elem.width();
            elemHeight = elem.height();
            bodyWidth = $body.width();
            bodyHeight = $body.height();
            if (elemWidth > bodyWidth && elemHeight > bodyHeight) {
                $draggable = Draggable.create($slider, {
                    type: "x,y",
                    bounds: $body,
                    edgeResistance: 0.95,
                    throwProps: true,
                    zIndexBoost: false,
                    onClick: function() {
                        wipe.nextFade();
                    }
                });
            } else if (elemWidth > bodyWidth && elemHeight < bodyHeight) {
                $draggable = Draggable.create($slider, {
                    type: "x",
                    bounds: $body,
                    edgeResistance: 0.95,
                    throwProps: true,
                    zIndexBoost: false,
                    onClick: function() {
                        wipe.nextFade();
                    }
                });
            } else if (elemWidth < bodyWidth && elemHeight > bodyHeight) {
                $draggable = Draggable.create($slider, {
                    type: "y",
                    bounds: $body,
                    edgeResistance: 0.95,
                    throwProps: true,
                    zIndexBoost: false,
                    onClick: function() {
                        wipe.nextFade();
                    }
                });
            }
            if (!$draggable) {
                $slider.bind('click touchend', function(e) {
                    e.preventDefault();
                    wipe.nextFade();
                });
            }
        },
        goIndex: function() {
            History.pushState({
                type: 'index'
            }, $sitetitle, window.location.origin + $root);
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                    $body.addClass('page');
                    $ajaxContainer.scrollTop(0);
                    app.stickyTitles();
                }
            });
        },
        deferImages: function() {
            var imgDefer = document.getElementsByTagName('img');
            for (var i = 0; i < imgDefer.length; i++) {
                if (imgDefer[i].getAttribute('data-src')) {
                    imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
                }
            }
        }
    };
    app.init();
});