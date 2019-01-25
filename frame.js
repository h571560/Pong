function Frame(x,y){
  this.sizex = x;
  this.sizey = y;


  this.show = function(){
    stroke(0,0,0);
    noFill();
    strokeWeight(3);
    rect(0,0,this.sizex,this.sizey);

  }

}
