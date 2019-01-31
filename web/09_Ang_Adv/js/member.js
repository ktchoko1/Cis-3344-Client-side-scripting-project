/* global demoApp */

demoApp.controller('membersOnlyController', function ($scope, $http) {
    console.log("membersOnlyController");
    var url = "webAPIs/isLoggedOn.jsp";
    $scope.welcomeMsg = "";
    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("User is logged in");
                console.log(response);
                console.log("");
                $scope.user = response.data;
                $scope.errorMsg = "";
                if ($scope.user !== null) {
                    $scope.welcomeMsg = "Welcome, " + $scope.user.userName + ".";
                } else {
                    $scope.welcomeMsg = "Access Denied. Only members can view this page. ";
                }
            },
            function (response) { // this function will run if http.get error
                console.log("http error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;
            } // end of error fn
    ); // closes off "then" function call
});