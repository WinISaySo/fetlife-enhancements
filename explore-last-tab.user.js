// ==UserScript==
// @name         Explore Last Tab
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Browsing "Explore" will remember the last tab you went to the next time you visit "Explore".
// @author       WinISaySo
// @match        https://fetlife.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fetlife.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", () => {
        let lastTab = window.localStorage.getItem("w/fl/explore_last_tab") || "/explore";
        const currentLocation = window.location.pathname;

        const regex = /\/explore($|(\/(for-you|following|fresh-and-pervy|stuff-you-love|commercial)))/g
        const matches = currentLocation.match(regex);
        if (matches) {
            lastTab = matches[0];
            window.localStorage.setItem("w/fl/explore_last_tab", lastTab);
        }

        const exploreLink = document.querySelector('a[href*="explore"]');
        exploreLink.href = lastTab;
    });
})();
