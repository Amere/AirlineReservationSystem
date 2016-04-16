
lufthansa.controller('reservCtrl', function($scope, $location,lufthansaServ) {

  lufthansaServ.getAircraft().success(function(flight) {
       //$scope.flight = flight[0];
       //$scope.aircraft = flight[0].aircraft;
       $scope.economySeats = flight.economeySeats;
       $scope.premiumEconomySeats = flight.premiumEconomySeats;
       $scope.businessSeats = flight.businessSeats;
       $scope.firstClassSeats = flight.firstClassSeats;
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
