/** Game Enumerations **/

var Color = Object.freeze({
    'red': 'red',
    'blue': 'blue',
    'green': 'green'
});

var Shape = Object.freeze({
    'diamond': 'diamond',
    'oval': 'oval',
    'squiggle': 'squiggle'
});

var Shading = Object.freeze({
    'open': 'open',
    'solid': 'solid',
    'striped': 'striped'
});

var GameType = Object.freeze({
    'single': 'single',
    'multiplayerSameScreen': 'multiplayerSameScreen',
    'multiplayer': 'multiplayer'
});

//#TODO: add tags for instance variable's uses
class Game {

    constructor(gameType,cardsOrder) {
        this.selectedCards = {};

        //cards must be created and randomized
        if(!cardsOrder)
            this.cards = this.generateCards();

        //user is a guest in a multiplayer game & card order is already determined
        else 
            this.cards = this.retrieveCards(cardsOrder);


        this.usedCards = 0;
        this.visibleCardsCount = 0;
        this.visibleCards = {};
        this.sets = [];
        this.gameType = gameType
        this.cardsHighlighted = 0;

        this.isGameOver = false;

        //Contains 3 visible cards comprising a set, if they are available.
        this.hintSet = [];



   }

    //ONLY USED IN MULTIPLAYER
    //create cards array to match ordering of host
    retrieveCards(cardsOrder){
      return cardsOrder.map(function (cardID) { 
        let attributes = cardID.split('_');

        let shape = attributes[0];
        let shading = attributes[1];
        let color = attributes[2];

        let number = parseInt(attributes[3]);

        return new Card(color,shape,shading,number);

    });
  }

    //ONLY USED IN MULTIPLAYER
    //creates array of card ID's in matching order
    getCardsInOrder(){
       return this.cards.map(function (card) { return card.getID(true)});
   }

//performs starting actions to begin gameplay
startGame(){

        // //Hide Main Menu
        // document.getElementById("MainMenu").style.display = "none";

        // //Hide Multiplayer screen
        // document.getElementById("InitalizingMultiplayer").style.display = "none";

        // //Show Game
        // document.getElementById("Game").style.display = "block";

        // closeLeftMenu();

        //intialize with twelve cards
        this.addCards(12);

        //start timer
        this.toggleTimer();

    }

    // a debugging tool to reach end game quickly
    autoPlayGame (startTime) {

            let now = Math.floor((Date.now() - startTime) / 1000 );
                        //auto play code
                        if(now % 2 == 0 && now > 0){
                            if(!document.game.hintSet || document.game.hintSet.length == 0) document.game.addCards(3);
                            else {

                              let ids = document.game.hintSet.map((card) => {
                                return card.getID(true);
                 // this.performSetActions()
             })

                              document.game.performSetActions(ids);
                          }

                      }
                      else {
                        document.game.highlightSet(true);
                    }

    }

toggleTimer() {
    let shouldPlay = !this.isPaused;
  
    if(!this.timeElapsed) this.timeElapsed = 0;

    let startTime = Date.now();

    //set to 1000 milliseconds (1 second) or 100 if in autoplay mode
    let intervalInMilliseconds = document.doAutoPlayGame ? 100 : 1000;

    if (!this.timer) {
        this.timer = setInterval(()=> {
    
            if (!(document.isPaused)) {
                this.timeElapsed ++;
                document.getElementById("timer").innerText = (this.timeElapsed+"")
                if (document.doAutoPlayGame)
                    document.game.autoPlayGame(startTime);

            } else {
                startTime += intervalInMilliseconds;
            }

        }, intervalInMilliseconds);
    } else {

        clearInterval(this.timer);
        this.timer = null;
    }

    this.isPaused = !shouldPlay;

}


    //starts timer and ,if needed, pauses the timer
    startTimer(){
        let startTime = Date.now();
        //set to 1000 milliseconds (1 second) or 100 if in autoplay mode
        let intervalInMilliseconds = document.doAutoPlayGame ? 100 : 1000;
       
       // Update the count down every 1 second
       var timer = setInterval(function() {
        console.log('interval')
        if(!(document.isPaused)) {
            let now = Math.floor((Date.now() - startTime) / intervalInMilliseconds );
            this.timeElapsed = now;
            document.getElementById("timer").innerText = now
            if(document.doAutoPlayGame)
                document.game.autoPlayGame(startTime);

        }
        else{
            startTime += intervalInMilliseconds;
        }

    }, intervalInMilliseconds);

       this.timer = timer;
       
   }

