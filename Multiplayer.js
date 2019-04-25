var SessionState = Object.freeze({
	'initialization': 'initialization',
	'inGame': 'inGame'
});

var SessionAction = Object.freeze({
	'startGame': 'startGame',
	'receivedSet' : 'receivedSet'
});

class Session{

	constructor(hostKey){
		if(hostKey) this.key = hostKey;
		else this.key = this.generateKey();

		this.userKey = this.generateKey();
		this.sessionState = SessionState.initialization;

		this.pubnub = new PubNub({
			publishKey: 'pub-c-1cfbf4f3-4f57-47eb-b09a-5dd39873601a',
			subscribeKey: 'sub-c-64b4a468-6755-11e9-9ea7-ba8f97af5780'
		});

		console.log(this);
	}

	generateKey(){
		let key1 = Math.random().toString(36).slice(2);
		let key2 = Math.random().toString(36).slice(2);

		return key1 + key2;
	}

	receiveMessage(dataPackage){

		let msg = dataPackage.message;
		let action = msg.action;

		let sender = msg.senderKey;
		let data = msg.data;

		console.log(msg);
		console.log(action);

		switch(action){

			case(SessionAction.startGame):

				//user is guest
				if(sender != this.userKey){
					let cards = data.cards;
					console.log(cards)
					let game = new Game(GameType.multiplayer,cards);
					game.startGame();
					document.game = game;
				}
				//user is host
				else{
					document.game.startGame();
				}

				this.sessionState = SessionState.inGame;

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

	sendMessage(msg){
		msg.senderKey = this.userKey;
		msg.senderName = "username";

		this.pubnub.publish({
			message: msg,
			channel: this.key
		});
	}

}