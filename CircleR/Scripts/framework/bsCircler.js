/*
@(#)File:           bsCircler
@(#)Version:        v1.0
@(#)Author:         B.S.
*/

(function ($) {
    $.fn.circler = function (options) {
        var defaults = {
            auto: true,
            animationSpeed: 1,
            coverWidth: 2,
            fillPercent: 99,
        };

        var o = $.extend(defaults, options);
        var $this = $(this);
        var $svg = $this.children('svg');
        var $circle = $svg.children('circle');
        var $mainCircle = $svg.children('path');
        var $content = $this.find('.percent');
        var width = $this.width() || 200;
        var timer, d, e;
        var i = 0;
        var angle = -90;
        var circle = $svg.children('path');
        var radius = (width / 2) - (2 * o.coverWidth);
        var angleToDraw;
        var ratioToCheck;
        var _initializePercentage = function () {
            angleToDraw = Math.round(o.fillPercent * 3.6);
            ratioToCheck = (o.fillPercent * 3.6).toString();
            if (ratioToCheck.indexOf('.') > -1) {
                var rat = ratioToCheck.substring(ratioToCheck.indexOf('.') + 1, ratioToCheck.indexOf('.') + 2);
                if (rat < 6) {
                    angleToDraw += 1;
                }
            }
        }

        var result = {
            animate: function (percent) {

                if (percent) {
                    if (percent > o.fillPercent) {
                        o.fillPercent = percent; _initializePercentage();
                    } else {
                        console.log('Need to go back ...');
                        //o.fillPercent = percent; _initializePercentage();
                        //this.animateBack();
                        return;
                    }
                }

                timer = window.setInterval(function () {
                    angle += 1;
                    angle %= 360;
                    var radians = (angle / 180) * Math.PI;

                    var x = ((width / 2) + Math.cos(radians) * radius);
                    var y = ((width / 2) + Math.sin(radians) * radius);
                    e = circle.attr("d");

                    if (i == 0) {
                        d = e + " M " + x + " " + y;
                    } else {
                        d = e + " L " + x + " " + y;
                    }

                    if (angle === (angleToDraw - 89)) {
                        window.clearInterval(timer);
                    }

                    circle.attr("d", d);
                    $content.html(parseInt((i * 100) / 360) + ' %');
                    i++;
                }, o.animationSpeed);
            },

            animateBack: function () {
                //TODO: Not Yet Implemented
                timer = window.setInterval(function () {
                    e = circle.attr('d');
                    var _LIndex = e.lastIndexOf('L');
                    d = e.substring(0, _LIndex);

                    var pointSum = e.split('L');
                    if (pointSum.length <= 1) { window.clearInterval(timer); }

                    circle.attr('d', d);
                }, o.animationSpeed);
            },

            initialize: function () {
                $circle.attr('cx', width / 2);
                $circle.attr('cy', width / 2);
                $circle.attr('r', (width / 2) - (2 * o.coverWidth));
                $mainCircle.attr('d', 'M0,0');
                _initializePercentage();
            }
        };

        result.initialize();
        return result;
    }
})(jQuery);