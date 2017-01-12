angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside.messagelist');

    }, function(errMsg) {
    //
    });
  };
}).controller('OutSideCtrl', function($scope, AuthService, $state) {
  $scope.image = {
    link: '/images/background1.jpg'
  };
console.log("Working");

})

.controller('RegisterCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.register = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('inside.messagelist');
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
    AuthService.getUserInfo().then(function(user){
      $scope.user=user;
      console.log("controller"+result);

    },function(err){
      console.log(err);

    });


  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('test');
  };
})
.controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside');

  });
}).controller('InsideSideNavCtrl', function ($scope, $timeout, $mdSidenav) {
        console.log("Hello");
        $scope.toggleSideNav=function(menuId){
            $mdSidenav(menuId).toggle()
        }
  }).controller('MessageListCtrl',function($scope){



        $scope.messagelist = [
            {
                what: 'Brunch this weekend?',
                who: 'Ali Conners',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                what: 'Summer BBQ',
                who: 'to Alex, Scott, Jennifer',
                when: '3:08PM',
                notes: "Wish I could come out but I'm out of town this weekend"
            },
            {
                what: 'Oui Oui',
                who: 'Sandra Adams',
                when: '3:08PM',
                notes: "Do you have Paris recommendations? Have you ever been?"
            },
            {
                what: 'Birthday Gift',
                who: 'Trevor Hansen',
                when: '3:08PM',
                notes: "Have any ideas of what we should get Heidi for her birthday?"
            },
            {
                what: 'Recipe to try',
                who: 'Brian Holt',
                when: '3:08PM',
                notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
            },
            ,
            {
                what: 'Summer BBQ',
                who: 'to Alex, Scott, Jennifer',
                when: '3:08PM',
                notes: "Wish I could come out but I'm out of town this weekend"
            },
            {
                what: 'Oui Oui',
                who: 'Sandra Adams',
                when: '3:08PM',
                notes: "Do you have Paris recommendations? Have you ever been?"
            },
            {

                who: 'Trevor Hansen',
                when: '3:08PM',
                notes: "Have any ideas of what we should get Heidi for her birthday?"
            }
        ];

    }).controller('fabCtrl',function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
        console.log("fabCtrl");
        $scope.alert = '';
        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
                controller: 'ListBottomSheetCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };

        $scope.showAdd = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="Mango (Fruit)"> <md-content ' +
                'class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> ' +
                '<md-input-container flex> <label>First Name</label>' +
                ' <input ng-model="user.firstName" placeholder="Placeholder text">' +
                ' </md-input-container> <md-input-container flex> <label>Last Name</label>' +
                ' <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> ' +
                '<label>Address</label> <input ng-model="user.address"> </md-input-container> ' +
                '<div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city">' +
                ' </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> ' +
                '</md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> ' +
                '</md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> ' +
                '</md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> ' +
                '<md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
                targetEvent: ev
            })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
        };
    }).controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Share', icon: 'share' },
            { name: 'Upload', icon: 'upload' },
            { name: 'Copy', icon: 'copy' },
            { name: 'Print this page', icon: 'print' },
        ];

        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    });

function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
};
