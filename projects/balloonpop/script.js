let startButton = document.getElementById("start-game-button")
let inflateButton = document.getElementById("inflate-button")

//#region Game Logic
let clickCount = 0
let width = 100
let height = 120
let maxSize = 300
let inflationRate = 20
let currPopCount = 0
let gameLength = 10000
let clockID = 0
let timeRemaining = 0
let currPlayer
let currentColor = "green"
let possibleColors = ["red", "yellow", "blue", "green", "purple"]


function startGame() {
	document.getElementById("controls").classList.add("hidden")
	document.getElementById("gameview").classList.remove("hidden")
	document.getElementById("scoreboard").classList.add("hidden")

	startClock()
	setTimeout(stopGame, gameLength)
}

function startClock() {
	timeRemaining = gameLength / 1000
	drawClock()
	clockID = setInterval(drawClock, 1000)
}

function stopClock() {
	clearInterval(clockID)
}

function drawClock() {
	let countDownE = document.getElementById("time-remaining")
	countDownE.innerText = timeRemaining--
}

function inflate() {
	height += inflationRate
	width += inflationRate
	if (height > maxSize) {
		let balloonE = document.getElementById("balloon")
		balloonE.classList.remove(currentColor)
		currentColor = getRandomColor()
		balloonE.classList.add(currentColor)
		height = 20
		width = 0
		currPopCount++
		document.getElementById("audioBurst").play()

	}
	clickCount++
	draw()
}

function getRandomColor() {
	return possibleColors[Math.floor(Math.random() * 5)]
}

function draw() {
	let balloonE = document.getElementById("balloon")
	let clickCountE = document.getElementById("click-count")
	let popCountE = document.getElementById("pop-count")
	let highScoreE = document.getElementById("high-score-count")
	let playerNameE = document.getElementById("playername")

	playerNameE.innerText = currPlayer.name
	balloonE.style.height = height + "px"
	balloonE.style.width = width + "px"
	clickCountE.innerText = clickCount
	popCountE.innerText = currPopCount
	highScoreE.innerText = currPlayer.topScore
}

function stopGame() {
	console.log("Game Over!")
	document.getElementById("controls").classList.remove("hidden")
	document.getElementById("gameview").classList.add("hidden")
	document.getElementById("scoreboard").classList.remove("hidden")

	clickCount = 0
	height = 120
	width = 100

	if (currPlayer.topScore < currPopCount) {
		currPlayer.topScore = currPopCount
	}

	currPopCount = 0


	savePlayers()
	stopClock()
	draw()
	drawScoreBoard()
}

//#endregion Game Logic

//#region User Handling

let players = []
loadPlayers()

function setPlayer(event) {
	event.preventDefault()
	let form = event.target
	let playername = form.playername.value

	currPlayer = players.find(player => player.name == playername)
	if (!currPlayer) {
		currPlayer = { name: playername, topScore: 0 }
		players.push(currPlayer)
		savePlayers()
	}
	form.reset()

	document.getElementById("game").classList.remove("hidden")
	document.getElementById("playerform").classList.add("hidden")
	draw()
	drawScoreBoard()
}

function changePlayer() {
	document.getElementById("game").classList.add("hidden")
	document.getElementById("playerform").classList.remove("hidden")
}

function savePlayers() {
	localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers() {
	players = JSON.parse(localStorage.getItem("players"))
	if (!players) { players = [] }
}

function drawScoreBoard() {
	let template = ""
	players.sort((p1, p2) => p2.topScore - p1.topScore)
	players.forEach(element => {
		template += `
		<div class="d-flex space-between">
		<span>
			<i class="fa fa-user"></i>
			${element.name}
		</span>
		<span>Score : ${element.topScore}</span>
	</div>`
	});
	document.getElementById("players").innerHTML = template
}
drawScoreBoard()
//#endregion
