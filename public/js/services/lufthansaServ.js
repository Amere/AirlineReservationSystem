/**
 * Flights Service
 */
lufthansa.factory('lufthansaServ', function ($http) {
    return {
        /**
         * Get Airports codes
         */
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
         * get Offers
         */
        getOffers : function(){
            return $http.get('/api/data/offers');
        },
        /**
         * ROUND-TRIP SEARCH From DB
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param class - economy or business only
         * @returns {Array}
         */
        getRound : function (origin,destination,departingDate,returningDate) {

          return  $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate,{
              "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
              }
          });
        },
        /**
         * One way SEARCH From DB
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param class - economy or business only
         * @returns {Array}
         */
        getOneWay : function (origin,destination,departingDate) {
            return  $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * get News
         */

        getNews : function(){
            return $http.get('/api/data/news',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * Get Aircraft End point API
         */
        getAircraft : function() {
            return $http.get('/api/data/aircraft/AirbusA330-300',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
            //return $http.get('/api/data/dummy');
        },
        /**
         * Get Slides End point API
         */
        getSlides :function(){
            return $http.get('/api/data/slides');
        },
        /**
         * Get Bookings End point API
         */
        getBookings : function(){
            return $http.get('/api/data/bookings',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * Get Past flights End point API
         */
        getPastFlights : function(){
            return $http.get('api/data/pastFlights',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
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
            $http.get('/api/data/ips').success(function(result){
                ips= result;
            });
            console.log(ips[0]);
            var i = 0;                     //  set your counter to 1
            function myLoop () {           //  create a loop function
                setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                    var object = ips[i];
                    console.log(object);
                    var ip = object.ip;
                    var company = object.company;
                    res.push($http.get(ip+'/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+Class,{
                        "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                        }
                    }));
                    i++;                     //  increment the counter
                    if (i < ips.length) {            //  if the counter < 10, call the loop function
                        myLoop();             //  ..  again which will trigger another
                    }                        //  ..  setTimeout()
                }, 300)
            }
          try {
              myLoop();
          }catch (err){
              console.log('error will requesting API ');
          }
            //  start the loop
            return res ;
        },
        /**
         * One way SEARCH From Other Airline API
         * @param origin - Flight Origin Location - Airport Code
         * @param destination - Flight Destination Location - Airport Code
         * @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
         * @param class - economy or business only
         * @returns {Array}
         */
        getExternalFlightsOneWay : function(origin,destination,departingDate,Class){
            var res =[];
            var ips = [];
            $http.get('/api/data/ips').success(function(result){
            ips= result;
            });
            console.log(ips[0]);
            var i = 0;                     //  set your counter to 1
            function myLoop () {           //  create a loop function
                setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                    var object = ips[i];
                    console.log(object);
                    var ip = object.ip;
                    var company = object.company;
                    res.push($http.get(ip+'/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+Class,{
                        "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                        }
                    }));
                    i++;                     //  increment the counter
                    if (i < ips.length) {            //  if the counter < 10, call the loop function
                        myLoop();             //  ..  again which will trigger another
                    }                        //  ..  setTimeout()
                }, 300)
            }

            myLoop();                      //  start the loop
            return res ;
        },
        /**
         * Get Nationalities flights End point API
         */
        getNationss :  function() {
            return $http.get('api/data/nations',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
         getConfirmDummy : function() {
             return $http.get('/api/data/conf',{
                 "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                 }
             });
         },
        getFlight : function(){
            return $http.get('api/data/flight',{
                "headers" :{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjdXN0b21lciIsInN1YiI6Imx1ZnRoYW5zYSBhaXJsaW5lIHJlc2VydmF0aW9uIHN5c3RlbSIsIm5iZiI6MTQ2MDY2NDA1MiwiZXhwIjoxNDkyMjAwMDUyLCJpYXQiOjE0NjA2NjQwNTIsImp0aSI6Imx1ZnRoYW5zYSIsInR5cCI6InNlY3VyaXR5In0.FLLbC6QjABq4_7VH0Q8rY3PVnyVFy8vSiz4kg6bcQrE'
                }
            });
        },
        /**
         * Set Seat
         */
        setSeat : function(value){
            this.seat=value;
        },
        /**
         * Get Seat
         */
        getSeat : function() {
            return this.seat;
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
         * Set Seat Class
         */
        getSeatClass_ : function(value){
          return this.class;
        },
        /**
         * Redirect to landing page
         */
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
