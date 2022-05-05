const body = document.body;
const form = document.querySelector('form');
const title = document.querySelector('h1');

const listOfTurns = document.querySelector('.listOfTurns')
const numOfGuesses = document.querySelector('.numOfGuesses')

const guessInput = document.querySelector('#guess');

const newGame = document.querySelector('.newGame');
const guessBtn = document.querySelector('.guessBtn');

let theNum = NaN;
let guesses = []; //list of total guesses

function btnsToggle() {
    //hide newGame show guessBtn and guessInput or and vice versa
    newGame.classList.toggle('hideButton');
    guessBtn.classList.toggle('hideButton');
    guessInput.classList.toggle('hideButton');
}

function checkGuessNum(titleText, titleColor, bodyBackColor) {
    title.innerText = titleText //update title
    title.classList.remove('win', 'cold', 'warm'); //remove title color
    title.classList.add(titleColor); //update title color
    body.classList.remove('coldBackground', 'warmBackground', 'winBackground');
    body.classList.add(bodyBackColor);
}

newGame.addEventListener('click', function (e) {
    // start/restart game
    title.innerText = 'Guess the number!'
    theNum = Math.floor(Math.random() * 100 + 1);
    guesses = [];

    //hide newGame btn / show guessInput and guessBtn
    btnsToggle()

    //remove all classes 
    body.classList.remove('coldBackground', 'warmBackground', 'winBackground');
    title.classList.remove('win', 'cold', 'warm');

    //reset list of guesses
    numOfGuesses.innerText = '';
    listOfTurns.innerText = '';

    //add event 
    form.addEventListener('submit', submitFunc);
});

let li = document.createElement('li')

function submitFunc(event) {
    event.preventDefault();

    guess = parseInt(guessInput.value)
    guesses.push(guess);//add new guess

    //update guesses list
    li = document.createElement('li')
    li.innerText = `Turn ${guesses.length} your guess was ${guessInput.value}`
    listOfTurns.append(li) // add new <li> to <ul>

    if (guess === theNum) {
        //update win
        checkGuessNum('Your guess is correctly', 'win', 'winBackground')

        numOfGuesses.innerText = `Total number of turns: ${guesses.length}`;

        //hide guessInput and guessBtn / show newGame button
        btnsToggle()

        //remove event
        form.removeEventListener('submit', submitFunc);

    } else if (guess < 1 || guess > 100) {

        title.innerText = 'OUT OF BOUNDS'
        checkGuessNum('OUT OF BOUNDS', 'none', 'none')

    } else if (guesses.length === 1) {

        if ((theNum - 10 <= guess) && (guess <= theNum + 10)) {

            checkGuessNum('WARM!', 'warm', 'warmBackground')

        } else if (!((theNum - 10 <= guess) && (guess <= theNum + 10))) {

            checkGuessNum('COLD!', 'cold', 'coldBackground')

        }
    } else if (Math.abs(theNum - guess) < Math.abs(theNum - guesses.slice(-2, -1))) {

        checkGuessNum('WARMER!', 'warm', 'warmBackground')

    } else {

        checkGuessNum('COLDER!', 'cold', 'coldBackground')

    }
    guessInput.value = ''; //reset input
}