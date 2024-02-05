class Sprite {
  constructor(x, y) {
    this.x = x; //using the assigned variables for x and y from the game.js script
    this.y = y;
    this.frame = 0;
    this.maxFrame = 0;
    this.maxFrames = [8, 12]; //walk,hit
    this.direction = 0;
    this.computerinuse = null;
    this.score = 0
    this.xoffset = -1
    this.yoffset = -2
    this.lives = 3
    this.alive = true
  }


  move(dy, dx) {
    let tgt = { x: this.x + dx, y: this.y + dy }
    if (dx > 0) { //right 
      if ((playerpositions[floor(tgt.y)][floor(tgt.x + 0.8)] != 2) && (playerpositions[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] != 2)) {
        if ((map[floor(tgt.y)][floor(tgt.x + 0.8)] == 0) && (map[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] == 0)) {
          this.x = tgt.x
          this.y = tgt.y
          this.xoffset -= dx
          b.xoffset -= dx
        }
      }
    }

    if (dx < 0) { //left
      if ((playerpositions[floor(tgt.y)][floor(tgt.x)] != 2) && (playerpositions[floor(tgt.y + 0.8)][floor(tgt.x)] != 2)) {
        if ((map[floor(tgt.y)][floor(tgt.x)] == 0) && (map[floor(tgt.y + 0.8)][floor(tgt.x)] == 0)) {
          this.x = tgt.x
          this.y = tgt.y
          this.xoffset -= dx
          b.xoffset -= dx
        }
      }
    }
    if (dy > 0) { //downs
      if ((playerpositions[floor(tgt.y + 0.8)][floor(tgt.x)] != 2) && (playerpositions[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] != 2)) {
        if ((map[floor(tgt.y + 0.8)][floor(tgt.x)] == 0) && (map[floor(tgt.y + 0.8)][floor(tgt.x + 0.8)] == 0)) {
          this.x = tgt.x
          this.y = tgt.y
          this.yoffset -= dy
          b.yoffset -= dy
        }
      }
    }
    if (dy < 0) { //up
      if ((playerpositions[floor(tgt.y)][floor(tgt.x)] != 2) && (playerpositions[floor(tgt.y)][floor(tgt.x + 0.8)] != 2)) {
        if ((map[floor(tgt.y)][floor(tgt.x)] == 0) && (map[floor(tgt.y)][floor(tgt.x + 0.8)] == 0)) {
          this.x = tgt.x
          this.y = tgt.y
          this.yoffset -= dy
          b.yoffset -= dy
        }
      }
    }
    console.log(floor(this.x), floor(this.y))
  }

  hacking(t) {
    if (computers[t].health > 0) {
      text(computers[t].health * 10,(computers[t].x + this.xoffset + 0.35) * cellSize,(computers[t].y + this.yoffset + 0.35) * cellSize)
      if (frameCount % 30 == 0 && timer > 0) {
        computers[t].health = computers[t].health - 10 //0.5
        this.score = this.score + 50
        console.log("score " + this.score)
        console.log(computers[t])
      }
    }
    if (computers[t].counted == true) {
      if (computers[t].health == 0) {
        computers[t].hacked = true
        console.log(computers[t])
        map[computers[t].y][computers[t].x] = 6
        computersleft--
        computers[t].counted = false
        console.log("computers left" + computersleft)
      }
    }
  }
  endgame() {
    if (this.direction == 1) { //l
      if (map[floor(this.y)][floor(this.x - 0.3)] == 4) {
        console.log("endgame")
        playstate = false
      }
    }
    if (this.direction == 2) { //d
      if (map[floor(this.y + 1.1)][floor(this.x)] == 4) {
        console.log("endgame")
        playstate = false
      }
    }
  }



  checkcomputer() {
    if (this.direction == 0) { //u
      for (var t = 0; t < computers.length; t++) {
        if ((computers[t].x == floor(this.x)) && (computers[t].y == floor(this.y - 0.3))) {
          //console.log(computers[t].room)
          this.hacking(t)
        }
      }
    }

    if (this.direction == 1) { //l
      for (var t = 0; t < computers.length; t++) {
        if ((computers[t].x == floor(this.x - 0.3)) && (computers[t].y == floor(this.y))) {
          console.log(computers[t].room)
          this.hacking(t)
        }
      }
    }
    if (this.direction == 2) { //d
      for (var t = 0; t < computers.length; t++) {
        if ((computers[t].x == floor(this.x)) && (computers[t].y == floor(this.y + 1.1))) {
          console.log(computers[t].room)
          this.hacking(t)
        }
      }
    }
    if (this.direction == 3) { //r
      for (var t = 0; t < computers.length; t++) {
        if ((computers[t].x == floor(this.x + 1.1)) && (computers[t].y == floor(this.y))) {
          console.log(computers[t].room)
          this.hacking(t)
        }
      }
    }
  }

  howmanylives() {
    for (let i = 0; i < this.lives; i++) {
      image(lives, this.x + (i * 20), this.y - 10, 40, 40)
      console.log(this.lives)
    }
  }

  isdead() {
    if (this.lives == 0) {
      this.alive = false
    }
  }

  draw() {
    if (keyIsDown(87)) { //up
      this.move(-0.03, 0)
      this.direction = 0;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }
    if (keyIsDown(65)) { //left
      this.move(0, -0.03)
      this.direction = 1;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }
    if (keyIsDown(83)) { //down
      this.move(0.03, 0)
      this.direction = 2;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }
    if (keyIsDown(68)) { //right
      this.move(0, 0.03)
      this.direction = 3;
      this.maxFrame = this.maxFrames[0]
      this.frame = ++this.frame % this.maxFrame;
    }

    if (keyIsPressed === true) {
      if (keyCode == 69) {
        this.checkcomputer()
        this.endgame()
        this.maxFrame = this.maxFrames[1]
        this.frame = ++this.frame % 5;
      }
    }

    this.howmanylives()
    this.isdead()
    image(img, this.x, this.y, 0.8 * cellSize, 0.8 * cellSize, this.frame * 64, (this.direction + this.maxFrame) * 64, 64, 64);
  }
}

