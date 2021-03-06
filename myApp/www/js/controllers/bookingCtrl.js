
lufthansa.controller('bookingCtrl',function($scope, lufthansaServ,$ionicTabsDelegate) {

    $scope.collapse= true;
    $scope.isVisible= false;
    $scope.book="";
    $scope.bookref="";

  $scope.change = function() {
  $scope.isVisible = !$scope.isVisible;
 };
 $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }

$scope.pastflights = function (bookref){
  $scope.bookref=bookref;
   console.log("bookrefNCTRL"+ $scope.bookref);
   lufthansaServ.getPastFlights($scope.bookref).success(function(data){
      $scope.Pastflights=data;
      console.log("in fl");
   }).error(function(response) {
     console.log(response, 'error');
   });
 };
 $scope.getMyBookings = function (book){
   $scope.book=book;
    console.log("bookref"+ $scope.book);
    lufthansaServ.getMyBookings($scope.book).success(function(data){
       $scope.bookings=data;
        $scope.hideMe = function (data) {
     data.hidden=true;
     };
       console.log("in booking", data);
    }).error(function(response) {
      console.log(response, 'error');
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
    $scope.out="";
   var tests = [];
 if (typeof $scope.out == 'undefined') {
        $scope.out = "";
      }
      else{
         $scope.addResource = function (settings) {
          tests.push(settings.email);
            console.log(settings.email);
             console.log(tests);
              $scope.out+='\n'+settings.email;
             console.log($scope.out);
        };
      };
console.log("b");
});
