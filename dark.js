export default class Dark {

    darkMode() {
        const darkBtn = document.querySelector(".btn-light")
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

        // Add transition classes to elements for smooth mode switching
        this.addTransitions();

        darkBtn.addEventListener('click', () => {
            // Add animation feedback to the button
            darkBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                darkBtn.style.transform = 'scale(1)';
            }, 100);

            // Toggle classes with proper error checking
            if (day) day.classList.toggle("dayColor");
            if (navBurger) navBurger.classList.toggle("navBurgerColor");
            if (body) body.classList.toggle("bodyColor");
            if (footercontainer) footercontainer.classList.toggle("footer_containerColor");
            if (hero) hero.classList.toggle("heroColor");
            if (navLogo) {
                navLogo.classList.toggle("nav-logoColor");
                // Ensure logo stays visible
                navLogo.style.opacity = '1';
                navLogo.style.visibility = 'visible';
            }
            if (subTittle) subTittle.classList.toggle("subTittleColor");
            if (copyright) copyright.classList.toggle("copyrightColor");
            if (search_bar) search_bar.classList.toggle("search_barColor");
            if (navImmages) navImmages.classList.toggle("navBurgerColor");

            // Also apply to modal if it's currently open
            const posterContainer = document.getElementById("posterContainer");
            if (posterContainer && posterContainer.style.display === "block") {
                posterContainer.classList.toggle("bodyColor");
            }
        })
    }

    addTransitions() {
        // Add smooth transitions to elements that will change
        const elementsToTransition = [
            'body', '.hero', '.nav-logo', 'input', '.poster', '.btn', '.btns button',
            '.pruebadeestilos', '.showMovieInfContainer', '.closeBtn'
        ];

        elementsToTransition.forEach(selector => {
            const elements = selector === 'body'
                ? [document.body]
                : document.querySelectorAll(selector);

            elements.forEach(element => {
                if (element) {
                    element.style.transition = 'all 0.3s ease';
                }
            });
        });
    }

}