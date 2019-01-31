/* global demoApp */

demoApp.controller('logoffController', function ($scope, $http) {
    console.log("logoffController");
    $scope.logoffResult = "You are logging off";
    $scope.loggedOff = false;
    $scope.logoff = function () {
        var url = "webAPIs/logoff.jsp?";
        $http.get(url).then(
                function (response) {
                    console.log("successful logoff");
                    console.log(response);
                    if (response.data.errorMsg === "") {
                        $scope.logoffResult = "Unsuccessful logoff.";
                        $scope.loggedOff = true;
                    } else {
                        $scope.logoffResult = "Logoff successful. Goodbye!";
                    }
                },
                function (response) {
                    console.log("logoff failed");
                }
        );
    };
});