export default class Cards {
    pages = 1 

    
    getApi= async () => {
        const API_URL = "https://api.themoviedb.org/3/movie/now_playing?";
        const API_KEY = "api_key=b21a66e54bd549a7b732439c991da465";
        const prueba = API_URL + API_KEY;

        try{ 
            const res = await fetch(`${prueba}&page=${this.pages}`);
            const json = await res.json();
            this.getPoster(json)

        }catch(err){
            console.log(err);
        }
    }

    init(){
        const backBtn = document.getElementById('back-button');
        const nextBtn = document.getElementById('next-button');

        nextBtn.addEventListener('click', () => {
            if(this.pages < 1000){
                this.pages++
                this.getApi()
            }
        });

        backBtn.addEventListener('click', () => {
            if(this.pages > 1) {
                this.pages--
                this.getApi()
            }
        });
    }

    getPoster (json) {
        let poster = []
        const mainContainer = document.getElementById("main_container");
        const IMG_URL = 'https://image.tmdb.org/t/p/original';
        
        json.results.forEach(Movie => {
            poster += `<img class="poster" src="${IMG_URL}${Movie.poster_path}">`
            mainContainer.innerHTML = poster
        });
    }

}