  
//creating objects
  
var sword;
  
var alien1, alien2;
  
var fruit1, fruit2, fruit3, fruit4;
  
var gameover;
  
//making gamestates
  
var PLAY = 1;
var END = 0;
var gameState = 1;
  
//making score object and giving it 0 value
  
var score = 0;
  
//making sound objects
  
var swordsound;
var gameoversound;
  
function preload(){
  
  //loading images in objects
  
  swordimg = loadImage("sword.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  fruit1img = loadImage("fruit1.png");
  fruit2img = loadImage("fruit2.png");
  fruit3img = loadImage("fruit3.png");
  fruit4img = loadImage("fruit4.png");
  
  gameover = loadImage("gameover.png");
  
  //loading sound in objects
  
  swordsound = loadSound("knifeSwooshSound.mp3");
  gameoversound = loadSound("gameover.mp3");
  
} 
  
  
function setup(){
  
  //creating sword a sprite and adding image to it
  
  sword = createSprite(70, 200)
  sword.addImage(swordimg);
  sword.scale = 0.7;
  
  //sword.debug = true;
  
  //creating enemy and fruit groups
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
} 
  
  
function draw(){
  
  //creating canvas and giving it a color
  
  createCanvas(599, 485);
  
  background("lightBlue");
  
  //making score visible on canvas
  
  fill("white");
  textSize(20);
  text("Score : " + score, 500, 20);
  
  //making things work if gamestate is in play
  
  if (gameState === 1){
    
    //making sword move with mouse
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    //adding function fruits and enemy in it
    
    fruits();
    enemy();
    
    //increasing score and playing sound
    
    if (fruitGroup.isTouching(sword)){
      
      fruitGroup.destroyEach();
      score = score +2;
      swordsound.play();
      
    } 
    
    //making gameover
    
    if (enemyGroup.isTouching(sword)){
      
      gameState = 0;
      gameoversound.play();
      
    } 
  } 
  
  //making things work when gamestate is in end
  
  if (gameState === 0){
    
    //adding gameover tag
    
    sword.addImage(gameover);
    
    //making enemy invisible
    
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setVisibleEach(false);
    
    //making fruits invisible
    
    fruitGroup.setVelocityXEach(0);
    fruitGroup.setVisibleEach(false);
    
    //setting swords place in canvas
    
    sword.x = 200;
    sword.y = 200;
    sword.scale = 1;
    
  } 
  
  //making spritse visibe in canvas
  
  drawSprites();
  
} 
  
  
function fruits(){
  
  //making fruits come every time
  
  if (frameCount % 80 === 0){
    
    //creating fruit a sprite and giving position a random     number
    
    position = Math.round(random(1,2));
    
    fruit = createSprite(600, 200);
    fruit.scale = 0.2;
    
    //storing numbers 1 to 4 in r
    
    r = Math.round(random(1, 4));
    
    //making conditions that any fruit will come any time
    
    if (r === 1){
      
      fruit.addImage(fruit1img);
      
    } 
      
    else if (r === 2){
      
      fruit.addImage(fruit2img);
      
    } 
      
    else if (r === 3){
      
      fruit.addImage(fruit3img);
      
    } 
      
    else if (r === 4){
      
      fruit.addImage(fruit4img);
      
    } 
    
    //making fruit come in any where in y and x axis
    
    if (position === 1){
      
      fruit.x = 400;
      
      //increase fruit velocity if score reaches 4
      
      fruit.velocityX = -(7 + score / 4);
      
    } 
      
    else if(position === 2){
      
      fruit.x = 0;
      
      //increase fruit velocity if score reaches 4
      
      fruit.velocityX = (7 + score / 4);
      
    } 
    
    fruit.y = Math.round(random(30, 465));    
    
    //setting fruits lifetime
    
    fruit.setLifetime = 100;
    
    //adding fruit in fruits group
    
    fruitGroup.add(fruit);
    
  } 
  
} 
  
  
function enemy(){
  
  //making enemies come every time
  
  if (frameCount % 200 === 0){
    
    //creating monster a sprite
    
    monster = createSprite(600, 200);
    
    //storing numbers 1 and 2 in a
    
    a = Math.round(random(1, 2));
    
    //making conditions that any monster will come
    
    if (a === 1){
      
      monster.addImage(alien1);
      
    } 
      
    else if(a === 2){
      
      monster.addImage(alien2);
      
    } 
    
    //making monster come in any where in y axis
    
    monster.y = Math.round(random(60, 405));
    
    //increase monster velocity if score reaches 10
    
    monster.velocityX = -(10 + score / 10);
    
    //setting monsters lifetime
    
    monster.setLifetime = 100;
    
    //adding monster in enemey group
    
    enemyGroup.add(monster);
  } 
  
} 
  