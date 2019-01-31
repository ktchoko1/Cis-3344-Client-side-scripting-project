
/* global demoApp */

demoApp.controller('productInsertController', function ($scope, $http, KTService) {
    console.log("productInsertController");

    // these booleans control which Save button the user will see in the 
     //person_insert_update.html (partial html file);
    $scope.isUpdateMode = false;
    $scope.isInsertMode = true;

    // this will be used to label the heading on the person_insert_update.html (partial html file).
    $scope.insertUpdate = "Insert";

    // When the user first clicks insert, they will see the person_insert_update.html partial 
    // and at that time, all the user data fields should have empty string (not undefined) 
    // and there is a second person object that holds all the field level error messages - 
    // clear all of those out too... 
    
    $scope.newproduct = KTService.emptyProduct();
    $scope.myErrors = KTService.emptyProduct();

    //Create a new person (this is the Insert/Save button)
    $scope.insertSave = function () {
        console.log("creating product");
        console.log($scope.newproduct);

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = KTService.emptyProduct();
        $scope.myErrors.errorMsg=""; // blank out any old error message
        $scope.status=""; // blank out any old error message

        var myData = escape(JSON.stringify($scope.newproduct));
        var pName = $scope.newproduct.productDesc;
        console.log("new product descripion is "+pName);
        var url = "webAPIs/productInsert.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Pproduct Insert/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Product "+pName+" sucessfully saved.";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Product Insert/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn

        ); // closes off "then" function call

    };  // end of function insertSave

});  // end of insert controller