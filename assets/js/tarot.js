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

    
	// Function to update the selected card display
	function updateSelectedCards() {
		const selectedCardsContainer = document.getElementById('selectedCards');
		selectedCardsContainer.innerHTML = '';

		const selects = document.querySelectorAll('.card-selection select');
		selects.forEach(select => {
			if (select.value) {
				const card = tarotCards.find(c => c.name === select.value);
				if (card) {
					const cardElement = document.createElement('div');
					cardElement.className = 'selected-card';
					cardElement.style.margin = '0 10px';
					cardElement.innerHTML = `
						<img src="${card.img}" alt="${card.name}" style="width: 100px; height: auto;">
						<p>${card.name}</p>
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
	
	function randomizeCards(numCards) {
		const randomCards = getRandomCards(numCards);
		// Update the card inputs with random selections
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
		// Clear the selected cards when new cards are randomized
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
                    <label for="card${i}">Select card ${i}:</label>
                    <select id="card${i}" name="card${i}" onchange="updateCardImage(this)">
                        <option value="">Choose a card</option>
                        ${tarotCards.map(card => `<option value="${card.name}">${card.name}</option>`).join('')}
                    </select>
                    <div class="card-image"></div>
                </div>
            `;
        }
    }

    document.getElementById('cardInputs').innerHTML = inputFields;
}
    function updateCardImage(select) {
		const cardName = select.value;
		const cardImageDiv = select.nextElementSibling;
		const card = tarotCards.find(c => c.name === cardName);
    
		if (card) {
			cardImageDiv.innerHTML = `<img src="${card.img}" alt="${card.name}" style="width: 100px; height: auto;">`;
		} else {
			cardImageDiv.innerHTML = '';
		}
    
		updateSelectedCards();
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

    // Update form when the spread type or randomize option changes
    document.getElementById('spreadType').addEventListener('change', function() {
        const spreadType = this.value;
        const randomize = document.getElementById('randomize').checked;
        updateCardInputs(spreadType, randomize);
    });


	// Update the event listener to call the selectCard function when a card is chosen
	document.querySelectorAll('input[name^="card"]').forEach(input => {
		input.addEventListener('change', function() {
			selectCard(this.value);
		});
	});
	
    document.getElementById('randomize').addEventListener('change', function() {
        const spreadType = document.getElementById('spreadType').value;
        const randomize = this.checked;
        updateCardInputs(spreadType, randomize);
    });
	
	document.getElementById('randomize').addEventListener('change', function() {
     const isChecked = this.checked;
     const randomizeButton = document.getElementById('randomizeCards');

     // Show or hide the button based on the checkbox state
     if (isChecked) {
        randomizeButton.style.display = 'block'; // Show the button
     } else {
        randomizeButton.style.display = 'none'; // Hide the button
        document.getElementById('cardInputs').innerHTML = ''; // Clear the card inputs when unchecked
     }
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
			const selects = document.querySelectorAll('.card-selection select');
			selects.forEach(select => {
				if (select.value) {
					cardData.cards.push(select.value);
				}
			});
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
