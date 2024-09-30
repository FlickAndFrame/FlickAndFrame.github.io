// Define tarotCards array at the top level
const tarotCards = [
    { name: "The Fool", img: "assets/images/TheFool.jpg" },
    { name: "The Moon", img: "assets/images/TheMoon.jpg" },
    { name: "The Hanged Man", img: "assets/images/TheHangedMan.jpg" },
    { name: "The Magician", img: "assets/images/TheMagician.jpg" },
    { name: "The Empress", img: "assets/images/TheEmpress.png" },
    { name: "The Sun", img: "assets/images/TheSun.png" },
	{ name: "Death", img: "assets/images/Death.png" },
	{ name: "Judgement", img: "assets/images/Judgement.png" },
	{ name: "Justice", img: "assets/images/Justice.png" },
	{ name: "Strength", img: "assets/images/Strength.png" },
	{ name: "Temperance", img: "assets/images/Temperance.png" },
	{ name: "The Chariot", img: "assets/images/TheChariot.png" },
	{ name: "The Emperor", img: "assets/images/TheEmperor.png" },
	{ name: "The Hermit", img: "assets/images/TheHermit.png" },
	{ name: "The Hierophant", img: "assets/images/TheHierophant.png" },
	{ name: "The Hight Priestess", img: "assets/images/TheHighPriestess.png" },
	{ name: "The Lovers", img: "assets/images/TheLovers.png" },
	{ name: "The Star", img: "assets/images/TheStar.png" },
	{ name: "The Tower", img: "assets/images/TheTower.png" },
	{ name: "The World", img: "assets/images/TheWorld.png" },
	{ name: "Wheel Of Fortune", img: "assets/images/WheelOfFortune.png" },
    { name: "Ace Of Pentacles", img: "assets/images/AceOfPentacles.png" },
	{ name: "Two Of Pentacles", img: "assets/images/TwoOfPentacles.png" },
	{ name: "Three Of Pentacles", img: "assets/images/ThreeOfPentacles.png" },
	{ name: "Four Of Pentacles", img: "assets/images/FourOfPentacles.png" },
	{ name: "Five Of Pentacles", img: "assets/images/FiveOfPentacles.png" },
	{ name: "Six Of Pentacles", img: "assets/images/SixOfPentacles.png" },
	{ name: "Seven Of Pentacles", img: "assets/images/SevenOfPentacles.png" },
	{ name: "Eight Of Pentacles", img: "assets/images/EightOfPentacles.png" },
	{ name: "Nine Of Pentacles", img: "assets/images/NineOfPentacles.png" },
	{ name: "Ten Of Pentacles", img: "assets/images/TenOfPentacles.png" },
	{ name: "Page Of Pentacles", img: "assets/images/PageOfPentacles.png" },
	{ name: "Knight Of Pentacles", img: "assets/images/KnightOfPentacles.png" },
	{ name: "Queen Of Pentacles", img: "assets/images/QueenOfPentacles.png" },
	{ name: "King Of Pentacles", img: "assets/images/KingOfPentacles.png" },
	{ name: "Ace Of Cups", img: "assets/images/AceOfCups.png" },
	{ name: "Two Of Cups", img: "assets/images/TwoOfCups.png" },
	{ name: "Three Of Cups", img: "assets/images/ThreeOfCups.png" },
	{ name: "Four Of Cups", img: "assets/images/FourOfCups.png" },
	{ name: "Five Of Cups", img: "assets/images/FiveOfCups.png" },
	{ name: "Six Of Cups", img: "assets/images/SixOfCups.png" },
	{ name: "Seven Of Cups", img: "assets/images/SevenOfCups.png" },
	{ name: "Eight Of Cups", img: "assets/images/EightOfCups.png" },
	{ name: "Nine Of Cups", img: "assets/images/NineOfCups.png" },
	{ name: "Ten Of Cups", img: "assets/images/TenOfCups.png" },
	{ name: "Page Of Cups", img: "assets/images/PageOfcups.png" },
	{ name: "Knight Of Cups", img: "assets/images/KnightOfCups.png" },
	{ name: "Queen Of Cups", img: "assets/images/QueenOfCups.png" },
	{ name: "King Of Cups", img: "assets/images/KingOfCups.png" },
	{ name: "Ace Of Swords", img: "assets/images/AceOfSwords.png" },
	{ name: "Two Of Swords", img: "assets/images/TwoOfSwords.png" },
	{ name: "Three Of Swords", img: "assets/images/ThreeOfSwords.png" },
	{ name: "Four Of Swords", img: "assets/images/FourOfSwords.png" },
	{ name: "Five Of Swords", img: "assets/images/FiveOfSwords.png" },
	{ name: "Six Of Swords", img: "assets/images/SixOfSwords.png" },
	{ name: "Seven Of Swords", img: "assets/images/SevenOfSwords.png" },
	{ name: "Eight Of Swords", img: "assets/images/EightOfSwords.png" },
	{ name: "Nine Of Swords", img: "assets/images/NineOfSwords.png" },
	{ name: "Ten Of Swords", img: "assets/images/TenOfSwords.png" },
	{ name: "Page Of Swords", img: "assets/images/PageOfSwords.png" },
	{ name: "Knight Of Swords", img: "assets/images/KnightOfSwords.png" },
	{ name: "Queen Of Swords", img: "assets/images/QueenOfSwords.png" },
	{ name: "King Of Swords", img: "assets/images/KingOfSwords.png" },
	{ name: "Ace Of Wands", img: "assets/images/AceOfWands.png" },
	{ name: "Two Of Wands", img: "assets/images/TwoOfWands.png" },
	{ name: "Three Of Wands", img: "assets/images/ThreeOfWands.png" },
	{ name: "Four Of Wands", img: "assets/images/FourOfWands.png" },
	{ name: "Five Of Wands", img: "assets/images/FiveOfWands.png" },
	{ name: "Six Of Wands", img: "assets/images/SixOfWands.png" },
	{ name: "Seven Of Wands", img: "assets/images/SevenOfWands.png" },
	{ name: "Eight Of Wands", img: "assets/images/EightOfWands.png" },
	{ name: "Nine Of Wands", img: "assets/images/NineOfWands.png" },
	{ name: "Ten Of Wands", img: "assets/images/TenOfWands.png" },
	{ name: "Page Of Wands", img: "assets/images/PageOfWands.png" },
	{ name: "Knight Of Wands", img: "assets/images/KnightOfWands.png" },
	{ name: "Queen Of Wands", img: "assets/images/QueenOfWands.png" },
	{ name: "King Of Wands", img: "assets/images/KingOfWands.png" },
	
    // Add more cards here if needed
];

