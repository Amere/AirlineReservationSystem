lufthansa.controller('confirmController', function($scope, lufthansaServ) {
  // lufthansaServ.getConfirmDummy().success(function(dummy) {
  //      $scope.Confirm = dummy;
  //  });
  lufthansaServ.getCurrentUser(function(user){
    $scope.Confirm=user;
    $scope.Confirm.seatCode= lufthansaServ.getSeat();
    $scope.Confirm.seatClass= lufthansaServ.getSeatClass_();
    $scope.Confirm.flight=lufthansaServ.getFlightNumberOutGoing();
    $scope.Confirm.odate= lufthansaServ.getDateOutGoing();
    user.Odate=lufthansaServ.getDateOutGoing();
    user.flight=lufthansaServ.getFlightNumberOutGoing();
    user.seatCode=lufthansaServ.getSeat();
    user.seatClass= lufthansaServ.getSeatClass_();
    lufthansaServ.addUser(user,function(res){
      $scope.receipt=res;
    });
    lufthansaServ.reserveSeat("SE1002",$scope.Confirm.seatCode);

  });

});
