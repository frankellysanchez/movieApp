import Checker from "./checker.js";
import Cards from "./cards.js";
import Burger from "./burger.js";
import Dark from "./dark.js";




window.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("btn_search");
    const cards = new Cards();
    cards.init()
    cards.getApi()
    const burger = new Burger();
    burger.burgerMove()
    const dark = new Dark();
    dark.darkMode();


    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const checker = new Checker();
        checker.verifyInput();
    })

});