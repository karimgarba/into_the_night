// to connect to the server
var socket = io()
//input boxes
var inputun;
//button
var loginButton;
//empty username variable
var username
let computers = []
const cellSize = 100 //how big map will be drawn in pixels
const roomSize = 21
const cellColour = ['tan', 'grey', 'red', 'black', 'yellow', 'brown', 'green']
let mapimages = []
let timer = 300 //how much time is left in seconds
let playstate = false
let doorsUnlocked = false
let computersleft = 4
let mainmenu = true //true
let backgroundSound;
let hitsound;
let MENU = 0



//array which holds the map info and what is drawn where
let map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 3, 3, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 3, 3, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 3, 3, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
//array which holds the floored position of the players
let playerpositions = [ //1- player 2- antiplayer
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

//information about each computer
computers[0] = { room: "Bedroom", x: 1, y: 1, health: 10, hacked: false, counted: true }
computers[1] = { room: "Living Room", x: 13, y: 6, health: 10, hacked: false, counted: true }
computers[2] = { room: "Kitchen", x: 13, y: 14, health: 10, hacked: false, counted: true }
computers[3] = { room: "Garden", x: 19, y: 19, health: 10, hacked: false, counted: true }


var p;
function preload() {
  //images
  lives = loadImage("assets/images/lives.png");
  img = loadImage("assets/images/sprites/bbk.png");
  survivorhowto1 = loadImage("assets/images/main menu/howto1.png")
  survivorhowto2 = loadImage("assets/images/main menu/howto2.png")
  beasthowto1 = loadImage("assets/images/main menu/howtobeast1.png")
  beasthowto2 = loadImage("assets/images/main menu/howtobeast2.png")
  pauseimg = loadImage("assets/images/pause.png");
  beastimg = loadImage("assets/images/sprites/beast.png");
  mapimages[0] = loadImage("assets/images/map images/woodfloor.png");
  mapimages[1] = loadImage("assets/images/map images/wall.png")
  mapimages[2] = loadImage("assets/images/map images/computer.png");
  mapimages[3] = loadImage("assets/images/map images/black.png");
  mapimages[4] = loadImage("assets/images/map images/asphalt.png");
  mapimages[5] = loadImage("assets/images/map images/door.png");
  mapimages[6] = loadImage("assets/images/map images/computerhacked.png");

  //sound
  soundFormats('mp3', 'ogg', 'wav');
  backgroundSound = loadSound('assets/sounds/menu.mp3');
  //https://pixabay.com/music/ambient-dark-ambient-126122/
  hitsound = loadSound('assets/sounds/hit.mp3');
  //https://freesound.org/people/qubodup/sounds/60013/
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background('grey');
  noStroke();
  p = new Sprite(1, 2); // draw survivor at (1,2)
  b = new Beast(2, 2); // draw beast at (2,2)
  frameRate(30); //set the game frame rate to 30
  //input username
  inputun = createInput(''); //empty variable box
  inputun.position(100, 100);
  //login button
  loginButton = createButton('Login');
  loginButton.position(275, 100);
  loginButton.mousePressed(login);
}

function draw() {
  if (mainmenu == true) {
    menus()
  }
  if (playstate == true) {
    noStroke()
    positionreset();
    positions();
    background('grey');
    push();
    computerDraw();
    roomDraw();
    playerdraw();
    limitedvision();
    pop()
    interface();
    timercount();
  }
  if ((playstate == false) && (timer == 0)) {
    resultscreen()
    noLoop()
  }
}

// Draws the room depending on its room map variable when it is the current room
function roomDraw() {
  translate((width / 2) - 0.4 * cellSize, height / 2)
  //nested loop to interate through the map array
  for (var y = 0; y < roomSize; y++) {
    for (var x = 0; x < roomSize; x++) {
      fill(cellColour[map[y][x]]);// the number in the position [y,x] of the map array determines the colour used to fill shapes.
      rect((x + p.xoffset) * cellSize, (y + p.yoffset) * cellSize, cellSize, cellSize) //Draws a square with the sides length of cellSize(20px) at the coordinates (x * cellsize, y * cellsize) in the colour of the determined fill.
      image(mapimages[map[y][x]], (x + p.xoffset) * cellSize, (y + p.yoffset) * cellSize, cellSize, cellSize)// the number in the position [y,x] of the map array determines the image drawn
    }
  }
}

function positionreset() {
  for (var y = 0; y < roomSize; y++) {//iterating through columns
    for (var x = 0; x < roomSize; x++) {//iterating through rows
      playerpositions[y][x] = 0 //sets players position to 0
    }
  }
}

function positions() {
  playerpositions[floor(b.y)][floor(b.x)] = 2 //set antiplayers position to 2
  playerpositions[floor(p.y)][floor(p.x)] = 1 //sets players position to 1 
}

//Drawing the computers
function computerDraw() {
  for (var c = 0; c < computers.length; c++) { //iterate through the computer array
    if (computers[c].hacked == false) { //if the computer is not hacked 
      map[computers[c].y][computers[c].x] = 2
    }
  }
}

//Displaying the user scores
function scoreDraw() {
  fill('white')
  textSize(32);
  text("Score:" + p.score, 1150, 700)
}

function timercount() {
  let mins = floor(timer / 60);//works out how much minutes there are
  let secs = timer % 60; // the remainder of timer mod 60 is how many seconds are left
  //console.log(mins,secs)
  if (frameCount % 30 == 0 && timer > 0) {
    timer--; // decreases the timer variable by 1
  }
  if (timer == 0) {
    playstate = false
    console.log(playstate)
  }
  fill('white') //Sets the colour used to fill shapes and text to white
  text(mins, 860, 100) //displays the value in mins variable at the coordinates (30,60)
  text(":", 880, 100) //displays a colon to separate the mins and secs - this is purely for clarity
  text(secs, 900, 100) //displays the value in secs variable at the coordinates (70,60)
}


//Checking how many computers are left
function computersLeft() {
  text("Computers Left:" + computersleft, 1080, 100)
  if (computersleft == 0) { // if all the computers have been hacked 
    doorsUnlocked = false
    text("Doors are Unlocked!", 1080, 500)
    // iterate through map array
    for (var y = 0; y < roomSize; y++) {
      for (var x = 0; x < roomSize; x++) {
        if (map[y][x] == 5) { //if iteration is a locked door
          map[y][x] = 0 //changes the locked doors positions to free spaces
        }
      }
    }
  }
}


//adds functionality to puttons
function mouseClicked() {
  if (MENU == 0) {
    if (mouseX < 1200 && mouseX > 1000) {
      if (mouseY < 125 && mouseY > 50) {
        MENU = 1 //takes you to main game
        backgroundSound.play() // plays game background noise
      }
      if (mouseY < 275 && mouseY > 200) {
        MENU = 2 // takes you to how to play screen
      }
      if (mouseY < 425 && mouseY > 350) {
        MENU = 3 // quits the game
      }
    }
    if (mouseX < 900 && mouseX > 700) {
      if (mouseY < 275 && mouseY > 200) {
        MENU = 4 // takes you to the highscore screen
      }
    }
  }
}

function login() {
  username = inputun.value();//Set username to the value in the input box
  console.log(username)
}

// Draws the main menu screen
function menus() {
  background('#9c4040');
  noStroke()
  fill('grey');
  rect(1000, 50, 200, 75, 15);
  rect(1000, 200, 200, 75, 15);
  rect(1000, 350, 200, 75, 15);
  rect(700, 200, 200, 75, 15);
  fill('black')
  textSize(40)
  text('INTO THE NIGHT', 600, 60)
  textSize(50)
  fill(255);
  text('START', 1020, 106);
  text('EXIT', 1040, 406);
  textSize(26);
  text('HOW TO PLAY', 1013, 248);
  text('HIGHSCORES', 710, 250)
  // START GAME
  if (MENU == 1) {
    removeElements();
    playstate = true
  } 
  //How to Play
  if (MENU == 2) {
    noStroke()
    removeElements();
    background('#9c4040')
    textSize(20)
    text('Backspace to return to main menu', 10, 30)
    textSize(30)
    text('How To Play', 600, 30)
    textSize(30)
    noFill()
    stroke('black')
    strokeWeight(5)
    rect(50, 75, 200, 50)
    rect(50, 350, 200, 50)
    rect(950, 50, 400, 200)
    fill('white')
    noStroke()
    textSize(20)
    text('Playing As Survivor', 55, 110)
    image(survivorhowto1, 50, 130, 200, 120)
    text('Hack computers across', 50, 270)
    text('the map by interacting', 50, 290)
    text('with them', 50, 310)
    text('Once all computers', 290, 270)
    text('have been hacked the', 290, 290)
    text('exit doors will open', 290, 310)
    image(survivorhowto2, 500, 130, 200, 120)
    text('Interact with the exit', 500, 270)
    text('portal to fully escape', 500, 290)
    text('Playing As Beast', 55, 385)
    image(beasthowto1, 50, 405, 200, 120)
    text('Navigate and find the', 50, 545)
    text('survivor', 50, 565)
    image(beasthowto2, 500, 405, 200, 120)
    text('Attack the user by', 500, 545)
    text('hitting them until', 500, 565)
    text('their health reaches 0', 500, 585)
    text('Controls', 955, 85)
    text('Survivor', 955, 125)
    text('WASD - UP LEFT DOWN RIGHT', 955, 145)
    text('E - TO INTERACT', 955, 165)
    text('Beast', 955, 205)
    text('IJKL - UP LEFT DOWN RIGHT', 955, 225)
    text('O - TO HIT', 955, 245)

    if (keyIsDown(8)) {// Returns to main menu screen
      MENU = 0
    }
  } // INSTRUCTIONS
  if (MENU == 3) {
    window.close() // close the browser window
  }
  if (MENU == 4) {
    removeElements()
    background('#9c4040');
    drawHighscores() // Displays the top 10 highscores
    if (keyIsDown(8)) {// Returns to main menu screen
      MENU = 0
    }
  }
}

function limitedvision() {
  noFill() //No fill so circle is see through
  stroke('black') //Black stroke weight
  strokeWeight(1000) //stroke weight
  circle(p.x + 0.4 * cellSize, p.y + 0.4 * cellSize, 15 * cellSize) //drawn around the players position
  noStroke()
}

// When the survivor has died end the game
function playerdead() {
  if (p.alive == false) {
    resultscreen()
    noLoop()
  }
}



function resultscreen() {
  playstate = false
  sendmsg()
  socket.on("newScore", function(data) {
    console.log(data.playerName + " just scored " + data.score) //confirmation score has been sent to the server
  })

}

function sendmsg() {
  socket.emit("submitScore", { playerName: username, score: p.score })//Sends Username and score to the server
}


function getHighscores() {
  socket.emit("getHighscores") //getting highscores from server
}

//displaying the top 10 high scores
function drawHighscores() {
  getHighscores()
  socket.on("getHighscores", function(data) {
    for (let i = 0; i < 11; i++) {
      text(i, 500, (i * 25) + 130)
      text(data.row[i].playerName, 540, (i * 25) + 130)
      text(data.row[i].score, 630, (i * 25) + 130)
    }
  })
}

//displays all the information for the interface
function interface() {
  scoreDraw();
  computersLeft();
  playerdead()
}

//draws the players
function playerdraw() {
  b.draw();
  p.draw();
}

