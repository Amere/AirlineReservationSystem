/**
 * Main Controller
 */
lufthansa.controller('res1Ctrl', function ($scope, lufthansaServ, $location, $state, $ionicPopup) {

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
     }else{
       showAlert();
     }
    };
    $scope.setReservInfoFlag = function(){
      lufthansaServ.setReservInfoFlag();
    };

    $scope.setUserInfo = function(){
      lufthansaServ.setFirstName($scope.firstName);
      console.log($scope.costumer.firstName);
      lufthansaServ.setLastName($scope.lastName);
      console.log($scope.costumer.lastName);
      lufthansaServ.setEmail($scope.email);
      console.log($scope.costumer.email);
      lufthansaServ.setNationality($scope.nationality);
      console.log($scope.costumer.nationality);
      lufthansaServ.setDOB($scope.dob);
      console.log($scope.costumer.dob);
      lufthansaServ.setExpDate($scope.expDate);
      console.log($scope.costumer.expDate);
      lufthansaServ.setPassNum($scope.passNum);
      console.log($scope.costumer.passNum);

    };

    /*----------- Angular Bootstrap Typeahead -----------*/

    /* Retrieve List of Nationalities  */
    function nations() {
        lufthansaServ.getNationss().success(function (Nat) {
            $scope.nations = Nat;
        });
    };
    showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Missing Data',
         template: 'please enter missing fields'
       });

       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };
  //  nations();

});
