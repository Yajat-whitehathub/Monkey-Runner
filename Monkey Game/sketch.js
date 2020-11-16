//assigning the global variables
var monkey , monkey_running;
var banana,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
//assigning the gamestates
var survivalTime = 0;
var score = 0;
var END= 0;
var PLAY= 1;
var gameState= PLAY;

function preload(){
  
//loading the animations and images  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  //creating the canvas
  createCanvas(600,400);
  
  //creating the monkey sprite
  monkey= createSprite(75,315,10,10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  //creating the ground sprite
  ground= createSprite(300,335,1500,10);
  ground.velocityX=-4;
  ground.x= ground.width /2;
  
  //creating the food group and obstacle group
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  //setting the background colour to white
  background("white");
  
  //displaying the score
  fill("black");
  text("Score: "+score, 470, 20);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,100,50);
  
  
  if(gameState===PLAY){
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
     spawnBanana();
     spawnObstacle();
    
    //making the monkey jump if space key is pressed
    if(keyDown("space")&& monkey.y >= 290) {
        monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    
    
    if(monkey.isTouching(obstacleGroup)){
       gameEND();
      }
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
  }
   
  
  
  //making the monkey collide with the ground
  monkey.collide(ground);
  drawSprites();
}

//creating a function to spawn bananas in random places
function spawnBanana(){ 
  if(frameCount%100===0){
    //creating the banana sprite
    var banana= createSprite(600,150,10,10);
    banana.y=Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale=0.09;
    banana.velocityX=-4;
    //adding banana to food group
    foodGroup.add(banana);
  }
}

//creating a function to spawn obstacles randomly
function spawnObstacle(){ 
  if(frameCount%150===0){
    //creating the obstacle sprite
    var obstacle= createSprite(600,305,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.13;
    obstacle.velocityX=-5;
    //adding obstacle to the obstacle group
    obstacleGroup.add(obstacle);
  }
}
function gameEND(){
    ground.velocityX=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
}