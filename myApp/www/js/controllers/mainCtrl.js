/**
 * Our main Controller
 **/
lufthansa.controller('mainCtrl', function ($scope, lufthansaServ, $location, $document, $log,$state, $ionicPopup, $ionicLoading,$http) {
    /*----------- Angular Bootstrap Datepicker -----------*/
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
        $scope.dt2 = new Date(year, month, day);
    };
    /*----------- End of Datepicker -----------*/
    /*Flags to check whether it is a round trip flight or One way trip*/
    $scope.dt1Flag = true;
    $scope.dt2Flag = false;
    /*Flag for checkbox which is in landing page search box */
    $scope.chekboxFlag = false;
    /* Function to change checkbox flag when it is clicked  */
    $scope.flipCheck = function () {
        $scope.chekboxFlag = !$scope.chekboxFlag;
    };
    function setImp() {
        lufthansaServ.setImpFlg(0);
    };

    setImp();
    /* Function to set other Companies flag when checkbox's flg is true */
    $scope.setOtherCompaniesFlag = function () {
        lufthansaServ.setOtherCompanies($scope.chekboxFlag);
    };

    /* Flags to set the dates field to be visible by default round flag is false */
    $scope.one = true;
    $scope.round = false;
    /* Functions to set result tables flags with its corresponding flags */
    $scope.OneWayTable = function () {
        $scope.one = true;
        $scope.round = false;
    };
    $scope.RoundtripTable = function () {
        $scope.one = false;
        $scope.round = true;
    };

    /* Function to set Returning_Or_Outgoing flag in the service  */
    function outgoingFlagSetter() {
        lufthansaServ.setReturning_Or_Outgoing("Outgoing Only");
    }

    outgoingFlagSetter();
    $scope.format = $scope.formats[1];
    /* Function to set date picker pop up window */
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    /* Function to set One Way Flags  */
    $scope.OneWayFlags = function () {
        $scope.dt1Flag = true;
        $scope.dt2Flag = false;
        $scope.date2.date2=null;
        $scope.pick='seat class';
        lufthansaServ.setReturning_Or_Outgoing("Outgoing Only");
    };
    /* Function to set Round Trip Flags  */
    $scope.RoundtripFlags = function () {
        $scope.dt1Flag = true;
        $scope.dt2Flag = true;
        $scope.pick='seat class';
        lufthansaServ.setReturning_Or_Outgoing("Returning");
    };
    /* Function to clear variables in lufthansaServ */
    $scope.clearVars = function () {
        lufthansaServ.clearVariables();
    };
    /* Function to clear variables in lufthansaServ */
    function flushVars() {
        lufthansaServ.clearVariables();
    }

    flushVars();
    /* Function to set date picker pop up window */
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    /* Function to set dates */
    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
        $scope.dt2 = new Date(year, month, day);

    };
    /* Array of available classes */
    $scope.pick = 'seat class';
    $scope.classes = [
        'business',
        'economy'
    ];

    /* Flag for drop down menu */
    $scope.status = {
        isopen: false
    };
    /* Flags for tables that will be displayed after clicking search */

    $scope.oneWayTable = false;
    $scope.roundTripTable = false;
    /* function set One way trip flags that will display one way table */
    $scope.showOneWay = function () {
        if ($scope.oneWayTable == true) {
            $scope.oneWayTable = true;
        } else {
            $scope.oneWayTable = true;
        }
    };
    /* function set Round trip flags that will display one way table */
    $scope.showRoundTrip = function () {
        if ($scope.roundTripTable == true) {
            $scope.roundTripTable = true;
        } else {
            $scope.roundTripTable = true;
        }
    };
    /* function To toggle drop down menu flag */
    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
    /* function To set class */
    $scope.selectClass = function (item) {
        $scope.pick = item;
        console.log($scope.pick);
        lufthansaServ.setSeatClass(item);
    };
    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };
    /* function To set a flag to the landing page flag 'for security reason' */
    $scope.setLandingFlag = function () {
        lufthansaServ.setLandingFlag();
    };

    /* This will hide the DIV by default. */
    $scope.IsVisible = false;
    /* If DIV is visible it will be hidden and vice versa. */
    /* Also this function is responsible for selecting what the user is searching for */
    $scope.ShowHide = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            if (lufthansaServ.getSelectedDestinationAirport() != "intial" && lufthansaServ.getSelectedOriginAirport() != "intial") {
                $scope.IsVisible = true;
                if (lufthansaServ.getReturning_Or_Outgoing() == "Returning" && $scope.pick != "economy" && $scope.pick != "business") {
                    round2();
                } else if (lufthansaServ.getReturning_Or_Outgoing() == "Returning" && ($scope.pick == "economy" || $scope.pick == "business")) {

                    round();
                } else if (lufthansaServ.getReturning_Or_Outgoing() != "Returning" && $scope.pick != "economy" && $scope.pick != "business") {
                    oneWay2();
                } else {
                    oneWay();
                }

            }
        }
    };
    /* Google maps triger */
    $scope.IsVisible = false;
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide2 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }
    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide3 = function () {
        round();

    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide4 = function () {
        oneWay();

    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide5 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }

    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide6 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }

    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide7 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }

    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide8 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }

    };
    function directToMain() {
        lufthansaServ.toMain();
    };


    /* Retrieve List of News */
    function news() {
        lufthansaServ.getNews().success(function (News) {
            $scope.news = News;
        });
    };
    /* Record User's Selected Origin Airport */
    $scope.SetOriginAirport = function (originAirport) {
        lufthansaServ.setSelectedOriginAirport(originAirport);
    };
    $scope.selectedOrigin = function () {
        lufthansaServ.getSelectedOriginAirport();
    };
    /* Record User's Selected Destination Airport */
    $scope.SetDestinationAirport = function (destAirport) {
        lufthansaServ.setSelectedDestinationAirport(destAirport);
    };
    /* Find All Available Flights */
    $scope.SearchFlights = function () {
        $location.url('/return');
    };
    /* Function to save the reservation info and redirect user to the next stage */
    // $scope.goToReservation = function (out, ret) {
    //     lufthansaServ.setFlightNumberOutGoing(out);
    //     lufthansaServ.setFlightNumberReturning(ret);
    //     lufthansaServ.setDateOutGoing(angular.element('#date1').val() + " " + "07:00 PM");
    //     lufthansaServ.setDateReturning(angular.element('#date2').val() + " " + "07:00 PM");
    //     $location.url('/reservation');
    // };
    /* Function to set Iata to default values which is 'initial' */
    function setIata() {
        lufthansaServ.setSelectedOriginAirport("intial");
        lufthansaServ.setSelectedDestinationAirport("intial");
    };
    /* function to search round trip flights in the other companies */
    function round() {
        var origin = lufthansaServ.getSelectedOriginAirport();
        var destination = lufthansaServ.getSelectedDestinationAirport();
        var departingDate = angular.element('#date1').val();
        var returningDate = angular.element('#date2').val();
        var clas = $scope.pick;
        lufthansaServ.getRound(origin, destination, departingDate, returningDate, clas).success(function (result) {
            $scope.flights = result;
        });

    };
    /* function to search round trip flights in our database */
    function round2() {
        var origin = lufthansaServ.getSelectedOriginAirport();
        var destination = lufthansaServ.getSelectedDestinationAirport();
        var departingDate = angular.element('#date1').val();
        var returningDate = angular.element('#date2').val();
        lufthansaServ.getRound2(origin, destination, departingDate, returningDate).success(function (result) {
            $scope.flights = result;
        });
    };
    /* function to search one way trip flights in the other companies */
    function oneWay() {
        var origin = lufthansaServ.getSelectedOriginAirport();
        var destination = lufthansaServ.getSelectedDestinationAirport();
        var departingDate = angular.element('#date1').val();
        var clas = $scope.pick;
        lufthansaServ.getOneWay(origin, destination, departingDate, clas).success(function (result) {
            $scope.flights = result;
        });
    };
    /* function to search One way trips flights in Our database */
    var origin=lufthansaServ.getOr();
    var destination=lufthansaServ.getDest();
    var departingDate = lufthansaServ.getdate1();
    var returningDate=lufthansaServ.getdate2();
    var clas=lufthansaServ.getCl();
    if(origin!=null && destination!=null && departingDate!=null){
        // var origin = lufthansaServ.getSelectedOriginAirport();
        // var destination = lufthansaServ.getSelectedDestinationAirport();

       if(returningDate==null && clas=='seat class'){
         $scope.req = $http.get('/api/flights/search/:origin/:destination/:departingDate');

        console.log(origin + " "+ destination+" "+departingDate);
        lufthansaServ.getOneWay2(origin, destination, departingDate).success(function (result) {
            $scope.flights = result;

            console.log($scope.flights.outgoingFlights);
            console.log(result);
        });
      }else if(returningDate!=null && clas=='seat class'){
        $scope.req = $http.get('/api/flights/searchSecure/:origin/:destination/:departingDate/:returningDate/');

        lufthansaServ.getRound2(origin, destination, departingDate,returningDate).success(function (result) {
            $scope.flights = result;

            console.log($scope.flights.outgoingFlights);
            console.log(result);
        });
      }else if (returningDate==null && clas!='seat class') {
        $scope.req = $http.get('/api/companies/flights/search/:origin/:destination/:departingDate/:clas');
        lufthansaServ.getOneWay(origin, destination, departingDate,clas).success(function (result) {
            $scope.flights = result;

            console.log($scope.flights.outgoingFlights);
            console.log(result);
        });
      }else if (returningDate!=null && (clas=='economy' || clas=='business')) {
        $scope.req = $http.get('/api/companies/flights/search/:origin/:destination/:departingDate/:returningDate/:clas');
        lufthansaServ.getRound(origin, destination, departingDate,returningDate,clas).success(function (result) {
            $scope.flights = result;

            console.log($scope.flights.outgoingFlights);
            console.log(result);
        });
      }
    };

    /* Retrieve List of Airports Codes */
    function AirportCodes() {
        lufthansaServ.getAirportCodes().success(function (airports) {
            $scope.Airports = airports;
        });
    };
    /* landing page slides area options  */
    function slides() {
        $scope.myInterval = 5000;
        lufthansaServ.getSlides().success(function (Slides) {
            $scope.slides = Slides;
        });
        $scope.myInterval = 5000;
    };
    /* Retrieve List of Offers */
    function offers() {
        lufthansaServ.getOffers().success(function (Offers) {
            $scope.offers = Offers;
        });
    };

    /* helper function to convert a given moment date   */
    function convert(mom) {
        return moment(mom).format('YYYY-MM-DD');
    };
    setIata();

    /* Get offers on page render */
    offers();
    /* Get news on page render */
    news();
    $scope.or={};
    $scope.dest={};
    $scope.date1={};
    $scope.date2={};

    $scope.goToReservation=function () {
        // lufthansaServ.setFlightNumberOutGoing(out);
        // // lufthansaServ.setFlightNumberReturning(ret);
         lufthansaServ.setOr($scope.or.or);
         lufthansaServ.setDest($scope.dest.dest);
         lufthansaServ.setdate1($scope.date1.date1);
         if($scope.date2.date2 !=null){
           lufthansaServ.setdate2($scope.date2.date2);
         };
         lufthansaServ.setCl($scope.pick);
        // lufthansaServ.setDateReturning($scope.date2 + " " + "07:00 PM");
        // oneWay2();
        console.log($scope.pick);
        if ($scope.date2.date2 ==null && $scope.pick=='seat class' && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null) {
          $state.go('tab.landing-search');
        }else if($scope.date2.date2!=null && $scope.pick=='seat class' && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null){
          $state.go('tab.landing-search2');
        }else if($scope.pick!='seat class' && $scope.date2.date2 ==null && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null){
          $state.go('tab.landing-search3');
        }else if ($scope.pick!='seat class' && $scope.date2.date2 !=null && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null) {
          $state.go('tab.landing-search4');
        }

    };

    $scope.goToLanding= function(){
            $state.go('tab.landing');
        };
    $scope.goToInfo=function (fNum) {
         lufthansaServ.setFlightNumberOutGoing(fNum);
         lufthansaServ.setdate1(fdate);
    };
    $scope.goToInfo2=function (fNum,fNum2,fdate,fdate2) {
         lufthansaServ.setFlightNumberOutGoing(fNum);
        lufthansaServ.setFlightNumberReturning(fNum2);
        lufthansaServ.setdate1(fdate);
        lufthansaServ.setdate2(fdate2);
    };
    $scope.showAlert = function() {
if($scope.or.or==null){
  var alertPopup = $ionicPopup.alert({
     title: 'Title',
     template: 'Please enter an origin'
  });
}else if ($scope.dest.dest==null) {
  var alertPopup = $ionicPopup.alert({
     title: 'Input Field Required',
     template: 'Please enter a destination'
  });
}else if ($scope.date1.date1==null) {
  var alertPopup = $ionicPopup.alert({
     title: 'Title',
     template: 'Please enter a date'
  });
}


   alertPopup.then(function(res) {
      // Custom functionality....
   });
};
$scope.showLoading = function() {
   $ionicLoading.show({
      template: 'Loading...'
   });
};

$scope.hideLoading = function(){
   $ionicLoading.hide();
};

$scope.setClass=function () {
  $scope.pick='seat class';
};

    $scope.economy=function () {
      $scope.pick='economy';
    };
    $scope.business=function () {
      $scope.pick='business';
    };
    $scope.directToOutgoingFlights = function () {
        $location.url('/outgoingFlights');
    };
    /*-------------------Google maps stuff----------------------*/

    AirportCodes();
    slides();
});
