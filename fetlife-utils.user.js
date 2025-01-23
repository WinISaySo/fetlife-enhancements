// ==UserScript==
// @name         FetLife Utils
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Helper functions to make FetLife userscripts easier to write. Install this before installing any of my other enhancements.
// @author       WinISaySo
// @match        https://fetlife.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fetlife.com
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    window.addEventListener("load", () => {
        const body = document.querySelector("head");
        const utilsScript = document.createElement("script");
        utilsScript.defer = true;
        utilsScript.textContent = `
            function shouldNotIntercept(evt) {
                return !evt.canIntercept || evt.hashChange || evt.downloadRequest || evt.formData;
            }


            // wait for a given element to exist before executinmg a callback
            function whenElementExists(selector) {
                return new Promise(resolve => {
                    const element = document.querySelector(selector);
                    if (document.querySelector(selector)) return resolve(element);

                    const observer = new MutationObserver(mutations => {
                        const element = document.querySelector(selector);

                        if (element) {
                            observer.disconnect();
                            resolve(element);
                        }
                    });

                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                });
            }
        `;
        body.appendChild(utilsScript);
    });
})();