   stopTimer(){
    clearInterval(this.timer);
}

   //finds set and highlights a single card or the entire set
   highlightSet(highlightEntireSet) {

    let setToHighlight = this.hintSet;

    if(!setToHighlight || setToHighlight.length == 0) return;

    //randomizes order of attributes so a single property is not favored in set algorithm
            //number,color,shape,shading
            // let attributes = this.randomize(["color", "shape", "shading", "number"]);

    //finds a set, if one is present
   // let set = this.setFinder(Object.values(this.visibleCards),attributes);



        //Return if no set is found or if cards are already highlighted
        // if (!set || this.cardsHighlighted != 0) return;

        //highlight entire set
        if (highlightEntireSet){
            setToHighlight.forEach((card) => {
                card.toggleBorder('red', false);
            });
            this.cardsHighlighted += 3;
        }

        //highlight a single card
        else {
            setToHighlight[0].toggleBorder('red', false);
            this.cardsHighlighted ++;
        }

    }

    hintSetStillAvailable(){
        if(!this.hintSet || this.hintSet.length == 0) return false;

        var cardNotInSet = true;
        this.hintSet.forEach((card) => {
            let cardID = card.getID(true);

            //card is no longer visible, so exit for loop
            if(!this.visibleCards[cardID]){
                cardNotInSet = false;
                return false;
            } 

        });

        return cardNotInSet;
    }

    findSet(){
     let attributes = this.randomize(["color", "shape", "shading", "number"]);
     let set = this.setFinder(Object.values(this.visibleCards),attributes);

     return set;
 }

    //algorithm for finding a set
    //Note: The current implementation favors the first attribute being all different, i.e. if 
    //the first attribute is color, a set of with a red, blue, & green card will be favored

    setFinder(visibleCards,attributes) {

        //base case to exit recursion
        //set not present
        if(attributes.length == 0 ) return;

        //separates cards into a dictionary with the attribute's enumeration names as keys
        //i.e. if the first attribute is 'Shape', then the keys will be a subset of ['diamond','oval',squiggle]
        // let visibleCards = Object.values(this.visibleCards);
        let separated = this.separateByAttribute(visibleCards, attributes[0]);

        //if a set is found, return the set
        //this set will always have all three values of the first attribute
        let firstAttributeDifferent = this.permuteDictionary(separated);
        if (firstAttributeDifferent) return firstAttributeDifferent;




        //remove first attribute in list
        let newAttributes = attributes.splice(1);

            //check if sets are present where the set all share the same value for the first attribute
            for (var key in separated) {

               let sameAttribute = separated[key]

               let set = this.setFinder(sameAttribute,newAttributes)
               if(set) return set;
           }

        //no set found
        return null;
    }

    //requires a dictionary with 3 keys
    //will find all combinations with a single card from each attribute pool
    permuteDictionary(dict) {
        let keys = Object.keys(dict);
        var key;

        //for a set to be possible, there must be present all 3 different options in an attribute
        if (keys.length != 3) return null;

        //possible keys in current attribute
        let key1, key2, key3;
        key1 = keys[0];
        key2 = keys[1];
        key3 = keys[2];

        //grab one card from each list and check if it is a set
        //if a set is found, return immediately and do not continue searching
        for (var i = 0; i < dict[key1].length; i++) {
            let card1 = dict[key1][i];
            for (var j = 0; j < dict[key2].length; j++) {
                let card2 = dict[key2][j];
                for (var k = 0; k < dict[key3].length; k++) {
                    let card3 = dict[key3][k];
                    let isSet = this.checkSet(card1, card2, card3);
                    if (isSet)
                        return [card1, card2, card3]
                }
            }
        }
    }

    //separates an array of cards by a given attribute into a dictionary with each key mapping to a list of cards
    separateByAttribute(arr, attribute) {

        let categories = {};

        //add each card in the array to the corresponding list, determined by the given attribute
        arr.forEach((card) => {
            let cardProperty = card[attribute];
            if (!categories[cardProperty]) categories[cardProperty] = [];

            categories[cardProperty].push(card);
        });

        return categories;
    }

