
// the 'app' (input parameter) means the div that has ng-app='app'
var angApp = angular.module('app', []);

// the 'contentController' references the div that has ng-controller='contentController'
// we need $scope and $http to be input parameters to the controller function since we 
// plan to use them within the controller function ($scope to share data between controller and UI, 
// $http to make an ajax call).
angApp.controller('contentController', function ($scope, $http) {

    // main code for this controller
    console.log("productListController");

    // the code to list all profile.
    $scope.listMsg = "";
    $http.get("webAPIs/productListJson.jsp").then(
            function (response) { // this function will run if http.get success
                console.log("GetProduct ajax success");
                console.log(response);
                console.log("");
                $scope.products = response.data.recordList;
                $scope.listMsg = response.data.dbError;
                if ($scope.listMsg.length > 0) {
                    $scope.listMsg = "List Error: " + $scope.listMsg;
                } else {
                    // add a new field that stores Rank/ID as a number, to be able to sort numerically
                    for (var i=0; i< $scope.products.length; i++) {
                        $scope.products[i].producId = parseInt($scope.products[i].productId);
                        $scope.products[i].retailPrice = parseInt($scope.products[i].retailPrice);
                        //Following line removes comma when displaying.
                        // Without replace function, it just takes the first number before a comma
                        //$scope.profiles[i].games_played = parseInt($scope.profiles[i].games_played.replace(/\,/g,''));
                    }
                    $scope.sortField = 'productId';
                }
            },
            function (response) { // this function will run if http.get error
                console.log("Get Product ajax error");
                console.log(response);
                console.log("");
                $scope.listMsg = "List Error: " + response.status + " " + response.statusText;
            } // end of error fn
    ); // closes off "then" function call

}); // end of def'n of the controller function 