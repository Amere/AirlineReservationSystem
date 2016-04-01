lufthansa.controller('paymentCtrl',function($scope){
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];

  $scope.open1 = function() {
      $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
      $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
  };

  $scope.popup1 = {
      opened: false
  };

  $scope.popup2 = {
      opened: false
  };
});
