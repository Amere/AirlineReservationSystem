
lufthansa.controller('reservCtrl', function($scope, $location,lufthansaServ) {

  lufthansaServ.getReservDummy().success(function(flight) {
       $scope.flight = flight[0];
       $scope.aircraft = flight[0].aircraft;
       $scope.economySeats = flight[0].aircraft.economeySeats;
       $scope.premiumEconomySeats = flight[0].aircraft.premiumEconomySeats;
       $scope.businessSeats = flight[0].aircraft.businessSeats;
       $scope.firstClassSeats = flight[0].aircraft.firstClassSeats;
   });
   $scope.seatID = lufthansaServ.getSeat();
   $scope.possible = lufthansaServ.getPossible();
   $scope.seatClass = lufthansaServ.getSeatClass_();
    $scope.payment = function(){
    $location.url('/payment');
    }
    $scope.getSeatID = function(){
       $scope.seatID=lufthansaServ.getSeat();
      return lufthansaServ.getSeat();
    }
    $scope.isPossible = function(){
      $scope.possible=lufthansaServ.getPossible();
      return lufthansaServ.getPossible();
    }
    $scope.getSeatClass = function(){
      $scope.seatClass=lufthansaServ.getSeatClass_();
      return lufthansaServ.getSeatClass_();
    }
});
