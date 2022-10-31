//studentID: 190488303

var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push();//sun
    
    translate(width/2, height/2);
    rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200); 

    pop();
   
    push();//earth
    
    translate(width/2, height/2); 
    rotate(radians(speed));
    translate(300,0);
    rotate(radians(speed));
    celestialObj(color(0,0,255),80);
    
    pop();
        
    push(); //moon
    
    translate(width/2, height/2);
    rotate(radians(speed));
    translate(300,0);
    rotate(radians(-speed*2));
    translate(100,0);
    celestialObj(color(255,255,255),30);
    
    pop();  
    
    push(); //celestial body
    
    translate(width/2, height/2);
    rotate(radians(speed));
    translate(300,0);
    rotate(-speed/20);
    translate(60,0);
    celestialObj(color(200,100,100),20);
    
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
