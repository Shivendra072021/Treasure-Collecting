var PLAY = 1;
var END = 0;
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var score = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){

    createCanvas(400,400);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 7;
  path.scale = 0.3

  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.05;
  
  gameOver = createSprite(185,175,5,5);
  gameOver.addAnimation("Over",endImg)
  gameOver.scale = 0.5;

  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
  
  boy.setCollider("circle",boy.x,boy.y,20)
  boy.debug = false;

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  gameOver.visible = false;
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      score = score +150
      cashG.destroyEach();

    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score = score +250
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score = score +200
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END
      }
  }
  
  if (gameState === END)
    {
      gameOver.visible = true;
      boy.destroy();
      boy.velocityY = 0;
      swordGroup.destroyEach();
      swordGroup.setVelocityYEach(0);
      swordGroup.visible = false;
      cashG.destroyEach();
      cashG.setVelocityYEach(0);
      cashG.visible = false;
      diamondsG.destroyEach();
      diamondsG.setVelocityYEach(0);
      diamondsG.visible = false;
      jwelleryG.destroyEach();
      jwelleryG.setVelocityYEach(0);
      jwelleryG.visible = false;
      path.velocityY = 0;
    }
      
  drawSprites();
  textSize(20);
  fill("lime");
  text("Treasure: "+ score,250,30);

}

function createCash() {
  if (World.frameCount % 180 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.08;
  cash.velocityY = (3 +1*score/100);
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 250 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.02;
  diamonds.velocityY = (3 +1*score/100);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 220 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.1;
  jwellery.velocityY = (3 +1*score/100);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 300 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.07;
  sword.velocityY = (3 +1*score/100);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}