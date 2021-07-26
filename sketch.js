  
var bgi,waterbgi,grassbgi;
var bg,waterbg,grassbg;

var alligatori, logi, beaveri;
var alligator, log, beaver;
var death, jump;

var allig, logsg

var score = 0

var gamestate = "start"

var wini, losei, reseti,win, lose, reset

var deaths

var starti, start

function preload(){
  bgi = loadImage("Bg.jpg");


  alligatori = loadImage("alligator.png")
  logi = loadImage("log.png")
  beaveri = loadImage("beaver.png")

  wini = loadImage("win.png")
  losei = loadImage("lose.png")
  reseti = loadImage("reset.png")

  deaths = loadSound("death.mp3");

  starti = loadImage("start.png")
}



function setup(){
  createCanvas(1600,800);
  bg = createSprite(800,400,50,50)
  bg.addImage(bgi);
  bg.scale = 2.5

  beaver = createSprite(250,600,50,50);
  beaver.addImage(beaveri);
  beaver.scale = 0.2

  allig = createGroup();
  logsg = createGroup();

  reset = createSprite(800,650,50,50)
  reset.addImage(reseti);
  reset.visible = false 

  lose = createSprite(800,400,50,50)
  lose.addImage(losei)
  lose.visible = false 

  win = createSprite(800,400,50,50)
  win.addImage(wini)
  win.visible = false 

  start = createSprite(800,400,50,50);
  start.addImage(starti);
  start.scale = 0.6
  
}

function draw(){
  background("black");
  drawSprites();
  if(gamestate === "start"){
    textSize(30);
    fill("black");
    text("Use arrow keys to escape getting hit by the logs and alligators! If you reach score 1500 you win!!",200,200);
    if(mousePressedOver(start)){
      gamestate = "play"
      console.log(gamestate)
    }
  }
  if(gamestate === "play"){
    start.visible = false
    bg.velocityX = (2 + 1.5*score/550);
  if(bg.x > 900){
    bg.x = 800 
}
  if(keyDown  ("UP_ARROW")){
    beaver.y = beaver.y - 4
}
  if(keyDown ("DOWN_ARROW")){
    beaver.y = beaver.y + 4
}
    if(keyDown  ("LEFT_ARROW")){
    beaver.x = beaver.x - 4
}
    if(keyDown ("RIGHT_ARROW")){
    beaver.x = beaver.x + 4
}
    console.log(beaver.x);
    if(beaver.y === 784){
        beaver.y = 748;
    }
    if(beaver.y === 460){
        beaver.y = 496;
    }
    if(beaver.x === 10){
        beaver.x = 30;
    }
    if(beaver.x === 1560){
        beaver.x = 1500;
    }
    
    
  createEdgeSprites();
  alli();
  logs();
  
  if(frameCount%1000000){
      score ++;
  }
  
  if(score === 1500){
    gamestate = "won"
  }
  if(beaver.isTouching(allig)||beaver.isTouching(logsg)){
    deaths.play();
    gamestate = "lose"
  }
  textSize(30);
  fill("black")
  text("Score: "+score, 100,100); 
  }
  if(gamestate === "won"){
    
    bg.velocityX = 0
    logsg.setVelocityXEach (0)
    allig.setVelocityXEach (0)
    logsg.destroyEach();
    allig.destroyEach();
    reset.visible = true
    win.visible = true 
  }
  if(gamestate === "lose"){
    
    bg.velocityX = 0
    logsg.setVelocityXEach (0)
    allig.setVelocityXEach (0)
    logsg.destroyEach();
    allig.destroyEach();
    reset.visible = true
    lose.visible = true 
  }
  if(mousePressedOver(reset)){
    reset.visible = false
    win.visible = false 
    lose.visible = false 
    start.visible = true
    gamestate = "start"
    beaver.x = 250  
    score = 0 
  }
  
  console.log(gamestate)
  
  
}

function alli(){
  if(frameCount%250 === 0){
    var ran = Math.round(random(500,700))
    alligator = createSprite(1700,ran,50,50); 
    alligator.addImage(alligatori);
    alligator.scale = 0.17
    alligator.velocityX = -(3 + 1.7*score/500)
    allig.add(alligator)
    
  }
  
  
}

function logs(){
  if(frameCount%150 === 0){
    var rad = Math.round(random(450,650))   
    log = createSprite(1700,rad,50,50);
    log.addImage(logi);
    log.scale = 0.3  
    log.velocityX = -(3 + 1.5*score/700)
    logsg.add(log)
  }
  
}
