//studentID: 109488303

var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
    
  background(255);

  colorGrid();
  compassGrid();   
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
    var red = color(255, 0, 0);
    var blue = color(0, 0, 255);

    for (var x=0; x<25; x++){
        for (var y=0; y<25; y++){
            //make rotation speed dependent on mouseX
            var speed = map(mouseX,0,width,10,0);
            
            var colorX = (x+frameCount)*0.001*speed;
            var colorY = (y+frameCount)*0.001*speed;            
            var colorNoise = noise(colorX, colorY);
            
            var c = lerpColor(red, blue, colorNoise);
            fill(c);
            stroke(c);            
            rect(x*20, y*20, stepSize, stepSize);
        }
    }    
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here        
    for(var x=0; x<25; x++){
        for(var y=0; y<25; y++){

            //make rotation speed dependent on mouseX
            var speedTwo = map(mouseX,0,width,10,0);
            var compassX = (x+frameCount)*0.001*speedTwo;
            var compassY = (y+frameCount)*0.001*speedTwo;
            var compassNoise = noise(compassX, compassY);
            
            var lengthX = (x+frameCount)*0.001;
            var lengthY = (y+frameCount)*0.001;
            var noiseLength = noise(lengthX, lengthY);
                    
            push();  
            stroke(0); 
            strokeWeight(3);
            translate(stepSize/2+x*20,stepSize/2+y*20);
            var angle = map(compassNoise,0,1,0,720);
            rotate(radians(angle));
            var length = map(noiseLength,0,1,0,20);
            line(0,0,0,length);
            pop();
        }
    }  
}
