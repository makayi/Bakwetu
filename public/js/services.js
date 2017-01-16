angular.module('starter')

.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/register', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
          console.log(result);
          console.log("Service");
        if (result.data.success) {

          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

   getUserInfo=function(){
    return $q(function(resolve, reject){
      $http.get(API_ENDPOINT.url+'/userinfo').then(function(result){
      console.log("getUserInfo"+result);
       if(result.data.sucess){
         resolve(result.data.user);
       }  else{
         reject(result.data.msg);
       }

      });
    });
  };

  getMessageDetails= function(){
    return $q(function(resolve, reject){
      //mock server call to database
    var messageList = [
        {
            what: 'Brunch this weekend?',
            who: 'Ali Conners',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            what: 'Summer BBQ',
            who: 'Mbuyu Makayi',
            when: '3:08PM',
            notes: "He has more then 5 years of experience on mobile application development. He loves to work in javascript/java programming language.At present he is exploring Node JS Web Component specification."
        },

        {
            what: 'Summer BBQ',
            who: 'Ali Conners',
            notes: "Wish I could come out but I'm out of town this weekend",
            when: '3:08PM'
        },
        {
            who: 'Sandra Adams',
            when: '3:08PM',
            notes: "Do you have Paris recommendations? Have you ever been?"
        }

        ,

        {
            what: 'Summer BBQ',
            who: 'Ali Conners',
            notes: "Wish I could come out but I'm out of town this weekend",
            when: '3:08PM'
        },
        {
            who: 'Sandra Adams',
            when: '3:08PM',
            notes: "Do you have Paris recommendations? Have you ever been?"
        }

        ,

        {
            what: 'Summer BBQ',
            who: 'Ali Conners',
            notes: "Wish I could come out but I'm out of town this weekend",
            when: '3:08PM'
        },
        {
            who: 'Sandra Adams',
            when: '3:08PM',
            notes: "Do you have Paris recommendations? Have you ever been?"
        }
        ,

        {
            what: 'Summer BBQ',
            who: 'Ali Conners',
            notes: "Wish I could come out but I'm out of town this weekend",
            when: '3:08PM'
        },
        {
            who: 'Sandra Adams',
            when: '3:08PM',
            notes: "Do you have Paris recommendations? Have you ever been?"
        }



    ];
      console.log(messageList+"AuthService");
      resolve(messageList);


    });
  }

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    getUserInfo:getUserInfo,
    getMessageDetails:getMessageDetails,
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
