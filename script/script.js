const container = document.querySelector(".container");

const teamSize = 6;
const artStyle = "official"; // "official", "pixel"
const showNames = true;
const showTypes = true;

function main() {
    generatePage(swordNuzlocke);
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

        fetch('https://pokeapi.co/api/v2/pokemon/' + party[i]["species"])
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








