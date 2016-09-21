/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    wipe;
    $root = '/';
$(function() {
    var app = {
        init: function() {
            $(window).load(function() {
                $(".loader").hide();
                wipe = new SWWipe(document.getElementsByClassName("slider")[0]);
            });
            $(window).resize(function(event) {
              wipe.resize();
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