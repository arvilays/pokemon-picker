const container = document.querySelector(".container");

const pokemonParty = swordParty;

const teamSize = 6;
const sortMode = "all"; // "favorites", "non", "all"
const artStyle = "official"; // "official", "pixel"
const showNames = true;
const showTypes = true;

function main() {
    generatePage(filterPokemon(pokemonParty));
    //generateAnyPokemon();
}

const filterPokemon = party => {
    if (sortMode == "favorites") return party.filter(item => item.favorite == true);
    else if(sortMode == "non") return party.filter(item => item.favorite == false);
    else return party;
}

const generateUniqueNumbers = (size, max) => {
    let arr = [];
    while (arr.length < size) {
        let generatedNumber = Math.floor(Math.random() * max);
        if (!arr.includes(generatedNumber)) arr.push(generatedNumber);
    }
    return arr;
}

const generateRandomParty = (party, numbers) => {
    let arr = [];
    for (let i = 0; i < numbers.length; i++) {
        arr.push(party[numbers[i]]);
    }
    return arr;
}

const generatePokemonFromParty = (party, style = "official") => {
    for (let i = 0; i < party.length; i++) {
        let pokemonSlot = document.createElement("div");
        pokemonSlot.classList.add("pokemon");
        let pokemonTitle = generateTitle(party[i]["nickname"]);
        let pokemonImage = document.createElement("img");

        fetch('https://pokeapi.co/api/v2/pokemon/' + party[i]["species"].toLowerCase())
            .then(response => response.json())
            .then(data => {
                pokemonImage.src = generateImageLink(data, party[i]["shiny"]);
                if (showTypes) generateTypes(data, pokemonTitle);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        pokemonSlot.appendChild(pokemonTitle);    
        pokemonSlot.appendChild(pokemonImage);
        container.appendChild(pokemonSlot);
    }
}

async function generateAnyPokemon() {
    const res = await fetch('https://pokeapi.co/api/v2/pokedex/1');
    const json = await res.json(); 
    
    let randomParty = generateUniqueNumbers(teamSize, json.pokemon_entries.length);
    for (let i = 0; i < randomParty.length; i++) {
        let pokemonSlot = document.createElement("div");
        pokemonSlot.classList.add("pokemon");
        let pokemonTitle;
        let pokemonImage = document.createElement("img");

        fetch('https://pokeapi.co/api/v2/pokemon/' + String(randomParty[i]))
            .then(response => response.json())
            .then(data => {
                pokemonTitle = generateTitle(data["name"]);
                pokemonTitle.style.textTransform = "capitalize";
                pokemonImage.src = generateImageLink(data, false);
                if (showTypes) generateTypes(data, pokemonTitle);
                pokemonSlot.appendChild(pokemonTitle);
                pokemonSlot.appendChild(pokemonImage);            
            })
            .catch(error => {
                console.error('Error:', error);
            });
        container.appendChild(pokemonSlot);
    }
}








const generateTitle = pokemonName => {
    let name = document.createElement("div");
    name.classList.add("title");
    if (showNames) {
        let name_span = document.createElement("span");
        name.classList.add("name");

        if (pokemonName == "") {
            name_span.textContent = party[i]["species"].toUpperCase();
            name_span.style.color = "gold";
        }
        else name_span.textContent = pokemonName;

        if (!showTypes) name_span.style.marginRight = "0px";
        name.appendChild(name_span);
    }
    return name;
}

const generateImageLink = (data, isShiny) => {
    if (artStyle == "official") {
        if (isShiny) return data["sprites"]["other"]["official-artwork"].front_shiny;
        else return data["sprites"]["other"]["official-artwork"].front_default;
    } else if (artStyle == "pixel") {
        if (isShiny) return data["sprites"].front_shiny;
        else return data["sprites"].front_default;
    }
}

const generateTypes = (data, title) => {
    for (let i = 0; i < data["types"].length; i++) {
        let type = data["types"][i]["type"]["name"];
        let typeIcon = document.createElement("img");
        typeIcon.classList.add("type");
        typeIcon.classList.add(type);
        typeIcon.src = "./images/types/" + type + "-icon-circle.png";
        title.appendChild(typeIcon);
    }
};

const generatePage = (party) => {
    let randomNumbers = generateUniqueNumbers(teamSize, party.length);
    let randomParty = generateRandomParty(party, randomNumbers);
    generatePokemonFromParty(randomParty, artStyle);
}

main();








