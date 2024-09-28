document.addEventListener('DOMContentLoaded', function() {
    const tarotCards = [
        { name: "The Fool", img: "assets/images/TheFool.jpg" },
        { name: "The Moon", img: "assets/images/TheMoon.jpg" },
        { name: "The Hanged Man", img: "assets/images/TheHangedMan.jpg" }
        // Add more cards here
    ];

    function getRandomCards(num) {
        return tarotCards.sort(() => 0.5 - Math.random()).slice(0, num);
    }

    function updateCardSelectionArea(spreadType, randomize) {
        const cardSelectionArea = document.getElementById('cardSelectionArea');
        cardSelectionArea.innerHTML = '';

        if (randomize) {
            cardSelectionArea.style.display = 'none';
            return;
        }

        cardSelectionArea.style.display = 'flex';
        let numCards = spreadType === 'single' ? 1 : (spreadType === 'threeCards' ? 3 : 10);

        for (let i = 1; i <= numCards; i++) {
            const column = document.createElement('div');
            column.className = 'card-column';

            const select = document.createElement('select');
            select.className = 'card-select';
            select.id = `card${i}`;
            select.innerHTML = '<option value="">Select a card</option>';

            tarotCards.forEach(card => {
                const option = document.createElement('option');
                option.value = card.name;
                option.textContent = card.name;
                select.appendChild(option);
            });

            select.addEventListener('change', updateSelectedCards);

            column.appendChild(select);
            cardSelectionArea.appendChild(column);
        }
    }

    function updateSelectedCards() {
        const selectedCardsContainer = document.getElementById('selectedCards');
        selectedCardsContainer.innerHTML = '';

        const selects = document.querySelectorAll('.card-select');
        selects.forEach(select => {
            if (select.value) {
                const card = tarotCards.find(c => c.name === select.value);
                if (card) {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'selected-card';
                    cardElement.innerHTML = `
                        <img src="${card.img}" alt="${card.name}">
                        <p>${card.name}</p>
                    `;
                    selectedCardsContainer.appendChild(cardElement);
                }
            }
        });
    }

    function randomizeCards(numCards) {
        const randomCards = getRandomCards(numCards);
        const selectedCardsContainer = document.getElementById('selectedCards');
        selectedCardsContainer.innerHTML = '';

        randomCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'selected-card';
            cardElement.innerHTML = `
                <img src="${card.img}" alt="${card.name}">
                <p>${card.name}</p>
            `;
            selectedCardsContainer.appendChild(cardElement);
        });
    }

    document.getElementById('spreadType').addEventListener('change', function() {
        const spreadType = this.value;
        const randomize = document.getElementById('randomize').checked;
        updateCardSelectionArea(spreadType, randomize);
    });

    document.getElementById('randomize').addEventListener('change', function() {
        const spreadType = document.getElementById('spreadType').value;
        const randomize = this.checked;
        updateCardSelectionArea(spreadType, randomize);
        document.getElementById('randomizeCards').style.display = randomize ? 'block' : 'none';
        document.getElementById('selectedCards').innerHTML = '';
    });

    document.getElementById('randomizeCards').addEventListener('click', function() {
        const spreadType = document.getElementById('spreadType').value;
        let numCards = spreadType === 'single' ? 1 : (spreadType === 'threeCards' ? 3 : 10);
        randomizeCards(numCards);
    });

    document.getElementById('submitTarot').addEventListener('click', function() {
        const spreadType = document.getElementById('spreadType').value;
        const randomize = document.getElementById('randomize').checked;
        let cardData = {};

        if (randomize) {
            cardData.randomize = true;
            cardData.spreadType = spreadType;
        } else {
            cardData.randomize = false;
            cardData.cards = [];
            const selects = document.querySelectorAll('.card-select');
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
            const suggestion = JSON.parse(data.body);
            document.getElementById("movieSuggestion").innerHTML = suggestion.body.replace(/\n/g, "<br>");
        })
        .catch(error => {
            console.error('Error retrieving movie suggestion:', error);
            document.getElementById("movieSuggestion").innerHTML = "Error retrieving movie suggestion.";
        });
    });

    // Initialize with default values
    updateCardSelectionArea(document.getElementById('spreadType').value, document.getElementById('randomize').checked);
});