// ==UserScript==
// @name         Disable View Counts
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Hide that anxiety-provoking view counts
// @author       WinISaySo
// @match        https://fetlife.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fetlife.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const removeViewCount = () => {
        const viewCount = document.querySelector("[data-views]");
        viewCount.style.display = "none";

        const spacer = viewCount.nextSibling;
        spacer.style.display = "none";
    }

    // handle client-side routing (such as when you click on "Comments"
    // Firefox doesn't support window.navigation
    window.navigation && window.navigation.addEventListener("navigate", evt => {
        if (shouldNotIntercept(evt)) return;
        whenElementExists("[data-views]").then(removeViewCount);
    });


    // handle initial page load
    window.addEventListener("load", () => {
        whenElementExists("[data-views]").then(removeViewCount);
    });
})();

