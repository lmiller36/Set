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
    constructor(){
       this.selectedCards = {};
       this.cards = this.generateCards();
       this.usedCards = 0;
   }

   generateCards(){
    let colors = Object.keys(Color);
    let shapes = Object.keys(Shape);
    let shadings = Object.keys(Shading);
    var color,shape,shading;
    let cards = [];

    for (var i = 1; i <= 3; i++){
        for (color in Color){
            for(shape in Shape){
                for (shading in Shading){
                    let card = new Card(color,shape,shading,i);
                    cards.push(card);
                }
            }
        }
    }
    return cards.sort(function(a, b){return 0.5 - Math.random()});;
}

addCards(numCards){
    let cards = document.getElementById("Cards")

    var count = 0;


    while(count < numCards && this.usedCards < this.cards.length){
        let card = game.cards[this.usedCards];
        cards.appendChild(card.getCardImage());
        count++;
        this.usedCards++;
    }


    game.usedCards += numCards;
}

addOrRemoveFromSelection(selectedCard,shouldAdd){

    let id = selectedCard.getID(true);
    if(shouldAdd)
        this.selectedCards[id] = selectedCard;
    else
       delete this.selectedCards[id]; 

   if(Object.keys(this.selectedCards).length == 3){
    let isSet = this.checkSet();
    if(isSet){
        var cardID;
        for(cardID in this.selectedCards){
            //let card = this.selectedCards[cardID];
            let div_id = cardID+"_div";
            let div = document.getElementById(div_id);
            div.parentElement.removeChild(div);
        }

        this.addCards(3);

    }
    else
     for(var cardID in this.selectedCards) this.selectedCards[cardID].toggleBorder();


        this.selectedCards = {};


}
}

//In order to be a set, each attribute (color,shape,shading, & number) must differ or be the same
checkSet(){
    let cardIds = Object.keys(this.selectedCards);
    let card1 = this.selectedCards[cardIds[0]]
    let card2 = this.selectedCards[cardIds[1]]
    let card3 = this.selectedCards[cardIds[2]]

    console.log(card1);
    console.log(card2);
    console.log(card3);

    //Color
    let colorsMatch = (card1.color == card2.color) && (card2.color == card3.color);
    let colorsDiffer = (card1.color != card2.color) && (card1.color != card3.color) && (card2.color != card3.color);

    if(!(colorsMatch || colorsDiffer)) return false;

    //Shape
    let shapesMatch = (card1.shape == card2.shape) && (card2.shape == card3.shape);
    let shapesDiffer = (card1.shape != card2.shape) && (card1.shape != card3.shape) && (card2.shape != card3.shape);

    if(!(shapesMatch || shapesDiffer)) return false;


    //Shading
    let shadingsMatch = (card1.shading == card2.shading) && (card2.shading == card3.shading);
    let shadingsDiffer = (card1.shading != card2.shading) && (card1.shading != card3.shading) && (card2.shading != card3.shading);

    if(!(shadingsMatch || shadingsDiffer)) return false;

    //Number
    let numbersMatch = (card1.number == card2.number) && (card2.number == card3.number);
    let numbersDiffer = (card1.number != card2.number) && (card1.number != card3.number) && (card2.number != card3.number);

    if(!(numbersMatch || numbersDiffer)) return false;

    return true;
}


}

class Card {

    constructor(color, shape, shading, number,addOrRemoveFromSelection) {
        this.color = color;
        this.shape = shape;
        this.shading = shading;
        this.number = number;
        this.isSelected = false;
        this.addOrRemoveFromSelection = addOrRemoveFromSelection;
    }

    getID(includeNumber){
        let withoutNumber = this.shape + "_" + this.shading + "_"+this.color;
        if(!includeNumber) return withoutNumber;
        else return withoutNumber + "_"+this.number
    } 

getImagePng(){
    return "./shapes/"+this.getID(false) + ".png";
}

getCardImage(){

    let id = this.getID(true);
    var img_div = document.createElement('div');
    img_div.id = id+"_div";
    img_div.class = "card-div";
    //img_div.src = this.getImagePng();




    var svg = 
    `<div id="`+id+"_card"+`" class = "card">
    <div class="image-container">
    <img class="" src = "`+this.getImagePng()+`"/>`
    +
    (this.number >= 2 ? `<img class="" src = "`+this.getImagePng()+`"/>` :"")
    +
    (this.number == 3 ? `<img class="" src = "`+this.getImagePng()+`"/>` :"")
    +

    `</div>

    </div>`;

    img_div.innerHTML = svg;

    img_div.addEventListener("click", () => {this.click();});


    return img_div;
}

toggleBorder(){
 let card = document.getElementById(this.getID(true)+"_card")
   // card.style.background = "red;";
   let attribute = this.isSelected ? 'border: 3px solid black;' : 'border: 3px solid blue;';
   card.setAttribute('style',attribute);

   this.isSelected = !this.isSelected;
}

click() {
    this.toggleBorder();
    document.game.addOrRemoveFromSelection(this,this.isSelected);

}

}