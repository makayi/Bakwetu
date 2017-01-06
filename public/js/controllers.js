angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside');

    }, function(errMsg) {
    //
    });
  };
})

.controller('RegisterCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.register = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('inside');
    //
    }, function(errMsg) {
//
    });
  };
})

.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };

  //Fecthing user information immediately
  AuthService.getUserInfo().then(function(result){
    $scope.user=result;
    console.log("controller"+result);

  },function(err){
    console.log(err);

  });

  var getInfo = function() {
    // $http.get(API_ENDPOINT.url + '/userinfo').then(function(result) {
    //   $scope.user = result.data.user;
    // });
    AuthService.getUserInfo().then(function(result){
      $scope.user=result;
      console.log("controller"+result);

    },function(err){
      console.log(err);

    });


  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})

.controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');

  });
});
