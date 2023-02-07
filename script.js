let score = document.querySelector('#score');
const btns = document.querySelectorAll('.btn');
const wordBlank = document.querySelector('.word-blank');
const trials = document.querySelector('.trials');
let info = document.querySelector('#info');

let currentScore = parseInt(localStorage.getItem('score')) || 0;

function game(words) {
    let fewerWords = words['array'].filter(word => word.length > 6);
    let word = getRandomWord(fewerWords);
    //console.log(word);
    let guessedLetters = [];
    
    wordBlank.textContent = currentStr(word, guessedLetters);
    score.textContent = currentScore;
    let remainingTries = 6;
    trials.textContent = remainingTries;


    btns.forEach(btn => btn.onclick = function() {
        this.classList.add('disabled');
        if (checkPresent(this.textContent, word) == true) {
            if (!guessedLetters.includes(this.textContent)) {
                info.textContent = 'correct letter!';
                info.classList.add('text-success', 'info-text');
                //info.classList.add('info-text');
                this.classList.add('bg-success')
                guessedLetters.push(this.textContent);
                currentScore += 5;
                score.textContent = currentScore;
                wordBlank.textContent = currentStr(word, guessedLetters);
                setTimeout(() => {
                    info.classList.remove('text-success');
                    info.classList.remove('info-text');
                }, 500);
                if (isComplete(word, guessedLetters)) {
                    localStorage.setItem('score', currentScore);
                    setTimeout(() => {
                        game(words);
                        
                    }, 500);
                    wordBlank.textContent = currentStr(word, guessedLetters);
                    btns.forEach(btn => btn.classList.remove('bg-success', 'bg-danger', 'disabled'));
                }
                //console.log(guessedLetters, isComplete(word, guessedLetters));

            }  else {

            } 
        } else {
            this.classList.add('bg-danger');
            remainingTries--;
            info.textContent = 'wrong letter!';
            info.classList.add('text-warning');
            info.classList.add('info-text');
            setTimeout(() => {
                info.classList.remove('text-warning');
                info.classList.remove('info-text');
            }, 500)
            if (remainingTries < 1) {
                info.textContent = 'You\'re out of tries!';
                info.classList.add('text-danger');
                localStorage.setItem('score', currentScore);
                setTimeout(() => {
                    endGame(word);
                }, 500);
                
            } else {
                trials.textContent = remainingTries;
                
            } 
        }
    })
}

function endGame(word) {
    setTimeout( () => {
        window.location.href = './end.html';
    }, 2000)

    wordBlank.textContent = word;
}

function isComplete(word, arr) {
    if (arr.length == 0) {
        return false;
    } else {
        for (let i = 0; i < word.length;) {
            if(arr.includes(word[i])) {
                i++;
            } else {
                return false;
            }
        }
    }
    
    return true;
}

function currentStr(word, arr) {
    let str = '';
    if(arr.length == 0) {
        str = word.split('').map(x => '_ ').join('');
    } else {
        str = word.split('').map(x =>  arr.includes(x)? x : '_  ').join('')
    }
    return str;
}

function getRandomWord(arr) {
    return(arr[Math.floor(Math.random()*arr.length)]);
}

function checkPresent(letter, word) {
    return word.includes(letter);
}

function fetchWords() {
    fetch('./words.json')
  .then((response) => response.json())
  .then((data) => game(data));

}

window.addEventListener('DOMContentLoaded', fetchWords());

/*




*/