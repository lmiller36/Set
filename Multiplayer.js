var SessionState = Object.freeze({
	'initialization': 'initialization',
	'inGame': 'inGame'
});

var SessionAction = Object.freeze({
	'joinGame' : 'joinGame',
	'acknowledgePlayer':'acknowledgePlayer',
	'startGame': 'startGame',
	'receivedSet' : 'receivedSet'
});

class Session{

	//#TODO: move keys to something a little more private
	constructor(username,isLeader,hostKey){
		if(hostKey) this.key = hostKey;
		else this.key = this.generateKey();

		this.isLeader = isLeader;
		this.username = username;

		this.userKey = this.generateKey();
		this.sessionState = SessionState.initialization;

		this.pubnub = new PubNub({
			publishKey: 'pub-c-1cfbf4f3-4f57-47eb-b09a-5dd39873601a',
			subscribeKey: 'sub-c-64b4a468-6755-11e9-9ea7-ba8f97af5780'
		});

		this.playersInLobby = {};
		this.playersInLobby[this.userKey] = this.username;


		console.log(this);
	}

	//generates a random alphanumberic string containing ['a-z','1-9']
	generateKey(){
		let key1 = Math.random().toString(36).slice(2);
		let key2 = Math.random().toString(36).slice(2);

		return key1 + key2;
	}

	//async method triggered when a data package is received
	receiveMessage(dataPackage){

		let msg = dataPackage.message;
		let action = msg.action;

		let sender = msg.senderKey;
		let data = msg.data;

		console.log(dataPackage);
		console.log(msg);
		console.log(action);

		switch(action){

			case(SessionAction.joinGame):

				//if user sent message, ignore
				if(sender == this.userKey) break;

				//if user is not the leader, they are done
				if(!this.isLeader) break;

				let username = msg.username;
				console.log(username)
				receivedLobbyMember(username);

				this.playersInLobby[sender] = username;
				console.log(this.playersInLobby);

				//update other players of current lobby loadout
				 let json = {
                    "lobby": this.playersInLobby,
                    "userKey": this.userKey,
                    "action": SessionAction.acknowledgePlayer
                }
                this.sendMessage(json);

				break;

			case(SessionAction.acknowledgePlayer):

				//leader already knows all players in game
				if(this.isLeader) break;

				let lobby = msg.lobby;

				for (var userkey in lobby){
					if(!this.playersInLobby[userkey]){
						this.playersInLobby[userkey] = lobby[userkey]
						receivedLobbyMember(lobby[userkey])
					}

				}

				break;
					

			case(SessionAction.startGame):

				//user is guest
				if(this.sessionState != SessionState.inGame){
					if(sender != this.userKey){
						let cards = data.cards;
						console.log(cards)
						let game = new Game(GameType.multiplayer,cards);
						game.startGame();
						document.game = game;
						pages.game.open()
					}
				//user is host
				else{
					document.game.startGame();
				}

				this.sessionState = SessionState.inGame;
			}

			break;

			case (SessionAction.receivedSet):
			console.log("receivedSet")

			//someone else found a set
			if(sender != this.userKey){
				let cards = data.cards;
				console.log(cards);
				console.log("receivedSet2")


				document.game.performSetActions(cards);
			}
			break;

		}
	}

	//subscribes a user to the proper channel
	subscribeSession(){
		this.pubnub.addListener({
			message: (msg) => {
				this.receiveMessage(msg);
			}
		})

		this.pubnub.subscribe({
			channels: [this.key]
		});
	}

	//sends a JSON msg to channel
	sendMessage(msg){
		msg.senderKey = this.userKey;
		msg.senderName = "username";

		this.pubnub.publish({
			message: msg,
			channel: this.key
		});
	}

}