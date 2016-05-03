/**
 * Our main Controller
 **/
lufthansa.controller('mainCtrl', function ($scope, lufthansaServ , $document, $log,$state, $ionicPopup, $ionicLoading,$http,$ionicTabsDelegate,$cordovaVibration,$ionicPlatform) {
    /*----------- Angular Bootstrap Datepicker -----------*/
    $scope.goToLanding= function(){
            $state.go('tab.landing');
    };



    $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    };

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    };

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
    $scope.chekboxFlag={};
    $scope.chekboxFlag.chekboxFlag=false;
    lufthansaServ.setOtherCompanies($scope.chekboxFlag.chekboxFlag);

    //$scope.chekboxFlag.chekboxFlag=false;
    /* Function to change checkbox flag when it is clicked  */
    $scope.flipCheck = function () {
        //$scope.chekboxFlag.chekboxFlag = !$scope.chekboxFlag.chekboxFlag;
        console.log($scope.chekboxFlag.chekboxFlag);
        if ($scope.chekboxFlag.chekboxFlag==false) {
          $scope.chekboxFlag.chekboxFlag=true
        }else{
          $scope.chekboxFlag.chekboxFlag=false

        }
        lufthansaServ.setOtherCompanies($scope.chekboxFlag.chekboxFlag);
        console.log(lufthansaServ.getOtherCompanies());
    };
    function setImp() {
        lufthansaServ.setImpFlg(0);
    };

    setImp();
    /* Function to set other Companies flag when checkbox's flg is true */
    $scope.setOtherCompaniesFlag = function () {
        lufthansaServ.setOtherCompanies($scope.chekboxFlag.chekboxFlag);
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
    };

    outgoingFlagSetter();
    $scope.format = $scope.formats[1];
    /* Function to set date picker pop up window */
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    /* Function to set One Way Flags  */
    $scope.OneWayFlags = function () {
    //   $ionicPlatform.ready( function(){
    // //  $cordovaVibration.vibrate(100);
    // });
      //$cordovaVibration.vibrate(100);
        $scope.dt1Flag = true;
        $scope.dt2Flag = false;
        $scope.date2.date2=null;
        $scope.pick='seat class';
        lufthansaServ.setReturning_Or_Outgoing("Outgoing Only");
    };
    /* Function to set Round Trip Flags  */
    $scope.RoundtripFlags = function () {
    //   $ionicPlatform.ready( function(){
    //   //$cordovaVibration.vibrate(100);
    // });
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
    };

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
      //  console.log($scope.pick);
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

    /* Google maps triger */
    $scope.IsVisible = false;
    //If DIV is visible it will be hidden and vice versa.

    //If DIV is visible it will be hidden and vice versa.

    //If DIV is visible it will be hidden and vice versa.

    //If DIV is visible it will be hidden and vice versa.

    //If DIV is visible it will be hidden and vice versa.

    //If DIV is visible it will be hidden and vice versa.

    //If DIV is visible it will be hidden and vice versa.




    /* Retrieve List of News */

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
    function round1() {
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

       if(returningDate==null && clas=='seat class' && origin !=null && destination!=null && departingDate!=null){
         $scope.req = lufthansaServ.getOneWay2(origin, destination, departingDate);

      //  console.log(origin + " "+ destination+" "+departingDate);
        $scope.req.success(function (result) {
            $scope.flights = result;

            // console.log($scope.flights.outgoingFlights);
            // console.log(result);
        });
      }else if(returningDate!=null && clas=='seat class' && origin !=null && destination!=null && departingDate!=null){
        $scope.req = lufthansaServ.getRound2(origin, destination, departingDate,returningDate);

        $scope.req.success(function (result) {
            $scope.flights = result;

            // console.log($scope.flights.outgoingFlights);
            // console.log(result);
        });
      }else if (returningDate==null && clas!='seat class' && origin !=null && destination!=null && departingDate!=null) {
       $scope.req = lufthansaServ.getOneWay(origin, destination, departingDate,clas);
        $scope.req.success(function (result) {
            $scope.flights = result;

            // console.log($scope.flights.outgoingFlights);
            // console.log(result);
        });
      }else if (returningDate!=null && (clas=='economy' || clas=='business') && origin !=null && destination!=null && departingDate!=null) {
        $scope.req = lufthansaServ.getRound(origin, destination, departingDate,returningDate,clas);
        $scope.req.success(function (result) {
            $scope.flights = result;

            // console.log($scope.flights.outgoingFlights);
            // console.log(result);
        });
      }
    }
    /* Retrieve List of Airports Codes */
    // function AirportCodes() {
    //     lufthansaServ.getAirportCodes().success(function (airports) {
    //         $scope.Airports = airports;
    //     });
    // };
    /* landing page slides area options  */

    /* Retrieve List of Offers */

    /* helper function to convert a given moment date   */

    setIata();

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
      //  console.log($scope.pick);
        if ($scope.date2.date2 ==null && $scope.pick=='seat class' && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null) {
          $state.go('tab.landing-search');
      //    $scope.chekboxFlag = false;
        }else if($scope.date2.date2!=null && $scope.pick=='seat class' && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null){
          $state.go('tab.landing-search2');
        //  $scope.chekboxFlag = false;
        }else if($scope.pick!='seat class' && $scope.date2.date2 ==null && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null){
      //    lufthansaServ.setOtherCompanies(true);
          $state.go('tab.landing-search3');
      //    $scope.chekboxFlag = true;
        }else if ($scope.pick!='seat class' && $scope.date2.date2 !=null && $scope.or.or!=null && $scope.dest.dest!=null && $scope.date1.date1!=null) {
         //lufthansaServ.setOtherCompanies(true);
          $state.go('tab.landing-search4');
        //  $scope.chekboxFlag = true;
        }
        console.log($scope.chekboxFlag.chekboxFlag);


      // });
    };

    $scope.goToLanding= function(){
            $state.go('tab.landing');
    };
    $scope.goToInfo=function (fNum,fdate,flight) {
      // $ionicPlatform.ready( function(){
      // //$cordovaVibration.vibrate(100);
      // });
         lufthansaServ.setFlightNumberOutGoing(fNum);
         lufthansaServ.setdate1(fdate);
         lufthansaServ.setFlight(flight);
    };
    $scope.goToInfo2=function (fNum,fdate,fNum2,fdate2,flight,retFlightId) {
      // $ionicPlatform.ready( function(){
      // $cordovaVibration.vibrate(100);
      // });
      lufthansaServ.setReturning_Or_Outgoing("Returning");
         lufthansaServ.setFlightNumberOutGoing(fNum);
        lufthansaServ.setFlightNumberReturning(fNum2);
        lufthansaServ.setdate1(fdate);
        lufthansaServ.setdate2(fdate2);
        lufthansaServ.setFlight(flight);
        //lufthansaServ.setFlightIdReturning(retFlightId);
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
};
// $scope.showLoading = function() {
//    $ionicLoading.show({
//       template: 'Loading...'
//    });
// };
//
// $scope.hideLoading = function(){
//    $ionicLoading.hide();
// };

