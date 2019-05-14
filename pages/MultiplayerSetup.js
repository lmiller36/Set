let multiplayerSetup = new Page('multiplayerSetup','multiplayer-setup');

let multiplayerSetupHTML = 
`     
<div class=" w3-xxlarge">
   <a href="#" onclick="pages.multiplayerSetup.close()" class="w3-black w3-bar-item w3-button">
   <i class="fa fa-home" title="Main Menu"> Main Menu </i>
   </a>
</div>
<div class="multiplayer-options-container">
   <div class="multiplayer-option">
      <h2>Split Screen</h2>
      <i class="fa fa-arrow-right"></i>
      <p>same device</p>
      <div class="pic"></div>
      <ul>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
      </ul>
      <button onclick="localGame()">
      </button>
   </div>
   <div class="multiplayer-option multiplayer-option2">
      <h2>PvP Online</h2>
      <i class="fa fa-arrow-right"></i>
      <p> 2+ devices</p>
      <div class="pic"></div>
      <ul>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
      </ul>
      <button onclick="onlineGame()">
      </button>
   </div>
   <br/>
   <br/>

   <div id = "online-game" class = "online-game">
   <div id = "username-container">
    <label class = "radio-button-label">Enter username</label>
     <input onchange = "submitUsername()" id = "username" type="text" name="username" value="" placeholder="Joe Schmoe">
     <br/>  
    </div>

    <div id = "lobby-loading" style = "display:none;">
      <div class="loader"></div>
      <div id = "lobby">
         <h2 class = "lobby-header">Players in Lobby</h2>
         <ul id = "lobby-list" class = "lobby-list">
         </ul>
      </div>
          <div id = "multiplayer-setup-radio-buttons" style = "margin-right:50px;">
         <input onclick = "toggleHostParticipant()" type = "radio" name="hostParticipant" value="host" class="form-radio"></input>
         <label class = "radio-button-label" for="radio-one" style = "margin-right:50px;">Host</label>
         <input onclick = "toggleHostParticipant()" type = "radio" name="hostParticipant" value="participant" class="form-radio"></input>
         <label class = "radio-button-label" for="radio-one">Join</label>
      </div>
    </div>

      <br/>
      <div id = "link-stuff" style = "display:none;">
         <label id = "link-text" class = "radio-button-label">Enter Link</label>
         <div>
            <input id = "link" type="text" name="link" value="">
            <a id ="copy-clipboard" href="#" onclick ="copyLink()" class="w3-bar-item w3-button">
            <i class="fa fa-clipboard" title="Copy"></i>
            </a>
            <a id = "submit-link" href="#" onclick ="joinHost()" class="w3-bar-item w3-button">
            <i class="fa fa-paper-plane" title="Join"></i>
            </a>
         </div>
      </div>
   </div>
   <br/>
   <br/>
   <div id = "multiplayer-setup-start-game-button" class="w3-xxlarge start-game-button" style = " display: none;">
      <a href="#" onclick="" class="w3-black w3-bar-item w3-button">
      <i id = "multiplayer-setup-start-game-icon" class="fa fa-play-circle" title="Start Game"></i>
      </a>
   </div>
</div>
`;

multiplayerSetup.addHTML(multiplayerSetupHTML);


function showStartGameButton(text){
    document.getElementById("multiplayer-setup-start-game-icon").innerText = text;
     document.getElementById("multiplayer-setup-start-game-button").style.display = "block";
}

function getUsername() {
    return document.getElementById("username").value;;
}

function submitUsername() {
    let username = document.getElementById("username").value;
    console.log("change")
    document.getElementById("username-container").style.display = "none";
        document.getElementById("lobby-loading").style.display = "block";

        receivedLobbyMember(username)

}

function localGame(){
    let startMsg = " Local Game "
    document.getElementById("online-game").style.display = "none";
    showStartGameButton(startMsg);
}

function onlineGame(){
    let startMsg = " Online Game "
    document.getElementById("online-game").style.display = "flex";
    showStartGameButton(startMsg);
}

function copyLink(){
 var copyText = document.getElementById("link");
  copyText.select();
  document.execCommand("copy");
  alert("Copied game link to clipboard" );

}

function toggleHostParticipant(){
    let isHost = document.querySelector('input[name="hostParticipant"]:checked').value == "host";
    console.log(isHost)

    document.getElementById("link-stuff").style.display = "block";
    document.isHost = isHost;

    if(isHost) initializeAsHost();
    else initalizeAsParticipant();

}

function receivedLobbyMember(participantName){
// <li class = "lobby-list-item"><a class = "lobby-list-link" href="#">Lorne</a></li>
var listItem = document.createElement('li');
listItem.className = "lobby-list-item";

var link = document.createElement('a');
link.className = "lobby-list-link";
link.href = "#";
link.innerText = participantName;

listItem.appendChild(link);

   let lobby = document.getElementById("lobby-list")
    lobby.appendChild(listItem);

}


// <script type="text/javascript">
            //switch menu to buttons if offline (icons currently not available offline)
            
            /** Multiplayer Functions **/
            
            //creates a session with unique link to enter same lobby as host
            function initializeAsHost() {

                //initialize new session
                let session = new Session(getUsername(),true);
                document.session = session;

                //subscribe to session to receives updates in game flow
                session.subscribeSession();

                //show unique link
                let link = document.getElementById("link")
                link.value = session.key

                //change instructions to host setting
                document.getElementById("link-text").innerText = "Send link"

                //change icon next to text
                document.getElementById("submit-link").style.display = "none";
                document.getElementById("copy-clipboard").style.display = "-webkit-inline-box";

            }
            
            //removes link if present and provides instructions to join host
            function initalizeAsParticipant() {

                //clears link field
                let link = document.getElementById("link")
                link.value = ""

                //change instructions to guest setting
                document.getElementById("link-text").innerText = "Enter link"

                //change icon next to text
                document.getElementById("submit-link").style.display = "-webkit-inline-box";
                document.getElementById("copy-clipboard").style.display = "none";


            }
            
            //attempts to join host & sends message if the host's lobby can be joined
            //#TODO check if session available
            function joinHost() {

                //get session ID
                let link = document.getElementById("link")
                let key = link.value;

                //create session in same lobby as host
                let session = new Session(getUsername(),false,key);
                document.session = session;

                //subscribes to receive updates from other player(s) in the lobby
                session.subscribeSession();

                //sends player's unique identifier to other players
                //#TODO pubnub may already have unique key names & can possibly delete
                let json = {
                    "username": getUsername(),
                    "userKey": session.keyName,
                    "action": SessionAction.joinGame
                }
                session.sendMessage(json);


            }
            
            //Host creates a new game & sends game data to other player's in lobby
            function startGame() {

                //create new game
                let game = new Game(GameType.multiplayer);
                document.game = game;

                //close left menu (opens on switch to new game if not turned off)
                closeLeftMenu();

                //sends game data package
                let json = {
                    "action": SessionAction.startGame,
                    "data": {
                        "cards": game.getCardsInOrder()
                    }
                };
                document.session.sendMessage(json);
            }
            
//         </script>