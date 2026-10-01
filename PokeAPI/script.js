const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const pokemonCard = document.getElementById('pokemonCard');
const messageContainer = document.getElementById('messageContainer');

const pokemonImg = document.getElementById('pokemonImg');
const pokemonName = document.getElementById('pokemonName');
const pokemonId = document.getElementById('pokemonId');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonAbilities = document.getElementById('pokemonAbilities');

searchBtn.addEventListener('click', fetchPokemon);
pokemonInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') fetchPokemon();
});

async function fetchPokemon() {
  const query = pokemonInput.value.trim().toLowerCase();

  if (!query) {
    showMessage('Por favor, digite o nome ou ID de um Pokémon.');
    return;
  }

  showMessage('Buscando informações...');
  pokemonCard.classList.add('hidden');

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
      throw new Error('Pokémon não encontrado.');
    }

    const data = await response.json();

    renderPokemonData(data);
    clearMessage();
  } catch (error) {
    showMessage(`Erro: ${error.message}`);
    pokemonCard.classList.add('hidden');
  }
}

function renderPokemonData(data) {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = data.id;

  pokemonImg.src = data.sprites.front_default || 'https://via.placeholder.com/150';
  pokemonImg.alt = data.name;

  const types = data.types.map(t => t.type.name).join(', ');
  pokemonTypes.textContent = types;

  const abilities = data.abilities.map(a => a.ability.name).join(', ');
  pokemonAbilities.textContent = abilities;

  pokemonCard.classList.remove('hidden');
}

function showMessage(msg) {
  messageContainer.textContent = msg;
}

function clearMessage() {
  messageContainer.textContent = '';
}