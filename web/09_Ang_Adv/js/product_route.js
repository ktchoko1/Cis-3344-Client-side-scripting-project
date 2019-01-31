/* global demoApp */

demoApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'htmlPartials/product_list.html',
        controller: 'productListController'
    }).when('/list', {
        templateUrl: 'htmlPartials/product_list.html',
        controller: 'productListController'
    }).when('/insert', {
        templateUrl: 'htmlPartials/product_insert.html',
        controller: 'productInsertController'
    }).when('/show/:productId', {
        templateUrl: 'htmlPartials/product_detail.html',
        controller: 'productDetailController'
    }).when('/delete/:productId', {
        templateUrl: 'htmlPartials/product_list.html',
        controller: 'productListController'
    
    }).when('/logon', {
        templateUrl: 'htmlPartials/logon.html',
        controller: 'logonController'
    
    }).when('/logoff', {
        templateUrl: 'htmlPartials/logoff.html',
        controller: 'logoffController'
    
    }).when('/member', {
        templateUrl: 'htmlPartials/member.html',
        controller: 'membersOnlyController'
    
    }).otherwise({
        redirectTo: '/'
    });
});
