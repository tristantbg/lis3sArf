/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
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
        }
    };
    var _whenScrolling = function() {
        var $padding = parseInt($container.css('padding-left'), 10);
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
            $(window).load(function() {
                $(".loader").hide();
            });
            $(window).resize(function(event) {
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
                    e.preventDefault();
                    $el = $(this);
                    if ($el.data('target') == "page") {
                        History.pushState({
                            type: 'page'
                        }, $sitetitle + " | " + $el.data('title'), $el.attr('href'));
                    }
                });
                $body.on('click touchstart', '.feed', function(event) {
                    event.preventDefault();
                    $(this).next('.articles').toggleClass('show');
                });
                if ($body.hasClass('project')) {
                    //app.loadSlider();
                    $(document).on('lazybeforeunveil', function() {
                        if (!$slider) {
                            setTimeout(app.loadSwiper, 30);
                        }
                    });
                }
                app.stickyTitles();
                //esc
                $(document).keyup(function(e) {
                    //if (e.keyCode === 27) app.goIndex();
                });
                //left
                $(document).keyup(function(e) {
                    //if (e.keyCode === 37 && $slider) app.goPrev($slider);
                });
                //right
                $(document).keyup(function(e) {
                    //if (e.keyCode === 39 && $slider) app.goNext($slider);
                });
            });
        },
        stickyTitles: function(elems) {
            if ($body.hasClass('page')) {
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
                $draggable.draggabilly('destroy');
                $draggable = null;
            }
            elemWidth = elem.width();
            elemHeight = elem.height();
            bodyWidth = $body.width();
            bodyHeight = $body.height();
            if (elemWidth > bodyWidth && elemHeight > bodyHeight) {
                $draggable = $slider.draggabilly({
                    //containment: $body,
                });
            } else if (elemWidth > bodyWidth && elemHeight < bodyHeight) {
                $draggable = $slider.draggabilly({
                    //containment: $body,
                    axis: 'x',
                });
            } else if (elemWidth < bodyWidth && elemHeight > bodyHeight) {
                $draggable = $slider.draggabilly({
                    //containment: $body,
                    axis: 'y',
                });
            }
            if ($draggable) {
                $draggable.on('staticClick', function(event) {
                    wipe.nextFade();
                });
                $draggable.on('dragMove', function(event) {
                    draggie = $(this).data('draggabilly');
                    console.log('eventName happened', draggie.position.x, draggie.position.y);
                    if (draggie.position.x <= 0 && draggie.position.y >= 0) {
                        //draggie.savePos = 'transform: none; left: 0; top: ' + draggie.position.y +'px';
                    } else {
                        draggie.savePos = null;
                    }
                    if (draggie.savePos) {
                        //$slider.attr('style', draggie.savePos);
                        console.log(draggie.savePos);
                    }
                });
                $draggable.on('dragEnd', function() {
                    if (draggie.savePos) {
                        //$slider.attr('style', draggie.savePos);
                    }
                });
            } else {
                $slider.bind('click touchstart', function(e) {
                    e.preventDefault();
                    wipe.nextFade();
                });
            }
        },
        loadSlider: function() {
            $slider = $('.slider').flickity({
                cellSelector: '.gallery_cell',
                imagesLoaded: true,
                lazyLoad: 2,
                setGallerySize: false,
                friction: 0.3,
                //percentPosition: false,
                wrapAround: true,
                prevNextButtons: false,
                pageDots: false,
                draggable: true
            });
            flkty = $slider.data('flickity');
            var prevCell;
            if (flickityFirst) {
                $('body').on('click touchstart', '.prev', function(e) {
                    e.preventDefault();
                    app.goPrev($slider);
                });
                $('body').on('click touchstart', '.next', function(e) {
                    e.preventDefault();
                    app.goNext($slider);
                });
                flickityFirst = false;
            }
            $slider.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
                if (!cellElement) {
                    return;
                }
                app.goNext($slider);
            });
            $slider.on('lazyLoad.flickity', function(event, cellElement) {
                $body.removeClass('loading');
            });
            $slider.on('cellSelect.flickity', function() {});
        },
        goNext: function($slider) {
            $slider.flickity('next', false);
        },
        goPrev: function($slider) {
            $slider.flickity('previous', false);
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