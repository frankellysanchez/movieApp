const input = document.querySelector('input');
const btn = document.getElementById('btn');
const containerPokemon = document.querySelector('.containerPokemon');

btn.addEventListener("click", (e) =>{
    e.preventDefault();
    getPokemon(input.value)
})


function getPokemon(pokemon){
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then((res) => res.json())
    .then((data) => {
        makePokemon(data);
        
    });
}

function makePokemon(pokemon){
    const img = document.createElement('img');
    const img2 = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img2.src = pokemon.sprites.back_default;
    

    const h3 = document.createElement('h3');
    h3.textContent = pokemon.name;

    const div = document.createElement('container');
    div.appendChild(img);
    div.appendChild(img2);
    div.appendChild(h3);
    
    containerPokemon.appendChild(div);
}
