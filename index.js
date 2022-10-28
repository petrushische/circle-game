const start = document.querySelector('.screen__start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.screen__time-list');

let time = 0;
let score = 0;

const colors = ['red', 'blue', 'yellow', 'green', 'white']
const gameTime = document.querySelector('#time');
const board = document.querySelector('.screen__board')

const buttonHome = document.querySelector('.button-home');

// Переход к выбору времени
start.addEventListener('click', (evt) => {
 screens[0].classList.add('up')
})


// Выбор времени игры и запуск
timeList.addEventListener('click', (evt) => {
 if (evt.target.classList.contains('screen__time-btn')) {
  time = Number(evt.target.id)
  screens[1].classList.add('up')
  startGame()
 }
})

function startGame() {
 gameTime.innerHTML = `00:${time}`
 createRandomCircle()
 const interval = setInterval(() => {
  if (time >= 0) {
   gameTime.innerHTML = time < 10 ? `00:0${time--}` : `00:${time--}`
  } else {
   clearInterval(interval)
   finishGame()
   gameTime.parentNode.remove()
  }
 }, 1000)
}

function finishGame() {
 board.innerHTML = `<h1>Ваш счёт: ${score}</h1>`
}



board.addEventListener('click', evt => {
 if (evt.target.classList.contains('circle')) {
  score++
  evt.target.remove()
  createRandomCircle()
 }
})

function createRandomCircle() {
 const circle = document.createElement('div')
 const size = getRandomNumber(15, 60)
 const { width, height } = board.getBoundingClientRect()
 const x = getRandomNumber(0, width - size)
 const y = getRandomNumber(0, height - size)

 circle.classList.add('circle')
 circle.style.width = `${size}px`
 circle.style.height = `${size}px`
 circle.style.top = `${y}px`
 circle.style.left = `${x}px`
 circle.style.background = `${randomColor()}`
 board.append(circle)
}

function randomColor() {
 const index = Math.floor(Math.random() * colors.length)
 return colors[index]
}

function getRandomNumber(min, max) {
 return Math.round(Math.random() * (max - min) + min)
}
