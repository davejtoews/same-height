"use strict";

var LayoutQueue = require('layout-queue');

var SameHeight = (function () {

    function getBiggestHeight(selector) {
        var biggestHeight = 0;
        [].forEach.call(document.querySelectorAll(selector), function(element) { 
            if (element.clientHeight > biggestHeight) {
                biggestHeight = element.clientHeight;
            }
        });
        return biggestHeight;
    }

    function enqueue(selector, mediaRule) {
        LayoutQueue.add(unsetHeights, [selector]); 
        LayoutQueue.add(conditionalSetHeights, [selector, mediaRule]); 
    }

    function conditionalSetHeights(selector, mediaRule) {
        if (mediaRule === undefined || window.matchMedia(mediaRule).matches) {
            setHeights(selector);
        }
    }

    function setHeights(selector) {
        var biggestHeight = getBiggestHeight(selector);
        [].forEach.call(document.querySelectorAll(selector), function(element) {
            element.style.height = biggestHeight + 'px';
        });
    }

    function unsetHeights(selector) {
        [].forEach.call(document.querySelectorAll(selector), function(element) {
            element.style.height = "auto";
        });
    }
    
    return {
        init: function (selector, mediaRule) {
            enqueue(selector, mediaRule);
        },
        set: function (selector) {
            setHeights (selector);
        },
        unset: function (selector) {
            unsetHeights(selector);
        }
    }  
})();

module.exports = SameHeight;