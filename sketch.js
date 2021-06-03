var tower,towerimg;
var door,doorimg,doorgroup;
var climberimg,climber,climbergroup;
var ghost,ghostimg;
var inv,invgroup;
var gamestate="play";
var sound;

function preload(){
  towerimg = loadImage("tower.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  ghostimg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  
  sound.loop();
   
  tower = createSprite(300,300);
  tower.addImage("tower",towerimg);
  tower.velocityY = 3; 
  
  doorgroup = new Group();
  climbergroup = new Group();
  invgroup =  new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostimg);
  ghost.scale=0.3;
}
function draw(){
  background(0);
  if(gamestate === "play"){
    
  
  
  if(tower.y>400){
    tower.y = 300;
  }
  
  if(keyDown("left")){
    ghost.x= ghost.x -3;
  }
  if(keyDown("right")){
    ghost.x= ghost.x +3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(climbergroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invgroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gamestate = "end";  
  }
  spawndoors();
  
  drawSprites();
  }
  if(gamestate === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,230);
    
  }
}
function spawndoors(){
  if(frameCount%240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorimg);
    
    climber=createSprite(200,10);
    climber.addImage(climberimg);
    
    inv = createSprite(200,15);
    inv.width = climber.width;
    inv.height = 2;
    
    door.x=Math.round(random(120,400));
    door.velocityY = 1;
    
    climber.x=door.x;
    climber.velocityY = 1;
    
    inv.x = door.x;
    inv.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth += 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    inv.lifetime = 800;
    
    doorgroup.add(door);
    climbergroup.add(climber);
    
    inv.debug=true;
    invgroup.add(inv);

  }
}
