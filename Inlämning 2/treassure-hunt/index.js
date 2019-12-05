//I used "use strict" to easier keep track of different variables and scopes since I'm more used to normal Java.
"use strict";

//Variable to keep track of score
var score = 0;

//Variable to store the picture from getImageFromPexels()
var winningPicture;

/**
 * @desc adds a EventListener onload that calls init to initate the game.
 */
document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);

/**
* @desc Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
  placeTreassure();
  getImageFromPexels();
}

/**
 * @desc Calls functions that initiates the UI of the game.
*/
function initGameUI(){
  initChests();
  initScoreBoard();
  initChestEventListeners();
  initRefreshButton();
}

/**
 * @desc Creates a variable with the parentDiv, and then makes a chest with img and appends the chest at the ParentDiv.
 * This loops three times because of three chests.
*/
function initChests(){
 for(let i=1; i<=3; i++){
  let parentDiv = document.getElementById('chests');
  let image = document.createElement('img');
  image.setAttribute('src', 'images/chest-closed.png');
  image.setAttribute("hspace", "5");
  image.setAttribute('id', 'chest' + i);
  parentDiv.appendChild(image);
 }
}

/**
 * @desc Creates a <p> in game-wrapper that tells the score. 
 * Appears at the end since appendChild appends at the end of the index.
*/
function initScoreBoard(){
  let parentDiv = document.getElementById("game-wrapper");
  let scoreDisplay = document.createElement("p");
  scoreDisplay.setAttribute("style", "text-align:center; font-size:200%; color:white");
  scoreDisplay.setAttribute("id", "score");
  scoreDisplay.textContent = "Score: "+ score;
  parentDiv.appendChild(scoreDisplay);
}

/**
 * @desc Adds 5 to the score and updates the content of the scoreDisplay
*/
function addScore(){
  score += 5;
  let scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = "Score: "+score
}

/**
 * @desc Adds the refresh function to refresh-button with EventListener
*/
function initRefreshButton(){
  let element = document.getElementById("refresh-button");
  element.addEventListener("click", refresh);
}

/**
 * @desc Loops the 3 chests and adds the ChestClicked function as an EventListener.
*/
function initChestEventListeners() {
for(let i=1; i<=3; i++){
  let current = document.getElementById('chest'+i);
  current.addEventListener("click", chestClicked, false);
 }
}

/**
 * @desc Choses a random chest and changes the id to win to later get used as an identifier of the correct chest in chestClicked
*/
function placeTreassure(){
var winChest = document.getElementById('chest'+(Math.floor(Math.random() *3+1)));
winChest.setAttribute('id', 'win');
}

/**
 * @desc Views the image from Pexels in case of a correct guess and shows a open chest if not.
 * Line 79, 83 and 88 works to block the user from guessing at two chest during the same round.
 * Line 80 checks if the div for the chests has a class, and if not, it checks your guess otherwise nothing will run.
*/
function chestClicked(){
  var win = document.getElementById('win')
  var parentDiv = document.getElementById('chests');
  if(!parentDiv.hasAttribute('class')){
    if(event.target.id == 'win'){
      win.setAttribute('src', winningPicture);
      win.setAttribute('style', 'height:200px', 'width:300px');
      parentDiv.setAttribute('class', 'tag');
      addScore();
    } else{
      var lost = document.getElementById(event.target.id);
      lost.setAttribute('src', 'images/chest-open.png');
      parentDiv.setAttribute('class', 'tag');
   }
  }
}

/**
 * @desc Makes a XMLHttpRequest towards Pexels API to get 1 image from the API to then view at the page. 
 * To view more pictures at random you only have to change page=1
 * Also checks readyState and status to indicate any errors. 
 * @return winningPicture - the response from the API
*/
function getImageFromPexels(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=treasure+query&per_page=1&page=1', true);
  xhr.setRequestHeader('Authorization', '563492ad6f91700001000001afb0b99454cd43da9ca22caf84235907');
  xhr.addEventListener('load', function(){
  var pictures = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
     winningPicture =  pictures.photos[Math.floor(Math.random() * pictures.photos.length)].src.original; 
  }
  });
  xhr.send();
  return winningPicture;
}

/**
 * @desc Resets the game by calling these functions that reset the chests and places the treassure once again
*/
function refresh(){
removeChestEvents();
placeTreassure();
}

/**
 * @desc Resets the chests by making variables for each possible id of the chests and then check if they exist
 * If they do, they get reset to normal. If not, the winning chest gets the id that the chest should've had if not picked as the winner
 * If id=chest1 gets to be the win chest, it gets id=chest1 when this function is called.
 * Since the treassure is placed after this function is called, all chests can be chosen in a row. 
 * It also removes the class from the div with id=chests so it dosent block the user from guessing after the refresh is done.
*/
function removeChestEvents(){
  var a = document.getElementById("chest1");
  var b = document.getElementById("chest2");
  var c = document.getElementById("chest3");
  var chest1 = document.getElementById('win');
  if(a){
    a.setAttribute('src', 'images/chest-closed.png');
    a.setAttribute("hspace", "5");
  } 
  else{
  chest1.setAttribute("src", "images/chest-closed.png"); 
  chest1.setAttribute("id", "chest1");
  }
  if(b){
    b.setAttribute('src', 'images/chest-closed.png');
    b.setAttribute("hspace", "5");
  } 
  else{
  chest1.setAttribute("src", "images/chest-closed.png"); 
  chest1.setAttribute("id", "chest2");
  }
  if(c){
    c.setAttribute('src', 'images/chest-closed.png');
    c.setAttribute("hspace", "5");
  }
  else{
  chest1.setAttribute("src", "images/chest-closed.png"); 
  chest1.setAttribute("id", "chest3");
  }
  var parentDiv = document.getElementById('chests');
  parentDiv.removeAttribute('class');
}