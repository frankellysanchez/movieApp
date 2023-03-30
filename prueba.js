

    const API_URL = "https://api.themoviedb.org/3/movie/now_playing?";
    const API_KEY = "api_key=b21a66e54bd549a7b732439c991da465";
    const prueba = API_URL + API_KEY;
    const BASE_URL = API_URL + "/discover/movie?sort_by=popularity.desc&";
    const image_path = "https://image.tmdb.org/t/p/original";
    const image_path2 = "https://image.tmdb.org/t/p/original";
    
    //fuction to get the inf abput the API.

    const getEl = async() => {
        try{
        const data = await fetch(`${prueba}`);
        console.log(data)

        if (data.status === 200){
            const object = await data.json();
            console.log(object);
        }else if (data.status === 401){
            console.log("")
        }
        

        }catch(error){
            console.log(error)
        }
        
    } 
    getEl()




