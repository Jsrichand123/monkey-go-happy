var monkey , monkey_running
var banana ,bananaImg, rock, obstacleImg
var FoodGroup, obstacleGroup
var score=0;
var ground;
var survivalTime=0;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png-1.png");
  obstacleImg = loadImage("stone.png");
  jungleImg=loadImage("jungleX.jpg");
 
}


function setup() {
    createCanvas(670, 550);
 
  jungle=createSprite(10,40,405,250);
  jungle.addImage(jungleImg);
  jungle.scale=0.95;
  jungle.x = jungle.width/2;
  jungle.velocityX=-4;
  
  
  
  
  monkey = createSprite(80,530,20,20);
  monkey.addAnimation("running", monkey_running);  
  monkey.scale = 0.1;
  
  ground=createSprite(400,540,900,10);
  ground.x = ground.width/2;
  ground.velocityX=-1;
  
  ground.visible=false;
  
  
  obstacleGroup=createGroup();
  foodGroup = createGroup();

  
}


function draw() {
  background("white");
  

  bananas();
  obstacles();
    

  if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -12;
    }
  

  if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  

  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);


  if (foodGroup.isTouching(monkey)){
    score=score+2;
    foodGroup.destroyEach();
    }
  switch(score){
    case 10: monkey.scale=0.12;
            break;
    case 20: monkey.scale=0.14;
            break;
    case 30: monkey.scale=0.16;
            break;
    case 40: monkey.scale=0.18;
            break;
    default: break;
  }
 
 
  
  if (obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
     obstacleGroup.destroyEach();
    score=score-1;
    
  }
 
  drawSprites();
   
    
    
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 40,20);
  
 
  stroke("black")
  textSize(20);
  fill("red");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 500,20);
   
}

function bananas() {
  if (frameCount % 120 === 0){
  
  banana=createSprite(700,110,10,10);
    banana.y = Math.round(random(120,400));
  banana.addImage(bananaImg);
  banana.scale=0.1;
  banana.velocityX=-5;
  banana.lifetime = 190;

    foodGroup.add(banana);
  }
}
function obstacles() {    
  if (frameCount % 200 === 0){
     
  rock=createSprite(700,510,10,10);
  rock.addImage(obstacleImg);
  rock.scale=0.14;
  rock.velocityX=-4;
  rock.lifetime = 200;
  obstacleGroup.add(rock);

  }

}