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
.controller('FacebookCtrl',['$scope','$facebook', [function($scope,$facebook) {
    $scope.isLoggedIn =false;
        $facebook.login().then(function() {
            console.log("Logged In");
        });
}
    
}]);