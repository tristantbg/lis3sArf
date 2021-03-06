/*

  To Do
  ------------------------------------------
  Fix diagonal wipe
  fix radial wipe
  


*/
"use strict";
var SWWipe = (function(banner) {
    var _this = this;
    _this.banner = banner; // div container 
    _this.images; // array of img elements
    _this.imageArray = []; // object containing all images and their properties
    _this.percent; // percent completion of wipe, (ranges from 0 - fadeWidth to 1 + fadeWidth)
    _this.step; // the amount to increment _this.percent every frame, varies based on fadeDuration
    _this.curImg;
    _this.nxtImg;
    _this.backCanvas;
    _this.foreCanvas;
    _this.backContext;
    _this.foreContext;
    var index1 = -1;
    var index2 = 0;
    var WIDTH; // width of container (banner)
    var HEIGHT; // height of container
    var ASPECT; // aspect ratio of container 
    var startTime;
    var currentTime;
    var elapsed;
    var isSliding = false;
    var fadeWidth;
    var gradient;
    var nextLazy;
    var nextLazyImage;
    var interval;

    function cacheElements() {
        _this.images = banner.getElementsByClassName("lazyimg");
        _this.backCanvas = document.createElement('canvas');
        _this.foreCanvas = document.createElement('canvas');
        _this.banner.appendChild(_this.backCanvas);
        _this.banner.appendChild(_this.foreCanvas);
        _this.backContext = _this.backCanvas.getContext("2d");
        _this.foreContext = _this.foreCanvas.getContext("2d");
    }

    function init() {
        cacheElements();
        WIDTH = _this.banner.clientWidth;
        HEIGHT = _this.banner.clientHeight;
        ASPECT = WIDTH / HEIGHT;
        for (var i = 0; i < _this.images.length; i++) {
            var image = _this.images[i];
            var imageObject = {};
            imageObject.img = image;
            imageObject.aspect = image.width / image.height;
            imageObject.fadeDuration = image.hasAttribute("data-fadeDuration") ? Number(image.getAttribute("data-fadeDuration")) * 1000 : 1500;
            imageObject.fadeDelay = image.hasAttribute("data-fadeDelay") ? Number(image.getAttribute("data-fadeDelay")) * 1000 : 1000;
            imageObject.fadeType = image.hasAttribute("data-fadeType") ? image.getAttribute("data-fadeType") : "cross-lr";
            imageObject.fadeWidth = image.hasAttribute("data-fadeWidth") ? Number(image.getAttribute("data-fadeWidth")) : .1;
            _this.imageArray.push(imageObject);
        }
        //_this.nextFade();
        _this.curImg = _this.imageArray[0];
        _this.nxtImg = _this.imageArray[0];
        _this.resize();
        //resize until first image loaded
        var firstImg = _this.imageArray[0].img;
        interval = window.setInterval(function() {
            if (hasClass(firstImg, 'lazyloaded')) {
                window.dispatchEvent(new Event('resize'));
                _this.resize();
                window.clearInterval(interval);
                _this.banner.className += " initialized";
            } else {
                return;
            }
        }, 25);
    }
    _this.nextFade = function() {
        //check is next slide ready
        nextLazy = index2 + 1;
        if (nextLazy == _this.images.length) nextLazy = 0;
        nextLazyImage = _this.imageArray[nextLazy].img;
        // GO
        if (!isSliding && hasClass(nextLazyImage, 'lazyloaded')) {
            isSliding = true;
            // advance indices
            index1++;
            if (index1 == _this.images.length) index1 = 0;
            _this.curImg = _this.imageArray[index1];
            index2 = index1 + 1;
            if (index2 == _this.images.length) index2 = 0;
            _this.nxtImg = _this.imageArray[index2];
            //lazyload next images
            for (var i = 1; i < 3; i++) {
                if (index2 + i < _this.images.length && !hasClass(_this.imageArray[index2 + i].img, 'lazyloaded')) {
                    _this.imageArray[index2 + i].img.className += " lazyload";
                }
            }
            if (ASPECT > _this.curImg.aspect) {
                _this.backContext.drawImage(_this.curImg.img, 0, (HEIGHT - (WIDTH / _this.curImg.aspect)) / 2, WIDTH, WIDTH / _this.curImg.aspect);
            } else {
                _this.backContext.drawImage(_this.curImg.img, (WIDTH - (HEIGHT * _this.curImg.aspect)) / 2, 0, HEIGHT * _this.curImg.aspect, HEIGHT);
            }
            // clear the foreground
            _this.foreContext.clearRect(0, 0, WIDTH, HEIGHT);
            // setup and start the fade
            fadeWidth = _this.curImg.fadeWidth;
            _this.percent = -_this.curImg.fadeWidth;
            _this.step = 1 / (_this.curImg.fadeDuration * 1000);
            startTime = new Date;
            redraw();
        }
    }

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    function redraw() {
        // calculate percent completion of wipe
        currentTime = new Date;
        elapsed = currentTime - startTime;
        _this.percent = elapsed / _this.curImg.fadeDuration;
        //fadeWidth = _this.curImg.fadeWidth;
        _this.foreContext.save();
        _this.foreContext.clearRect(0, 0, WIDTH, HEIGHT);
        switch (_this.curImg.fadeType) {
            case "cross-lr":
                gradient = _this.foreContext.createLinearGradient(
                    (_this.percent * (1 + fadeWidth) - fadeWidth) * WIDTH, 0, (_this.percent * (1 + fadeWidth) + fadeWidth) * WIDTH, 0);
                gradient.addColorStop(0.0, 'rgba(0,0,0,1)');
                gradient.addColorStop(1.0, 'rgba(0,0,0,0)');
                _this.foreContext.fillStyle = gradient;
                _this.foreContext.fillRect(0, 0, WIDTH, HEIGHT);
                break;
            //  case "cross-lr-fix":
            //     gradient = _this.foreContext.createLinearGradient(0, 0, WIDTH, 0);
            //     var stop1 = (_this.percent * (1 + fadeWidth) - fadeWidth);
            //     var stop2 = (_this.percent * (1 + fadeWidth) + fadeWidth);
            //     if (stop1 < 0) {
            //         stop1 = 0;
            //     } else if (stop1 > 1) {
            //         stop1 = 1;
            //     }
            //     if (stop2 > 1) stop2 = 1;
            //     console.log(stop1 + ' - ' + stop2);
            //     gradient.addColorStop(0.0, 'rgba(0,0,0,1)');
            //     gradient.addColorStop(stop1, 'rgba(0,0,0,1)');
            //     gradient.addColorStop(stop2, 'rgba(0,0,0,0)');
            //     gradient.addColorStop(1.0, 'rgba(0,0,0,0)');
            //     _this.foreContext.fillStyle = gradient;
            //     _this.foreContext.fillRect(0, 0, WIDTH, HEIGHT);
            //     break;
            default:
                break;
        }
        _this.foreContext.globalCompositeOperation = "source-in";
        if (ASPECT > _this.nxtImg.aspect) {
            _this.foreContext.drawImage(_this.nxtImg.img, 0, (HEIGHT - (WIDTH / _this.nxtImg.aspect)) / 2, WIDTH, WIDTH / _this.nxtImg.aspect);
        } else {
            _this.foreContext.drawImage(_this.nxtImg.img, (WIDTH - (HEIGHT * _this.nxtImg.aspect)) / 2, 0, HEIGHT * _this.nxtImg.aspect, HEIGHT);
        }
        _this.foreContext.restore();
        if (elapsed < _this.curImg.fadeDuration) requestAnimFrame(redraw);
        else isSliding = false;
    }
    _this.resize = function() {
        WIDTH = _this.banner.clientWidth;
        //HEIGHT = window.innerHeight;
        HEIGHT = _this.banner.clientHeight; // DS: fix for iOS 9 bug
        ASPECT = WIDTH / HEIGHT;
        _this.backContext.canvas.width = WIDTH;
        _this.backContext.canvas.height = HEIGHT;
        _this.foreContext.canvas.width = WIDTH;
        _this.foreContext.canvas.height = HEIGHT;
        if (ASPECT > _this.nxtImg.aspect) {
            _this.backContext.drawImage(_this.nxtImg.img, 0, (HEIGHT - (WIDTH / _this.nxtImg.aspect)) / 2, WIDTH, WIDTH / _this.nxtImg.aspect);
        } else {
            _this.backContext.drawImage(_this.nxtImg.img, (WIDTH - (HEIGHT * _this.nxtImg.aspect)) / 2, 0, HEIGHT * _this.nxtImg.aspect, HEIGHT);
        }
    };
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
    init();
    return _this;
});