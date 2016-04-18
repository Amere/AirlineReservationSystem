/**
 * Main Controller
 */
lufthansa.controller('res1Ctrl', function ($scope, lufthansaServ, $location) {

    /*----------- Angular Bootstrap Datepicker -----------*/
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    /*variables set to be sent to database*/
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.email = "";
    $scope.nationality = "";
    $scope.dob = "";
    $scope.expDate = "";

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
      console.log(lufthansaServ.checkCompleteUserInfo());
      if($scope.firstName!= null && $scope.lastName!=null && $scope.email && $scope.nationality!=null && $scope.expDate!=null && $scope.dob!=null) {
          $location.url('/reservation');
      }
    };


    $scope.setUserInfo = function(){
      lufthansaServ.setFirstName($scope.firstName);
      lufthansaServ.setLastName($scope.lastName);
      lufthansaServ.setEmail($scope.email);
      lufthansaServ.setNationality($scope.nationality);
      lufthansaServ.setDOB($scope.dob);
      lufthansaServ.setExpDate($scope.expDate);
  //      lufthansaServ.getCurrentUser();

    }


    /*----------- Angular Bootstrap Typeahead -----------*/

    /* Retrieve List of Nationalities  */
    function nations() {
        lufthansaServ.getNationss().success(function (Nat) {
            $scope.nations = Nat;
        });
    };
    nations();

    /* Retrieve List of Offers */


});
