//Create variables here
var database;
var dog, Dog, happyDog, database, foodS, foodStock, feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
	//load images here
  Dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  
  dog = createSprite(200,200,50,50);
  dog.addImage(Dog);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood)
}


function draw() {  

  background(46, 139, 87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();   
  })
  drawSprites();
  //add styles here
  display()
  {

  }

}

function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

  dog.position(200,200);
}

function addFood()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

