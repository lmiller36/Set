let mainMenu = new Page('mainMenu','main-menu');

let mainMenuHTML = 
      `<div class="mainMenu centeredDiv">
         <div id="btn-container">
            <button class="btn centered" onclick="pages.game.open()">
            <i class="fa fa-user"></i> Single
            </button>
         </div>
         <div>
            <button class="btn centered" onclick="pages.multiplayerSetup.open()">
            <i class="fa fa-users"></i> Multiplayer
            </button>
         </div>
         <div>
            <button class="btn centered" onclick=" pages.tutorial.open()">
            <i class="fa fa-question-circle"></i> How to play
            </button>
         </div>
         <div>
            <button class="btn centered">
            <i class="fa fa-info-circle"></i> Contributions
            </button>
         </div>
         <div>
            <button class="btn centered" onclick="closeTab()"">
            <i class=" fa fa-times"></i> Exit
            </button>
         </div>
      </div>`;

mainMenu.addHTML(mainMenuHTML);
