let gameName = 'Guess The Word'
document.title = gameName
document.querySelector('h1').innerHTML = gameName
document.querySelector(
  'footer',
).innerHTML = `${gameName} Game Created By Elzero Web School`

let numberOfLetter = 5
let numberOfTries = 5
let currenTry = 1
let numberHints = 2

let wordToGuess = ''
let words = ['hello', 'girly', 'funny', 'north']
let completed = false

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()

function generateInputs() {
  let inputcontainer = document.querySelector('.inputs')
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement('div')
    tryDiv.classList.add(`try-${i}`)
    tryDiv.innerHTML = `<span>Try ${i}</span>`

    if (i !== 1) tryDiv.classList.add('disabled-inputs')

    for (let j = 1; j <= numberOfLetter; j++) {
      const input = document.createElement('input')
      input.type = 'text'
      input.id = `guess-${i}-letter-${j}`
      input.maxLength = 1
      if (j != 1) {
        input.disabled = true
      }
      tryDiv.appendChild(input)
    }
    inputcontainer.appendChild(tryDiv)
  }

  inputcontainer.children[0].children[1].focus()

  const inputsInDisabledDiv = document.querySelectorAll(
    '.disabled-inputs input',
  )
  inputsInDisabledDiv.forEach((input) => (input.disabled = true))

  const inputs = document.querySelectorAll('input')
  inputs.forEach((inp, ind) => {
    inp.addEventListener('input', function () {
      console.log(ind)
      this.value = this.value.toUpperCase()
      const nextInp = inputs[ind + 1]
      if (nextInp && (ind + 1) % numberOfLetter != 0) {
        nextInp.disabled = false
        nextInp.focus()
      } else {
        completed = true
      }

      console.log(completed)
    })
  })
}

const guessButton = document.querySelector('.check')
guessButton.addEventListener('click', handleGuesses)
console.log(wordToGuess)

function handleGuesses() {
  let successG = true
checkCompleted()
  console.log(wordToGuess)

  if (completed == true) {
    for (let i = 1; i <= numberOfLetter; i++) {
      const inpuField = document.querySelector(
        `#guess-${currenTry}-letter-${i}`,
      )
      const letter = inpuField.value.toLowerCase()
      const actualLetter = wordToGuess[i - 1]
      if (letter === actualLetter) {
        inpuField.classList.add('in-place')
      } else if (wordToGuess.includes(letter) && letter !== '') {
        inpuField.classList.add('not-in-place')
        successG = false
      } else {
        if (letter == '') {
          successG = false
          console.log('empty')
          break
        }
        inpuField.classList.add('no-place')
        successG = false
      }
    }

    if (successG == false && currenTry < numberOfTries) {
      completed = false
      let inputdiv = document.querySelector(`.try-${currenTry}`)
      inputdiv.classList.remove('disabled-inputs')
      let inputs1 = document.querySelectorAll(`.try-${currenTry} input`)
      inputs1.forEach((input) => {
        input.disabled = true
      })
      currenTry++
      console.log(currenTry)
      let inputs = document.querySelector(`.try-${currenTry}`)
      inputs.classList.remove('disabled-inputs')
      document.querySelectorAll(`.try-${currenTry} input`).forEach((input) => {
        input.disabled = false
      })

      document.querySelector(`#guess-${currenTry}-letter-${1}`).focus()
    } else if (successG == true) {
      result = 'you did it'
      guessButton.disabled = true
      let inputs1 = document.querySelectorAll(`.try-${currenTry} input`)
      inputs1.forEach((input) => {
        input.disabled = true
        input.classList.add('disabled-inputs')
      })
      showMessageWithConfetti(result)
      resetGame()
    } else {
      alert('You have exceeded the number of attempts')
      resetGame()
    }
  } else {
    alert('complete the word')
    document.querySelector(`.try-${currenTry} input`).focus()
  }
}

window.onload = function () {
  generateInputs()
}

// Sélection des éléments
const messagePopup = document.querySelector('.message')
const overlay = document.querySelector('.overlay')
const confettiContainer = document.querySelector('.confetti-container')

// Fonction pour afficher le popup avec les confettis
function showMessageWithConfetti(text) {
  messagePopup.querySelector('p').textContent = text
  messagePopup.style.display = 'block'
  overlay.style.display = 'block'

  // Ajoute les confettis
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div')
    confetti.classList.add('confetti')
    confetti.style.left = `${Math.random() * 100}%`
    confetti.style.animationDelay = `${Math.random() * 2}s`
    confetti.style.setProperty('--i', i)
    confettiContainer.appendChild(confetti)
  }

  // Supprime les confettis après un certain temps
  // setTimeout(() => {
  //   confettiContainer.innerHTML = ''; // Vide le conteneur de confettis
  // }, 3000);
}

// Fonction pour masquer le popup
function hideMessage() {
  messagePopup.style.display = 'none'
  overlay.style.display = 'none'
}

// Ferme le popup quand on clique sur l'overlay
overlay.addEventListener('click', hideMessage)

function handleHints() {
  if (numberHints > 0) {
    numberHints--
    hintButton.innerHTML = `${numberHints} hints`
    let inputs1 = document.querySelectorAll(`.try-${currenTry} input`)
    inputs1.forEach((inp) => {
      inp.disabled = false
    })

    let array = Array.from({ length: numberOfLetter }, (_, i) => i + 1)
    const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

    // Example usage
    const randomValue = getRandomValue(array)

    inputs1[randomValue - 1].value = wordToGuess[randomValue - 1].toUpperCase()
    inputs1[randomValue - 1].disabled = false
    checkCompleted()
  } else {
    hintButton.disabled = true
  }
}

function checkCompleted() {
  completed = true
  let inputs1 = document.querySelectorAll(`.try-${currenTry} input`)
  inputs1.forEach((element) => {
    if (element.value == '') {
      completed = false
    }
  })
}

function handleBackSpace(event) {
  if (event.key == 'Backspace') {
    let inputs1 = document.querySelectorAll(`.try-${currenTry} input`)
    const currentIndex = Array.from(inputs1).indexOf(document.activeElement)

    if (currentIndex > 0) {
      const currentInput = inputs1[currentIndex]
      console.log(currentIndex)
      const previousInput = inputs1[currentIndex - 1]
      currentInput.value = ''
      previousInput.value = ''
      previousInput.focus()
    }
  }
}

document.addEventListener('keydown', handleBackSpace)

function handleHints2() {
  if (numberHints > 0) {
    numberHints--
    hintButton.innerHTML = `${numberHints} hints`

    let inputs2 = document.querySelectorAll(`.try-${currenTry} input`)
    inputs2.forEach((inp) => {
      inp.disabled = false
    })
    let inputs1 = Array.from(
      document.querySelectorAll(`.try-${currenTry} input`),
    ).filter((input) => input.value === '')

    if (inputs1.length > 0) {
      // Select a random empty input
      const randomInput = inputs1[Math.floor(Math.random() * inputs1.length)]

      const inputIndex = Array.from(
        document.querySelectorAll(`.try-${currenTry} input`),
      ).indexOf(randomInput)
      console.log(inputIndex)
      // Do something with the random input, e.g., focus it or fill it with a hint
      randomInput.focus()
      // Optionally set a hint letter or other value
      randomInput.value = wordToGuess[inputIndex].toUpperCase() // Replace "H" with your hint or desired character
    }
  } else {
    hintButton.disabled = true
  }
}

const hintButton = document.querySelector('.hint')
hintButton.innerHTML = `${numberHints} hints`
hintButton.addEventListener('click', handleHints2)


function resetGame()
{
  // Reload the page
location.reload();


}