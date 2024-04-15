const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.button_prev');
const buttonNext = document.querySelector('.button_next');

pokemonImage.style.display = 'none';

let searchPokemon = 1;
let pokemonResult = false;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // fetch the API

    if (APIResponse.status === 200) { // if the response is 200 (OK)
        console.log(APIResponse); // log the data to the console
        const pokemonData = await APIResponse.json(); // convert the response to JSON
        return pokemonData; // return the JSON data
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'; // set the name of the pokemon

    const pokemonData = await fetchPokemon(pokemon); // wait for the data to come back

    if (pokemonData) {
        pokemonImage.style.display = 'block'; // show the image
        pokemonName.innerHTML = pokemonData.name; // set the name of the pokemon
        pokemonNumber.innerHTML = pokemonData.id; // set the number of the pokemon
        pokemonImage.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // set the image of the pokemon
        console.log(pokemonData); // log the data to the console
        input.value = ''; // clear the input
        searchPokemon = pokemonData.id;
        pokemonResult = true;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting
    renderPokemon(input.value.toLowerCase()); // render the pokemon
});

buttonPrev.addEventListener('click', () => {
    if (pokemonResult === true) {
        if (searchPokemon > 1) {
            searchPokemon -= 1;
            renderPokemon(searchPokemon);
        }
    }
});

buttonNext.addEventListener('click', () => {
    if (pokemonResult === true) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});