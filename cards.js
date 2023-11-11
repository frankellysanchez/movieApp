export default class Cards {

    pages = 1 

    youtubeAutorisation = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjFhNjZlNTRiZDU0OWE3YjczMjQzOWM5OTFkYTQ2NSIsInN1YiI6IjYzZjQwYjNiNTI0OTc4MDBkYzQ0YTA1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iydeub5JtaJT2xXmsFu0dXQah2tkJt0yW26ni1Dssak"
    getApi= async () => {
        const API_URL = "https://api.themoviedb.org/3/movie/now_playing?";
        const API_KEY = "api_key=b21a66e54bd549a7b732439c991da465";
        const prueba = API_URL + API_KEY;
        const closeBtn = document.getElementById("closeBtn");
        const ShowandHiddeCards = document.getElementById("ShowandHiddeCards");
        
 
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

    

    getPoster(json) {
        //console.log(json);
        const mainContainer = document.getElementById("main_container");
        const IMG_URL = 'https://image.tmdb.org/t/p/original';
        const posterContainer = document.getElementById("posterContainer");
    
        json.results.forEach(movie => {
            const poster = document.createElement('img');
            poster.className = 'poster';
            poster.src = `${IMG_URL}${movie.poster_path}`;
            mainContainer.appendChild(poster);
    
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.youtubeAutorisation}`
                }
            };
    
            // Función para manejar el evento de clic y pasar la información del nuevo fetch
            const handlePosterClick = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, options);
                    const videoInfo = await response.json();
                    let infMovie = [];
                    let keyVideo = videoInfo.results;
                    let key = []
                    keyVideo.forEach(video => {
                        if(video.name === "Official Trailer" || video.name === "Official Trailer [Subtitled]" || video.name === "Official US Trailer"){
                         key.push(video.key)
                        }
                    });
                    //
                    posterContainer.innerHTML = "";
                    // Resto del código para mostrar la información en el modal

                    infMovie += `<div class="showMovieInfContainer">
                                        <div class="imgContainer">
                                            <img src="${IMG_URL}${movie.backdrop_path}" width="100%" height="100%">
                                        </div>
                                        <div class="infContainer">
                                        <h1>${movie.title}</h1>
                                            <p class="date"><strong>Date:</strong> ${movie.release_date}</p>
                                            <p><strong>Language:</strong> ${movie.original_language}</p>
                                        </div>
                                        <div class="reviewContainer">
                                            
                                            <p><strong>Overview</strong> <br/>${movie.overview}</p>
                                        </div>
                                        <div class="trailerContainer">
                                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                        </div>
                                    </div>`;
                    posterContainer.innerHTML = infMovie;
                } catch (err) {
                    console.error(err);
                }
            };
           
            
                closeBtn.addEventListener("click", () => {
                    posterContainer.style.display = "none";
                    closeBtn.style.display = "none"
                    ShowandHiddeCards.style.display = "block"
                });
            // Asociar el evento de clic al póster
            poster.addEventListener('click',  ()=>{
                ShowandHiddeCards.style.display = "none"
                closeBtn.style.display = "block"
                posterContainer.style.display = "block" 
                handlePosterClick()
            });
        });
    }
    

    

}