/**
 * Main Controller
 */
lufthansa.controller('res1Ctrl', function ($scope, lufthansaServ, $location, $state) {

    /*----------- Angular Bootstrap Datepicker -----------*/
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    /*variables set to be sent to database*/
    $scope.costumer = [];
    $scope.costumer.firstName = "";
    $scope.costumer.lastName = "";
    $scope.costumer.email = "";
    $scope.costumer.nationality = "";
    $scope.costumer.dob = "";
    $scope.costumer.expDate = "";
    $scope.costumer.passNum="";

    $scope.open1 = function () {
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
    //This will hide the DIV by default.
    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    };
    $scope.SetNation = function (item) {
        lufthansaServ.setSelectedNation(item);
    };
    $scope.seats = function(){
     if($scope.costumer.firstName!= "" && $scope.costumer.lastName!="" && $scope.costumer.email != ""&&
       $scope.costumer.nationality!="" && $scope.costumer.expDate!="" && $scope.costumer.dob!="") {
        var flag = lufthansaServ.getOtherCompanies();
        console.log(flag);
        if(flag==false){
          console.log("************");
        $state.go('tab.landing-reservation')
        }else{
          console.log("//////////////////");
          $state.go('tab.landing-payment')
        }
     }
    };
    $scope.setReservInfoFlag = function(){
      lufthansaServ.setReservInfoFlag();
    };

    $scope.setUserInfo = function(){
      lufthansaServ.setFirstName($scope.costumer.firstName);
      console.log($scope.costumer.firstName);
      lufthansaServ.setLastName($scope.costumer.lastName);
      console.log($scope.costumer.lastName);
      lufthansaServ.setEmail($scope.costumer.email);
      console.log($scope.costumer.email);
      lufthansaServ.setNationality($scope.costumer.nationality);
      console.log($scope.costumer.nationality);
      lufthansaServ.setDOB($scope.costumer.dob);
      console.log($scope.costumer.dob);
      lufthansaServ.setExpDate($scope.costumer.expDate);
      console.log($scope.costumer.expDate);
      lufthansaServ.setPassNum($scope.costumer.passNum);
      console.log($scope.costumer.passNum);

    };

    /*----------- Angular Bootstrap Typeahead -----------*/

    /* Retrieve List of Nationalities  */
    function nations() {
        lufthansaServ.getNationss().success(function (Nat) {
            $scope.nations = Nat;
        });
    };
  //  nations();

});
