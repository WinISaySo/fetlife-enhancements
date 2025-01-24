// ==UserScript==
// @name         Red Flags
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Highlight problematic phrases on a profile
// @author       WinISaySo
// @match        https://fetlife.com/users/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fetlife.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // Only match against profile pages, not activity, pictures, etc.
  // Should have worked with @match above, but doesn't.
  const DEFAULT_RED_FLAGS = [
    "race play",
    "raceplay",
    "Race Play",
    "RacePlay"
  ];

  const profilePageRegex = /https:\/\/fetlife.com\/users\/\d+$/;
  if (!window.location.href.match(profilePageRegex)) {
    return;
  }

  const createRedFlag = text => `
        <mark>${text}</mark>
    `;

  const addStyles = () => {
    const styles = document.createElement("style");
    styles.innerHTML = `
            mark {
                background-color: red;
            }

        `;
    document.querySelector("head").appendChild(styles);
  }

  window.addEventListener("load", () => {
    addStyles();
    const redFlags = JSON.parse(window.localStorage.getItem("w/fl/red_flags")) || DEFAULT_RED_FLAGS;
    window.localStorage.setItem("w/fl/red_flags", JSON.stringify(redFlags));

    for (let flag of redFlags) {
      document.body.innerHTML = document.body.innerHTML.replace(new RegExp(flag, "g"), createRedFlag(flag));
    }
  });
})();