    //generates all possible Set cards with a randomized ordering
    generateCards() {
        let colors = Object.keys(Color);
        let shapes = Object.keys(Shape);
        let shadings = Object.keys(Shading);
        var color, shape, shading;
        let cards = [];

        for (var i = 1; i <= 3; i++) {
            for (color in Color) {
                for (shape in Shape) {
                    for (shading in Shading) {
                        let card = new Card(color, shape, shading, i);
                        cards.push(card);
                    }
                }
            }
        }
        return this.randomize(cards);
    }

    //randomizes all elements in the provided list
    randomize(arr) {
        return arr.sort(function(a, b) {
            return 0.5 - Math.random()
        });;
    }

    //removes a card from the page
    removeCardFromScreen(cardID, shouldRemoveFromVisibleCards) {

       // this.hintSetHasBeenChecked = false;

       if (shouldRemoveFromVisibleCards)
        delete this.visibleCards[cardID];

    let div_id = cardID + "_div";
    let div = document.getElementById(div_id);

    div.parentElement.removeChild(div);
}

    //Randomizes order of cards on the screen
    shuffle() {

        //remove divs from screen
        Object.keys(this.visibleCards).forEach((cardID) => {
            this.removeCardFromScreen(cardID, false)
        })

        //Add divs back in a randomized order
        this.randomize(Object.keys(this.visibleCards)).forEach((cardID) => {
            this.addCardToScreen(this.visibleCards[cardID], true)
        })

    }

    //adds a given card to the screen
    addCardToScreen(card) {

        //adds card to dictionary of all visible cards
        this.visibleCards[card.getID(true)] = card;

        //add to cards div
        let cards = document.getElementById("Cards")
        cards.appendChild(card.getCardImage());

    }

    //adds additional cards to the screen, if possible
    addCards(numCards) {

        console.log(`add :${numCards} cards`)

        //A max of 24 cards on the screen will be imposed
        if(this.visibleCardsCount >= 24) return;

      //  this.hintSetHasBeenChecked = false;


      var count = 0;

        //add numCards worth of cards, if new cards are still available
        while (count < numCards && this.usedCards < this.cards.length) {
                console.log(count)
            let card = this.cards[this.usedCards];
            this.addCardToScreen(card, true);

            count++;
            this.usedCards++;
            this.visibleCardsCount++;
        }


        //Increase Width of Cards to accommodate added cards
        this.changeWidth();

        //change cards remaining counter
        document.getElementById("cardsRemaining").innerText = "Cards Remaining: " + (this.cards.length - this.usedCards);

        //Checks if a set is still possible, otherwise attempt to find a new set
        this.addHintSet();

    }

