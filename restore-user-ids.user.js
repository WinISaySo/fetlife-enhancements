// ==UserScript==
// @name         Restore User Ids
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Replace user names in the url with user ids like they were before
// @author       You
// @match        https://fetlife.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fetlife.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.addEventListener("load", () => {
        let userId = window.localStorage.getItem("w/fl/restore_user_id");
        const viewProfileLink = document.querySelector("a[title='View Profile']");
        let userName = "";
        if (viewProfileLink) {
            userName = viewProfileLink.innerText.split(" ")[0];
            const foundUserId = viewProfileLink.href.split("/").at(-1);
            // might have changed because of switching to an alternate account
            if (userId !== foundUserId) {
                userId = foundUserId;
                window.localStorage.setItem("w/fl/restore_user_id", userId);
            }
        }
        if (userName && userId) {
            window.history.replaceState({ originalPath: window.location.path, reason: 'Restore User Ids enhancemeent is enabled' }, '', location.href.replace(new RegExp(userName, "g"), `users/${userId}`))
        }
    });
})();
