
lufthansa.controller('bookingCtrl',function($scope, lufthansaServ) {

    $scope.collapse= true;
    $scope.isVisible= false;
    $scope.book="";

  $scope.change = function() {
  $scope.isVisible = !$scope.isVisible;
 };

 function pastflights(){
   lufthansaServ.getPastFlights().success(function(data){
     $scope.Pastflights=data;
   });
 };

$scope.getMyBookings = function (book){
  $scope.book=book;
   console.log("bookref"+ $scope.book);
   lufthansaServ.getMyBookings($scope.book).success(function(err,data){
     $scope.bookings=data;
     console.log(data, 'success');
      console.log("in booking", data);
   }).error(function(response) {
  //  console.log(response, 'error');
   });
 };
 //pastflights();
 //getBookings();

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.rate = 0;
  $scope.max = 5;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };

});