    //this function is called whenever cards are added or removed. A new set will only be found if the current hint set
    //is no longer available
    //this function also triggers the end of the game, if no sets are available and no more cards can be added
    addHintSet(){
     let isHintSetStillAvailable = this.hintSetStillAvailable();
     if(!isHintSetStillAvailable){

        let set = this.findSet();

        if((!set || set.length == 0) && (this.cards.length - this.usedCards == 0) ) this.isGameOver = true;

        if(this.isGameOver) this.endGame();

        this.hintSet = set;

    }

}

endGame(){
    this.stopTimer();
    document.getElementById("CardsAndMenu").style.display = "none";
    document.getElementById("End-Game-Screen").style.display = "block";

    let secondsTaken = document.getElementById("timer").innerText;
    document.getElementById("End-Game-Stats").innerText = `Congratulations on completing your Set game! You took ${secondsTaken} seconds`

    //post to high scores
    this.postHighScore(secondsTaken);

}

postHighScore(secondsTaken){



        var username = "anonymous";
        let seconds = secondsTaken;
        let timeInUTC = new Date(Date.now()).getTime();
        var avatar = avatar_urls[Math.floor(Math.random()*avatar_urls.length)];

        //user is signed in
        if(gapi.auth2.getAuthInstance().isSignedIn.get()){
            username = document.username;
            avatar = document.avatar;
        }
        //FIX SO ANONYMOUSE scores can be
        else return;

        let values = [
        [
        username,seconds,timeInUTC,avatar
        ],

        ];
        const resource = {
          values:values,
          majorDimension: "ROWS"
        };


        console.log(values);

        gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: '14icWT4vA_GirySo4aqvYCzzLytl7Xe21httwMLPDn48',
          range: 'Sheet1!A:D'
          ,
          valueInputOption:"USER_ENTERED",
          resource:resource
        }).then(function(response) {
          console.log(response)
          // var range = response.result;
          // if (range.values.length > 0) {
          //   appendPre('Name, Major:');
          //   for (i = 0; i < range.values.length; i++) {
          //     var row = range.values[i];
          //     // Print columns A and E, which correspond to indices 0 and 4.
          //     appendPre(row[0] + ', ' + row[4]);
          //   }   
          // } else {
          //   appendPre('No data found.');
          // }
        }, function(response) {
        });
}


    //adjust width of div containing cards to ensure propering centering
    changeWidth() {
        let cards = document.getElementById("Cards")

        let visibleCardsKeys = Object.keys(this.visibleCards)
        let cardKey = visibleCardsKeys[0];
        let firstCard = document.getElementById(cardKey + "_card")
        let borderCHANGE_SOON = 6;
        let cardWidth = firstCard.scrollWidth + borderCHANGE_SOON;
        let newCardsWidth = (this.visibleCardsCount / 3) * cardWidth;

        let attribute = 'width: ' + newCardsWidth + 'px';
        cards.setAttribute('style', attribute);
    }

    //add a set to mini card display of past sets
    addSetToPastSets(set){

        //check that set is valid and of length 3
        if(!set || set.length != 3) return;

        let setDiv2 = document.createElement('div');
        setDiv2.id = "set-" + this.sets.length;
        setDiv2.className = 'centered-mini-card-set';

        let miniCard1 = set[0].getMiniCard();
        let miniCard2 = set[1].getMiniCard();
        let miniCard3 = set[2].getMiniCard();

        miniCard1.style.marginLeft = '37.5px';

        setDiv2.appendChild(miniCard1);
        setDiv2.appendChild(miniCard2);
        setDiv2.appendChild(miniCard3);



        let pastSets = document.getElementById("past-sets")

        //node 0 is text so insert after that
        pastSets.insertBefore(setDiv2,pastSets.childNodes[0]);
    }

    //function triggered after a card is clicked
    addOrRemoveFromSelection(selectedCard, shouldAdd) {

        //add or remove card in selected card dict
        let id = selectedCard.getID(true);
        if (shouldAdd)
            this.selectedCards[id] = selectedCard;
        else
            delete this.selectedCards[id];

        //if 3 cards have been clicked, check if it is a proper set
        let selectedCardIds = Object.keys(this.selectedCards);
        if (selectedCardIds.length == 3) {
            let card1 = this.selectedCards[selectedCardIds[0]]
            let card2 = this.selectedCards[selectedCardIds[1]]
            let card3 = this.selectedCards[selectedCardIds[2]]
            let isSet = this.checkSet(card1, card2, card3);

            //the selected cards are indeed a set
            if (isSet) {

                //if in multiplayer, inform other players this user has found a set
                if(this.gameType == GameType.multiplayer){
                    let json = {
                        "action": SessionAction.receivedSet,
                        "data" : {
                            "cards" : selectedCardIds
                        }
                    };

                    document.session.sendMessage(json);
                }

                //see description of function
                this.performSetActions(selectedCardIds);


            } 

            //selected cards are NOT a set
            else
                //remove highlighting from selected cards 
            for (var cardID in this.selectedCards) this.selectedCards[cardID].toggleBorder();

                //empty selected cards dict
            this.selectedCards = {};
        }
    }

    //Actions performed when a set is found
    //Adds set to mini past set display, removes cards from screen, and adds new cards to the screen if needed
    performSetActions(setCardsIDs){
      var cardID;

      this.selectedCards = {};

      let setCards = [this.visibleCards[setCardsIDs[0]],this.visibleCards[setCardsIDs[1]],this.visibleCards[setCardsIDs[2]]]

         //add set to past sets
         this.sets.push(setCards);
         this.addSetToPastSets(setCards)

         //removes cards in set from screen
         setCardsIDs.forEach((cardID) => {
            this.removeCardFromScreen(cardID, true);
            this.visibleCardsCount--;
        });


                //only add cards if no extra cards are on the table
                if (this.visibleCardsCount < 12){
                    this.addCards(3);
                }
                  //adjust width
                  else {
                    this.changeWidth();
                    this.addHintSet();
                }
            }

    //In order to be a set, each individual attribute (color,shape,shading, & number) must differ or be the same
    checkSet(card1, card2, card3) {

        //Color
        let colorsMatch = (card1.color == card2.color) && (card2.color == card3.color);
        let colorsDiffer = (card1.color != card2.color) && (card1.color != card3.color) && (card2.color != card3.color);

        if (!(colorsMatch || colorsDiffer)) return false;

        //Shape
        let shapesMatch = (card1.shape == card2.shape) && (card2.shape == card3.shape);
        let shapesDiffer = (card1.shape != card2.shape) && (card1.shape != card3.shape) && (card2.shape != card3.shape);

        if (!(shapesMatch || shapesDiffer)) return false;

        //Shading
        let shadingsMatch = (card1.shading == card2.shading) && (card2.shading == card3.shading);
        let shadingsDiffer = (card1.shading != card2.shading) && (card1.shading != card3.shading) && (card2.shading != card3.shading);

        if (!(shadingsMatch || shadingsDiffer)) return false;

        //Number
        let numbersMatch = (card1.number == card2.number) && (card2.number == card3.number);
        let numbersDiffer = (card1.number != card2.number) && (card1.number != card3.number) && (card2.number != card3.number);

        if (!(numbersMatch || numbersDiffer)) return false;

        return true;
    }


}


