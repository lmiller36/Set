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

class Game {
    constructor() {
        this.selectedCards = {};
        this.cards = this.generateCards();
        this.usedCards = 0;
        this.visibleCardsCount = 0;
        this.visibleCards = {};
        this.sets = [];

        // this.startTime = ;
        // console.log(this.startTime);

        //intialize with twelve cards
        this.addCards(12);

        this.startTimer(Date.now());
    }

    startTimer(startTime){
       // Update the count down every 1 second
       var x = setInterval(function() {
        let now = Math.floor((Date.now() - startTime) / 1000 );
        document.getElementById("timer").innerText = now

    }, 1000);
   }

   highlightSet(highlightEntireSet) {
    let attributes = this.randomize(["color", "shape", "shading", "number"]);


    let set = this.setFinder(attributes);

        //Return if no set is found
        if (!set) return;

        //highlight entire set
        if (highlightEntireSet)
            set.forEach((card) => {
                card.toggleBorder('red', false);
            });

        //highlight a single card
        else
            set[0].toggleBorder('pink', false);
    }

    setFinder(attributes) {
        let visibleCards = Object.values(this.visibleCards);
        let separated = this.separateByAttribute(visibleCards, attributes[0]);
        let firstAttributeDifferent = this.permuteDictionary(separated);

        if (firstAttributeDifferent) return firstAttributeDifferent;

        for (var key in separated) {
            let sameAttribute = separated[key]
            let sameAttributeSeparated = this.separateByAttribute(sameAttribute, attributes[1]);

            let firstAttributeSame = this.permuteDictionary(sameAttributeSeparated);
            if (firstAttributeSame) return firstAttributeSame;
        }

        //no set found
        return null;
    }

