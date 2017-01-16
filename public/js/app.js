angular.module('starter',['ui.router','ngMaterial'])
.config(function($stateProvider,$urlRouterProvider,$mdIconProvider){
  $mdIconProvider
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);

  $urlRouterProvider.otherwise('/outside');
  $stateProvider.state('outside', {
     url: '/outside',
     templateUrl: 'templates/outside.html'
   })
   .state('login', {
     url: '/login',
     templateUrl: 'templates/login.html',
     controller: 'LoginCtrl'
   })
   .state('register', {
     url: '/register',
     templateUrl: 'templates/register.html',
     controller: 'RegisterCtrl'
   })
   .state('inside', {
     url: '/inside',
     templateUrl: 'templates/home2.html',
     controller: 'InsideCtrl'
   }).state('inside.messagelist',{
     url:'/messages',
     templateUrl:'templates/message-list.html',
     controller: 'MessageListCtrl'

   })
   .state('inside.message', {
      url: '/message/{id}',
      templateUrl: 'templates/message1.html',
      controller:'MessageDetailsCtrl'
    });



}).run(function($rootScope,$state,AuthService,AUTH_EVENTS){
  $rootScope.$on('$stateChangeStart',function(event,next,nextParams,fromState){
    if (!AuthService.isAuthenticated()){
      console.log(next.name+"current");
      if(next.name!=='login' && next.name!=='register' && next.name!=='outside'){
        event.preventDefault();
        $state.go('outside');
      }
    }
  });
});
