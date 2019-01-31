

/* global demoApp */

demoApp.controller('productListController', function ($scope, $http, $routeParams) {

     function deleteProduct(id) {
        var url = "webAPIs/productDelete.jsp?id=" + id;
        console.log("url to invoke: " + url);
        $scope.deleteMsg = "";

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Product Delete ajax success");
                    console.log(response);
                    console.log("");
                    $scope.deleteMsg = response.data.errorMsg;
                    if ($scope.deleteMsg.length === 0) {
                        $scope.deleteMsg = "Sucessfully deleted product " + id;
                    } else {
                        $scope.deleteMsg = "Delete Error: " + $scope.deleteMsg;
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Product Delete ajax error");
                    console.log(response);
                    console.log("");
                    $scope.deleteMsg = "Delete Error: " + response.status + " " + response.statusText;

                } // end of error fn
        ); // closes off "then" function call
    } // deletePerson
    function getProductList() {
        // the code to list all persons.
        $scope.listMsg = "";
        $http.get("webAPIs/productListJson.jsp").then(
                function (response) { // this function will run if http.get success
                    console.log("GetProducts ajax success");
                    console.log(response);
                    console.log("");
                    $scope.products = response.data.recordList;
                    $scope.listMsg = response.data.dbError;
                    if ($scope.listMsg.length > 0) {
                        $scope.listMsg = "List Error: " + $scope.listMsg;
                        console.log($scope.listMsg);
                    } else {
                        console.log("number of products is " + $scope.products.length);
                        for (var i = 0; i < $scope.products.length; i++) {

                            $scope.products[i].retailPrice = parseInt($scope.products[i].retailPrice);
                            if (isNaN($scope.products[i].retailPrice)) {
                                $scope.products[i].retailPrice = 0;
                            }
                            $scope.products[i].productId = parseInt($scope.products[i].productId);
                            console.log("product " + i + " id is " + $scope.products[i].productId);
                        }
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Get Products ajax error");
                    console.log(response);
                    console.log("");
                    $scope.listMsg = "List Error: " + response.status + " " + response.statusText;
                } // end of error fn
        ); // closes off "then" function call
    } // list

    // main code for this controller
    console.log("productListController");
    console.log($routeParams);
    if ($routeParams.productId) {
        console.log("First I will delete product " + $routeParams.productId);
        deleteProduct($routeParams.productId);
    } else {
        console.log("Listing products without deleting first.");
    }
    getProductList();

}); // end of def'n of the controller function 