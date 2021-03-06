/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    isMobile = false,
    $slider = null,
    $draggable = null,
    draggie,
    flkty,
    forceLoad = true,
    first = true,
    wipe = null,
    video = null,
    $root = '/';
var stickyTitles = (function() {
    var $window = $(window),
        $container,
        $stickies,
        $padding,
        $images,
        $nextSticky,
        $prevSticky;
    var load = function(stickies, container) {
        $container = container;
        $padding = parseInt($body.css('padding-left'), 10) + 2;
        if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
            $stickies = stickies.each(function() {
                var $thisSticky = $(this).wrap('<div class="sticky-container" />');
                $thisSticky.data('originalPosition', $thisSticky.offset().top).data('originalHeight', $thisSticky.outerHeight()).parent('.sticky-container').height($thisSticky.outerHeight());
                var h2 = $(this).find("h2").attr('style', '');
                h2.height(h2.outerHeight() - 1);
            });
            $container.off("scroll.stickies").on("scroll.stickies", function() {
                _whenScrolling();
            });
            if (first) {
                $(window).resize(function(event) {
                    $(".sticky-container").each(function() {
                        var $thisSticky = $(this).find('.stickytitle');
                        $(this).data('originalPosition', $thisSticky.offset().top).data('originalHeight', $thisSticky.outerHeight()).parent('.sticky-container').height($thisSticky.outerHeight());
                        var h2 = $(this).find("h2").attr('style', '');
                        h2.height(h2.outerHeight() - 1);
                    });
                });
                first = false;
            }
        }
    };
    var _whenScrolling = function() {
        $stickies.each(function(i) {
            var $thisSticky = $(this),
                $stickyPosition = $thisSticky.data('originalPosition');
            if ($stickyPosition <= $container.scrollTop() + $padding) {
                $nextSticky = $stickies.eq(i + 1),
                    $prevSticky = $stickies.eq(i - 1),
                    $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
                if (i - 1 < 0) $prevSticky = $stickies.eq(0);
                if ($stickies.length > 1) {
                    $prevSticky.hide();
                }
                if (isMobile || !isMobile && !Modernizr.touch) {
                    $thisSticky.addClass("fixed");
                }
                // if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
                //     $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
                // }
            } else {
                $prevSticky = $stickies.eq(i - 1);
                if (i - 1 < 0) $prevSticky = $stickies.eq(0);
                if (isMobile || !isMobile && !Modernizr.touch) {
                    $thisSticky.removeClass("fixed");
                }
                $prevSticky.removeAttr("style");
                // if ($prevSticky.length > 0 && $container.scrollTop() + $padding <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
                //     $prevSticky.removeClass("absolute").removeAttr("style");
                // }
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
            window.addEventListener("resize", function() {
                app.sizeSet();
            }, false);
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
                $('body').on('click touchstart', '[data-target]', function(e) {
                    if (!isMobile) {
                        e.preventDefault();
                        $el = $(this);
                        if ($el.data('target') == "page") {
                            History.pushState({
                                type: 'page'
                            }, $sitetitle + " | " + $el.data('title'), $el.attr('href'));
                        }
                    }
                    if (!$(this).parents('.articles').prev('h2').hasClass('feed')) {
                        $('.articles').slideUp();
                    }
                });
                $body.on('click touchstart', '.feed', function(event) {
                    event.preventDefault();
                    $(this).next('.articles').slideToggle();
                });
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
                    if ($body.hasClass('project')) {
                        if ($body.hasClass('video')) {
                            app.loadVideo();
                        } else {
                            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                                setTimeout(function() {
                                    $('canvas').show();
                                }, 2000);
                                $(document).on('lazybeforeunveil', function() {
                                    document.getElementsByClassName("lazyload")[0].addEventListener('load', function(e) {
                                        if (forceLoad) {
                                            setTimeout(function() {
                                                wipe.resize();
                                                $('canvas').show();
                                            }, 100);
                                            forceLoad = false;
                                            console.log('FF loading fix');
                                        }
                                    }, false);
                                });
                            }
                            setTimeout(app.loadSwiper,1000);   
                        }
                    }
                    $(".loader").hide();
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            app.stickyTitles(true);
            if (wipe) {
                setTimeout(function() {
                    //console.log($images.eq(0).innerWidth());
                    //$slider.width($images.eq(0).innerWidth());
                    wipe.resize();
                    app.interactSwiper($slider);
                }, 300);
            }
            if (video) {
                $('.control').width(video.width());
            }
            if (width <= 768) {
                isMobile = true;
            } else {
                isMobile = false;
            }
            if (isMobile) {
                if (width >= 770) {
                    //location.reload();
                }
            }
        },
        stickyTitles: function(reset) {
            if ($body.hasClass('page')) {
                if (reset) {
                    $ajaxContainer.scrollTop(0);
                    $('.sticky-container > .stickytitle').removeAttr("style").removeClass('fixed').unwrap();
                }
                setTimeout(function() {
                    stickyTitles.load($('.stickytitle'), $ajaxContainer);
                }, 100);
            }
        },
        loadSwiper: function() {
            if (!wipe) {
                $images = $('.lazyimg');
                wipe = new SWWipe(document.getElementsByClassName("slider")[0]);
                $slider = $('.slider');
                app.interactSwiper($slider);
                $(window).resize();
                // window.addEventListener("orientationchange", function() {
                //     console.log(screen.orientation);
                //     $slider.width($images.eq(0).innerWidth());
                //     wipe.resize();
                // }, false);
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
                        if (isMobile) {
                            app.next();
                        } else {
                            wipe.nextFade();
                        }
                    },
                    onDragStart: function(e) {
                        TweenLite.set(this.target, {
                            css: {
                                className: '+=dragging'
                            }
                        });
                    },
                    onDragEnd: function(e) {
                        TweenLite.set(this.target, {
                            css: {
                                className: '-=dragging'
                            }
                        });
                    }
                });
                $slider.addClass('dragX dragY');
            } else if (elemWidth > bodyWidth && elemHeight < bodyHeight) {
                $draggable = Draggable.create($slider, {
                    type: "x",
                    bounds: $body,
                    edgeResistance: 0.95,
                    throwProps: true,
                    zIndexBoost: false,
                    onClick: function() {
                        if (isMobile) {
                            app.next();
                        } else {
                            wipe.nextFade();
                        }
                    },
                    onDragStart: function(e) {
                        TweenLite.set(this.target, {
                            css: {
                                className: '+=dragging'
                            }
                        });
                    },
                    onDragEnd: function(e) {
                        TweenLite.set(this.target, {
                            css: {
                                className: '-=dragging'
                            }
                        });
                    }
                });
                $slider.addClass('dragX').removeClass('dragY');
            } else if (elemWidth < bodyWidth && elemHeight > bodyHeight) {
                $draggable = Draggable.create($slider, {
                    type: "y",
                    bounds: $body,
                    edgeResistance: 0.95,
                    throwProps: true,
                    zIndexBoost: false,
                    onClick: function() {
                        if (isMobile) {
                            app.next();
                        } else {
                            wipe.nextFade();
                        }
                    },
                    onDragStart: function(e) {
                        TweenLite.set(this.target, {
                            css: {
                                className: '+=dragging'
                            }
                        });
                    },
                    onDragEnd: function(e) {
                        TweenLite.set(this.target, {
                            css: {
                                className: '-=dragging'
                            }
                        });
                    }
                });
                $slider.addClass('dragY').removeClass('dragX');
            }
            TweenLite.set($slider, {
                x: 0,
                y: 0
            });
            if (!$draggable) {
                $slider.bind('click touchend', function(e) {
                    e.preventDefault();
                    if (isMobile) {
                        app.next();
                    } else {
                        wipe.nextFade();
                    }
                });
            } else {
                $slider.unbind('click touchend');
            }
        },
        next: function() {
            if (isMobile) {
                // if (!isSliding) {
                var $currentImg = $(".displayed");
                $images.removeClass('displayed');
                // if (way == 'next') {
                $activeImg = $images.eq(($images.index($currentImg) + 1) % $images.length).addClass("displayed");
                $next = $images.eq(($images.index($activeImg) + 1) % $images.length);
                $next.addClass('lazyload');
                // } else {
                //     $activeImg = imgs.eq((imgs.index($currentImg) - 1) % imgs.length).addClass("active");
                //     $prev = imgs.eq((imgs.index($activeImg) - 1) % imgs.length);
                //     $prev.find('.lazyimg').addClass('lazyload');
                //     if ($activeImg.is(imgs.eq(-1))) {
                //         app.updateCounter(true, way);
                //     } else {
                //         app.updateCounter(false, way);
                //     }
                // }
                // }
            }
        },
        loadVideo: function() {
            //INITIALIZE
            var index = 0;
            video = $('#videoPlayer');
            //remove default control when JS loaded
            video[0].removeAttribute("controls");
            $('.control').fadeOut(500);
            $('.caption').fadeOut(500);
            //before everything get started
            video.on('loadedmetadata', function() {
                if (first) {
                    //set video properties
                    $('.current').text(timeFormat(0));
                    $('.duration').text(timeFormat(video[0].duration));
                    updateVolume(0, 0.7);
                    //start to get video buffering data 
                    setTimeout(startBuffer, 150);
                    video[0].play();
                    first = false;
                }
                $('.control').width(video.width());
            });
            //bind video events
            $('.videoContainer').hover(function() {
                $('.control').stop().fadeIn();
                $('.caption').stop().fadeIn();
            }, function() {
                if (!volumeDrag && !timeDrag) {
                    $('.control').stop().fadeOut();
                    $('.caption').stop().fadeOut();
                }
            });
            //display video buffering bar
            var startBuffer = function() {
                var currentBuffer = video[0].buffered.end(0);
                var maxduration = video[0].duration;
                var perc = 100 * currentBuffer / maxduration;
                $('.bufferBar').css('width', perc + '%');
                if (currentBuffer < maxduration) {
                    setTimeout(startBuffer, 500);
                }
            };
            $('.next strong').on('click', function() {
                // $('.btnPlay').find('.icon-play').addClass('icon-play').removeClass('icon-pause');
                // $(this).unbind('click');
                // video[0].pause();
                index++;
                if (index == videolist.length) {
                    index = 0;
                }
                console.log(index);
                video[0].pause();
                video[0].setAttribute('src', videolist[index]);
                video[0].load();
                video[0].play();
            });
            //display current video play time
            video.on('timeupdate', function() {
                var currentPos = video[0].currentTime;
                var maxduration = video[0].duration;
                var perc = 100 * currentPos / maxduration;
                $('.timeBar').css('width', perc + '%');
                $('.current').text(timeFormat(currentPos));
            });
            //CONTROLS EVENTS
            //video screen and play button clicked
            video.on('click', function() {
                playpause();
            });
            $(".control").click(function(e) {
                if (e.target == this) { // only if the target itself has been clicked
                    playpause();
                }
            });
            $('.btnPlay').on('click', function() {
                playpause();
            });
            var playpause = function() {
                if (video[0].paused || video[0].ended) {
                    $('.btnPlay').addClass('paused');
                    $('.btnPlay').find('.icon-play').addClass('icon-pause').removeClass('icon-play');
                    video[0].play();
                } else {
                    $('.btnPlay').removeClass('paused');
                    $('.btnPlay').find('.icon-pause').removeClass('icon-pause').addClass('icon-play');
                    video[0].pause();
                }
            };
            //fullscreen button clicked
            $('.btnFS').on('click', function() {
                if ($.isFunction(video[0].webkitEnterFullscreen)) {
                    video[0].webkitEnterFullscreen();
                } else if ($.isFunction(video[0].mozRequestFullScreen)) {
                    video[0].mozRequestFullScreen();
                } else {
                    alert('Your browsers doesn\'t support fullscreen');
                }
            });
            //sound button clicked
            $('.sound strong').click(function() {
                video[0].muted = !video[0].muted;
                $(this).parent().toggleClass('muted');
                if (video[0].muted) {
                    $('.volumeBar').css('width', 0);
                } else {
                    $('.volumeBar').css('width', video[0].volume * 100 + '%');
                }
            });
            //VIDEO EVENTS
            //video canplay event
            video.on('canplay', function() {
                $('.loading').fadeOut(100);
            });
            //video canplaythrough event
            //solve Chrome cache issue
            var completeloaded = false;
            video.on('canplaythrough', function() {
                completeloaded = true;
            });
            //video ended event
            video.on('ended', function() {
                $('.btnPlay').removeClass('paused');
                video[0].pause();
            });
            //video seeking event
            video.on('seeking', function() {
                //if video fully loaded, ignore loading screen
                if (!completeloaded) {
                    $('.loading').fadeIn(200);
                }
            });
            //video seeked event
            video.on('seeked', function() {});
            //video waiting for more data event
            video.on('waiting', function() {
                $('.loading').fadeIn(200);
            });
            //VIDEO PROGRESS BAR
            //when video timebar clicked
            var timeDrag = false; /* check for drag event */
            $('.progress-bar').on('mousedown', function(e) {
                timeDrag = true;
                updatebar(e.pageX);
            });
            $(document).on('mouseup', function(e) {
                if (timeDrag) {
                    timeDrag = false;
                    updatebar(e.pageX);
                }
            });
            $(document).on('mousemove', function(e) {
                if (timeDrag) {
                    updatebar(e.pageX);
                }
            });
            var updatebar = function(x) {
                var progress = $('.progress');
                //calculate drag position
                //and update video currenttime
                //as well as progress bar
                var maxduration = video[0].duration;
                var position = x - progress.offset().left;
                var percentage = 100 * position / progress.width();
                if (percentage > 100) {
                    percentage = 100;
                }
                if (percentage < 0) {
                    percentage = 0;
                }
                $('.timeBar').css('width', percentage + '%');
                video[0].currentTime = maxduration * percentage / 100;
            };
            //VOLUME BAR
            //volume bar event
            var volumeDrag = false;
            $('.volume').on('mousedown', function(e) {
                volumeDrag = true;
                video[0].muted = false;
                $('.sound').removeClass('muted');
                updateVolume(e.pageX);
            });
            $(document).on('mouseup', function(e) {
                if (volumeDrag) {
                    volumeDrag = false;
                    updateVolume(e.pageX);
                }
            });
            $(document).on('mousemove', function(e) {
                if (volumeDrag) {
                    updateVolume(e.pageX);
                }
            });
            var updateVolume = function(x, vol) {
                var volume = $('.volume');
                var percentage;
                //if only volume have specificed
                //then direct update volume
                if (vol) {
                    percentage = vol * 100;
                } else {
                    var position = x - volume.offset().left;
                    percentage = 100 * position / volume.width();
                }
                if (percentage > 100) {
                    percentage = 100;
                }
                if (percentage < 0) {
                    percentage = 0;
                }
                //update volume bar and video volume
                $('.volumeBar').css('width', percentage + '%');
                video[0].volume = percentage / 100;
                //change sound icon based on volume
                if (video[0].volume == 0) {
                    $('.sound').removeClass('sound2').addClass('muted');
                } else if (video[0].volume > 0.5) {
                    $('.sound').removeClass('muted').addClass('sound2');
                } else {
                    $('.sound').removeClass('muted').removeClass('sound2');
                }
            };
            //Time format converter - 00:00
            var timeFormat = function(seconds) {
                var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
                var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
                return m + ":" + s;
            };
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