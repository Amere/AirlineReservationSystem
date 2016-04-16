/**
 * Flights Service
 */
lufthansa.factory('lufthansaServ', function ($http) {
    return {
        getAirportCodes : function() {
            return $http.get('/api/data/codes');
        },
        //example for secured endpoint
        getAirportCodesSecured : function() {
            return $http.get('/api/data/codes',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        setSelectedOriginAirport : function(value) {
            this.selectedOriginAirport = value;
        },
        setSelectedNation : function(value) {
            this.selectedNation = value;
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
        getRound : function (origin,destination,departingDate,returningDate) {
          return  $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate);//,{params:{"origin": origin, "destination": destination,"departingDate":departingDate,"returningDate":returningDate}});
        },

        getNews : function(){
            return $http.get('/api/data/news');
        },
        getAircraft : function() {
            return $http.get('/api/data/aircraft/AirbusA330-300');
            //return $http.get('/api/data/dummy');
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

        getNationss :  function() {
            return $http.get('api/data/nations');
        },
        // getConfirmDummy : function() {
        //     return $http.get('/api/data/conf',{
        //         "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
        //         }
        //     });
        // },
        getFlight : function(){
            return $http.get('api/data/flight');
        },
        setSeat : function(value){
            this.seat=value;
        },
        getSeat : function() {
            return this.seat;
        },
        setPossible : function(value){
          this.possible=value;
        },
        getPossible : function(){
          return this.possible;
        },
        setSeatClass : function(value){
          this.class=value;
        },
        getSeatClass_ : function(value){
          return this.class;
        },
        toMain : function(){
          $http.get('/');
        },
        setFirstName : function(fn){
          this.firstName = fn ;
        },
        getFirstName : function(){
          return this.firstName;
        },
        setLastName : function(ln){
          this.lastName = ln;
        },
        getLastName : function(){
          return this.lastName;
        },
        setEmail : function(e){
          this.email = e;
        },
        getEmail : function(){
          return this.email;
        },
        setNationality : function(n){
          this.nationality = n;
        },
        getNationality : function(){
          return this.nationality;
        },
        setDOB : function(dateOfBirth){
          this.dob = dateOfBirth;
        },
        getDOB : function(){
          return this.dob;
        },
        setExpDate : function(ed){
          this.expDate = ed;
        },
        getExpDate : function(){
          return this.expDate;
        }
        // You can add here http get to you dummyData and get the result at the mainCtrl
        // Yous should make getters and setters for all your functions here
    };
});
