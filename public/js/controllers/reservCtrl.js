lufthansa.controller('reservCtrl', function ($scope, $location, lufthansaServ) {

  $scope.flg = lufthansaServ.getImpFlg();
  console.log(lufthansaServ.reservInfoFlag);
  if(lufthansaServ.reservInfoFlag != true){
    $location.url('/');
  }

  if ($scope.flg==0) {
  lufthansaServ.getAircraftOut().success(function(flight) {
       $scope.economySeats = flight.plane.economeySeats;

       $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
       $scope.businessSeats = flight.plane.businessSeats;
       $scope.firstClassSeats = flight.plane.firstClassSeats;
       console.log($scope.flg+"*******888888888888888********");
   });
 }
  if($scope.flg==1){
    lufthansaServ.getAircraftRet().success(function(flight) {
         $scope.economySeats = flight.plane.economeySeats;
         $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
         $scope.businessSeats = flight.plane.businessSeats;
         $scope.firstClassSeats = flight.plane.firstClassSeats;
     });
  }
   $scope.setToReturn = function(){
     lufthansaServ.getAircraftRet().success(function(flight) {
          $scope.economySeats = flight.plane.economeySeats;
          $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
          $scope.businessSeats = flight.plane.businessSeats;
          $scope.firstClassSeats = flight.plane.firstClassSeats;
      });
   };

   $scope.seatID = lufthansaServ.getSeat();
   $scope.possible = lufthansaServ.getPossible();
   $scope.seatClass = lufthansaServ.getSeatClass_();
   $scope.flgOutgoing = lufthansaServ.getReturning_Or_Outgoing();
   $scope.flightRetNum = lufthansaServ.getFlightNumberReturning();
   $scope.flightOutNum = lufthansaServ.getFlightNumberOutGoing();


   $scope.proceed = function(){
     if($scope.flgOutgoing =='Returning'  && $scope.flg==0) {$scope.setToReturn();lufthansaServ.setImpFlg(1);lufthansaServ.setSeatR(lufthansaServ.getSeat()) ;lufthansaServ.setSeat(undefined);
       $scope.ret();
     }
      else $scope.payment();
   }

    $scope.payment = function(){
    $location.url('/payment');
    };
    $scope.ret = function(){
      $location.url('/reservation');
    }
    $scope.getSeatID = function () {
        $scope.seatID = lufthansaServ.getSeat();
        return lufthansaServ.getSeat();
    };
    $scope.isPossible = function () {
        $scope.possible = lufthansaServ.getPossible();
        return lufthansaServ.getPossible();
    };
    $scope.getSeatClass = function () {
        $scope.seatClass = lufthansaServ.getSeatClass_();
        return lufthansaServ.getSeatClass_();
    }
});
