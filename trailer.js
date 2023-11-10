export default class Trailer {

         async fetchMovieTrailer(movie) {
          const apiKey = 'b21a66e54bd549a7b732439c991da465';
          const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`;
          const yourBearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjFhNjZlNTRiZDU0OWE3YjczMjQzOWM5OTFkYTQ2NSIsInN1YiI6IjYzZjQwYjNiNTI0OTc4MDBkYzQ0YTA1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iydeub5JtaJT2xXmsFu0dXQah2tkJt0yW26ni1Dssak'
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${yourBearerToken}`, // Reemplaza con tu lógica para obtener el token seguro
            },
          };
      
          try {
            const response = await fetch(url, options);
      
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
      
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }
      


};