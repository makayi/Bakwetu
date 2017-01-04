var routerApp= angular.module('routerApp',['ui.router']);

routerApp.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home',{
    url:'/',
    templateUrl:'/pages/home/landing-page.html'
  });


});

routerApp.controller('sign-up-controller', function($scope,$http){



  $scope.sendData= function(){
      console.log($scope.user.password);
            console.log($scope.user.email);
      var user={
        firstname:$scope.user.firstname,
        lastname:$scope.user.lastname,
        password:$scope.user.password,
        email:$scope.user.email
      }


      $http.post('/create',user).then( function successCallback(response){
           console.log(response);
      }, function errorCallback( response){
          console.log(response);
      });

  }




});
