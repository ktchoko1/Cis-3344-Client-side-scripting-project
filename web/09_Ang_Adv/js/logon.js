/* global demoApp */

demoApp.controller('logonController', function ($scope, $http) {
    console.log("logonController");
    $scope.user = "";
    $scope.loginResult = "Enter your email and password";
    $scope.loggedIn = false;
    $scope.login = function () {
        console.log("logging in with following credentials: " +
                $scope.user.userMail + ' ' + $scope.user.userPass);
        loggedOn = true;
        var url = "webAPIs/logon.jsp?&email=" + $scope.user.userMail + "&pw=" +
                $scope.user.userPass;
        $http.get(url).then(
                function (response) {
                    console.log("successful login");
                    console.log(response);
                    if (response.data.errorMsg === "") {
                        $scope.loginResult = "Login successful. Welcome " +
                                response.data.userName;
                        $scope.loggedIn = true;
                    } else {
                        $scope.loginResult = "Unsuccessful login.  Incorrect email/password.";
                    }
                },
                function (response) {
                    console.log("login failed");
                }
        );
    };
});