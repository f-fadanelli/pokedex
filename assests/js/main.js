const limit = 12
let offset = 0
const maxRecords = 151
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')

function loadPokemonItens(limit, offset){
    pokeApi.getPokemons(limit, offset)
    .then((results = [])=>{
        pokemonList.innerHTML += results.map((pokemon)=>
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            `).join('')
    })
}

loadPokemonItens(limit, offset)

loadMoreButton.addEventListener('click', ()=>{
    offset+=limit
    const qtdRecord = offset+limit
    if(qtdRecord>=maxRecords){
        loadPokemonItens(maxRecords-offset, offset)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return
    }
    loadPokemonItens(limit, offset)
})