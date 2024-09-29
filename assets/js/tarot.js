// Define tarotCards array at the top level
const tarotCards = [
    { name: "The Fool", img: "assets/images/TheFool.jpg" },
    { name: "The Moon", img: "assets/images/TheMoon.jpg" },
    { name: "The Hanged Man", img: "assets/images/TheHangedMan.jpg" },
    { name: "The Magician", img: "assets/images/TheMagician.jpg" },
    { name: "Knight Of Swords", img: "assets/images/KnightOfSwords.jpg" },
    { name: "Eight Of Pentacles", img: "assets/images/EightOfPentacles.jpg" },
    { name: "The Empress", img: "assets/images/TheMoon.jpg" },
    { name: "The Sun", img: "assets/images/TheMoon.jpg" }
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
    randomCards.forEach(card => {
        inputFields += `
            <div class="tarot-card">
                <img src="${card.img}" alt="${card.name}">
                <p>${card.name}</p>
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
    const firstFewSentences = suggestionText.split(/[.!?]/).slice(0, 3).join('. ');
    
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
            // Extract the body from the response
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
});