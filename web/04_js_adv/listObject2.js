 //Prevent a misspelled variable from getting auto-declared
   "use strict";
   
   function makeHairList(listDivId, hairClassName, messageId){
       
       var hairList = [];
       
       var hairListDiv = document.getElementById(listDivId);
       var hairMessageDiv = document.getElementById(messageId);
       
       hairList.add = function(hairName, hairCol, hairPrice ){
           
           var hair = {};       
           var name = hairName;
           var col = hairCol;
           var price = hairPrice;
           
           hair.setName = function(hairName){
               name = hairName;
           };
           
           hair.getName = function(){
               return name;
           };
           
           hair.setCol = function(hairCol){
               col = hairCol;
           };
           
           hair.getCol = function(){
               return col;
           };
          
           
           hair.setPrice = function(hairPrice){
               price = hairPrice;
           };
           
           hair.getPrice = function(){
               return price;
           };
           
           hair.show = function(){
               return (name + "," + col + "," + price );
           };
           
           hairList[hairList.length] = hair;
           hairList.showList();   
           
       };
       
       hairList.delete = function(whichHair){
           
           if (hairList.length === 0){
               
               return "cannot delete! Hair list is empty";
           }
           
           if (whichHair === undefined){
               return "Must specified hair number";
           }
           
           whichHair = Number(whichHair);
           
           if (isNaN(whichHair)){
               return "Must specify Hair number";
           }
           
           if ((whichHair < 0 ) || (whichHair >= hairList.length)){
               
               return (" connot delete!" + whichHair + " does not exist");
           }
           
           for ( var i = whichHair; i < hairList.length; i++){
               hairList[i] = hairList[i+1];
           }
           hairList.length = hairList.length - 1;
           return ("hair" + whichHair + "has been deleted");
           
       };
       
       hairList.showList = function(){
           
           hairListDiv.innerHTML = "";  // blank out the div that hold the List
           
           // for each hair object that's in the hairList, add a child 
           
           for (var i = 0; i < hairList.length; i++){
               
               // new div to hold the hair object, add it to hairListDiv
                var newHair = document.createElement("div");
                hairListDiv.appendChild(newHair);
                
               // add the delete icon to top part
               
               var hairTop = document.createElement("div");
               newHair.appendChild(hairTop);
               
               //Add the delete icon
               var delIcon = document.createElement("img");
               delIcon.hairIndex = i; // property to delete icon
               delIcon.style.padding = "5px";
               delIcon.style.width = "5%";
               delIcon.src = "icon/delete.png";
               hairTop.style.textAlign = "right";
               hairTop.appendChild(delIcon);
               
               // create a child div that will display name, color , price and attached to the bottom
               
               var hairBottom = document.createElement("div");
               hairBottom.innerHTML = i + ".) " + hairList[i].show();
              newHair.appendChild(hairBottom);
              newHair.className = hairClassName;
              
             delIcon.onclick = function(){
                 hairMessageDiv.innerHTML = hairList.delete(Number(this.hairIndex));
                 hairList.showList();
             };
               
               
               
           }
           
       };
       return hairList;
       
   }