const TMDB_API_KEY = 'fb4ca4f02a295416f2f10ecbdf84a0e3'; // Replace with your actual TMDb API key

// Function to get random cards
function getRandomCards(num) {
    return tarotCards.sort(() => 0.5 - Math.random()).slice(0, num);
}

// Function to update the selected card display
function updateSelectedCards() {
    const selectedCardsContainer = document.getElementById('selectedCards');
    selectedCardsContainer.innerHTML = '';

    const selects = document.querySelectorAll('.card-selection select');
    selects.forEach((select, index) => {
        if (select.value) {
            const card = tarotCards.find(c => c.name === select.value);
            if (card) {
                const cardElement = document.createElement('div');
                cardElement.className = 'selected-card';
                cardElement.innerHTML = `
                    <img src="${card.img}" alt="${card.name}" style="width: 100px; height: auto;">
                    <p>Card ${index + 1}: ${card.name}</p>
                `;
                selectedCardsContainer.appendChild(cardElement);
            }
        }
    });
}

// Function to handle card selection
function selectCard(cardName) {
    const selectedCards = [...document.querySelectorAll('.tarot-card input:checked')].map(input => input.value);
    updateSelectedCards(selectedCards);
}

// Function to randomize cards
function randomizeCards(numCards) {
    const randomCards = getRandomCards(numCards);
    let inputFields = '';
    randomCards.forEach((card, index) => {
        inputFields += `
            <div class="tarot-card">
                <img src="${card.img}" alt="${card.name}">
                <p>Card ${index + 1}: ${card.name}</p>
            </div>
        `;
    });
    document.getElementById('cardInputs').innerHTML = inputFields;
    document.getElementById('selectedCards').innerHTML = '';
}

function updateCardInputs(spreadType, randomize) {
    let inputFields = '';
    let numCards = 1;

    if (spreadType === 'threeCards') {
        numCards = 3;
    } else if (spreadType === 'celticCross') {
        numCards = 10;
    }

    console.log('Updating card inputs:', { spreadType, randomize, numCards });

    inputFields = '<div class="card-container">';

    if (randomize) {
        const randomCards = getRandomCards(numCards);
        randomCards.forEach((card, index) => {
            inputFields += `
                <div class="tarot-card">
                    <img src="${card.img}" alt="${card.name}">
                    <p>Card ${index + 1}: ${card.name}</p>
                </div>
            `;
        });
    } else {
        for (let i = 1; i <= numCards; i++) {
            inputFields += `
                <div class="card-selection">
                    <label for="card${i}">Card ${i}:</label>
                    <select id="card${i}" name="card${i}" onchange="updateCardImage(this)">
                        <option value="">Choose a card</option>
                        ${tarotCards.map(card => `<option value="${card.name}">${card.name}</option>`).join('')}
                    </select>
                </div>
            `;
        }
    }

    inputFields += '</div>';

    console.log('Generated input fields:', inputFields);
    document.getElementById('cardInputs').innerHTML = inputFields;
    
    // Clear selected cards
    document.getElementById('selectedCards').innerHTML = '';
}

let suggestionCount = 0;

function updateSuggestionCounter() {
    document.getElementById('suggestionCount').textContent = suggestionCount;
}