    permuteDictionary(dict) {
        let keys = Object.keys(dict);
        var key;

        //for a set to be possible, there must be present all 3 different options in an attribute
        if (keys.length != 3) return null;

        let key1, key2, key3;
        key1 = keys[0];
        key2 = keys[1];
        key3 = keys[2];

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

    separateByAttribute(arr, attribute) {
        let category1 = [];
        let category2 = [];
        let category3 = [];

        let categories = [];

        arr.forEach((card) => {
            let cardProperty = card[attribute];
            if (!categories[cardProperty]) categories[cardProperty] = [];

            categories[cardProperty].push(card);
        });

        return categories;
    }

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

    randomize(arr) {
        return arr.sort(function(a, b) {
            return 0.5 - Math.random()
        });;
    }

    removeCardFromScreen(cardID, shouldRemoveFromVisibleCards) {
        if (shouldRemoveFromVisibleCards)
            delete this.visibleCards[cardID];

        //let card = this.selectedCards[cardID];
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



    addCardToScreen(card, shouldAddCardToVisibleCards) {

        if (shouldAddCardToVisibleCards)
            this.visibleCards[card.getID(true)] = card;

        let cards = document.getElementById("Cards")
        cards.appendChild(card.getCardImage());



    }

    addCards(numCards) {

        //A max of 24 cards on the screen will be imposed
        if(this.visibleCardsCount >= 24) return;

        var count = 0;


        while (count < numCards && this.usedCards < this.cards.length) {
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

    }

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

    addSetToPastSets(set){

        if(!set || set.length != 3) return;
        // let setDiv = 
        // + set[0].getCardImage()
        // + set[1].getCardImage()
        // + set[2].getCardImage()

        let setDiv2 = document.createElement('div');
        setDiv2.id = "set-" + this.sets.length;
        setDiv2.className = 'centered-mini-card-set';

        let miniCard1 = set[0].getMiniCard();
        let miniCard2 = set[1].getMiniCard();
        let miniCard3 = set[2].getMiniCard();


        setDiv2.appendChild(miniCard1);
        setDiv2.appendChild(miniCard2);
        setDiv2.appendChild(miniCard3);


        // let miniCard1 = document.createElement('div');
        // miniCard1.id = "";
        // miniCard1.className = "mini-card mini-card-centered";

        // setDiv2.innerHTML = `
        //         <div id="" class="mini-card mini-card-centered">
        //             <div class="image-container-mini-card">
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //             </div>
        //         </div>
        //         <div id="" class="mini-card mini-card-centered">
        //             <div class="image-container-mini-card">
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //             </div>
        //         </div>
        //         <div id="" class="mini-card mini-card-centered">
        //             <div class="image-container-mini-card">
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //             </div>
        //         </div>
        // `;

        // let setDiv = `          
        // <div id = "set1" class = "centered-mini-card-set">
        //         <div id="" class="mini-card mini-card-centered">
        //             <div class="image-container-mini-card">
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //             </div>
        //         </div>
        //         <div id="" class="mini-card mini-card-centered">
        //             <div class="image-container-mini-card">
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //             </div>
        //         </div>
        //         <div id="" class="mini-card mini-card-centered">
        //             <div class="image-container-mini-card">
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //                 <img class="" src="http://smart-games.org/images/diamond_open_blue.png" width = "36" height = "14.5"/>
        //             </div>
        //         </div>
        //     </div>`;


        // var img_div = document.createElement('div');
        // img_div.id = "set-" + this.sets.length;
        // img_div.className = "centered-mini-card-set";

        // //add set cards
        // img_div.appendChild(set[0].getMiniCard())
        // img_div.appendChild(set[1].getMiniCard())
        // img_div.appendChild(set[1].getMiniCard())


        // console.log(set);
        // console.log(img_div)


        let pastSets = document.getElementById("Past Sets")
        pastSets.appendChild(setDiv2)

        // pastSets.appendChild(img_div);
    }

    addOrRemoveFromSelection(selectedCard, shouldAdd) {

        let id = selectedCard.getID(true);
        if (shouldAdd)
            this.selectedCards[id] = selectedCard;
        else
            delete this.selectedCards[id];

        if (Object.keys(this.selectedCards).length == 3) {
            let cardIds = Object.keys(this.selectedCards);
            let card1 = this.selectedCards[cardIds[0]]
            let card2 = this.selectedCards[cardIds[1]]
            let card3 = this.selectedCards[cardIds[2]]
            let isSet = this.checkSet(card1, card2, card3);
            if (isSet | true) {
                var cardID;
                for (cardID in this.selectedCards) {

                    this.removeCardFromScreen(cardID, true);
                    this.visibleCardsCount--;

                }

                //only add cards if no extra cards are on the table
                if (this.visibleCardsCount < 12)
                    this.addCards(3);

                //readjust width
                this.changeWidth();

                //add set to past sets
                let set = Object.values(this.selectedCards);
                this.sets.push(set);
                this.addSetToPastSets(set)


            } else
            for (var cardID in this.selectedCards) this.selectedCards[cardID].toggleBorder();


                this.selectedCards = {};


        }
    }

    //In order to be a set, each attribute (color,shape,shading, & number) must differ or be the same
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

    getID(includeNumber) {
        let withoutNumber = this.shape + "_" + this.shading + "_" + this.color;
        if (!includeNumber) return withoutNumber;
        else return withoutNumber + "_" + this.number
    }

getImagePng() {
    return "./shapes/" + this.getID(false) + ".png";
}

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

getCardImage() {

    let id = this.getID(true);
    var img_div = document.createElement('div');
    img_div.id = id + "_div";
    // img_div.className = "card-div";
        //img_div.src = this.getImagePng();




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


    toggleBorder(color, toggleIsSelected) {
        let card = document.getElementById(this.getID(true) + "_card")
        // card.style.background = "red;";
        let attribute = this.isSelected ? 'border: 3px solid black;' : 'border: 3px solid ' + color + ';';
        card.setAttribute('style', attribute);

        if (toggleIsSelected)
            this.isSelected = !this.isSelected;
    }

    click() {
        this.toggleBorder('blue', true);
        document.game.addOrRemoveFromSelection(this, this.isSelected);

    }

}