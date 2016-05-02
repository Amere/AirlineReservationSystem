lufthansa.controller('confirmController', function($scope, lufthansaServ, $location) {
  // lufthansaServ.getConfirmDummy().success(function(dummy) {
  //      $scope.Confirm = dummy;
  //  });

  // if(lufthansaServ.paymentFlag != true){
  //   $location.url('/');
  // }

  $scope.setConfirmFlag = function(){
    lufthansaServ.confirmFlag();
  };
  lufthansaServ.getCurrentUser(function(user){
    $scope.Confirm=user;
    var reserv={};

    $scope.flg = lufthansaServ.getReturning_Or_Outgoing();
    if($scope.flg=="Returning"){
    if(lufthansaServ.getSeat()) {
      $scope.rr = true;
      var reserv2 = {};
      $scope.rSeat = lufthansaServ.getSeatR();
      $scope.rClass=lufthansaServ.getSeatClass_R();
      $scope.Confirm.seatCodeOut = lufthansaServ.getSeat();
      $scope.Confirm.seatClass = lufthansaServ.getSeatClass_();
      $scope.Confirm.flight = lufthansaServ.getFlightNumberOutGoing();
      $scope.Confirm.odate = lufthansaServ.getDateOutGoing();
      user.odate = lufthansaServ.getdate1();
      user.flight = lufthansaServ.getFlightNumberOutGoing();
      user.returnFlight = lufthansaServ.getFlightNumberReturning();
      $scope.rFlight = user.returnFlight;
      user.seatCode = lufthansaServ.getSeat();
      user.seatReturn = lufthansaServ.getSeatR();
      user.seatClass = lufthansaServ.getSeatClass_();
      reserv.customer = user.fname + " " + user.lname;
      reserv.flight = user.flight;
      reserv.seatCode = lufthansaServ.getSeat();
      reserv.customer = user.fname + " " + user.lname;
      reserv.flight = user.returnFlight;
      reserv.seatCode = lufthansaServ.getSeat();
      lufthansaServ.reserveSeat(lufthansaServ.getFlightNumberOutGoing(), $scope.Confirm.seatCodeOut);
      lufthansaServ.reserveSeat(lufthansaServ.getFlightNumberReturning(), $scope.rSeat);
      lufthansaServ.addUser(user, function (res) {
        $scope.receipt = res;
        reserv.bookingRefNum = res;
        lufthansaServ.addReservation(reserv);
      });
      // lufthansaServ.addUser(user,function(res){
      //   $scope.returnreceipt=res;
      //  reserv2.bookingRefNum=res;
      //  lufthansaServ.addReservation(reserv2);
      // });
    }else{
      $scope.Confirm.flight = lufthansaServ.getFlightNumberOutGoing();
      $scope.Confirm.odate = lufthansaServ.getDateOutGoing();
      user.odate = lufthansaServ.getDateOutGoing();
      user.flight = lufthansaServ.getFlightNumberOutGoing();
      user.returnFlight = lufthansaServ.getFlightNumberReturning();
      $scope.rFlight = user.returnFlight;
    }
    }else{
      if(lufthansaServ.getSeat()) {
        $scope.Confirm.seatCodeOut = lufthansaServ.getSeat();
        $scope.Confirm.seatClass = lufthansaServ.getSeatClass_();
        $scope.Confirm.flight = lufthansaServ.getFlightNumberOutGoing();
        $scope.Confirm.odate = lufthansaServ.getDateOutGoing();
        user.odate = lufthansaServ.getDateOutGoing();
        user.flight = lufthansaServ.getFlightNumberOutGoing();
        user.seatCode = lufthansaServ.getSeat();
        user.seatClass = lufthansaServ.getSeatClass_();
        reserv.customer = user.fname + " " + user.lname;
        reserv.flight = user.flight;
        reserv.seatCode = lufthansaServ.getSeat();
        lufthansaServ.reserveSeat(lufthansaServ.getFlightNumberOutGoing(), $scope.Confirm.seatCodeOut);
        lufthansaServ.addUser(user, function (res) {
          $scope.receipt = res;
          reserv.bookingRefNum = res;
          lufthansaServ.addReservation(reserv);
        });
      }else{
        $scope.Confirm.flight = lufthansaServ.getFlightNumberOutGoing();
        $scope.Confirm.odate = lufthansaServ.getDateOutGoing();
        user.odate = lufthansaServ.getDateOutGoing();
        user.flight = lufthansaServ.getFlightNumberOutGoing();
      }
    }


  });


});
