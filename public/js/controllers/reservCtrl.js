
lufthansa.controller('reservCtrl', function($scope, lufthansaServ) {
  lufthansaServ.getReservDummy().success(function(flight) {
       $scope.flight = flight[0];
       $scope.aircraft = flight[0].aircraft;
       $scope.economySeats = flight[0].aircraft.economeySeats;
       $scope.premiumEconomySeats = flight[0].aircraft.premiumEconomySeats;
       $scope.businessSeats = flight[0].aircraft.businessSeats;
       $scope.firstClassSeats = flight[0].aircraft.firstClassSeats;
   });
});
