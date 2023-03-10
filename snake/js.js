var game = document.getElementById("gameID");
var context = game.getContext("2d");
var boxSize = 32;
var score = 0;
var gameSpeed = 100;

var snakeX = [];
var snakeY = [];
generateSnake();
var snakeDirection = "";

var food = [];
generateFood();

var backgroundImage = new Image();
backgroundImage.src = "background.png";

var foodImage = new Image();
foodImage.src = "cheese.png";

function draw(){
	context.drawImage(backgroundImage, 0, 0);
	context.drawImage(foodImage, food[0], food[1]);
	drawSnake();

	context.fillStyle = "White";
	context.font = "50px Arial";
	context.fillText("Score: " + score, 2 * boxSize, 1.5 * boxSize);
}

document.addEventListener("keydown", moveSnake);
function moveSnake(event){
	if(event.keyCode == 37 && snakeDirection != "право"){
		snakeDirection = "лево";
	} else if(event.keyCode == 38 && snakeDirection != "вниз"){
		snakeDirection = "верх";
	} else if(event.keyCode == 39 && snakeDirection != "лево"){
		snakeDirection = "право";
	} else if(event.keyCode == 40 && snakeDirection != "верх"){
		snakeDirection = "вниз";
	}
}
function moveSnakeStep2(){
	snakeXTemp = snakeX[0];
	snakeYTemp = snakeY[0];

	if(snakeXTemp == food[0] && snakeYTemp == food[1]){
		score++;
		generateFood();
	} else{
		snakeX.pop();
		snakeY.pop();
	}

	if(snakeDirection == "лево"){
		snakeXTemp -= boxSize;
	} else if(snakeDirection == "право"){
		snakeXTemp += boxSize;
	} else if(snakeDirection == "верх"){
		snakeYTemp -= boxSize;
	} else if(snakeDirection == "вниз"){
		snakeYTemp += boxSize;
	}

	if(snakeXTemp < boxSize || snakeXTemp > 17 * boxSize || snakeYTemp < 3 * boxSize || snakeYTemp > 17 * boxSize){
		finishGame();
		return;
	}

	for(pos = 0; pos < snakeX.length; pos++){
		if(snakeXTemp == snakeX[pos] && snakeYTemp == snakeY[pos]){
			finishGame();
			return;
		}
	}

	snakeX.unshift(snakeXTemp);
	snakeY.unshift(snakeYTemp);
}

function newGame(){
	score = 0;

	snakeX = [];
	snakeY = [];
	generateSnake();
	snakeDirection = "";

	food = [];
	generateFood();
}

function finishGame(){
	if (confirm('Поздравляем вы набрали ' + score + ' очков!\nНачать новую игру?')) {
		newGame();
	} else{
		clearInterval(gameMainInterval);
	}
}

//Тут вся игровая логика
function main() {
	moveSnakeStep2();
	draw();
}
var gameMainInterval = setInterval(main, gameSpeed);

//Генерация змеи
function generateSnake(){
	snakeX[0] = 9 * boxSize;
	snakeY[0] = 10 * boxSize;
}
//Отрисовка змеи
function drawSnake(){
	for(pos = 0; pos < snakeX.length; pos++){
		context.fillStyle = "red";
		context.fillRect(snakeX[pos], snakeY[pos], boxSize, boxSize);
	}
}

//Генерация еды
function generateFood(){
	food[0] = Math.floor((Math.random() * 17 + 1)) * boxSize;
	food[1] = Math.floor((Math.random() * 15 + 3)) * boxSize;

	//Проверка ячейки на наличие змеи
	var isSnakeCollision = false;
	for(pos = 0; pos < snakeX.length; pos++){
		if(snakeX[pos] == food[0] && snakeY[pos] == food[1]){
			isSnakeCollision = true;
		}
	}

	//Если сгенерировали еду в змеи, то генерируем заново
	if(isSnakeCollision){
		generateFood();
	}
}