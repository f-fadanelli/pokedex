const pokeApi = {}

function convertPokeapiDetailToPokemon(pokedetail){
    const pokemon = new Pokemon()
    pokemon.name = pokedetail.name
    pokemon.number = pokedetail.id
    pokemon.types = pokedetail.types.map((typeSlot)=>typeSlot.type.name)
    pokemon.type = pokemon.types[0]
    pokemon.photo = pokedetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then(response=>response.json()).then((pokemon)=>convertPokeapiDetailToPokemon(pokemon))
}

pokeApi.getPokemons = (limit = 12, offset = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((res) => res.json())
        .then((responseBody) => responseBody.results)
        .then((pokemons)=>pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest)=>Promise.all(detailRequest))
        .then((pokemonDetail)=>pokemonDetail)
}

