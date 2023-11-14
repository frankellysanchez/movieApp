export default class Dack {

    darkMode() {
        const darkBtn =  document.querySelector(".btn-light")
        const body = document.getElementById("body")
        const footercontainer = document.querySelector(".footer_container");
        const hero = document.querySelector(".hero");
        const navLogo = document.querySelector(".nav-logo");
        const subTittle = document.getElementById("subTittle");
        const copyright = document.querySelector(".copyright");
        const search_bar = document.getElementById("search_bar");
        const navImmages = document.querySelector(".nav_images");
        const navBurger = document.querySelector(".nav-burger");
        const day = document.querySelector(".day");
        
        darkBtn.addEventListener('click', () => { 
            day.classList.toggle("dayColor");
            navBurger.classList.toggle("navBurgerColor");
            body.classList.toggle("bodyColor");
            footercontainer.classList.toggle("footer_containerColor");
            hero.classList.toggle("heroColor");
            navLogo.classList.toggle("nav-logoColor")
            subTittle.classList.toggle("subTittleColor")
            copyright.classList.toggle("copyrightColor")
            search_bar.classList.toggle("search_barColor");
            navImmages.classList.toggle("navBurgerColor")
        })
        
    }
    
}