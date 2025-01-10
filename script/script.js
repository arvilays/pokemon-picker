const container = document.querySelector(".container");

const teamSize = 6;
const artStyle = "official"; // "official", "pixel"
const showNames = true;

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

const generateImagesFromParty = (party, style = "official") => {
    for (let i = 0; i < party.length; i++) {
        let div = document.createElement("div");
        div.classList.add("pokemon");

        let name = document.createElement("div");
        if (showNames) {
            name.classList.add("name");
            if (party[i]["nickname"] == "") {
                name.textContent = party[i]["species"].toUpperCase();
                name.style.color = "gold";
            }
            else name.textContent = party[i]["nickname"];
        }   

        let img = document.createElement("img");
        fetch('https://pokeapi.co/api/v2/pokemon/' + party[i]["species"])
            .then(response => response.json())
            .then(data => {
                if (style == "official") {
                    if (party[i]["shiny"]) img.src = data["sprites"]["other"]["official-artwork"].front_shiny;
                    else img.src = data["sprites"]["other"]["official-artwork"].front_default;
                } else if (style == "pixel") {
                    if (party[i]["shiny"]) img.src = data["sprites"].front_shiny;
                    else img.src = data["sprites"].front_default;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        if (showNames) div.appendChild(name);    
        div.appendChild(img);
        container.appendChild(div);
    }
}

const generatePage = (party) => {
    let randomNumbers = generateUniqueNumbers(teamSize, party.length);
    let randomParty = generateRandomParty(party, randomNumbers);
    generateImagesFromParty(randomParty, artStyle);
}

main();








