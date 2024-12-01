document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const introSection = document.getElementById('intro-section');
    const moduleSelection = document.getElementById('module-selection');
    const submodule1Content = document.getElementById('submodule-1-content');
    const submodule2Content = document.getElementById('submodule-2-content');
    const interactiveGamesSection = document.getElementById('interactive-games');
    const gameContainer = document.getElementById('game-container');
    const startCourseBtn = document.getElementById('start-course');
    const submodule1Btn = document.getElementById('submodule-1');
    const submodule2Btn = document.getElementById('submodule-2');
    const interactiveGamesBtn = document.getElementById('interactive-games');
    const returnToMenuBtn = document.getElementById('return-to-menu');

    // Función para cambiar secciones con animación
    function changeSection(hideSection, showSection) {
        hideSection.classList.add('slide-out');
        setTimeout(() => {
            hideSection.classList.remove('active', 'slide-out');
            hideSection.classList.add('hidden');
            showSection.classList.remove('hidden');
            showSection.classList.add('active', 'slide-in');
        }, 500);
    }

    // Funcionalidad del botón "Comenzar el curso"
    startCourseBtn.addEventListener('click', () => {
        changeSection(introSection, moduleSelection);
    });

    // Funcionalidad de los botones de submódulos y juegos interactivos
    submodule1Btn.addEventListener('click', () => {
        changeSection(moduleSelection, submodule1Content);
    });

    submodule2Btn.addEventListener('click', () => {
        changeSection(moduleSelection, submodule2Content);
    });

    interactiveGamesBtn.addEventListener('click', () => {
        changeSection(moduleSelection, interactiveGamesSection);
    });

    // Funcionalidad del botón "Volver al Menú Principal"
    returnToMenuBtn.addEventListener('click', () => {
        const activeSection = document.querySelector('section.active');
        changeSection(activeSection, moduleSelection);
    });

    // Funcionalidad de las pestañas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            button.classList.add('active');
            const activeContent = document.getElementById(`${tabName}-content`);
            activeContent.style.display = 'block';
            setTimeout(() => {
                activeContent.classList.add('active');
            }, 50);
        });
    });

    // Funcionalidad de copiar código
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-block').querySelector('code');
            const textArea = document.createElement('textarea');
            textArea.value = codeBlock.textContent.trim();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.textContent = '¡Copiado!';
            setTimeout(() => {
                button.textContent = 'Copiar';
            }, 2000);
        });
    });

    // Funcionalidad de la demostración interactiva
    let count = 0;
    const counterElement = document.getElementById('counter');
    const messageElement = document.getElementById('message');

    document.getElementById('increment-btn').addEventListener('click', () => {
        count++;
        counterElement.textContent = count;
    });

    document.getElementById('message-btn').addEventListener('click', () => {
        messageElement.textContent = '¡Hola, Mundo!';
    });

    // Animación de imágenes al hacer hover
    const animatedImages = document.querySelectorAll('.animated-image');
    animatedImages.forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Juegos Interactivos
    const hangmanBtn = document.getElementById('hangman-btn');
    const wordsearchBtn = document.getElementById('wordsearch-btn');
    const memoryBtn = document.getElementById('memory-btn');
    const quizBtn = document.getElementById('quiz-btn');

    hangmanBtn.addEventListener('click', () => loadGame('hangman'));
    wordsearchBtn.addEventListener('click', () => loadGame('wordsearch'));
    memoryBtn.addEventListener('click', () => loadGame('memory'));
    quizBtn.addEventListener('click', () => loadGame('quiz'));

    function loadGame(gameName) {
        gameContainer.innerHTML = '';
        gameContainer.classList.remove('hidden');

        switch (gameName) {
            case 'hangman':
                loadHangmanGame();
                break;
            case 'wordsearch':
                loadWordsearchGame();
                break;
            case 'memory':
                loadMemoryGame();
                break;
            case 'quiz':
                loadQuizGame();
                break;
        }
    }

    function loadHangmanGame() {
        const words = ['html', 'css', 'javascript', 'react', 'node', 'express', 'mongodb', 'api', 'frontend', 'backend'];
        let word = words[Math.floor(Math.random() * words.length)];
        let guessedLetters = [];
        let remainingGuesses = 6;

        const gameDiv = document.createElement('div');
        gameDiv.className = 'hangman-game';
        gameDiv.innerHTML = `
            <h3>Juego del Ahorcado</h3>
            <p>Adivina la palabra relacionada con el desarrollo web</p>
            <div class="hangman-word"></div>
            <div class="hangman-guesses">Intentos restantes: <span>${remainingGuesses}</span></div>
            <div class="hangman-letters"></div>
        `;

        gameContainer.appendChild(gameDiv);

        const wordDiv = gameDiv.querySelector('.hangman-word');
        const guessesSpan = gameDiv.querySelector('.hangman-guesses span');
        const lettersDiv = gameDiv.querySelector('.hangman-letters');

        function updateWord() {
            wordDiv.innerHTML = word.split('').map(letter => 
                guessedLetters.includes(letter) ? letter : '_'
            ).join(' ');
        }

        function createLetterButtons() {
            for (let i = 65; i <= 90; i++) {
                const letter = String.fromCharCode(i);
                const button = document.createElement('button');
                button.textContent = letter;
                button.addEventListener('click', () => guessLetter(letter.toLowerCase()));
                lettersDiv.appendChild(button);
            }
        }

        function guessLetter(letter) {
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                if (!word.includes(letter)) {
                    remainingGuesses--;
                    guessesSpan.textContent = remainingGuesses;
                }
                updateWord();
                checkGameEnd();
            }
        }

        function checkGameEnd() {
            if (wordDiv.textContent.replace(/\s/g, '') === word) {
                endGame(true);
            } else if (remainingGuesses === 0) {
                endGame(false);
            }
        }

        function endGame(won) {
            lettersDiv.innerHTML = '';
            const message = won ? '¡Felicidades! Has adivinado la palabra.' : `Juego terminado. La palabra era "${word}".`;
            const endMessage = document.createElement('p');
            endMessage.textContent = message;
            gameDiv.appendChild(endMessage);
        }

        updateWord();
        createLetterButtons();
    }

    function loadWordsearchGame() {
        const words = ['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'NODE', 'EXPRESS', 'MONGODB', 'API', 'FRONTEND', 'BACKEND'];
        const gridSize = 15;
        let grid = [];

        const gameDiv = document.createElement('div');
        gameDiv.className = 'wordsearch-game';
        gameDiv.innerHTML = `
            <h3>Sopa de Letras</h3>
            <p>Encuentra las palabras relacionadas con el desarrollo web</p>
            <div class="wordsearch-grid"></div>
            <div class="wordsearch-words"></div>
        `;

        gameContainer.appendChild(gameDiv);

        const gridDiv = gameDiv.querySelector('.wordsearch-grid');
        const wordsDiv = gameDiv.querySelector('.wordsearch-words');

        function createGrid() {
            for (let i = 0; i < gridSize; i++) {
                grid[i] = [];
                for (let j = 0; j < gridSize; j++) {
                    grid[i][j] = '';
                }
            }
        }

        function placeWord(word) {
            const directions = [
                [0, 1],  // horizontal
                [1, 0],  // vertical
                [1, 1],  // diagonal down-right
                [1, -1]  // diagonal down-left
            ];
            
            let placed = false;
            while (!placed) {
                const direction = directions[Math.floor(Math.random() * directions.length)];
                const startX = Math.floor(Math.random() * gridSize);
                const startY = Math.floor(Math.random() * gridSize);

                if (canPlaceWord(word, startX, startY, direction)) {
                    placeWordOnGrid(word, startX, startY, direction);
                    placed = true;
                }
            }
        }

        function canPlaceWord(word, startX, startY, direction) {
            for (let i = 0; i < word.length; i++) {
                const x = startX + i * direction[0];
                const y = startY + i * direction[1];
                if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
                    return false;
                }
                if (grid[x][y] !== '' && grid[x][y] !== word[i]) {
                    return false;
                }
            }
            return true;
        }

        function placeWordOnGrid(word, startX, startY, direction) {
            for (let i = 0; i < word.length; i++) {
                const x = startX + i * direction[0];
                const y = startY + i * direction[1];
                grid[x][y] = word[i];
            }
        }

        function fillEmptySpaces() {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (grid[i][j] === '') {
                        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
                    }
                }
            }
        }

        function renderGrid() {
            gridDiv.innerHTML = '';
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'wordsearch-cell';
                    cell.textContent = grid[i][j];
                    gridDiv.appendChild(cell);
                }
            }
        }

        function renderWords() {
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.textContent = word;
                wordSpan.className = 'wordsearch-word';
                wordsDiv.appendChild(wordSpan);
            });
        }

        createGrid();
        words.forEach(placeWord);
        fillEmptySpaces();
        renderGrid();
        renderWords();
    }

    function loadMemoryGame() {
        const symbols = ['HTML', 'CSS', 'JS', 'API', 'NODE', 'REACT', 'VUE', 'ANGULAR'];
        let cards = [...symbols, ...symbols];
        let flippedCards = [];
        let matchedPairs = 0;

        // Shuffle cards
        cards.sort(() => Math.random() - 0.5);

        const gameDiv = document.createElement('div');
        gameDiv.className = 'memory-game';
        gameDiv.innerHTML = `
            <h3>Juego de Memoria</h3>
            <p>Encuentra los pares de símbolos relacionados con el desarrollo web</p>
            <div class="memory-grid"></div>
        `;

        gameContainer.appendChild(gameDiv);

        const gridDiv = gameDiv.querySelector('.memory-grid');

        function createCard(symbol, index) {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front"></div>
                    <div class="memory-card-back">${symbol}</div>
                </div>
            `;
            card.addEventListener('click', () => flipCard(card, index));
            return card;
        }

        function flipCard(card, index) {
            if (flippedCards.length < 2 && !flippedCards.includes(index)) {
                card.classList.add('flipped');
                flippedCards.push(index);

                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 1000);
                }
            }
        }

        function checkMatch() {
            const [index1, index2] = flippedCards;
            const cards = document.querySelectorAll('.memory-card');

            if (cards[index1].textContent === cards[index2].textContent) {
                cards[index1].classList.add('matched');
                cards[index2].classList.add('matched');
                matchedPairs++;

                if (matchedPairs === symbols.length) {
                    setTimeout(() => {
                        alert('¡Felicidades! Has completado el juego de memoria.');
                    }, 500);
                }
            } else {
                cards[index1].classList.remove('flipped');
                cards[index2].classList.remove('flipped');
            }

            flippedCards = [];
        }

        cards.forEach((symbol, index) => {
            gridDiv.appendChild(createCard(symbol, index));
        });
    }

    function loadQuizGame() {
        const questions = [
            {
                question: "¿Qué significa HTML?",
                options: ["Hyper TextHyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
                correct: "Hyper Text Markup Language"
            },
            {
                question: "¿Cuál de estos no es un lenguaje de programación?",
                options: ["JavaScript", "Python", "HTML", "Java"],
                correct: "HTML"
            },
            {
                question: "¿Qué significa CSS?",
                options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
                correct: "Cascading Style Sheets"
            },
            {
                question: "¿Cuál es la función principal de JavaScript?",
                options: ["Estilizar páginas web", "Crear la estructura de una página web", "Añadir interactividad a las páginas web", "Gestionar bases de datos"],
                correct: "Añadir interactividad a las páginas web"
            },
            {
                question: "¿Qué significa API?",
                options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Integration"],
                correct: "Application Programming Interface"
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        const gameDiv = document.createElement('div');
        gameDiv.className = 'quiz-game';
        gameDiv.innerHTML = `
            <h3>Quiz de Desarrollo Web</h3>
            <div class="quiz-question"></div>
            <div class="quiz-options"></div>
            <div class="quiz-score"></div>
        `;

        gameContainer.appendChild(gameDiv);

        const questionDiv = gameDiv.querySelector('.quiz-question');
        const optionsDiv = gameDiv.querySelector('.quiz-options');
        const scoreDiv = gameDiv.querySelector('.quiz-score');

        function loadQuestion() {
            const question = questions[currentQuestion];
            questionDiv.textContent = question.question;
            optionsDiv.innerHTML = '';

            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => selectAnswer(index));
                optionsDiv.appendChild(button);
            });
        }

        function selectAnswer(index) {
            const question = questions[currentQuestion];
            if (question.options[index] === question.correct) {
                score++;
            }

            currentQuestion++;

            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        }

        function endQuiz() {
            questionDiv.textContent = '¡Quiz completado!';
            optionsDiv.innerHTML = '';
            scoreDiv.textContent = `Tu puntuación: ${score} de ${questions.length}`;
        }

        loadQuestion();
    }
});

