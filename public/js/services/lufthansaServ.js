/**
 * Flights Service
 */
lufthansa.factory('lufthansaServ', function ($http) {
    return {
        getAirportCodes : function() {
            return $http.get('/api/data/codes');
        },
        setSelectedOriginAirport : function(value) {
            this.selectedOriginAirport = value;
        },
        getSelectedOriginAirport : function() {
            return this.selectedOriginAirport;
        },
        setSelectedDestinationAirport : function(value) {
            this.selectedDestinationAirport = value;
        },
        getSelectedDestinationAirport : function() {
            return this.selectedDestinationAirport;
        },
        getOffers : function(){
            return $http.get('/api/data/offers');
        },
        getNews : function(){
            return $http.get('/api/data/news');
        },
        getReservDummy : function() {
            return $http.get('/api/data/flight');
            return $http.get('/api/data/dummy');
        },
        getSlides :function(){
            return $http.get('/api/data/slides');
        },
        getBookings : function(){
            return $http.get('/api/data/bookings');
        },
        getPastFlights : function(){
            return $http.get('api/data/pastFlights');
        },
        getBookings : function(){
            return $http.get('api/data/bookings');
        },
        getConfirmDummy : function() {
            return $http.get('/api/data/conf');
        },
        getFlight : function(){
            return $http.get('api/data/flight');
        }
        // You can add here http get to you dummyData and get the result at the mainCtrl
        // Yous should make getters and setters for all your functions here
    };
});
