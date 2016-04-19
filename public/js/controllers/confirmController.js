lufthansa.controller('confirmController', function($scope, lufthansaServ) {
  // lufthansaServ.getConfirmDummy().success(function(dummy) {
  //      $scope.Confirm = dummy;
  //  });
  lufthansaServ.getCurrentUser(function(user){
    $scope.Confirm=user;
    $scope.Confirm.seatCodeOut= lufthansaServ.getSeat();
    $scope.Confirm.seatClass= lufthansaServ.getSeatClass_();
    $scope.Confirm.flight=lufthansaServ.getFlightNumberOutGoing();
    $scope.Confirm.odate= lufthansaServ.getDateOutGoing();
    user.odate=lufthansaServ.getDateOutGoing();
    user.flight=lufthansaServ.getFlightNumberOutGoing();
    user.seatCode=lufthansaServ.getSeat();
    user.seatClass= lufthansaServ.getSeatClass_();
    lufthansaServ.addUser(user,function(res){
      $scope.receipt=res;
      console.log(res.oddate);
    });
    $scope.flg = lufthansaServ.getReturning_Or_Outgoing();
    if($scope.flg=="Returning"){
      lufthansaServ.reserveSeat(lufthansaServ.getFlightNumberOutGoing(),$scope.Confirm.seatCode);
      lufthansaServ.reserveSeat(lufthansaServ.getFlightNumberReturning(),$scope.Confirm.seatCode);

    }else{
      lufthansaServ.reserveSeat(lufthansaServ.getFlightNumberOutGoing(),$scope.Confirm.seatCode);

    }

  });

});
