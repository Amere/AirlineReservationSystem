lufthansa.controller('reservCtrl', function ($scope, $location, lufthansaServ) {

//   $scope.flg = lufthansaServ.getImpFlg();
//   console.log(lufthansaServ.reservInfoFlag);
//
// //Temporary commented because of accessing nulls on ionic
// /*
//   if(lufthansaServ.reservInfoFlag != true){
//     $location.url('/');
//   }
//
//   if ($scope.flg==0) {
//   lufthansaServ.getAircraftOut().success(function(flight) {
//        $scope.economySeats = flight.plane.economeySeats;
//
//        $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
//        $scope.businessSeats = flight.plane.businessSeats;
//        $scope.firstClassSeats = flight.plane.firstClassSeats;
//        console.log($scope.flg+"*******888888888888888********");
//    });
//  }
//   if($scope.flg==1){
//     lufthansaServ.getAircraftRet().success(function(flight) {
//          $scope.economySeats = flight.plane.economeySeats;
//          $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
//          $scope.businessSeats = flight.plane.businessSeats;
//          $scope.firstClassSeats = flight.plane.firstClassSeats;
//      });
//   }
//   */
//    $scope.setToReturn = function(){
//      lufthansaServ.getAircraftRet().success(function(flight) {
//           $scope.economySeats = flight.plane.economeySeats;
//           $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
//           $scope.businessSeats = flight.plane.businessSeats;
//           $scope.firstClassSeats = flight.plane.firstClassSeats;
//       });
//    };
//
//    $scope.seatID = lufthansaServ.getSeat();
//    $scope.possible = lufthansaServ.getPossible();
//    $scope.seatClass = lufthansaServ.getSeatClass_();
//    $scope.flgOutgoing = lufthansaServ.getReturning_Or_Outgoing();
//    $scope.flightRetNum = lufthansaServ.getFlightNumberReturning();
//    $scope.flightOutNum = lufthansaServ.getFlightNumberOutGoing();
//
//
//    $scope.proceed = function(){
//      if($scope.flgOutgoing =='Returning'  && $scope.flg==0) {$scope.setToReturn();lufthansaServ.setImpFlg(1);lufthansaServ.setSeatR(lufthansaServ.getSeat()) ;lufthansaServ.setSeat(undefined);
//        $scope.ret();
//      }
//       else $scope.payment();
//    }
//
//     $scope.payment = function(){
//     $location.url('/payment');
//     };
//     $scope.ret = function(){
//       $location.url('/reservation');
//     }
//     $scope.getSeatID = function () {
//         $scope.seatID = lufthansaServ.getSeat();
//         return lufthansaServ.getSeat();
//     };
//     $scope.isPossible = function () {
//         $scope.possible = lufthansaServ.getPossible();
//         return lufthansaServ.getPossible();
//     };
//     $scope.getSeatClass = function () {
//         $scope.seatClass = lufthansaServ.getSeatClass_();
//         return lufthansaServ.getSeatClass_();
//     }
$scope.range = function(n) {
  var res = [];
for (var i = 0; i < n; i++) {
  res.push(i);
}
return res;
    };
$scope.rr=function(item){
  $scope.datas.rows=item.rows;
}
$scope.chooseSeat=function(){
  lufthansaServ.setSeat($scope.data.seat);
  lufthansaServ.setSeatClass($scope.data.choice);
//  console.log($scope.data.seat);
  // console.log($scope.data.seat.class);

}
$scope.chooseSeatR=function(){
  lufthansaServ.setSeatR($scope.dataR.seat);
  lufthansaServ.setSeatClassR($scope.dataR.choice);
  // console.log($scope.data.seat.seatCode);
  // console.log($scope.data.seat.class);

}
$scope.isReturning=lufthansaServ.getReturning_Or_Outgoing();
lufthansaServ.getAircraftOut().success(function(flight) {
       $scope.economySeats = flight.plane.economeySeats;
       $scope.premiumEconomySeats = flight.plane.premiumEconomySeats;
       $scope.businessSeats = flight.plane.businessSeats;
       $scope.firstClassSeats = flight.plane.firstClassSeats;
       //console.log($scope.flg+"*******888888888888888********");
       $scope.choices = [
           { text: "economy", value: "economy",rows:$scope.economySeats.length},
           { text: "business", value: "business",rows:$scope.premiumEconomySeats.length },
           { text: "premiumEconomySeats", value: "premium",rows:$scope.businessSeats.length },
           { text: "firstClassSeats", value: "first",rows:$scope.firstClassSeats.length }
         ];
         $scope.data = {

           };
   });
   if($scope.isReturning){
     lufthansaServ.getAircraftRet().success(function(flight){
       $scope.economySeatsR = flight.plane.economeySeats;
       $scope.premiumEconomySeatsR = flight.plane.premiumEconomySeats;
       $scope.businessSeatsR = flight.plane.businessSeats;
       $scope.firstClassSeatsR = flight.plane.firstClassSeats;
       $scope.choicesR = [
           { text: "economy", value: "economy",rows:$scope.economySeats.length},
           { text: "business", value: "business",rows:$scope.premiumEconomySeats.length },
           { text: "premiumEconomySeats", value: "premium",rows:$scope.businessSeats.length },
           { text: "firstClassSeats", value: "first",rows:$scope.firstClassSeats.length }
         ];
         $scope.dataR = {

           };
     });
   }
});
