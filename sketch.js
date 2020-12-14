var bananaImage,obstacleImg,obstacleGroup,score,backImage,player_running,back2,BananaGroup,StoneGroup,monkey,count,ground,back,gameState;

function preload(){
  backImage = loadImage("jungle.jpg");
 player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 bananaImage = loadImage("banana.png");
 obstacleImg = loadImage("stone.png");
  
 
  
}


function setup() {
  createCanvas(400, 400);
  back = createSprite(200,200,400,400);
back.addImage("backImage",backImage);
back.scale = 1;
  back.x = back.width/2;
  
  gameState = "PLAY";
 ground = createSprite(200,380,400,10);
ground.visible = false;



 monkey = createSprite(60,320,20,20);
monkey.addAnimation("monkey",player_running);
monkey.scale = 0.1;

 count = 0;
  score = 0; 


 BananaGroup = new Group();
 StoneGroup = new Group();

fill("red");
textStyle("BOLD");
textFont("CONSOLAS");

 

}

function draw() {
  background(220);
  
  monkey.collide(ground);
  
  
  if(keyDown("space")&& monkey.y>=288){
    monkey.velocityY = -16;
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  

 if(back.x<0){
   back.x = back.width/2;
 }
    
  
back.velocityX = -(6 + 3*count/100);
   
   count=Math.ceil(World.frameCount/World.frameRate);
   
   
   
  Banana();
  Stone();
    if(BananaGroup.isTouching(monkey)){
    score = score+1;
    BananaGroup.destroyEach();
    monkey.scale = monkey.scale+0.01;
  }
  
  
  if(StoneGroup.isTouching(monkey)){
   monkey.scale = 0.05
  }
  
  switch(score){
    case 10:monkey.scale = 0.12;
      break;
      case 20 : monkey.scale = 0.14;
      break;
      case 30: monkey.scale = 0.16;
    break;
    case 40: monkey.scale= 0.18;
      
      if(count === 200){
        BananaGroup.visibility=  false;
        monkey.visibility = false;
        StoneGroup.visibility= false;
      }
  }
drawSprites();  
text("SURVIVAL TIME:"+count,150,70);
   text("SCORE:"+score,180,85);
   }
   if(count===200){
       text("GAME OVER",200,200);
   }

function Banana(){
  
  var rand = Math.round(random(120,200));
  
  if(World.frameCount%140===0){
     var banana = createSprite(430,rand,20,20);
    banana.velocityX = -5;
    banana.addImage("banana",bananaImage);
    banana.scale = 0.08;
    banana.lifetime = 90;
    BananaGroup.add(banana);
  }
  
  
}

function Stone(){
  
  if(World.frameCount%200===0){
    var  stone = createSprite(430,350,20,20);
    stone.velocityX = -5;
    stone.addImage("stone",obstacleImg);
    stone.scale = 0.2;
    stone.lifetime = 90;
    StoneGroup.add(stone);
  }
  
  
  
}