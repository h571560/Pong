
let particle;
let pad1;
let pad2;
let frame;
let point1 = 0;
let point2 = 0;
let gravity;
let cheat;
let gameOver = true;
let winner;
let clickPos = [];

function setup() {
  createCanvas(1000, 500);
  particle = new Particle(width / 2, height / 2);
  pad1 = new Pad(20, (height / 2) - 40, 'player 1');
  pad2 = new Pad(width - 30, (height / 2) - 40, 'player 2');
  frame = new Frame(width, height);
  gravity = createVector(0, 0.1, 0);
  cheat = createVector(10, 0, 0);

}

function keyboardMove() {
  if (keyIsDown(87)) {
    pad1.moveUp(4);
  } else if (keyIsDown(83)) {
    pad1.moveDown(4);
  }
  else {
    pad1.velocity.y = 0;
  }
}

function checkWinner() {
  if (pad1.point === 10) {
    gameOver = true;
    winner = pad1.player;
  }
  if (pad2.point === 10) {
    gameOver = true;
    winner = pad2.player;
  }
  if (gameOver) {
    alert('Game Over! Winner is ' + winner)
  }

}

function player2Move() {

  if (keyIsDown(UP_ARROW)) {
    pad2.moveUp(4);
  }
  else if (keyIsDown(DOWN_ARROW)) {
    pad2.moveDown(4);
  }
  else {
    pad2.velocity.y = 0;
  }
}

function gravityrush() {
  if (keyCode == 71) {
    particle.applyForce(gravity);
  }
}

function cheatrush() {
  if (keyCode == 67) {
    particle.applyForce(cheat);
  }
}

// function padAI(){
//   let diff = pad2.getPositionY()-particle.getPositionY();
//
//   if(diff < -40){
//   pad2.moveDown(5);
//   }
//   else if(diff > -20){
//     pad2.moveUp(5);
//   }
//   else{
//     pad2.velocity.y=0;
//   }
// }
function checkGameLogic(particle, pad1, pad2) {
  if (particle.onGround()) {
    particle.velocity.y = -(particle.velocity.y);
    particle.acc.y = -(particle.acc.y);
  }

  if (((particle.position.y > pad1.position.y - 15) && (particle.position.y - 15 < pad1.position.y + 100))
    && ((particle.position.x > pad1.position.x) && (particle.position.x < pad1.position.x + 28))) {

    particle.velocity.x = -(particle.velocity.x) * 1.09;
    particle.acc.x = -(particle.acc.x) * 1.09;
    particle.velocity.y += pad1.velocity.y * 1.04;
  }
  if (((particle.position.y > pad2.position.y - 15) && (particle.position.y - 15 < pad2.position.y + 100))
    && ((particle.position.x < pad2.position.x) && (particle.position.x > pad2.position.x - 22))) {

    particle.velocity.x = -(particle.velocity.x) * 1.09;
    particle.acc.x = -(particle.acc.x) * 1.09;
    particle.velocity.y += (pad2.velocity.y) * 1.04;

  }
}

function checkStartGame() {
  if ((clickPos[0] > 432 && clickPos[0] < 581) && (clickPos[1] > 355 && clickPos[1] < 425)) {
    gameOver = false
    setup()
  }
}

function mouseClicked() {
  clickPos = [mouseX, mouseY]
  console.log('clicked: ' + clickPos[0].toString() + ' ' + clickPos[1].toString())
}

function draw() {
  if (!gameOver) {
    background(255, 255, 255);
    fill(0, 0, 0);
    textSize(25);
    stroke(255, 255, 255);
    text(pad1.point, 80, 30);
    text(pad2.point, width - 150, 30);
    particle.update();
    particle.show();
    frame.show();
    pad1.show();
    pad1.update();
    pad2.show();
    pad2.update();
    checkGameLogic(particle, pad1, pad2);
    if (particle.onEdge()) {
      let x = particle.position.x
      if (x + 5 > width) {
        pad1.awardPoint();
      } else if (x - 5 < 0) {
        pad2.awardPoint();
      }
      particle = new Particle(width / 2, height / 2);

    }
    //padAI();
    checkWinner();
    cheatrush();
    gravityrush();
    player2Move();
    keyboardMove();
  }
  else {
    background(255, 255, 255);
    fill(0, 0, 0);
    textSize(30);
    stroke(255, 255, 255);
    text('Welcome to pong! press play to start playing', width / 5, height / 2)
    frame.show();
    fill(224, 245, 223)
    rect(width / 2 - 68, height - 145, 150, 70)
    fill(255, 255, 255)
    textSize(25);
    stroke(0, 0, 0);
    text('Play!', width / 2 - 20, height - 100)
    checkStartGame()
  }
}
