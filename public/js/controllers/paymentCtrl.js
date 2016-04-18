lufthansa.controller('paymentCtrl',function($scope,lufthansaServ,$location){
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];

  $scope.v1 = "";
  $scope.v2 = "";
  $scope.v3 = "";
  $scope.v4 = "";
  $scope.validThru = "";
  $scope.ccv = "";
  $scope.fullName = "";

  $scope.open1 = function() {
      $scope.popup1.opened = true;
  };


    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

  $scope.popup2 = {
      opened: false
  };
  $scope.confirm = function(){
    if($scope.v1!="" && $scope.v2!="" && $scope.v3!="" && $scope.v4!="" && $scope.validThru!="" && $scope.ccv!="" && $scope.fullName!="")
          $location.url('/confirm');
};



});
