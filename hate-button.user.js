// ==UserScript==
// @name         The Hate Button
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Replace the down arrow with a broken heart and useful text
// @author       WinISaySo
// @match        https://fetlife.com/users/19831492/posts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fetlife.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", () => {
        const head = document.querySelector("head");
        const hateStyle = document.createElement("style");
        hateStyle.textContent = `
        [title="Downvoted"] > svg, [title="Downvote"] svg {
                display: none;
            }
            [title="Downvote"] {
                color: transparent;
                text-shadow: 0 0 0 rgb(var(--colors-gray-600));
            }
            [title="Downvoted"]:before, [title="Downvote"]:before {
                content: "Hate · 💔";
            }
        `;
        head.appendChild(hateStyle);
        
    });
})();
