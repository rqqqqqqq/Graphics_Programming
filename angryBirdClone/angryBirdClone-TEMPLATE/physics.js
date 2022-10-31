////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}
////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){

    propeller = Bodies.rectangle(150, 480, 200, 15, {
        isStatic: true, angle: angle
    });
    World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();  
    drawVertices(propeller.vertices);  
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle+= angleSpeed;   
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
    for(var i=birds.length-1; i>=0; i--){
        drawVertices(birds[i].vertices);
        if(isOffScreen(birds[i])){
            removeFromWorld(birds[i]);
            birds.splice(i,1);
        }        
    }
  pop();
} 
////////////////////////////////////////////////////////////////
//creates a tower of boxes  
function setupTower(){
  //you code here
boxes =  Composites.stack(500,180,3,6,0,0,
                          function(x,y) {
                            return Bodies.rectangle(x,y,80,80,{
                                render:{
                                        fillStyle: "",
                                        strokeStyle: "black"
                                }
                            });
                        });
    
    for(var i=0;i<boxes.bodies.length;i++){
        var blue = random(100,255);
        boxes.bodies[i].render.fillStyle = color(0,0,blue);
    }    
    World.add(engine.world,[boxes]);
}
//////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
    for(var i=0;i<boxes.bodies.length;i++){
        fill(boxes.bodies[i].render.fillStyle);
        stroke(boxes.bodies[i].render.strokeStyle);

   drawVertices(boxes.bodies[i].vertices);
    }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
    slingshotBird = Bodies.circle(200, 200, 20, {restitution: 0.95, friction: 0});
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  slingshotConstraint = Constraint.create({
    pointA: { x: 180, y: 180 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.0001
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

function timeIt(){
    if(countdownValue > 0){
        countdownValue--;
    }
}
function gameOver(){
  fill(255);
  textSize(60);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}
