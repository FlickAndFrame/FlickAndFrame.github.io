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

    // Update form when the spread type or randomize option changes
    document.getElementById('spreadType').addEventListener('change', function() {
        const spreadType = this.value;
        const randomize = document.getElementById('randomize').checked;
        updateCardInputs(spreadType, randomize);
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
