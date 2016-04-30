lufthansa.controller('homeCtrl', function ($scope,lufthansaServ,$state) {


  $scope.goToLanding= function(){
          $state.go('tab.landing');
      };
});
