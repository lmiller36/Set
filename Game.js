let game = new Page('game','game');

let gameHTML = 
`
<div class="game">
   <div>
      <button class="w3-button w3-teal w3-xlarge w3-left" onclick="openLeftMenu()">
      <i class="fa fa-bars"></i> Menu
      </button>
   </div>
   <div id="leftMenu" class="w3-sidebar w3-bar-block w3-black w3-xxlarge w3-animate-left" style="display:none; width:300px;">
      <button onclick="closeLeftMenu()" class="w3-bar-item w3-button w3-large">Close &times;</button>
      <a href="#" onclick="pages.game.destroy()" class="w3-bar-item w3-button">
      <i class="fa fa-home" title="Main Menu"> Main Menu </i>
      </a>
      <a href="#" onclick="hideSets()" class="w3-bar-item w3-button">
      <i class="fa fa-minus-square-o"> Hide Sets </i>
      </a>
      <a href="#" class="w3-bar-item w3-button">
      <i class="fa fa-envelope"></i>
      </a>
      <a href="#" class="w3-bar-item w3-button">
      <i class="fa fa-globe"></i>
      </a>
      <a href="#" class="w3-bar-item w3-button">
      <i class="fa fa-trash"></i>
      </a>
      <a href="#" onclick="toggleOffline()" class="w3-bar-item w3-button">
      <i id="offline-icon" class="fa fa-square-o"> Toggle Offline </i>
      </a>
   </div>
   <div id="past-sets-wrapper" class="past-sets">
      <p class="past-sets-text"> Past Sets </p>
      <div id="past-sets"></div>
   </div>
   <div id="CardsAndMenu" class="centeredDiv">
      <div id='page'>
         <!-- style='width: 600px' -->
         <h1 id="cardsRemaining" style=' font-size:42px; width:fit-content; width:-webkit-fit-content; width:-moz-fit-content;'></h1>
         <h1 id="timer" style=' font-size:42px; width:fit-content; width:-webkit-fit-content; width:-moz-fit-content;'>0</h1>
      </div>
      <div class="w3-bar w3-light-grey w3-border centered w3-xxlarge" style="width:100%">
         <div id="offlineMenu" style="display: none;" class="">
            <button onclick="addCards()" class="w3-bar-item w3-button">
            Add cards
            </button>
            <button onclick="pages.help.open()" class="w3-bar-item w3-button">
            Help
            </button>
            <button onclick="showSet()" class="w3-bar-item w3-button">
            Show Set
            </button>
            <button onclick="shuffleCards()" class="w3-bar-item w3-button">
            Shuffle
            </button>
            <button onclick="giveHint()" class="w3-bar-item w3-button">
            Hint
            </button>
            <button onclick="pause()" class="w3-bar-item w3-button">
            Pause
            </button>
         </div>
         <div id="onlineMenu">
            <a href="#" onclick="addCards()" class="w3-bar-item w3-button">
            <i class="fa fa-plus" title="Add 3 cards"></i>
            </a>
            <a href="#" onclick ="pages.tutorial.open()" class="w3-bar-item w3-button">
            <i class="fa fa-question-circle" title="Help"></i>
            </a>
            <a href="#" class="w3-bar-item w3-button" onclick="showSet()">
            <i class="fa fa-search" title="Show Set"></i>
            </a>
            <a href="#" onclick="shuffleCards()" class="w3-bar-item w3-button">
            <i class="fa fa-random" title="Shuffle cards"></i>
            </a>
            <a href="#" onclick="giveHint()" class="w3-bar-item w3-button">
            <i class="fa fa-lightbulb-o" title="Hint"></i>
            </a>
            <a href="#" onclick="pause()" class="w3-bar-item w3-button">
            <i id="pauseIcon" class="fa fa-pause" title="Hint"></i>
            </a>
         </div>
      </div>
      <div id="Cards" class="cards" /></div>
   </div>
   <div id = "End-Game-Screen" class = "centeredDiv end-game-style" style="display:none;">
      <p id = "End-Game-Stats"></p>
      <div id="btn-container">
         <button class="btn centered" onclick="pages.game.close()">
         <i class="fa fa-home"> Main Menu </i>
         </button>
      </div>
   </div>
</div>
`;

game.addHTML(gameHTML);

game.show = function (){

	closeLeftMenu();

	document.getElementById("game").style.display = "block";
	document.getElementById("End-Game-Screen").style.display = "none";
	document.getElementById("CardsAndMenu").style.display = null;

    //Game has not been initalized
    if(!document.game)
    	createGame();

    //Game is created, so unpause timer
    else
    	document.game.toggleTimer();

	
};

//removes game from screen & past sets, clears game data
game.hide = function (){

    //Hide Game
    document.getElementById("game").style.display = "none";

    //stop timer
    document.game.toggleTimer();
};

game.destroy = function () {

    //Remove Past Sets
    let pastSets = document.getElementById("past-sets");
    removeAllChildren(pastSets);

    //Remove any leftover cards
    let leftoverCards = document.getElementById("Cards");
    removeAllChildren(leftoverCards);

    //reset timer on screen
    document.getElementById("timer").innerText = "0"

    game.close();

    //Destroy game
    document.game = null;
}

//opens in-game menu
function openLeftMenu() {
    document.getElementById("leftMenu").style.display = "block";
}

//closes in-game menu
function closeLeftMenu() {
    document.getElementById("leftMenu").style.display = "none";
}

function createGame() {
	console.log('crate');
	let game = new Game(GameType.single);
    document.game = game;

    game.startGame();
}