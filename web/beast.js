class Beast {
  constructor(x, y) {
    this.x = x; //using the assigned variables for x and y from the game.js script
    this.y = y;
    this.frame = 0;
    this.maxFrame = 0;
    this.maxFrames = [8, 12]; //walk,hit
    this.direction = 0;
    this.xoffset = 1;
    this.yoffset = 0;
  }

  move(dy, dx) {// code for beast movement
    let tgt = { x: this.x + dx, y: this.y + dy }
    if (dx > 0) { //right
      //checking if there is a player in the target square
      if ((playerpositions[floor(tgt.y)][floor(tgt.x + 0.8)] != 1) && (playerpositions[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] != 1)) {
        //checking if the target square is a available to be move into
        if ((map[floor(tgt.y)][floor(tgt.x + 0.8)] == 0) && (map[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] == 0)) {
          //changes the players position the target square
          this.x = tgt.x
          this.y = tgt.y
          this.xoffset += dx
        }
      }
    }

    if (dx < 0) { //left
      //checking if there is a player in the target square
      if ((playerpositions[floor(tgt.y)][floor(tgt.x)] != 1) && (playerpositions[floor(tgt.y + 0.8)][floor(tgt.x)] != 1)) {
        //checking if the target square is a available to be move into
        if ((map[floor(tgt.y)][floor(tgt.x)] == 0) && (map[floor(tgt.y + 0.8)][floor(tgt.x)] == 0)) {
          //changes the players position the target square
          this.x = tgt.x
          this.y = tgt.y
          this.xoffset += dx
        }
      }
    }
    if (dy > 0) { //downs
      //checking if there is a player in the target square
      if ((playerpositions[floor(tgt.y + 0.8)][floor(tgt.x)] != 1) && (playerpositions[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] != 1)) {
        //checking if the target square is a available to be move into
        if ((map[floor(tgt.y + 0.8)][floor(tgt.x)] == 0) && (map[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] == 0)) {
          //changes the players position the target square
          this.x = tgt.x
          this.y = tgt.y
          this.yoffset += dy
        }
      }
    }
    if (dy < 0) { //up
      //checking if there is a player in the target square
      if ((playerpositions[floor(tgt.y)][floor(tgt.x)] != 1) && (playerpositions[floor(tgt.y)][floor(tgt.x + 0.8)] != 1)) {
        //checking if the target square is a available to be move into
        if ((map[floor(tgt.y)][floor(tgt.x)] == 0) && (map[floor(tgt.y)][floor(tgt.x + 0.8)] == 0)) {
          //changes the players position the target square
          this.x = tgt.x
          this.y = tgt.y
          this.yoffset += dy
        }
      }
    }
    console.log(floor(this.x), floor(this.y)) //console log beasts coordinates on grid
  }
  
  hit() {
    //to do damage to the survivor
    if (frameCount % 30 == 0 && timer > 0) { //if there is still time in the game
      p.lives-- //decrease survivors health by 1
    }
  }

  checkplayer() {
    // checking if there is a player in the direction and range of the beast
    if (this.direction == 0) { //facing up 
      if ((playerpositions[floor(this.y - 0.3)][floor(this.x)] == 1) && (playerpositions[floor(this.y - 0.3)][floor(this.x + 0.8)] == 1)) {
        console.log("player")//console log if player is in range 
        this.hit()//execute hit function
      }
    }

    if (this.direction == 1) { //facing left
      if ((playerpositions[floor(this.y)][floor(this.x - 0.3)] == 1) && (playerpositions[floor(this.y + 0.8)][floor(this.x - 0.3)] == 1)) {
        console.log("player")//console log if player is in range 
        this.hit()//execute hit function
      }
    }
    if (this.direction == 2) { //facing down
      if ((playerpositions[floor(this.y + 1.1)][floor(this.x)] == 1) && (playerpositions[floor(this.y + 1.1)][floor(this.x + 0.8)] == 1)) {
        console.log("player")//console log if player is in range 
        this.hit()//execute hit function
      }
    }
    if (this.direction == 3) { //facing right
      if ((playerpositions[floor(this.y)][floor(this.x + 1.1)] == 1) && (playerpositions[floor(this.y + 0.8)][floor(this.x + 1.1)] == 1)) {
        console.log("player")//console log if player is in range 
        this.hit()//execute hit function
      }
    }
  }





  draw() {
    if (keyIsDown(73)) { //up when I is pressed
      this.move(-0.03, 0)//how much the beast wants to move by
      //animating the movement
      this.direction = 0;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }
    if (keyIsDown(74)) { //left when J is pressed 
      this.move(0, -0.03)//how much the beast wants to move by
      //animating the movement
      this.direction = 1;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }
    if (keyIsDown(75)) { //down when K is pressed 
      this.move(0.03, 0)//how much the beast wants to move by
      //animating the movement
      this.direction = 2;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }
    if (keyIsDown(76)) { //right when L is pressed
      this.move(0, 0.03)//how much the beast wants to move by
      //animating the movement
      this.direction = 3;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }

    if (keyIsDown(79)) { //hit when O is pressed
      if (frameCount % 15 == 0 && timer > 0) { // every two seconds
        hitsound.play() // play the hit sound effect
      }
      this.checkplayer()
      //animating the action
      this.maxFrame = this.maxFrames[1]
      this.frame = ++this.frame % 5;
    }
    image(beastimg, b.xoffset * cellSize, b.yoffset * cellSize, 0.8 * cellSize, 0.8 * cellSize, this.frame * 64, (this.direction + this.maxFrame) * 64, 64, 64); // graphically displaying the beast
  }
}