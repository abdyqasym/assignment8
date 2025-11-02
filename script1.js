const cards = [
            "Why are you gay?",
            "Troll face",
            "Sigma",
            "Chill guy",
            "Knee surgery",
            "Bombardino crocodilo",
            "Thinking monkey",
            "You are my sunshine (Kobe Bryant)",
            "Doge",
            "Cute hamster",
            "First time, huh?"
        ];

        let selectedCards = [...cards];
        let players = 0;
        let randomCard = "";
        let spyIndex = 0;
        let gameStarted = false;

        function initializeCardSelection() {
            const cardOptions = document.getElementById("card-options");
            cardOptions.innerHTML = "";
            
            cards.forEach((card, index) => {
                const cardOption = document.createElement("div");
                cardOption.className = "card-option";
                
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = `card-${index}`;
                checkbox.checked = true;
                checkbox.addEventListener("change", updateSelectedCards);
                
                const label = document.createElement("label");
                label.htmlFor = `card-${index}`;
                label.textContent = card;
                
                cardOption.appendChild(checkbox);
                cardOption.appendChild(label);
                cardOptions.appendChild(cardOption);
            });
        }

        function updateSelectedCards() {
            selectedCards = [];
            cards.forEach((card, index) => {
                const checkbox = document.getElementById(`card-${index}`);
                if (checkbox.checked) {
                    selectedCards.push(card);
                }
            });

            if (selectedCards.length === 0) {
                cards.forEach((card, index) => {
                    const checkbox = document.getElementById(`card-${index}`);
                    checkbox.checked = true;
                    selectedCards.push(card);
                });
            }
        }

        function startGame() {
            if (selectedCards.length === 0) {
                alert("Please select at least one card!");
                return;
            }
            
            players = 0;
            randomCard = selectedCards[Math.floor(Math.random() * selectedCards.length)];
            spyIndex = Math.floor(Math.random() * 3);
            gameStarted = true;
            
            document.getElementById("btn").textContent = "Next";
            document.getElementById("restart").style.display = "inline-block";
            document.getElementById("card").textContent = "";
            document.getElementById("info").textContent = "";

            document.querySelector(".card-selection").style.display = "none";
        }

        function restartGame() {
            players = 0;
            randomCard = selectedCards[Math.floor(Math.random() * selectedCards.length)];
            spyIndex = Math.floor(Math.random() * 3);
            
            document.getElementById("btn").textContent = "Next";
            document.getElementById("btn").style.display = "inline-block";
            document.getElementById("card").textContent = "";
            document.getElementById("info").textContent = "";
            
            document.querySelector(".card-selection").style.display = "block";
        }


        document.getElementById("btn").addEventListener("click", () => {
            if (!gameStarted) {
                startGame();
                return;
            }
            
            const card = document.getElementById("card");
            const info = document.getElementById("info");

            if (players < 3) {
                if (players === spyIndex) {
                    card.textContent = "You are a SPY!";
                } else {
                    card.textContent = "Card: " + randomCard;
                }
                info.textContent = `Player ${players + 1}`;
                players++;
                
                if (players === 3) {
                    document.getElementById("btn").textContent = "Finish";
                }
            } else {
                card.textContent = "";
                info.textContent = "Everyone's ready! Let the discussion begin!";
                document.getElementById("btn").style.display = "none";
            }
        });


        document.getElementById("restart").addEventListener("click", restartGame);


        initializeCardSelection();