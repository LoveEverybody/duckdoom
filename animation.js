
const myObstacles = []

let time = 60

//This is our game area

// handles everything related to my canvas game area

const myGameArea = {

    canvas: document.createElement('canvas'),

    frames: 0, //frame is used for the frequency of obstacles

    start:function(){

        this.canvas.width = 480; //sets width of canvas

        this.canvas.height = 270;

        this.context = this.canvas.getContext('2d') //sets the 2d context

        document.body.insertBefore(this.canvas, document.body.childNodes[0]); //inserts my canvas element to my html

        this.interval = setInterval(updateGameArea,20)

    },

    //this method erases everything in my canvas

    clear: function(){

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    },

    stop: function () {

        clearInterval(this.interval);

      },

   



   

}



const gameInterval = setInterval(()=>{

    time-=1

    document.getElementById('timer').innerHTML=time

    if(time<1){



        clearInterval(myGameArea.interval)

        clearInterval(gameInterval)

        console.log("Times up you win")

    }



},1000)



let lives = 3




//1. created the game area 

//2. creating my player

//3. adding movements for my character

//4. creating the obstacles

//5. collision 



class Component{

    constructor(width,height,color,x,y){

        this.width = width;

        this.height = height;

        this.color = color;

        this.x = x;

        this.y = y;

        this.speedX = 0;

        this.speedY = 0;

    }

    redraw(){

        const ctx = myGameArea.context

        ctx.fillStyle = this.color

        ctx.fillRect(this.x,this.y,this.width,this.height)

    }

    //method handles the movement of my player

    newPos(){

        this.x+=this.speedX;

        this.y+=this.speedY;

    }

    left() {

        return this.x;

      }

      right() {

        return this.x + this.width;

      }

      top() {

        return this.y;

      }

      bottom() {

        return this.y + this.height;

      }

     

      crashWith(obstacle) {

        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());

      }

   

}



const player = new Component(30,30,'red',0,110)



function checkGameOver(){

    const crashed = myObstacles.some((element)=>{

        return player.crashWith(element)

    })

    if(crashed){

        myGameArea.stop()

        clearInterval(gameInterval)

    }

}

//updater function

//function is responsible for the animation part

//gets called every 20 milliseconds through the start method in the myGameArea Object

function updateGameArea(){

    myGameArea.clear(); //erases the canvas

    player.newPos()//changes the position of my player based on user inputs

    player.redraw() //redraws my player

    updateObstacles()//create my obstacles and move them for me

    checkGameOver() //checks if we crashed into any obstacles

    console.log("update function")

}



myGameArea.start();



document.addEventListener('keydown',(e)=>{

    switch(e.key){

        case "ArrowUp":

            player.speedY-=1

            console.log(player.speedY)

            break;

        case "ArrowDown":

            player.speedY+=1

            break;

        case "ArrowLeft":

            player.speedX-=1

            break;

        case "ArrowRight":

            player.speedX+=1

            break;



    }

})

//if we let go of the arrow buttons the player stops moving

document.addEventListener('keyup', (e) => {

    player.speedX = 0;

    player.speedY = 0;

    console.log(player.speedY)

  });

 

function updateObstacles(){

    //for loop responsible for moving my obstacles to the left

    for (i = 0; i < myObstacles.length; i++) {

        myObstacles[i].x += -4;

        myObstacles[i].redraw();

      }

    myGameArea.frames+=1

    // console.log(myGameArea.frames)

    //if statement responsible for determining the heights of my obstacles and

    //creating the obstacles

    if (myGameArea.frames % 80 === 0) {

        let x = myGameArea.canvas.width;

        let minHeight = 20;

        let maxHeight = 200;

        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

        let minGap = 50;

        let maxGap = 200;

        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

        myObstacles.push(new Component(10, height, 'green', x, 0)); //the top obstacle

        myObstacles.push(new Component(10, x - height - gap, 'green', x, height + gap)); //bottom obstacle

      }

}




//some method

// let myArray = [1,2,3,4,5,6]



// const result = myArray.some((element)=>{

//     return element>7

// })

// console.log(result)
