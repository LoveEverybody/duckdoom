const myObstacles = [];
const myGameArea = {
  canvas: document.createElement('canvas'),
  frames: 0,
  speed: 1,
  points: 0,
  spaceBetween: 40,
  victoryFlag: 100,
  firstNumber: 0,
  secondNumber: 0,
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '50%';
    this.canvas.style.top = '50%';
    this.canvas.style.border = "1px solid #000";
    this.canvas.style.transform = 'translate(-50%, -50%)';

    if (location.pathname.includes("/gamehard.html")) {
      this.speed = 20;
      this.spaceBetween = 70;
      this.victoryFlag = 500;
      this.firstNumber = 1;
    }

    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.canvas.addEventListener('click', handleCanvasClick);

    this.context.font = "20px 'Comic Sans MS', cursive";
    this.context.fillStyle = 'black';
    this.context.fillText("Score: 0", 370, 30);
    this.interval = setInterval(updateGameArea, 20 / this.speed);
  },
  clear: function() {
    this.context.clearRect(0, 30, this.canvas.width, this.canvas.height);
  },

  stop: function() {
    clearInterval(this.interval);
    const audio = new Audio('./resources/laugthing.mp3');
    audio.play();

    const gameoverButton = createImageButton('./resources/gameover.png', function() {
      window.location.href = 'index.html';
    });
    document.body.appendChild(gameoverButton);
  },

  winner: function() {
    clearInterval(this.interval);
    const victorySound = new Audio('./resources/nervous.mp3');
    victorySound.play();

    const victoryImage = createImageButton('./resources/winner2.jpg', function() {
      window.location.href = 'index.html';
    });
    victoryImage.style.borderRadius = '50%';
    document.body.appendChild(victoryImage);
  },
};

function createImageButton(src, onClickHandler) {
  const imageButton = new Image();
  imageButton.src = src;
  imageButton.style.position = 'absolute';
  imageButton.style.left = '50%';
  imageButton.style.top = '50%';
  imageButton.style.transform = 'translate(-50%, -50%)';
  imageButton.style.width = '100px';
  imageButton.style.height = '100px';
  imageButton.style.cursor = 'pointer';
  imageButton.addEventListener('click', onClickHandler);
  return imageButton;
}

class Component {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = new Image()
    this.img.src = './resources/duck.png'
  }

  update() {
    const ctx = myGameArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function handleCanvasClick(event) {
  const mouseX = event.clientX - myGameArea.canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - myGameArea.canvas.getBoundingClientRect().top;

  let hit = false;

  for (let i = 0; i < myObstacles.length; i++) {
    const obstacle = myObstacles[i];
    if (
      mouseX >= obstacle.x &&
      mouseX <= obstacle.x + obstacle.width &&
      mouseY >= obstacle.y &&
      mouseY <= obstacle.y + obstacle.height
    ) {
      const audio = new Audio('./resources/shot.mp3');
      audio.play();
      hit = true;
      myGameArea.points += 10;
      break;
    }
  }

  if (!hit) {
    myGameArea.stop();
  }

  myGameArea.context.clearRect(0, 0, 480, 270);
  myGameArea.context.font = "20px 'Comic Sans MS', cursive";
  myGameArea.context.fillStyle = 'black';
  myGameArea.context.fillText(`Score: ${myGameArea.points}`, 370, 30);

  if (myGameArea.firstNumber === 0){
     myGameArea.firstNumber  = Math.floor(Math.random() * 9) + 1;
     myGameArea.secondNumber = Math.floor(Math.random() * 9) + 1;
     const mult = myGameArea.firstNumber*myGameArea.secondNumber
     myGameArea.context.fillText(`${myGameArea.firstNumber} x ${myGameArea.secondNumber} = ${mult} `, 30, 30);

     myGameArea.firstNumber = 0;


  }

  if (myGameArea.points >= myGameArea.victoryFlag) {
    myGameArea.winner();
  } 
}


function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -2;
    //  myObstacles[i].newPos(); // mew position
    myObstacles[i].update();
  }
  myGameArea.frames += 1;
  if (myGameArea.frames % myGameArea.spaceBetween === 0) {
    // myGameArea.speed += 20;
    let x = myGameArea.canvas.width;
    let minHeight = 20;
    let maxHeight = 200;
    let height = 210
    myObstacles.push(new Component(70, 70, x, 200));

  }
}

function updateGameArea() {

  myGameArea.clear();
  //drawBackground();
  updateObstacles();
  //myGameArea.score();


}


myGameArea.start();