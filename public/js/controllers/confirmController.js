lufthansa.controller('confirmController', function($scope, lufthansaServ) {
  // lufthansaServ.getConfirmDummy().success(function(dummy) {
  //      $scope.Confirm = dummy;
  //  });
  lufthansaServ.getCurrentUser(function(user){
    $scope.Confirm=user;
    lufthansaServ.addUser(user);
    
  });
});
