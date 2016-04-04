/**
 * Main Controller
 */
lufthansa.controller('mainCtrl', function($scope,lufthansaServ,$location,$document,smoothScroll) {

    /*----------- Angular Bootstrap Datepicker -----------*/
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

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
                //This will hide the DIV by default.
                $scope.IsVisible = false;
                $scope.ShowHide = function () {
                    //If DIV is visible it will be hidden and vice versa.
                    if($scope.IsVisible==true){
                      $scope.IsVisible = true;
                    }else{
                      $scope.IsVisible = true;
                       google.maps.event.trigger(window,'resize',{});
                       var element = document.getElementById('flightss');
                       var options = {
                      duration: 2000

                      }

                        smoothScroll(element,options);

                    }
                };
                $scope.IsVisible = false;
                $scope.ShowHide2 = function () {
                    //If DIV is visible it will be hidden and vice versa.
                    if($scope.IsVisible==true){
                      $scope.IsVisible = false;
                    }else{
                      $scope.IsVisible = true;
                    }
                };
                $scope.ShowHide3 = function () {
                    //If DIV is visible it will be hidden and vice versa.
                    var element = document.getElementById('go');
                    var options = {
                   duration: 1300
                   }
                     smoothScroll(element,options);
                 };
                 $scope.ShowHide4 = function () {
                     //If DIV is visible it will be hidden and vice versa.
                     var element = document.getElementById('go2');
                     var options = {
                    duration: 1300
                    }
                      smoothScroll(element,options);
                  };
                  $scope.ShowHide5 = function () {
                      //If DIV is visible it will be hidden and vice versa.
                      if($scope.IsVisible==true){
                        $scope.IsVisible = false;
                      }else{
                        $scope.IsVisible = true;
                      }
                      var element = document.getElementById('go3');
                      var options = {
                     duration: 1300
                     }
                       smoothScroll(element,options);
                   };
                   $scope.ShowHide6 = function () {
                       //If DIV is visible it will be hidden and vice versa.
                       if($scope.IsVisible==true){
                         $scope.IsVisible = false;
                       }else{
                         $scope.IsVisible = true;
                       }
                       var element = document.getElementById('offers');
                       var options = {
                      duration: 1300
                      }
                        smoothScroll(element,options);
                    };
                    $scope.ShowHide7 = function () {
                        //If DIV is visible it will be hidden and vice versa.
                        if($scope.IsVisible==true){
                          $scope.IsVisible = false;
                        }else{
                          $scope.IsVisible = true;
                        }
                        var element = document.getElementById('news');
                        var options = {
                       duration: 1300
                       }
                         smoothScroll(element,options);
                     };     $scope.ShowHide8 = function () {
                              //If DIV is visible it will be hidden and vice versa.
                              if($scope.IsVisible==true){
                                $scope.IsVisible = false;
                              }else{
                                $scope.IsVisible = true;
                              }
                              var element = document.getElementById('contacts');
                              var options = {
                             duration: 1300
                             }
                               smoothScroll(element,options);
                           };


    function directToMain(){
      lufthansaServ.toMain();
    }

    /*----------- Angular Bootstrap Typeahead -----------*/

    /* Retrieve List of Airports Codes */
    function AirportCodes() {
        lufthansaServ.getAirportCodes().success(function(airports) {
            $scope.Airports = airports;
        });
    };


    function slides() {
        $scope.myInterval = 5000;
        lufthansaServ.getSlides().success(function(Slides) {
            $scope.slides = Slides;
        });
        $scope.myInterval = 5000;

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

   $scope.selectedOrigin=function(){
       lufthansaServ.getSelectedOriginAirport();
   };

    /* Record User's Selected Destination Airport  */
    $scope.SetDestinationAirport = function(destAirport) {
        lufthansaServ.setSelectedDestinationAirport(destAirport);
    };

    /* Find All Available Flights  */
    $scope.SearchFlights = function() {
        $location.url('/return');
    };
    $scope.goToReservation = function() {
        $location.url('/reservation');
    };
    $scope.flip = function(){
        $(document).ready(function () {
            var ratio = 0.5;
            $('.resized-splitflap')
                .splitFlap({
                    charWidth:  50 * ratio,
                    charHeight: 100 * ratio,
                    imageSize:  (2500 * ratio) + 'px ' + (100 * ratio) + 'px'
                });
        });
    };
    $scope.flip();









    /* Get offers on page render  */
    offers();
    /* Get news on page render  */
    news();




  $scope.goToReservation = function() {
    $location.url('/reserv1');
  };
  $scope.directToOutgoingFlights = function() {
    $location.url('/outgoingFlights');
  };
  var myCenter = new google.maps.LatLng(30.078114, 31.629798);

  function initialize() {
  var mapProp = {
    center:myCenter,
    zoom:5,
    scrollwheel:true,
    draggable:true,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };


  $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var marker = new google.maps.Marker({
    position:new google.maps.LatLng(30.078114, 31.629798),
    });
  }

  $scope.googleMap = google.maps.event.addDomListener(window, 'load', initialize);

  function putMarkerOrigin(lon, lat){
    if($scope.map === null)
    $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  //  console.log($scope.map);
    var lonlat = new google.maps.LatLng(lon, lat);
    var marker = new google.maps.Marker({
      position:lonlat,
      title:'Your Location',
      draggable:true,
      map:$scope.map
    });
  }
  $scope.putMarkerO = function(lon, lat){
    putMarkerOrigin(lon, lat);
  }


  function putMarkerDest(lon, lat){
    console.log($scope.map);
    var lonlat = new google.maps.LatLng(lon, lat);
    var marker = new google.maps.Marker({
      position:lonlat,
      title:'Target Location',
      draggable:true,
      map:$scope.map
    });
    $scope.map.setCenter(lonlat);
    $scope.map.setZoom(12);
  }
  $scope.putMarkerD = function(lon, lat){
    putMarkerDest(lon, lat);
  }
  //Add the direction to your own partial function.
  //Just call this method to redirect to any other partial on your html
  //Add all your functions here
  //make Setters here for your functions and call them to lufthansaServ to
  //be accessable later by any scope and by any ctrl
  AirportCodes();
    slides();
    $scope.flights=[
      {
        "aircraft" : {
        "name" : "Airbus A330-300",
        "economySeatsCount" : 60,
        "premiumEconomySeatsCount" : 30,
        "BusinessSeatsCount" : 12,
        "firstSeatsCount" : 8,
        "economeySeats" : [
          [
          {
            "class":"economy",
            "seatCode" : "k1",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k2",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k3",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k4",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k5",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k6",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k7",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k8",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k9",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "k10",
            "reserved" : "false"
          }
          ],[{
            "class":"economy",
            "seatCode" : "l1",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l2",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l3",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l4",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l5",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l6",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l7",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l8",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l9",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "l10",
            "reserved" : "false"
          }],[{
            "class":"economy",
            "seatCode" : "m1",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m2",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m3",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m4",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m5",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m6",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m7",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m8",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m9",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "m10",
            "reserved" : "false"
          }],[{
            "class":"economy",
            "seatCode" : "i1",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i2",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i3",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i4",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i5",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i6",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i7",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i8",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i9",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "i10",
            "reserved" : "false"
          }],[{
            "class":"economy",
            "seatCode" : "j1",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j2",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j3",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j4",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j5",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j6",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j7",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j8",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j9",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "j10",
            "reserved" : "false"
          }],[{
            "class":"economy",
            "seatCode" : "h1",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h2",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h3",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h4",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h5",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h6",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h7",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h8",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h9",
            "reserved" : "false"
          },{
            "class":"economy",
            "seatCode" : "h10",
            "reserved" : "false"
          }]
        ],
        "premiumEconomySeats" : [
          [
          {
            "class":"premiumEconomy",
            "seatCode" : "k1",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "k2",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "k3",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "k4",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "k5",
            "reserved" : "false"
          }],[{
            "class":"premiumEconomy",
            "seatCode" : "l1",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "l2",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "l3",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "l4",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "l5",
            "reserved" : "false"
          }],[{
            "class":"premiumEconomy",
            "seatCode" : "m1",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "m2",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "m3",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "m4",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "m5",
            "reserved" : "false"
          }],[{
            "class":"premiumEconomy",
            "seatCode" : "i1",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "i2",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "i3",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "i4",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "i5",
            "reserved" : "false"
          }],[{
            "class":"premiumEconomy",
            "seatCode" : "j1",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "j2",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "j3",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "j4",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "j5",
            "reserved" : "false"
          }],[{
            "class":"premiumEconomy",
            "seatCode" : "h1",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "h2",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "h3",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "h4",
            "reserved" : "false"
          },{
            "class":"premiumEconomy",
            "seatCode" : "h5",
            "reserved" : "false"
          }
        ]
        ],
        "businessSeats" : [
          [
          {
            "class":"business",
            "seatCode" : "k1",
            "reserved" : "false"
          },{
            "class":"business",
            "seatCode" : "k2",
            "reserved" : "false"
          },{
            "class":"business",
            "seatCode" : "k3",
            "reserved" : "false"
          }],[
          {
            "class":"business",
            "seatCode" : "l1",
            "reserved" : "false"
          },
          {
            "class":"business",
            "seatCode" : "l2",
            "reserved" : "false"
          },
          {
            "class":"business",
            "seatCode" : "l3",
            "reserved" : "false"
          }],[
          {
            "class":"business",
            "seatCode" : "m1",
            "reserved" : "false"
          },
          {
            "class":"business",
            "seatCode" : "m2",
            "reserved" : "false"
          },
          {
            "class":"business",
            "seatCode" : "m3",
            "reserved" : "false"
          }],[
          {
            "class":"business",
            "seatCode" : "i1",
            "reserved" : "false"
          },
          {
            "class":"business",
            "seatCode" : "i2",
            "reserved" : "false"
          },
          {
            "class":"business",
            "seatCode" : "i3",
            "reserved" : "false"
          }
        ]
        ],
        "firstClassSeats" : [
          [
          {
            "class":"firstClass",
            "seatCode" : "k1",
            "reserved" : "false"
          },
          {
            "class":"firstClass",
            "seatCode" : "k2",
            "reserved" : "false"
          }],[
          {
            "class":"firstClass",
            "seatCode" : "l1",
            "reserved" : "false"
          },
          {
            "class":"firstClass",
            "seatCode" : "l2",
            "reserved" : "false"
          }],[
          {
            "class":"firstClass",
            "seatCode" : "m1",
            "reserved" : "false"
          },
          {
            "class":"firstClass",
            "seatCode" : "m2",
            "reserved" : "false"
          }],[
          {
            "class":"firstClass",
            "seatCode" : "i1",
            "reserved" : "false"
          },
          {
            "class":"firstClass",
            "seatCode" : "i2",
            "reserved" : "false"
          }
        ]
      ]
      },
        "departureDate" : "28/12/2016 7:00",
        "arrivalDate" : "28/12/2016 11:00",
        "departureCity" : "Egypt",
        "destinationCity" : "Netherlands",
        "duration" : "4H",
        "capacity" : 110,
        "priceClass" : {
        "economyPrice" : 3000,
        "permiumEconomyPrice" : 4000 ,
        "businessPrice" : 8000,
        "firstPrice" : 14000
        }
      }
    ];
});
