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
    function updateCardInputs(spreadType, randomize) {
        let inputFields = '';
        let numCards = 1;

        if (spreadType === 'threeCards') {
            numCards = 3;
        } else if (spreadType === 'celticCross') {
            numCards = 5;
        }

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
                inputFields += `<label>Select card ${i}:</label><br>`;
                tarotCards.forEach(card => {
                    inputFields += `
                        <div class="tarot-card">
                            <input type="radio" name="card${i}" value="${card.name}">
                            <img src="${card.img}" alt="${card.name}">
                            <p>${card.name}</p>
                        </div>
                    `;
                });
            }
        }

        document.getElementById('cardInputs').innerHTML = inputFields;
    }

	document.getElementById('randomizeCards').addEventListener('click', function() {
		const spreadType = document.getElementById('spreadType').value;
		let numCards = 1;

		if (spreadType === 'threeCards') {
			numCards = 3;
		} else if (spreadType === 'celticCross') {
			numCards = 10;
		}

    randomizeCards(numCards); // Call the randomization function
	});


	// Update the event listener to call the selectCard function when a card is chosen
	document.querySelectorAll('input[name^="card"]').forEach(input => {
		input.addEventListener('change', function() {
			selectCard(this.value);
		});
	});
	
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

    // Form submission and API call to AWS Lambda
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
            const numCards = spreadType === 'single' ? 1 : (spreadType === 'threeCards' ? 3 : 10);
            for (let i = 1; i <= numCards; i++) {
                const selectedCard = document.querySelector(`input[name="card${i}"]:checked`);
                if (selectedCard) {
                    cardData.cards.push(selectedCard.value);
                }
            }
        }

        // Make an AJAX request to AWS Lambda via API Gateway
        fetch('https://ffb93g9xme.execute-api.eu-west-3.amazonaws.com/Deploy', {  // Replace with your API Gateway URL
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

           // Display the suggestion in a properly formatted manner
           document.getElementById("movieSuggestion").innerHTML = suggestion.body
            .replace(/\n/g, "<br>"); // Replace newline characters with <br> tags
        })
        .catch(error => {
           console.error('Error retrieving movie suggestion:', error);
           document.getElementById("movieSuggestion").innerHTML = "Error retrieving movie suggestion.";
        });
    });

    // Initialize with default values
    updateCardInputs(document.getElementById('spreadType').value, document.getElementById('randomize').checked);
});
