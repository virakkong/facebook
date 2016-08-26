'use strict';

angular.module('ngSocial.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1770504393165947');
    //set permissions to facebook
  $facebookProvider.setPermissions("email","public_profile","user_posts","publish_actions", "user_photos");
})

.run( function( $rootScope ) {
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})
.controller('FacebookCtrl',['$scope','$facebook', function($scope,$facebook) {
    
    $scope.isLoggedIn =false;
    
    //variable no var for $scope
    $scope.login =function() {
        $facebook.login().then(function() {
            console.log("Logged In");
            $scope.isLoggedIn =true;
            refresh();
        });
    }
    
    $scope.logout =function() {
        $facebook.logout().then(function() {
            console.log("Logged Out");
            $scope.isLoggedIn =false;
            refresh();
        });
    }
    
    function refresh() {
        $facebook.api("/me").then(function(response){
            $scope.welcomeMsg="Welcome " + response.name;
            $scope.user=response;
            $scope.isLoggedIn =true;
            $facebook.api('/me/picture').then(function(response) {
                $scope.picture=response.data.url;
            });
                                
        },
        function (err) {
            $scope.welcomeMsg ="Please Login";
        }
                                  
        ); //end of then
    
    }//end of refresh
    refresh();
}]); //end of controller  