// ==UserScript==
// @name         Explore & Remember
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically applies "Explore" filter based on your settings
// @author       You
// @match        https://fetlife.com/explore*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fetlife.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // uncomment to enable categories
    let CATEGORIES = JSON.parse(window.localStorage.getItem("k_and_p_categories") || '["pictures", "videos", "posts", "commercial"]');

    window.addEventListener("load", () => {
        let filtersChanged = false;
        const filterForm = document.querySelector(".simple_form");
        const checkboxes = document.querySelectorAll("input[type='checkbox']");

        console.log("CALLED");
        checkboxes.forEach(checkbox => {
            // track category changes
            checkbox.addEventListener("change", () => {

               if (checkbox.checked) {
                   if (!CATEGORIES.includes(checkbox.value)) {
                       CATEGORIES.push(checkbox.value);
                   }
               } else {
                   if (CATEGORIES.includes(checkbox.value)) {
                       CATEGORIES = CATEGORIES.filter(category => category !== checkbox.value);
                   }
               }

               window.localStorage.setItem("k_and_p_categories", JSON.stringify(CATEGORIES));
            });
            const newValue = CATEGORIES.includes(checkbox.value);

            if (checkbox.checked !== newValue) {
                checkbox.checked = newValue;
                filtersChanged = true;
            }

            checkbox.checked = CATEGORIES.includes(checkbox.value);
        });

        if (filtersChanged) {
            filterForm.submit();
        }
    });

    // Your code here...
})();

