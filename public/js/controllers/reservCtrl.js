lufthansa.controller('reservCtrl', function ($scope, $location, lufthansaServ) {


  lufthansaServ.getAircraft().success(function(flight) {
       $scope.economySeats = flight.plane.economeySeats;
       $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
       $scope.businessSeats = flight.plane.businessSeats;
       $scope.firstClassSeats = flight.plane.firstClassSeats;
   });
   $scope.seatID = lufthansaServ.getSeat();
   $scope.possible = lufthansaServ.getPossible();
   $scope.seatClass = lufthansaServ.getSeatClass_();
    $scope.payment = function(){
    $location.url('/payment');

    }
    $scope.getSeatID = function () {
        $scope.seatID = lufthansaServ.getSeat();
        return lufthansaServ.getSeat();
    }
    $scope.isPossible = function () {
        $scope.possible = lufthansaServ.getPossible();
        return lufthansaServ.getPossible();
    }
    $scope.getSeatClass = function () {
        $scope.seatClass = lufthansaServ.getSeatClass_();
        return lufthansaServ.getSeatClass_();
    }
});