class Card {

    constructor(color, shape, shading, number) {
        this.color = color;
        this.shape = shape;
        this.shading = shading;
        this.number = number;
        this.isSelected = false;
    }

    //returns id of card, with option to not include number, which is needed for card images
    getID(includeNumber) {
        let withoutNumber = this.shape + "_" + this.shading + "_" + this.color;
        if (!includeNumber) return withoutNumber;
        else return withoutNumber + "_" + this.number
    }

//returns the relative path to the card's corresponding shape
getImagePng() {
    return "./shapes/" + this.getID(false) + ".png";
}

//returns div of mini card
getMiniCard(){
    let id = this.getID(true);


    var miniCard = document.createElement('div');
    miniCard.id = id + " mini-card-div";
    miniCard.className = "mini-card mini-card-centered";

    let miniCardImageContainer = document.createElement('div');
    miniCardImageContainer.id = id + " mini-card-image-container";
    miniCardImageContainer.className = "image-container-mini-card";

    for(var i = 0; i < this.number; i ++){
        let img1 = document.createElement('img');
        img1.src = this.getImagePng();
        img1.width = "36";
        img1.height = "14.5";
        img1.id = "mini-card-img-"+id+"-"+i;
        miniCardImageContainer.appendChild(img1);
    }

    miniCard.appendChild(miniCardImageContainer);

    return miniCard;
}

//returns full sized div of card
//#TODO change to remove svg
getCardImage() {

    let id = this.getID(true);
    var img_div = document.createElement('div');
    img_div.id = id + "_div";


    var svg =
    `<div id="` + id + "_card" + `" class = "card">
    <div class="image-container">
    <img class="" src = "` + this.getImagePng() + `"/>` +
    (this.number >= 2 ? `<img class="" src = "` + this.getImagePng() + `"/>` : "") +
    (this.number == 3 ? `<img class="" src = "` + this.getImagePng() + `"/>` : "") +

    `</div>

    </div>`;

    img_div.innerHTML = svg;

    img_div.addEventListener("click", () => {
        this.click();
    });


    return img_div;
}


    //sets border of card to corresponding color
    //provides option to not toggle isSelected, which the set finding algorithm utilizes
    toggleBorder(color, toggleIsSelected) {
        let card = document.getElementById(this.getID(true) + "_card")
        let attribute = this.isSelected ? 'border: 3px solid black;' : 'border: 3px solid ' + color + ';';
        card.setAttribute('style', attribute);

        if (toggleIsSelected)
            this.isSelected = !this.isSelected;
    }

    //triggered when a card div is clicked
    click() {

        //check if card is currently highlighted as hint & decrement count if so
        let cardDiv = document.getElementById(this.getID(true) + "_card");
        if(cardDiv.style.border.indexOf("red") != -1) 
           document.game.cardsHighlighted += -1;

       this.toggleBorder('blue', true);

       //provide game object with clicked card & check if a set has been found, if needed
       document.game.addOrRemoveFromSelection(this, this.isSelected);

   }

}