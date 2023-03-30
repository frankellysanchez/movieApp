
export default class Checker {
    inputValue = document.getElementById("search_bar");
    name = this.inputValue.value
    verifyInput(){
        if(this.inputValue.value === ""){
            this.getErrContainer("You must fill in  the field")
        } else {
            this.getInf()
            
        }
    }

    getInf = async () => {
        try{
            const apiKey = "b21a66e54bd549a7b732439c991da465"
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.name}`)
            const json = await res.json();
            let poster  = '' 
            json.results.forEach(Movie => {
            const IMG_URL = 'https://image.tmdb.org/t/p/original';
            const mainContainer = document.getElementById("main_container");
            poster += `<img class="poster" src="${IMG_URL}${Movie.poster_path}">`
            mainContainer.innerHTML = poster
            this.inputValue.value = ""
            console.log(json.total_pages);
        })
        }catch(err) {
            console.log(err);
        }
    }

    

    getErrContainer(errMsg){
        const fragment = new DocumentFragment()
        const errContainer = document.getElementById("error-container")
        const errTemplate = document.querySelector(".error-template").content
        const clone = errTemplate.cloneNode(true)
        fragment.appendChild(clone)
        errContainer.appendChild(fragment)
        
        document.querySelector(".alert-error").innerText = errMsg;
        this.displayErr(errContainer)
        
    }
    
    displayErr(errContainer) {
        errContainer.style.display = "block"
        setTimeout(() => {
            errContainer.style.display = "none"
            while(errContainer.firstChild) {
                errContainer.firstChild.remove();
            }
        }, 1500)
    }
    


    
}