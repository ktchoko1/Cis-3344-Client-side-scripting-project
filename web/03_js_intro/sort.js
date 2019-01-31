function sortByKey(array, key) {

    return array.sort(function (a, b) {

        if (key === "name") {
            var akey = a.getName();
            var bkey = b.getName();
        }else if (key === "col") {
            var akey = a.getCol();
            var bkey = b.getCol();
        }else {
            var akey = a.getPrice();
            var bkey = b.getPrice();
        } 

        if (typeof akey === "string") {
            akey = akey.toLowerCase();
        }
 
        if (typeof bkey === "string") {
            bkey = bkey.toLowerCase();
        }
        
        if (!isNaN(akey)) {
            akey = Number(akey);
        }
        if (!isNaN(bkey)) {
            bkey = Number(bkey);
        }

        var returnVal = 0;
        if (akey < bkey) {
            returnVal = -1;
        } else if (akey > bkey) {
            returnVal = 1;
        }

        console.log("comparing " + akey + " to " + bkey + " yields " + returnVal);
        return returnVal;
    });

}