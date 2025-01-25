// ==UserScript==
// @name         Red Flags
// @namespace    http://tampermonkey.net/
// @version      1.0.0
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
  const DEFAULT_FLAGS = [
          "race play",
          "raceplay",
          "Raceplay",
          "Race Play",
          "Race play",
          "RacePlay",
          "black slaves"
 ];


  const profilePageRegex = /https:\/\/fetlife.com\/users\/\d+$/;
  if (!window.location.href.match(profilePageRegex)) {
    return;
  }

  const createRedFlag = text => `
        <mark class="red-flag">${text}</mark>
    `;

  const addStyles = () => {
    const styles = document.createElement("style");
    styles.innerHTML = `
            mark.red-flag {
                font-weight bold;
                color: black;
                background-color: red;
            }

        `;
    document.querySelector("head").appendChild(styles);
  }

    const logRedFlag = (elements, flag) => {
      const found = [];
      elements.forEach(element => {
          if (element.textContent.includes(flag)) {
              found.push({ element, flag });
          }
      });

      if (found.length) {
          found.forEach(match => {
              match.element.innerHTML = match.element.innerHTML.replace(RegExp(match.flag, "g"), createRedFlag(match.flag));
          });
      } else {
          //console.log({ flag, message: "NOT FOUND" });
      }
  };

  const CONFIG_MENU = `

  `;

  const addConfigButton = (flags) => {
      const menuElement = document.querySelector("[href='/inbox']");

      const configButton = document.createElement("a");
      configButton.className = menuElement.className;
      configButton.textContent = "🚩";

      configButton.addEventListener("click", () => {
          const response = prompt(
              "Which red flags would you like me to spot for you? Paste a comma-separated list to use for them",
              flags.join(",")
          );
          const newFlags = response.split(",");
          window.localStorage.setItem("w/fl/red_flags", JSON.stringify(newFlags));
      });

      menuElement.insertAdjacentElement("beforebegin", configButton);
      return JSON.parse(window.localStorage.getItem("w/fl/red_flags")) || DEFAULT_FLAGS;

  };

  window.addEventListener("load", () => {
    addStyles();

    let flags = JSON.parse(window.localStorage.getItem("w/fl/red_flags")) || DEFAULT_FLAGS;
    flags = addConfigButton(flags);
    console.log({ flags });
    for (let flag of flags) {
        //
      logRedFlag(document.querySelectorAll("p,a,span"), flag);
      //document.body.innerHTML = document.body.innerHTML.replace(new RegExp(flag, "g"), createRedFlag(flag));
    }
  });
})();
