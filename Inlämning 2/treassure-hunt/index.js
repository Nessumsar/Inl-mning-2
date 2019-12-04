var score = 0;
var winningPicture = "";
var random = (Math.floor(Math.random() *3+1));

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);
/*
* Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
  placeTreassure();
  getImageFromPexels();
}

function initGameUI(){
  // Call functions that creates the Game UI
  initChests();
  initScoreBoard();
  initChestEventListeners();
  initRefreshButton();
}

function initChests(){
 for(let i=1; i<4; i++){
  let chests = document.getElementById('chests');
  let image = document.createElement('img');
  image.setAttribute('src', 'images/chest-closed.png');
  image.setAttribute("hspace", "5");
  image.setAttribute('id', 'chest' + i);
  chests.appendChild(image);
 }
}

function initScoreBoard(){
  let parentDiv = document.getElementById("game-wrapper");
  let scoreDisplay = document.createElement("p");
  scoreDisplay.setAttribute("style", "text-align:center; font-size:200%; color:white");
  scoreDisplay.setAttribute("id", "score");
  scoreDisplay.textContent = "Score: "+ score;
  parentDiv.appendChild(scoreDisplay);
}

function finalScore(){
  score += 5;
  scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = "Score: "+score
}

function initRefreshButton(){
  let element = document.getElementById("refresh-button");
  element.addEventListener("click", refresh);
}

function initChestEventListeners() {
for(let i=1; i<4; i++){
  let current = document.getElementById('chest'+i);
  current.addEventListener("click", chestClicked);
  console.log("event initiated");
}
}

function placeTreassure(e){
let winChest = document.getElementById('chest'+random);
winChest.setAttribute('class', 'win');
console.log("placed in "+random);


}

/**
 * @desc opens a modal window to display a message
 * @param chestClicked msg - the message to be displayed
 * @return bool - success or failure
*/
function chestClicked(e){
  console.log("click");
  console.log(random);
  
  removeChestEvents();
  if(e == 1){
    if(random == 1){
     
    } else{
      
    }
   
   } 
   
   if(e == 2){
     if(random == 2){
       console.log("Good");
     }
   } else{
   
   }
   
   if(e.hasAttribute('class')){
     if(random == 3){
       console.log("GOOD");
   }
   
   }
  

}
//checks if the correct chest was clicked on and changes the images to open chests and a treasure if found.

function getImageFromPexels(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=treasure+query&per_page=1&page=1', true);
  xhr.setRequestHeader('Authorization', '563492ad6f91700001000001afb0b99454cd43da9ca22caf84235907');
  xhr.addEventListener('load', function(){
    var pictures = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
     var winningPicture =  pictures.photos[Math.floor(Math.random() * pictures.photos.length)].src.original;
  }
  });
  xhr.send();
  
  // make a request towards pexels API and get 1 treasure image
}

function refresh(e){
removeChestEvents();
placeTreassure();
getImageFromPexels();
}
//Restarts the game but not the score

function removeChestEvents(){
    for(i =1; i <4; i++){
      document.getElementById('chest' + i).setAttribute("src", "images/chest-closed.png"); 
      document.getElementById('chest' + i).removeAttribute("style", "width:350px; height:300px")      
    }
}
//Resets the chest to their closed state.