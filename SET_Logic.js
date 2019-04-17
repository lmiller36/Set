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
    <img class="" src = "`+this.getImagePng()+`"/>
    <img class="" src = "`+this.getImagePng()+`"/>
    <img class="" src = "`+this.getImagePng()+`"/>


    </div>

    </div>`;

        //adjust picture location
        img_div.innerHTML = svg
        return img_div;
    }

}