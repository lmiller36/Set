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
       this.cards = this.generateCards();
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
    return cards;
}

}

class Card {

    constructor(color, shape, shading, number) {
        this.color = color;
        this.shape = shape;
        this.shading = shading;
        this.number = number;
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

        //adjust picture location
        img_div.innerHTML = svg
        return img_div;
    }

}