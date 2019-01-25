function Particle(x,y) {
  this.starts = [-4,4];
  this.position = createVector(x,y);
  this.velocity = createVector(random(this.starts),0);
  this.acc = createVector();

    this.update = function(){

      this.velocity.add(this.acc);
      this.position.add(this.velocity);
      this.acc.mult(0);
      this.position.x = constrain(this.position.x,4,width-4);
      this.position.y = constrain(this.position.y,4,height-4);
    }

    this.applyForce = function(force){

      this.acc.add(force);

    }

    this.jump = function(hi){
      this.acc.add(0,-hi)
    }

    this.onGround = function(){
      let y = this.position.y;
      if(y > height-5 || y-5 < 0){
        return true;
      }else{
        return false;
      }
    }
    this.onEdge = function(){
      let x = this.position.x;
      if(x+5 > width || x-5 < 0){
        return true;
      }else{
        return false;
      }
    }

    this.show = function(){
      stroke(255,0,0);
      strokeWeight(20);
      point(this.position.x,this.position.y);
    }

    this.getPositionY = function(){
      return this.position.y;
    }
}
