const listOfTurns = document.querySelector('.listOfTurns')
const numOfGuesses = document.querySelector('.numOfGuesses')
const body = document.body;
const form = document.querySelector('form');
const guessInput = document.querySelector('#guess');
const title = document.querySelector('h1');
const newGame = document.querySelector('.newGame');
const guessBtn = document.querySelector('.guessBtn');


let theNum = NaN;
let guesses = [];

function btnsToggle() {
    //hide newGame show guessBtn and guessInput or and vice versa
    newGame.classList.toggle('hideButton');

    guessBtn.classList.toggle('hideButton');
    guessInput.classList.toggle('hideButton');
}



newGame.addEventListener('click', function (e) {

    title.innerText = 'Guess the number!'
    theNum = Math.floor(Math.random() * 100 + 1);
    guesses = [];

    btnsToggle()

    body.classList.remove('coldBackground', 'warmBackground', 'winBackground');
    title.classList.remove('win', 'cold', 'warm');

    numOfGuesses.innerText = '';
    listOfTurns.innerText = '';

    form.addEventListener('submit', submitFunc);
});

let li = document.createElement('li')
function submitFunc(event) {
    event.preventDefault();

    guess = parseInt(guessInput.value)
    guesses.push(guess);

    li = document.createElement('li')
    li.innerText = `Turn ${guesses.length} your guess was ${guessInput.value}`
    listOfTurns.append(li)

    if (guess === theNum) {
        title.innerText = 'Your guess is correctly'
        title.classList.remove('win', 'cold', 'warm');
        title.classList.add('win');

        body.classList.remove('coldBackground', 'warmBackground', 'winBackground');
        body.classList.add('winBackground');


        numOfGuesses.innerText = `Total number of turns: ${guesses.length}`;

        btnsToggle()

        form.removeEventListener('submit', submitFunc);

    } else if (guess < 1 || guess > 100) {
        title.innerText = 'OUT OF BOUNDS'
    } else if (guesses.length === 1) {
        if ((theNum - 10 <= guess) && (guess <= theNum + 10)) {
            title.innerText = 'WARM!'
            title.classList.remove('win', 'cold', 'warm')
            title.classList.add('warm');

            body.classList.remove('coldBackground', 'warmBackground', 'winBackground')
            body.classList.add('warmBackground')
        } else if (!((theNum - 10 <= guess) && (guess <= theNum + 10))) {
            title.innerText = 'COLD!'
            title.classList.remove('win', 'cold', 'warm')
            title.classList.add('cold')

            body.classList.remove('coldBackground', 'warmBackground', 'winBackground')
            body.classList.add('coldBackground')
        }
    } else if (Math.abs(theNum - guess) < Math.abs(theNum - guesses.slice(-2, -1))) {
        title.innerText = 'WARMER!'
        title.classList.remove('win', 'cold', 'warm')
        title.classList.add('warm');

        body.classList.remove('coldBackground', 'warmBackground', 'winBackground')
        body.classList.add('warmBackground')
    } else {
        title.innerText = 'COLDER!'
        title.classList.remove('win', 'cold', 'warm')
        title.classList.add('cold')

        body.classList.remove('coldBackground', 'warmBackground', 'winBackground')
        body.classList.add('coldBackground')
    }
    guessInput.value = '';
}