$scope.setClass=function () {
  // $ionicPlatform.ready( function(){
  // $cordovaVibration.vibrate(100);
  // });
   $scope.pick='seat class';
};
    $scope.economy=function () {
      // $ionicPlatform.ready( function(){
      // $cordovaVibration.vibrate(100);
      // });
         $scope.pick='economy';
    };
    $scope.business=function () {
      // $ionicPlatform.ready( function(){
      // $cordovaVibration.vibrate(100);
      // });
        $scope.pick='business';
    };
    $scope.onSelect = function(item){
      // $ionicPlatform.ready( function(){
      // $cordovaVibration.vibrate(100);
      // });
        $scope.or.or=item.iata;
        //console.log('item', item.iata);
    };
    $scope.onSelect2 = function(item){
      // $ionicPlatform.ready( function(){
      // $cordovaVibration.vibrate(100);
      // });
        $scope.dest.dest=item.iata;
        //console.log('item', item.iata);
    };

    $scope.Airports = [
      {
          "iata": "MXP",
          "lon": "8.71237",
          "iso": "IT",
          "status": 1,
          "name": "Malpensa International Airport",
          "continent": "EU",
          "type": "airport",
          "lat": "45.627403",
          "size": "large"
      },{
          "iata": "FCO",
          "lon": "12.250346",
          "iso": "IT",
          "status": 1,
          "name": "Leonardo Da Vinci (Fiumicino) International Airport",
          "continent": "EU",
          "type": "airport",
          "lat": "41.794594",
          "size": "large"
      },{
          "iata": "JED",
          "lon": "39.150578",
          "iso": "SA",
          "status": 1,
          "name": "King Abdulaziz International Airport",
          "continent": "AS",
          "type": "airport",
          "lat": "21.670233",
          "size": "large"
      },{
          "iata": "CAI",
          "lon": "31.40647",
          "iso": "EG",
          "status": 1,
          "name": "Cairo International Airport",
          "continent": "AF",
          "type": "airport",
          "lat": "30.120106",
          "size": "large"
      },{
          "iata": "BOM",
          "lon": "72.87497",
          "iso": "IN",
          "status": 1,
          "name": "Chhatrapati Shivaji International Airport",
          "continent": "AS",
          "type": "airport",
          "lat": "19.095509",
          "size": "large"
      },{
            "iata": "DEL",
            "lon": "77.10079",
            "iso": "IN",
            "status": 1,
            "name": "Indira Gandhi International Airport",
            "continent": "AS",
            "type": "airport",
            "lat": "28.556555",
            "size": "large"
        },{
            "iata": "HKG",
            "iso": "HK",
            "status": 0,
            "name": "Hong Kong International Airport Kai Tak",
            "continent": "AS",
            "type": "closed",
            "size": null
        },{
            "iata": "TPE",
            "lon": "121.22389",
            "iso": "TW",
            "status": 1,
            "name": "Taiwan Taoyuan International Airport",
            "continent": "AS",
            "type": "airport",
            "lat": "25.07639",
            "size": "large"
        },{
            "iata": "JNB",
            "lon": "28.231314",
            "iso": "ZA",
            "status": 1,
            "name": "OR Tambo International Airport",
            "continent": "AF",
            "type": "airport",
            "lat": "-26.132664",
            "size": "large"
        },
        {
            "iata": "CPT",
            "lon": "18.596489",
            "iso": "ZA",
            "status": 1,
            "name": "Cape Town International Airport",
            "continent": "AF",
            "type": "airport",
            "lat": "-33.968906",
            "size": "large"
        },
        {
            "iata": "RUH",
            "lon": "46.702877",
            "iso": "SA",
            "status": 1,
            "name": "King Khaled International Airport",
            "continent": "AS",
            "type": "airport",
            "lat": "24.95929",
            "size": "large"
        },
        {
            "iata": "LHR",
            "lon": "-0.453566",
            "iso": "GB",
            "status": 1,
            "name": "London Heathrow Airport",
            "continent": "EU",
            "type": "airport",
            "lat": "51.469604",
            "size": "large"
        },
        {
            "iata": "JFK",
            "lon": "-73.78817",
            "iso": "US",
            "status": 1,
            "name": "John F Kennedy International Airport",
            "continent": "NA",
            "type": "airport",
            "lat": "40.642334",
            "size": "large"
        },{
            "iata": "LCF",
            "lon": "-88.94778",
            "iso": "GT",
            "status": 1,
            "name": "Las Vegas Airport",
            "continent": "NA",
            "type": "airport",
            "lat": "15.667778",
            "size": "small"
        },
        {
            "iata": "LAX",
            "lon": "-118.40828",
            "iso": "US",
            "status": 1,
            "name": "Los Angeles International Airport",
            "continent": "NA",
            "type": "airport",
            "lat": "33.943398",
            "size": "large"
        },
        {
            "iata": "SFO",
            "lon": "-122.38988",
            "iso": "US",
            "status": 1,
            "name": "San Francisco International Airport",
            "continent": "NA",
            "type": "airport",
            "lat": "37.615215",
            "size": "large"
        },
        {
            "iata": "FRA",
            "lon": "8.570773",
            "iso": "DE",
            "status": 1,
            "name": "Frankfurt am Main International Airport",
            "continent": "EU",
            "type": "airport",
            "lat": "50.050735",
            "size": "large"
        },
        {
            "iata": "TXL",
            "lon": "13.291722",
            "iso": "DE",
            "status": 1,
            "name": "Berlin-Tegel International Airport",
            "continent": "EU",
            "type": "airport",
            "lat": "52.553944",
            "size": "large"
        },
        {
            "iata": "LIN",
            "lon": "9.279157",
            "iso": "IT",
            "status": 1,
            "name": "Linate Airport",
            "continent": "EU",
            "type": "airport",
            "lat": "45.460957",
            "size": "large"
        }
    ]
  //  AirportCodes();

  });
