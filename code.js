const burger = document.querySelector(".nav-burger");
const close = document.querySelector(".nav-close");
const links = document.querySelector(".nav-links");


burger.addEventListener("click", function(){
    links.classList.toggle("show-links")
});



let pages = 1;
const backbtn = document.getElementById("back-button");
const nextbtn = document.getElementById("next-button");

nextbtn.addEventListener('click', () => {
    if(pages < 1000){
        pages++;
        getmovie();
    }
})

backbtn.addEventListener('click', () => {
    if(pages > 1){
        pages--;
        getmovie();
    }
})

//getAPI



//get the inform of the API
const searchBar = document.getElementById("search_bar");
const IMG_URL = 'https://image.tmdb.org/t/p/original';
const API_KEY = "b21a66e54bd549a7b732439c991da465"
const searchBtn = document.getElementById("btn_search");
//div container
const main_container = document.getElementById("main_container");
const prueba = document.getElementById("prueba");
const movieID = [315162];




    


/*const getTrailer = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`)
    const data = await res.json();
    console.log(data)

  
    
    
}

getMovie();*/





searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    searchKey(searchBar.value)
    searchBar.value = "";
    
})

const searchKey = async(searchBar) => {
    try{const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchBar}`)
    if(res.status === 200) {
        const data = await res.json();
        let movies = '';
        data.results.forEach(movie => {
            movies += `<a id= "prueba" > <img class="poster" id="poster" src="${IMG_URL}${movie.poster_path}"></a>`

        });
        main_container.innerHTML = movies;

    }else if (answer.status === 401) {
        console.log("something wrong");

    }else{
        console.log("error")
    }

} catch(err){
    console.log(err);
}
}
searchKey()









const getmovie = async() => {
    
    try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pages}`)
        
        if(res.status === 200) {
            const data = await res.json();
            let movies = '';
            data.results.forEach(movie => {
                movies += `<a id= "prueba" ><img class="poster" id="poster" src="${IMG_URL}${movie.poster_path}" ></a>`
            
            });
            main_container.innerHTML = movies;
    
        }else if (res.status === 401) {
            console.log("something wrong");
    
        }else if (res.status === 404) {
            console.log("No Found");
        } else {
            console.log("problem with the code")
        }
    
    }catch (err){
        console.error(err);
    }
    
} 
getmovie()



//get detail and video 








