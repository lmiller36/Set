let tutorial = new Page('tutorial','tutorial');

let tutorialHTML = 
`
<div id="" class=" rules">
   <span class="title-help-screen centered-help-screen"> Instructions for Set
   </span>
   <br/><br/><br/><br/><br/><br/><br/><br/><br/>
   <span class="title-help-screen centered-help-screen"> The object of the game is to identify a set of 3 cards from the 12 cards on the table. 
   </span>
   <div class = "">
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <span class="title-help-screen centered-help-screen"> Each card has 4 features:
      </span>
      <div id = "Attributes" class="container">
         <div id = "Shape" class="step">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 1
                  </div>
                  <div class="points center">
                     Part A
                  </div>
               </div>
               <div class="more-info">
                  <h1>Shape</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">Oval</div>
                        <img class="value" src="./shapes/oval_open_blue.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Squiggle</div>
                        <img class="value" src="./shapes/squiggle_open_blue.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Diamond</div>
                        <img class="value" src="./shapes/diamond_open_blue.png" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Shape</h1>
               <p>In Set there are 3 different types of shapes: </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "Color" class="step blue">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 1
                  </div>
                  <div class="points center">
                     Part B
                  </div>
               </div>
               <div class="more-info">
                  <h1>Color</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">Red</div>
                        <img class="value" src="./shapes/squiggle_solid_red.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Blue</div>
                        <img class="value" src="./shapes/squiggle_solid_blue.png" />
                     </div>
                     <div class = "item">
                        <div class="title"> Green </div>
                        <img class="value" src="./shapes/squiggle_solid_green.png" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Color</h1>
               <p>Each card can be one of 3 colors: </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "Shading" class="step lime">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 1
                  </div>
                  <div class="points center">
                     Part C
                  </div>
               </div>
               <div class="more-info">
                  <h1>Shading</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">Open</div>
                        <img class="value" src="./shapes/oval_open_red.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Striped</div>
                        <img class="value" src="./shapes/oval_striped_red.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Solid</div>
                        <img class="value" src="./shapes/oval_solid_red.png" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Shading</h1>
               <p>Similarly, there are 3 different shadings: </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "Number" class="step orange">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 1
                  </div>
                  <div class="points center">
                     Part D
                  </div>
               </div>
               <div class="more-info">
                  <h1>Number</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">One</div>
                        <img class="value" src="./shapes/oval_open_green.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Two</div>
                        <img class="value" src="./shapes/oval_striped_green.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Three</div>
                        <img class="value" src="./shapes/oval_solid_green.png" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Number</h1>
               <p>Each card will have 1, 2, or 3 items: </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <span class="title-help-screen centered-help-screen"> How to play
      </span>
      <div id = "Card-Definition" class="container">
         <div id = "Set-Definition-Part-A" class="step">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part A
                  </div>
               </div>
               <div class="more-info">
                  <h1>Example Card</h1>
                  <div class="stats">
                     <div class = "item">
                        <br/>
                        <!--                <div class="title">
                           This card has 2 striped green diamonds
                           </div> -->
                        <div id ="Set-Definition-Part-A-card" class="more example-cards"></div>
                        <script>
                           let set_definition_card = new Card(Color.green,Shape.diamond,Shading.striped,2);
                           var miniCard = set_definition_card.getMiniCard();
                           miniCard.style.backgroundColor = "#FFFFFF";
                           
                           document.getElementById("Set-Definition-Part-A-card").appendChild(miniCard);
                           
                        </script>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Example Card</h1>
               <p>Each card will be comprised of some configuration of Shape, Color, Shading, & Number </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "Set-Definition-Part-B" class="step blue">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part B
                  </div>
               </div>
               <div class="more-info">
                  <h1>Set Definition</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">
                           The Shape, Color, Shading, & Number, must contain all three options or a singular option.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Set Definition</h1>
               <p>A set will contain three cards, but not any three cards are a set! </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "Set-Definition-Part-C" class="step lime">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part C
                  </div>
               </div>
               <div class="more-info">
                  <h1>Shading</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">Open</div>
                        <img class="value" src="./shapes/oval_open_green.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Striped</div>
                        <img class="value" src="./shapes/oval_striped_green.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Solid</div>
                        <img class="value" src="./shapes/oval_solid_green.png" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Shading</h1>
               <p>Each individual attribute, i.e. Shape, Color, Shading, & Number, must contain all three options or a singular option.  </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <!--                <div id = "Set-Definition-Part-D" class="step orange">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part D
                  </div>
               </div>
               <div class="more-info">
                  <h1>Fun Fact</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">There are 81 Set Cards</div>
                     </div>
                     <div class = "item">
                        <div class="title">In Set, there are 1080 distinct sets</div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Fun Facts</h1>
               <p>Let's see if can answer these trivia questions about Set! How many cards are there in Set? How many distinct sets are in Set?</p>
               <span class="more">Mouse over the step for more info</span>
            </div>
            </div> -->
         <br/>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <span class="title-help-screen centered-help-screen"> What is a set?
      </span>
      <div id = "Set-Definition" class="container">
         <div id = "Set-Definition-Part-A" class="step">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part A
                  </div>
               </div>
               <div class="more-info">
                  <h1>Example Card</h1>
                  <div class="stats">
                     <div class = "item">
                        <br/>
                        <!--                <div class="title">
                           This card has 2 striped green diamonds
                           </div> -->
                        <div id ="Set-Definition-Part-A-card" class="more example-cards"></div>
                        <script>
                           let set_definition_card = new Card(Color.green,Shape.diamond,Shading.striped,2);
                           var miniCard = set_definition_card.getMiniCard();
                           miniCard.style.backgroundColor = "#FFFFFF";
                           
                           document.getElementById("Set-Definition-Part-A-card").appendChild(miniCard);
                           
                        </script>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Example Card</h1>
               <p>Each card will be comprised of some configuration of Shape, Color, Shading, & Number </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "Set-Definition-Part-B" class="step blue">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part B
                  </div>
               </div>
               <div class="more-info">
                  <h1>Set Definition</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">
                           The Shape, Color, Shading, & Number, must contain all three options or a singular option.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Set Definition</h1>
               <p>A set will contain three cards, but not any three cards are a set! </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "Set-Definition-Part-C" class="step lime">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part C
                  </div>
               </div>
               <div class="more-info">
                  <h1>Shading</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">Open</div>
                        <img class="value" src="./shapes/oval_open_green.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Striped</div>
                        <img class="value" src="./shapes/oval_striped_green.png" />
                     </div>
                     <div class = "item">
                        <div class="title">Solid</div>
                        <img class="value" src="./shapes/oval_solid_green.png" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Shading</h1>
               <p>Each individual attribute, i.e. Shape, Color, Shading, & Number, must contain all three options or a singular option.  </p>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <!--                <div id = "Set-Definition-Part-D" class="step orange">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 2
                  </div>
                  <div class="points center">
                     Part D
                  </div>
               </div>
               <div class="more-info">
                  <h1>Fun Fact</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">There are 81 Set Cards</div>
                     </div>
                     <div class = "item">
                        <div class="title">In Set, there are 1080 distinct sets</div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Fun Facts</h1>
               <p>Let's see if can answer these trivia questions about Set! How many cards are there in Set? How many distinct sets are in Set?</p>
               <span class="more">Mouse over the step for more info</span>
            </div>
            </div> -->
         <br/>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <span class="title-help-screen centered-help-screen"> Let's see if you can find sets!
      </span>
      <div id = "Set-Examples" class="container">
         <div id = "example-1" class="step">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 3
                  </div>
                  <div class="points center">
                     Part A
                  </div>
               </div>
               <div class="more-info">
                  <h1>Yes!</h1>
                  <div id = "example1-answer" class="stats">
                     <div class = "item">
                        <div class="title">Shape</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Shading</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Color</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Number</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Is this a set?</h1>
               <div id ="example1-cards" class="more example-cards"></div>
               <script>
                  let example1_card1 = new Card(Color.red,Shape.oval,Shading.striped,3);
                  let example1_card2 = new Card(Color.blue,Shape.oval,Shading.striped,2);
                  let example1_card3 = new Card(Color.green,Shape.oval,Shading.striped,1);
                  document.getElementById("example1-cards").appendChild(example1_card1.getMiniCard());
                  document.getElementById("example1-cards").appendChild(example1_card2.getMiniCard());
                  document.getElementById("example1-cards").appendChild(example1_card3.getMiniCard());
               </script>
            </div>
         </div>
         <div id = "example-2" class="step blue">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 3
                  </div>
                  <div class="points center">
                     Part B
                  </div>
               </div>
               <div class="more-info">
                  <h1>No!</h1>
                  <div id = "example2-answer" class="stats">
                     <div class = "item">
                        <div class="title">Shape</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Shading</div>
                        <i class="fa fa-minus-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Color</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Number</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Is this a set?</h1>
               <div id ="example2-cards" class="more example-cards"></div>
               <script>
                  let example2_card1 = new Card(Color.blue,Shape.oval,Shading.striped,1);
                  let example2_card2 = new Card(Color.blue,Shape.squiggle,Shading.open,1);
                  let example2_card3 = new Card(Color.blue,Shape.diamond,Shading.striped,1);
                  document.getElementById("example2-cards").appendChild(example2_card1.getMiniCard());
                  document.getElementById("example2-cards").appendChild(example2_card2.getMiniCard());
                  document.getElementById("example2-cards").appendChild(example2_card3.getMiniCard());
               </script>
            </div>
         </div>
         <div id = "example-3" class="step lime">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 3
                  </div>
                  <div class="points center">
                     Part C
                  </div>
               </div>
               <div class="more-info">
                  <h1>Yes!</h1>
                  <div id = "example2-answer" class="stats">
                     <div class = "item">
                        <div class="title">Shape</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Shading</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Color</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Number</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Is this a set?</h1>
               <div id ="example3-cards" class="more example-cards"></div>
               <script>
                  let example3_card1 = new Card(Color.red,Shape.oval,Shading.solid,3);
                  let example3_card2 = new Card(Color.red,Shape.squiggle,Shading.open,3);
                  let example3_card3 = new Card(Color.red,Shape.diamond,Shading.striped,3);
                  document.getElementById("example3-cards").appendChild(example3_card1.getMiniCard());
                  document.getElementById("example3-cards").appendChild(example3_card2.getMiniCard());
                  document.getElementById("example3-cards").appendChild(example3_card3.getMiniCard());
               </script>
            </div>
         </div>
         <div id = "example-4" class="step yellow">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 3
                  </div>
                  <div class="points center">
                     Part D
                  </div>
               </div>
               <div class="more-info">
                  <h1>No!</h1>
                  <div id = "example2-answer" class="stats">
                     <div class = "item">
                        <div class="title">Shape</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Shading</div>
                        <i class="fa fa-check-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Color</div>
                        <i class="fa fa-minus-square-o" ></i>
                     </div>
                     <div class = "item">
                        <div class="title">Number</div>
                        <i class="fa fa-minus-square-o" ></i>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>Is this a set?</h1>
               <div id ="example4-cards" class="more example-cards"></div>
               <script>
                  let example4_card1 = new Card(Color.blue,Shape.diamond,Shading.solid,2);
                  let example4_card2 = new Card(Color.green,Shape.diamond,Shading.open,3);
                  let example4_card3 = new Card(Color.blue,Shape.diamond,Shading.striped,3);
                  document.getElementById("example4-cards").appendChild(example4_card1.getMiniCard());
                  document.getElementById("example4-cards").appendChild(example4_card2.getMiniCard());
                  document.getElementById("example4-cards").appendChild(example4_card3.getMiniCard());
               </script>
            </div>
         </div>
         <br/>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <span class="title-help-screen centered-help-screen"> Here are some fun facts about Set!
      </span>
      <div id = "fun-facts" class="container">
         <div id = "fun-fact-1" class="step red">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 4
                  </div>
                  <div class="points center">
                     Part A
                  </div>
               </div>
               <div class="more-info">
                  <h1>There are 81 Set Cards</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">3^4 = 81 (Shape * Color * Shading * Number)</div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>How many cards are there in Set?</h1>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
         <br/>
         <div id = "fun-fact-2" class="step blue">
            <div class="additional">
               <div class="user-card">
                  <div class="level center">
                     Step 4
                  </div>
                  <div class="points center">
                     Part B
                  </div>
               </div>
               <div class="more-info">
                  <h1>In Set, there are 1080 distinct sets</h1>
                  <div class="stats">
                     <div class = "item">
                        <div class="title">(81,2) / 3 = 81 x 80 / (2 * 3)  = 1080</div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="general">
               <h1>How many cards are there in Set?</h1>
               <span class="more">Mouse over the step for more info</span>
            </div>
         </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <span class="title-help-screen centered-help-screen"> You're ready to play Set now!
      </span>
      <a href="#" class="w3-bar-item w3-button centered-help-screen" onclick="pages.tutorial.close()">
      <i class="fa fa-arrow-left" style = "font-size: 40px;"> Back </i>
      </a>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
   </div>
</div>
`;

tutorial.addHTML(tutorialHTML);