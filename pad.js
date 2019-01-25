function Pad(x,y){

  this.position = createVector(x,y);
  this.velocity = createVector();


  this.update = function(){

    this.position.add(this.velocity);
    this.position.y = constrain(this.position.y,6,height-84);

  }
  this.moveUp = function(speed){
    this.velocity.y = -speed;
  }
  this.moveDown = function(speed){
    this.velocity.y = speed;
  }

  this.show = function(){
    stroke(0,0,0);
    strokeWeight(20);
    rect(this.position.x,this.position.y,10,80);
  }

  this.getPositionY = function(){
    return this.position.y
  }
}
