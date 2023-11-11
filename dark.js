export default class Dack {

    darkMode() {
        const darkBtn =  document.querySelector(".btn-light")
        const body = document.getElementById("body")
        const footercontainer = document.querySelector(".footer_container");
        const hero = document.querySelector(".hero");
        const navLogo = document.querySelector(".nav-logo");
        const subTittle = document.getElementById("subTittle");
        const copyright = document.querySelector(".copyright");
        const navLink = document.querySelector(".nav-link1")
        const navLink2 = document.querySelector(".nav-link2")
        const navLink3 = document.querySelector(".nav-link3")
        const navLink4 = document.querySelector(".nav-link4");
        const search_bar = document.getElementById("search_bar");
        const day =  document.querySelector(".day");
        const night =document.querySelector(".night");
        const navImmages = document.querySelector(".nav_images");
        const showMovieInfContainer = document.querySelector(".showMovieInfContainer");
        
        darkBtn.addEventListener('click', () => { 
            body.classList.toggle("bodyColor");
            footercontainer.classList.toggle("footer_containerColor");
            hero.classList.toggle("heroColor");
            navLogo.classList.toggle("nav-logoColor")
            subTittle.classList.toggle("subTittleColor")
            copyright.classList.toggle("copyrightColor")
            navLink.classList.toggle("nav-linkColor");
            navLink2.classList.toggle("nav-linkColor");
            navLink3.classList.toggle("nav-linkColor");
            navLink4.classList.toggle("nav-linkColor");
            search_bar.classList.toggle("search_barColor");
            darkBtn.classList.toggle("btn-dark");
            day.classList.toggle("day2");
            navImmages.classList.toggle("navBurgerColor")
            showMovieInfContainer.classList.toggle("showMovieInfContainerColor")
        })
        
    }
    
}