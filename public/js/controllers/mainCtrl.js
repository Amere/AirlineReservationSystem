/**
 * Our main Controller
 **/
lufthansa.controller('mainCtrl', function ($scope, lufthansaServ, $location, $document, $log, smoothScroll, moment) {
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
    }

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
        lufthansaServ.setReturning_Or_Outgoing("Outgoing Only");
    };
    /* Function to set Round Trip Flags  */
    $scope.RoundtripFlags = function () {
        $scope.dt1Flag = true;
        $scope.dt2Flag = true;
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
                var element = document.getElementById('flightss');
                var options = {
                    duration: 2000
                };
                smoothScroll(element, options);
            }
        }
    };
    /* Google maps triger */
    $scope.resizeMap = function () {
        google.maps.event.trigger(map, 'resize');
    };
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
        var element = document.getElementById('go');
        var options = {
            duration: 1300
        };
        smoothScroll(element, options);
    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide4 = function () {
        oneWay();
        var element = document.getElementById('go2');
        var options = {
            duration: 1300
        };
        smoothScroll(element, options);
    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide5 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }
        var element = document.getElementById('go3');
        var options = {
            duration: 1300
        };
        smoothScroll(element, options);
    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide6 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }
        var element = document.getElementById('offers');
        var options = {
            duration: 1300
        };
        smoothScroll(element, options);
    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide7 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }
        var element = document.getElementById('news');
        var options = {
            duration: 1300
        };
        smoothScroll(element, options);
    };
    //If DIV is visible it will be hidden and vice versa.
    $scope.ShowHide8 = function () {
        if ($scope.IsVisible == true) {
            $scope.IsVisible = false;
        } else {
            $scope.IsVisible = true;
        }
        var element = document.getElementById('contacts');
        var options = {
            duration: 1300
        };
        smoothScroll(element, options);
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
    function oneWay2() {
        var origin = lufthansaServ.getSelectedOriginAirport();
        var destination = lufthansaServ.getSelectedDestinationAirport();
        var departingDate = angular.element('#date1').val();
        lufthansaServ.getOneWay2(origin, destination, departingDate).success(function (result) {
            $scope.flights = result;
        });
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
    $scope.goToReservation = function (out, flight,flightIdRet,ret) {
        lufthansaServ.setFlightNumberOutGoing(out);
        lufthansaServ.setFlightNumberReturning(ret);
        lufthansaServ.setFlightIdReturning(flightIdRet);
        lufthansaServ.setFlight(flight);
        //console.log(flight._id);
        //console.log(flightIdRet);
        lufthansaServ.setDateOutGoing(angular.element('#date1').val() + " " + "07:00 PM");
        lufthansaServ.setDateReturning(angular.element('#date2').val() + " " + "07:00 PM");
        $location.url('/reserv1');

    };
    $scope.directToOutgoingFlights = function () {
        $location.url('/outgoingFlights');
    };
    /*-------------------Google maps stuff----------------------*/
    var myCenter = new google.maps.LatLng(30.078114, 31.629798);

    function initialize() {
        mapProp = {
            center: myCenter,
            zoom: 5,
            scrollwheel: true,
            draggable: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapProp);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(30.078114, 31.629798),
        });
    }

    $scope.googleMap = google.maps.event.addDomListener(window, 'load', initialize);
    function putMarkerOrigin(lon, lat) {
        if ($scope.map == null)
            $scope.map = new google.maps.Map(document.getElementById("map"), mapProp);
        var lonlat = new google.maps.LatLng(lon, lat);
        var marker = new google.maps.Marker({
            position: lonlat,
            title: 'Your Location',
            draggable: true,
            map: $scope.map
        });
    }

    $scope.putMarkerO = function (lon, lat) {
        putMarkerOrigin(lon, lat);
    }
    function putMarkerDest(lon, lat) {
        if ($scope.map == null)
            $scope.map = new google.maps.Map(document.getElementById("map"), mapProp);
        var lonlat = new google.maps.LatLng(lon, lat);
        var marker = new google.maps.Marker({
            position: lonlat,
            title: 'Target Location',
            draggable: true,
            map: $scope.map
        });
        $scope.map.setCenter(lonlat);
        $scope.map.setZoom(12);
    }

    $scope.putMarkerD = function (lon, lat) {
        putMarkerDest(lon, lat);
    };
    AirportCodes();
    slides();
});
