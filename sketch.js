
let particle;
let pad1;
let pad2;
let frame;
let point1 = 0;
let point2 = 0;
let gravity;
let cheat;

function setup(){
  createCanvas(1000,500);
  particle = new Particle(width / 2, height / 2);
  pad1 = new Pad(20,(height/2)-40);
  pad2 = new Pad(width-30,(height/2)-40);
  frame = new Frame(width,height);
  gravity = createVector(0,0.1,0);
  cheat = createVector(10,0,0);

}

function keyboardMove(){
  if(keyIsDown(87)){
    pad1.moveUp(4);
  }else if(keyIsDown(83)){
    pad1.moveDown(4);
  }
  else{
    pad1.velocity.y = 0;
  }
}

function player2Move(){

  if(keyIsDown(UP_ARROW)){
    pad2.moveUp(4);
  }
  else if(keyIsDown(DOWN_ARROW)){
    pad2.moveDown(4);
  }
  else{
    pad2.velocity.y=0;
  }
}

function gravityrush(){
  if(keyCode == 71){
    particle.applyForce(gravity);
  }
}

function cheatrush(){
  if(keyCode == 67){
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


function draw(){
  background(255,255,255);
  fill(0,0,0);
  textSize(25);
  stroke(255,255,255);
  text(point1, 80, 30);
  text(point2, width-150, 30);
  particle.update();
  particle.show();
  frame.show();
  pad1.show();
  pad1.update();
  pad2.show();
  pad2.update();
  if(particle.onGround()){
      particle.velocity.y = -(particle.velocity.y);
      particle.acc.y = -(particle.acc.y);
    }

  if(particle.onEdge()){
    let x = particle.position.x
    if(x+5 > width){
      point1 += 1;
    }else if(x-5 < 0){
      point2 +=1;
    }

    particle = new Particle(width / 2, height / 2);
  }

  if(((particle.position.y > pad1.position.y-15)&& (particle.position.y-15 < pad1.position.y + 100))
&& ((particle.position.x > pad1.position.x) && (particle.position.x < pad1.position.x + 28))){

  particle.velocity.x = -(particle.velocity.x)*1.09;
  particle.acc.x = -(particle.acc.x)*1.09;
  particle.velocity.y += pad1.velocity.y*1.04;
}
if(((particle.position.y > pad2.position.y-15)&& (particle.position.y-15 < pad2.position.y + 100))
&& ((particle.position.x < pad2.position.x) && (particle.position.x > pad2.position.x -22))){

  particle.velocity.x = -(particle.velocity.x)*1.09;
  particle.acc.x = -(particle.acc.x)*1.09;
  particle.velocity.y += (pad2.velocity.y)*1.04;

}
  //padAI();
  cheatrush();
  gravityrush();
  player2Move();
  keyboardMove();
  }
