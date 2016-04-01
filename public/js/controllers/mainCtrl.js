/**
 * Main Controller
 */
lufthansa.controller('mainCtrl', function($scope,lufthansaServ,$location) {

    /*----------- Angular Bootstrap Datepicker -----------*/
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

    /*----------- Angular Bootstrap Typeahead -----------*/

    /* Retrieve List of Airports Codes */
    function AirportCodes() {
        lufthansaServ.getAirportCodes().success(function(airports) {
            $scope.Airports = airports;
        });
    };
    /* Retrieve List of Offers */
    function offers(){
      lufthansaServ.getOffers().success(function(Offers){
         $scope.offers = Offers;
      });
    };
    /* Retrieve List of News */
    function news(){
        lufthansaServ.getNews().success(function(News){
            $scope.news = News;
        });
    };

    /* Record User's Selected Origin Airport  */
    $scope.SetOriginAirport = function(originAirport) {
        lufthansaServ.setSelectedOriginAirport(originAirport);
    };

    /* Record User's Selected Destination Airport  */
    $scope.SetDestinationAirport = function(destAirport) {
        lufthansaServ.setSelectedDestinationAirport(destAirport);
    };

    /* Find All Available Flights  */
    $scope.SearchFlights = function() {
        $location.url('/flights');
    };

    $scope.flip = (function ($) {
        $(document).ready(function () {
            var ratio = 0.5;
            $('.resized-splitflap')
                .splitFlap({
                    charWidth:  50 * ratio,
                    charHeight: 100 * ratio,
                    imageSize:  (2500 * ratio) + 'px ' + (100 * ratio) + 'px'
                });
        });
    })(jQuery);

    /* Get Airports on page render  */
    AirportCodes();
    /* Get offers on page render  */
    offers();
    /* Get news on page render  */
    news();




  $scope.directToReservation = function() {
    $location.url('/reservation');
  };
  $scope.directToOutgoingFlights = function() {
    $location.url('/outgoingFlights');
  };
  //Add the direction to your own partial function.
  //Just call this method to redirect to any other partial on your html
  //Add all your functions here
  //make Setters here for your functions and call them to lufthansaServ to
  //be accessable later by any scope and by any ctrl
  AirportCodes();
});
