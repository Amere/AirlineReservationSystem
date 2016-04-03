
lufthansa.controller('confirmController', function($scope, lufthansaServ) {
  lufthansaServ.getConfirmDummy().success(function(dummy) {
       $scope.Confirm = dummy;
   });
});
