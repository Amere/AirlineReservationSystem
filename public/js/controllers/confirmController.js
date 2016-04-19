lufthansa.controller('confirmController', function($scope, lufthansaServ, $location) {
  // lufthansaServ.getConfirmDummy().success(function(dummy) {
  //      $scope.Confirm = dummy;
  //  });

  if(lufthansaServ.paymentFlag != true){
    $location.url('/');
  }

  $scope.setConfirmFlag = function(){
    lufthansaServ.confirmFlag();
  };

  lufthansaServ.getCurrentUser(function(user){
    $scope.Confirm=user;
    $scope.Confirm.seatCode= lufthansaServ.getSeat();
    $scope.Confirm.seatClass= lufthansaServ.getSeatClass_();
    lufthansaServ.addUser(user);
    lufthansaServ.reserveSeat("SE1002",$scope.Confirm.seatCode);

  });

});
