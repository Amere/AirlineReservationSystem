/**
 * Flights Service
 */
lufthansa.factory('lufthansaServ', function ($http,$q, $timeout) {

    return {
        /*Add user */

         //responsible for updating the seatmap and reserving a seat
         reserveSeat:function(fn1,seat1){
           return $http.post('/api/updateSeat',{fn:fn1,sn:seat1});
         },
        /* Add reservation */
         addReservation:function(reservation){
           return $http.post('/api/addreservation',{reserv:reservation});
         },
        /* Get airports codes */
        getAirportCodes : function() {
            return $http.get('/api/data/codes',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        //example for secured endpoint
        getAirportCodesSecured : function() {
            return $http.get('/api/data/codes',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * Set selected Origin Airport
         */
        setSelectedOriginAirport : function(value) {
            this.selectedOriginAirport = value;
        },
        /**
         * Set Nationality
         */
        setSelectedNation : function(value) {
            this.selectedNation = value;
        },
        /**
         * Get Selected Origin Airport
         */
        getSelectedOriginAirport : function() {
            return this.selectedOriginAirport;
        },
        /**
         * Set Destination Airport
         */
        setSelectedDestinationAirport : function(value) {
            this.selectedDestinationAirport = value;
        },
        /**
         * get Destination Airport
         */
        getSelectedDestinationAirport : function() {
            return this.selectedDestinationAirport;
        },
        /**
         * set flight number for out going flights
         */
        setFlightNumberOutGoing : function(value) {
            this.flightNumber = value;
        },
        /**
         * get flight number for out going flights
         */
        getFlightNumberOutGoing : function() {
          //console.log(this.flightNumber+"**************************");
            return this.flightNumber;

        },
        /**
         * get Imp flag
         */
        getImpFlg : function(){
          return this.ImpFlg;
        },
        /**
         * set Imp flag
         */
        setImpFlg : function(val){
          this.ImpFlg = val;
        },
        /**
         * set outgoing date
         */
        setDateOutGoing : function(value) {
            this.departureDateTime = value;
        },
        /**
         * get outgoing date
         */
        getDateOutGoing : function() {
            return this.departureDateTime;
        },
        /**
         * set flight number for returning flights
         */
        setFlightNumberReturning : function(value) {
            this.flightNumber2 = value;

        },
        setFlight : function(value){
          this.flight = value;
        },
        /**
         * get flight number for returning flights
         */
        getFlightNumberReturning : function() {
            return this.flightNumber2;
        },
        /**
         * set Returning flight date
         */
        setDateReturning : function(value) {
            this.departureDateTime2 = value;
        },
        /**
         * get Returning flight date
         */
        getDateReturning : function() {
            return this.departureDateTime2;
        },
        /**
         * get Returning_Or_Outgoing flag
         */
        getReturning_Or_Outgoing : function() {
            return this.RetFlg;
        },
        /**
         * set Returning_Or_Outgoing flag
         */
        setReturning_Or_Outgoing : function(value) {
            this.RetFlg = value;
        },
        /**
         * get Offers
         */
        getOffers : function(){
            return $http.get('/api/data/offers',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * ROUND-TRIP SEARCH From Other companies
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param class - economy or business only
         * @returns {Array}
         */
        getRound : function (origin,destination,departingDate,returningDate,clas) {

          return  $http.get('/api/companies/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+clas+'/',{
              "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
              }
          });
        },
        /**
         * ROUND-TRIP SEARCH From DB
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @returns {Array}
         */
        getRound2 : function (origin,destination,departingDate,returningDate) {

          return  $http.get('/api/flights/searchSecure/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/',{
              "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
              }
          });
        },
        /**
         * One way SEARCH From Other companies
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param class - economy or business only
         * @returns {Array}
         */
        getOneWay : function (origin,destination,departingDate,clas) {

            return  $http.get('/api/companies/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+clas,{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * One way SEARCH From DB
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @returns {Array}
         */
        getOneWay2 : function (origin,destination,departingDate) {
            return  $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * get News
         */

        getNews : function(){
            return $http.get('/api/data/news',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * Get Aircraft End point API
         */
        getAircraftOut : function() {
            return $http.get('/api/data/aircraft/'+this.flightNumber+'/',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
            //return $http.get('/api/data/dummy');
        },
        /**
         * Get Aircraft End point API
         */
            getAircraftRet : function() {
            return $http.get('/api/data/aircraft/'+this.flightNumber2+'/',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'

                }
            });
            //return $http.get('/api/data/dummy');
        },
        /**
         * Get Slides End point API
         */
        getSlides :function(){
            return $http.get('/api/data/slides',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * Get Bookings End point API
         */
         getMyBookings : function(bookref){
            console.log("hereeeeeeeeeeeeee is the bookref"+bookref);
            return $http.get('/api/data/bookings/'+bookref,{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**

         */
        getPastFlights : function(bookref){

            return $http.get('api/data/pastFlights/'+bookref,{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * ROUND-TRIP SEARCH From Other Airline API
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param Class - economy or business only
         * @returns {Array}
         */
        getExternalFlightsRound : function(origin,destination,departingDate,returningDate,Class){
            var res =[];
            var ips = [];
            $http.get('/api/data/ips',{"headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }}

            ).success(function(result){
                ips= result;
                var i = 0;
                for( i = 0 ;i<ips.length;i++) {
                    $http.get(ips[i].ip + 'api/flights/search/' + origin + '/' + destination + '/' + departingDate + '/' + returningDate + '/' + Class + '?wt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE').success(function (dataOut) {
                       // console.log(dataOut.outgoingFlights[0]);
                        res=res.concat(dataOut);
                        if(i==ips.length){
                           // console.log(res[1].outgoingFlights[0]);
                            return res;
                        }
                    });
                }
            });

        },
        /**
         * Get Nationalities flights End point API
         */
        getNationss :  function() {
            return $http.get('api/data/nations',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
         getConfirmDummy : function() {
             return $http.get('/api/data/conf',{
                 "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                 }
             });
         },
        getFlight : function(){
            return $http.get('api/data/flight',{
                "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        getFlightData : function(){
            return this.flight;
        },
        /**
         * Set Seat
         */
        setSeat : function(value){
            this.seat=value;
        },
        /**
         * Set Seat Returning flights
         */
        setSeatR : function(value){
            this.seatR=value;
        },
        /**
         * Get Seat
         */
        getSeat : function() {
            return this.seat;
        },
        /**
         * get Seat Returning flights
         */
        getSeatR : function() {
            return this.seatR;
        },
        /**
         * Set Possible seats
         */
        setPossible : function(value){
          this.possible=value;
        },
        /**
         * Get Possible seats
         */
        getPossible : function(){
          return this.possible;
        },
        /**
         * Set Seat Class
         */
        setSeatClass : function(value){
          this.class=value;
        },
        /**
         * Set other companies flag
         */
        setOtherCompanies : function(flag){
          this.OtherCompaniesFlag=flag;
        },
        /**
         * get other companies flag
         */
        getOtherCompanies : function(){
          return this.OtherCompaniesFlag;
        },
        /**
         * Set Seat Class
         */
        getSeatClass_ : function(value){
          return this.class;
        },
        setReceipt2 :function(value){
          this.receipt2=value;
        },
        getReceipt2:function(){
          return this.receipt2;
        },
        /**
         * Redirect to landing page
         */
        toMain : function(){
          $http.get('/');
        },
        /**
        * Getters and Setters for user information
        */
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
        },
        /**
        * Flag for incomplete info
        */
        checkCompleteUserInfo : function(){
          if(this.firstName.length === 0 ||
             this.lastName.length === 0 ||
             this.email.length === 0 ||
             this.nationality.length === 0 ||
             this.dob.length === 0 ||
             this.expDate.length === 0){
               return false;
             }else{
               return true;
             }
        },
        // this method to clear all variables on canceling trip
        clearVariables : function(){
          this.selectedOriginAirport = "intial";
          this.selectedDestinationAirport = "intial";
        //  this.
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.nationality = "";
          this.dob = "";
          this.expDate = "";
          this.seat = undefined;
          this.possible = undefined;
          this.class = undefined;
          this.landingFlag = false;
          this.reservInfoFlag = false;
          this.paymentFlag = false;
          this.confirmFlag = false;
          this.OtherCompaniesFlag = false;
        },
        //return all the details of the user in a single option for confirnation page
        getCurrentUser:function(cb){
          var user={};
          user.fname=this.firstName;
          user.lname= this.lastName;
          user.email=this.email;
          user.dob=this.dob;
          user.nationality=this.nationality;
          user.expDate=this.expDate;
          cb(user);

        },
        // method responsible for adding a user record in the database

        setLandingFlag : function(){
          this.landingFlag = true;
        },
        setReservInfoFlag : function(){
          this.reservInfoFlag = true;
        },
        setPaymentFlag : function(){
          this.paymentFlag = true;
        },
        setConfirmFlag : function(){
          this.confirmFlag = true;
        },
        // return the reference number for this reservation
        getReceipt:function(){
          return this.receipt;
        },
        setPassNum :function(value){
          this.passNum = value ;
        },
        getPassNum :function(){
          return this.passNum;
        },
        setFlightIdReturning :function(value){
          this.flightIdRet=value;
        },
        getFlightIdReturning : function(){
          return this.flightIdRet;
        },
        sendStripeToken : function(token){
            var fname = this.getFirstName();
            var lname = this.getLastName();
            var passNumber = this.getPassNum();
            var passExp = this.getExpDate();
            var dateOfBir = this.getDOB();
            var nationality = this.getNationality();
            var flight = this.getFlightData();
            var email = this.getEmail();
            return $http.post('/booking',{
                "paymentToken" : token,
                "class": flight.class,  // (required)
                "cost": flight.cost, // (required)
                "outgoingFlightId": flight._id, // mongodb _id => 5NuiSNQdNcZwau92M (required)
                "returnFlightId": this.getFlightIdReturning(), // mongodb _id => 9DuiBNVjNcUwiu42J (required)
                "passengerDetails":[{
                    "firstName": fname, // (required)
                    "lastName": lname,  // (required)
                    "passportNum": passNumber, // (required)
                    "passportExpiryDate": passExp, // (optional)
                    "dateOfBirth": dateOfBir,  // (required)
                    "nationality": nationality, // (optional)
                    "email": email // (optional)
                }]
            });
        },
        sendStripeTokenOther : function(token){
          console.log(token+" test aaaaaaaaaaaaaaaa");
            var fname = this.getFirstName();
            var lname = this.getLastName();
            var passNumber = this.getPassNum();
            var passExp = this.getExpDate();
            var dateOfBir = this.getDOB();
            var nationality = this.getNationality();
            var flight = this.getFlightData();
            var email = this.getEmail();
            console.log("in service");
            console.log(fname);
            console.log(lname);
            console.log(passNumber);
            console.log(passExp);
            console.log(dateOfBir);
            console.log(nationality);
            return $http.post('/bookingOther',{
                "paymentToken" : token,
                "class": flight.class,  // (required)
                "cost": flight.cost, // (required)
                "outgoingFlightId": flight.flightId, // mongodb _id => 5NuiSNQdNcZwau92M (required)
                "returnFlightId": this.getFlightIdReturning(), // mongodb _id => 9DuiBNVjNcUwiu42J (required)
                "airline":flight.Airline,
                "passengerDetails":[{
                    "firstName": fname, // (required)
                    "lastName": lname,  // (required)
                    "passportNum": passNumber, // (required)
                    "passportExpiryDate": passExp, // (optional)
                    "dateOfBirth": dateOfBir,  // (required)
                    "nationality": nationality, // (optional)
                    "email": email // (optional)
                }]
            });
        },
        getPK : function(){
          var flight = this.getFlightData();
          console.log(flight.Airline);
          return $http.get('/stripe/Getpubkey',{
              "headers" :{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
            ,'airline':flight.Airline},

          });
        }


        // You can add here http get to you dummyData and get the result at the mainCtrl
        // Yous should make getters and setters for all your functions here
    };
});
