lufthansa.controller('confirmController', function($scope, lufthansaServ) {
  // lufthansaServ.getConfirmDummy().success(function(dummy) {
  //      $scope.Confirm = dummy;
  //  });
  lufthansaServ.getCurrentUser(function(user){
    $scope.Confirm=user;
    $scope.Confirm.seatCode= lufthansaServ.getSeat();
    lufthansaServ.addUser(user);

  });
});
