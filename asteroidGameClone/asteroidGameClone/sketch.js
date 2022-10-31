//studentID: 190488303

var spaceship; 
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var scoreCounter = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
    textSize(30);
//    translate(10,30);
  text("Score: " + scoreCounter,70,50);   
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x ,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i = 0; i<asteroids.locations.length; i++){
        locA = this.asteroids.locations[i];
        sizeA = this.asteroids.diams[i];
        locB = spaceship.location;
        sizeB = spaceship.size;
        var spaceshipAsteroidCollision = isInside(locA, sizeA, locB, sizeB);
        if(spaceshipAsteroidCollision){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    
    for(i = 0; i<asteroids.locations.length; i++){
        locA = asteroids.locations[i];
        sizeA = asteroids.diams[i];
        locB = earthLoc;
        sizeB = earthSize.y;
        var asteroidEarthCollision = isInside(locA, sizeA, locB, sizeB);
        if(asteroidEarthCollision){
            gameOver();
        }
    }
   
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    
    locA = spaceship.location;
    sizeA = spaceship.size;
    locB = earthLoc;
    sizeB = earthSize.y;
    var spaceshipEarthCollision = isInside(locA, sizeA, locB, sizeB);
    if(spaceshipEarthCollision){
        gameOver();
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    
    locA = spaceship.location;
    sizeA = spaceship.size;
    locB = atmosphereLoc;
    sizeB = atmosphereSize.y;
    var spaceshipInAtmosphere = isInside(locA, sizeA, locB, sizeB);
    if(spaceshipInAtmosphere){
        spaceship.setNearEarth();
    }
    
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    //nested loop within loop: outer loop as bullet, inner as asteroid
    //compare all bullets w all the asteroids
    //how to remove asteroids = asteroids.destroy(index of the asteroid to destroy)
    var bulletSystem = spaceship.bulletSys;
    var bullets = bulletSystem.bullets;
    for(var i = 0; i<bullets.length; i++){
        for(var j = 0; j<asteroids.locations.length; j++){
            locA = bullets[i];
            sizeA = bulletSystem.diam;
            locB = asteroids.locations[j];
            sizeB = asteroids.diams[j];
            var bulletCollisions = isInside(locB, sizeB, locA, sizeA);
            if(bulletCollisions){
                asteroids.destroy(j);
                scoreCounter+=1;       
            }
        }
    }
    
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var distInBetween = dist(locA.x, locA.y, locB.x, locB.y);
    var totalRad = sizeA/2 + sizeB/2;
    if(distInBetween<totalRad) {
        return true;
    }else{
        return false;
    }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2);
    translate(0,50);
    textSize(30);
    text("Score: "+ scoreCounter, width/2, height/2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
