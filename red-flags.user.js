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

  const DEFAULT_FLAGS = [
    "BBC",
    "QOS",
    "QoS",
    "Queen of Spades",
    "Race Play",
    "Race play",
    "RacePlay",
    "Raceplay",
    "bbc",
    "black slaves",
    "bwc",
    "monkey",
    "nigger",
    "qos",
    "queen of spades",
    "race play",
    "raceplay",
  ];


  // Only match against profile pages, not activity, pictures, etc.
  // Should have worked with @match above, but doesn't.
  const profilePageRegex = /https:\/\/fetlife.com\/users\/\d+$/;
  if (!window.location.href.match(profilePageRegex)) {
    return;
  }

  // add styles for marked red-flags to the page
  const addStyles = () => {
    const styles = document.createElement("style");
    styles.innerHTML = `
            mark.red-flag {
                font-weight bold;
                color: blue;
                background-color: orange;
            }

        `;
    document.querySelector("head").appendChild(styles);
  }

  const markRedFlag = (elements, flag) => {
    elements.forEach(element => {
      if (element.textContent.includes(flag)) {
        element.innerHTML = element.innerHTML.replace(
          RegExp(flag, "g"), 
          `<mark class="red-flag">${flag}</mark>`
        );
      }
    });
  };

  const addConfigButton = () => {
    // load exisint flags;
    const flags = JSON.parse(window.localStorage.getItem("w/fl/red_flags")) || DEFAULT_FLAGS;

    // creaet a button that can be used to change flag preferences
    const menuElement = document.querySelector("[href='/inbox']");
    const configButton = document.createElement("a");

    configButton.className = menuElement.className;
    configButton.textContent = "🚩";

    // update flags when that button is clicked
    configButton.addEventListener("click", () => {
      const response = prompt(
        "Which red flags would you like me to spot for you? Paste a comma-separated list to use for them",
        flags.join(",")
      );
      const newFlags = response.split(",");
      window.localStorage.setItem("w/fl/red_flags", JSON.stringify(newFlags));
      if (JSON.stringify(newFlags) !== JSON.stringify(flags)) {
        window.location.reload();
      }
    });

    // add the new button along side other menu items
    menuElement.insertAdjacentElement("beforebegin", configButton);

    return flags;
  };

  window.addEventListener("load", () => {
    addStyles();
    const flags = addConfigButton();
    flags.forEach(flag => markRedFlag(document.querySelectorAll("p,a,span"), flag));
  });
})();
