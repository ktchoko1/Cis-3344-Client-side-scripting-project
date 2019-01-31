// prevents a misspelled variable from getting auto-declared.
"use strict";

function makeHairList() {
    var hairList = [];

    hairList.add = function (hairName,hairColor, hairPrice) {
        var hair = {};
        var name = hairName;
        var col = hairColor;
        var price = hairPrice;


        hair.setName = function (hairName) {
            name = hairName;
        };
        
        hair.getName = function () {
            return name; 
        };
        
        hair.setCol = function(hairColor){
           col = hairColor; 
        };
        
        hair.getCol = function(){
            return col;
        };
        

        hair.setPrice = function (hairPrice) {
            price = Number(hairPrice);
        };
        
        hair.getPrice = function () {
            return price; 
        };
        
        hair.show = function () {
            return (name + ", " +col + "," + price);
        };
        hairList[hairList.length] = hair;
    };

    hairList.showList = function () {
        var output = "";
        for (var i = 0; i < hairList.length; i++) {
            output += + i+ ")" +" " + hairList[i].show() + "<br/>";
        }
        return output;
    };

    return hairList;

}