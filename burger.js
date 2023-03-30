export default class Burger {
    //efect of burger move

    burgerMove () {
    const burger = document.querySelector(".nav-burger");
    const close = document.querySelector(".nav-close");
    const links = document.querySelector(".nav-links");


    burger.addEventListener("click", function(){
        links.classList.toggle("show-links")
    });
    }

}

/*A eso se le llama parsing o unmarshalling, la conversion de JSON a un tipo de dato nativo del lenguaje que usan.*/
/*Y cual sería la diferencia entre casting y parsing?*/