function setupDisclaimerToggle() {
    const disclaimerToggle = document.getElementById('disclaimerToggle');
    const disclaimerContent = document.getElementById('disclaimerContent');

    disclaimerToggle.addEventListener('click', function() {
        if (disclaimerContent.style.display === 'none' || disclaimerContent.style.display === '') {
            disclaimerContent.style.display = 'block';
            disclaimerToggle.textContent = 'Hide Disclaimer';
        } else {
            disclaimerContent.style.display = 'none';
            disclaimerToggle.textContent = 'Disclaimer';
        }
    });
}

// Function to update card image
function updateCardImage(select) {
    const cardName = select.value;
    const card = tarotCards.find(c => c.name === cardName);

    console.log('Selected card:', cardName);
    console.log('Found card:', card);

    updateSelectedCards();
}

function extractMovieInfo(suggestionText) {
    // Regular expression to match the pattern "Movie Title" (YYYY)
    const regex = /"([^"]+)"\s*\((\d{4})\)/;
    
    // Get the first few sentences (let's say 3)
    const firstFewSentences = suggestionText.split(/[.!?]/).slice(0, 10).join('. ');
    
    // Search for the pattern in the first few sentences
    const match = firstFewSentences.match(regex);
    
    if (match) {
        return {
            title: match[1],
            year: match[2]
        };
    }
    
    return { title: null, year: null };
}

function fetchMoviePoster(movieTitle, movieYear) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}&year=${movieYear}`;
    
    return fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const posterPath = data.results[0].poster_path;
                return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
            }
            return null;
        });
}

// Main event listener
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for spread type change
    document.getElementById('spreadType').addEventListener('change', function() {
        const spreadType = this.value;
        const randomize = document.getElementById('randomize').checked;
        updateCardInputs(spreadType, randomize);
    });

    // Event listener for randomize checkbox
    document.getElementById('randomize').addEventListener('change', function() {
        const spreadType = document.getElementById('spreadType').value;
        const randomize = this.checked;
    
        if (randomize) {
            let numCards = 1;
            if (spreadType === 'threeCards') {
                numCards = 3;
            } else if (spreadType === 'celticCross') {
                numCards = 10;
            }
            randomizeCards(numCards);
        } else {
            updateCardInputs(spreadType, false);
        }

        const randomizeButton = document.getElementById('randomizeCards');
        randomizeButton.style.display = randomize ? 'block' : 'none';
    });

    // Event listener for randomize button
    document.getElementById('randomizeCards').addEventListener('click', function() {
        const spreadType = document.getElementById('spreadType').value;
        let numCards = 1;

        if (spreadType === 'threeCards') {
            numCards = 3;
        } else if (spreadType === 'celticCross') {
            numCards = 10;
        }

        randomizeCards(numCards);
    });

    // Form submission and API call to AWS Lambda
    document.getElementById('submitTarot').addEventListener('click', function() {
        const spreadType = document.getElementById('spreadType').value;
        const randomize = document.getElementById('randomize').checked;
        let cardData = {
            spreadType: spreadType,
            randomize: randomize,
            cards: []
        };

        if (randomize) {
            const tarotCards = document.querySelectorAll('.tarot-card p');
            tarotCards.forEach(card => {
                cardData.cards.push(card.textContent.split(': ')[1]);
            });
        } else {
            const selects = document.querySelectorAll('.card-selection select');
            selects.forEach(select => {
                if (select.value) {
                    cardData.cards.push(select.value);
                }
            });
        }
		
		// Increment the suggestion count
        suggestionCount++;
        updateSuggestionCounter();

        // Make an AJAX request to AWS Lambda via API Gateway
        fetch('https://ffb93g9xme.execute-api.eu-west-3.amazonaws.com/Deploy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract the body from the response of the ai
            const suggestion = JSON.parse(data.body);

            // Extract the movie title and year from the suggestion
            const { title, year } = extractMovieInfo(suggestion.body);

            // Fetch the movie poster
            if (title) {
                fetchMoviePoster(title, year)
                    .then(posterUrl => {
                        let htmlContent = suggestion.body.replace(/\n/g, "<br>");
                        if (posterUrl) {
                            htmlContent = `<img src="${posterUrl}" alt="Movie Poster" id="moviePoster"><br>${htmlContent}`;
                        }
                        document.getElementById("movieSuggestion").innerHTML = htmlContent;
                    })
                    .catch(error => {
                        console.error('Error fetching movie poster:', error);
                        document.getElementById("movieSuggestion").innerHTML = suggestion.body.replace(/\n/g, "<br>");
                    });
            } else {
                document.getElementById("movieSuggestion").innerHTML = suggestion.body.replace(/\n/g, "<br>");
            }
        })
        .catch(error => {
            console.error('Error retrieving movie suggestion:', error);
            document.getElementById("movieSuggestion").innerHTML = "Error retrieving movie suggestion.";
        });
    });

    // Initialize with default values
    updateCardInputs(document.getElementById('spreadType').value, document.getElementById('randomize').checked);

	// Set up the disclaimer toggle
    setupDisclaimerToggle();
	
});