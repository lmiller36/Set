let highScores = new Page('highScores','high-scores');

let highScoresHTML = 
      `
      <style>
       .avatar {
           vertical-align: middle;
           width: 100px;
           height: 100px;
           border-radius: 50%;
           margin-right: 1em;
       }

       .table {
           margin-top: 40px;
           border-spacing: 1em .5em;
           padding: 0 2em 1em 0;
           border: 3px solid black;
       }

       .table thead {
           background: #111;
           color: #fff;
       }

       .table tr th,
       .table tr td:nth-child(odd) {
           text-align: center;
       }

      .highscores-container{
         text-align:center;
         display:block;
       }

       .element {
        background: #d2d2d2;
      }

   </style>
        <p id = "title" class="title"> High Scores </p>
        <div class=" w3-xxlarge">
   <a href="#" onclick="pages.highScores.close()" class="w3-black w3-bar-item w3-button">
   <i class="fa fa-home" title="Main Menu"> Main Menu </i>
   </a>
</div>

   <div style="display: block;text-align: -webkit-center; font-size: 75px;">
       <table id="highscores" class="table striped">
           <thead>
               <tr>
                   <th>Rank</th>
                   <th>Username</th>
                   <th>Score</th>
                   <th>Date</th>
               </tr>
           </thead>
           <tbody>
           </tbody>
       </table>
   </div>
      `;

highScores.addHTML(highScoresHTML);


highScores.show = function (){
   document.getElementById("high-scores").style.display = "block";
   loadHighScores();
};



function loadHighScores(){
          gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '14icWT4vA_GirySo4aqvYCzzLytl7Xe21httwMLPDn48',
          range: 'Sheet1!A2:E'
        }).then(function(response) {
          console.log(response)
          let scores = response.result.values;
          if(!scores) return;


          let count = 1;
          scores.forEach( (entry) => {
            let username = entry[0];
            let score = entry[1];
            let location = entry[2];
            let timeOfPlay = entry[3];
            let avatarUrl = entry[4];

            let date = new Date(parseInt(timeOfPlay)).toLocaleDateString("en-US")




            $("#highscores tbody").append(
          "<tr class = \"element\" style = \"margin-bottom:15px;\"> <td>" +
            count +
            "</td><td><img class='avatar' src='" +
            avatarUrl +
            "'/>" +
            username +
            "</td><td>" +
            score +
            "</td><td>" +
            date
            +
            "</td></tr>"
        );

            count ++;
          })
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });

}


   // function listMajors() {

   //      let now = new Date(Date.now());
   //      let timeInUTC = now.getTime();
   //      let seconds = "100"
   //      let values = [
   //      [
   //      "Lorne",seconds,"Copenhagen, Denmark",timeInUTC
   //      ],

   //      ];
   //      const resource = {
   //        values:values,
   //        majorDimension: "ROWS"
   //      };



   //      gapi.client.sheets.spreadsheets.values.get({
   //        spreadsheetId: '14icWT4vA_GirySo4aqvYCzzLytl7Xe21httwMLPDn48',
   //        range: 'Sheet1!A:D'
   //        // ,
   //        // valueInputOption:"USER_ENTERED",
   //        // resource:resource
   //      }).then(function(response) {
   //        console.log(response)
   //        // var range = response.result;
   //        // if (range.values.length > 0) {
   //        //   appendPre('Name, Major:');
   //        //   for (i = 0; i < range.values.length; i++) {
   //        //     var row = range.values[i];
   //        //     // Print columns A and E, which correspond to indices 0 and 4.
   //        //     appendPre(row[0] + ', ' + row[4]);
   //        //   }   
   //        // } else {
   //        //   appendPre('No data found.');
   //        // }
   //      }, function(response) {
   //        appendPre('Error: ' + response.result.error.message);
   //      });

   //    }