/**
* Main Controller
*/
lufthansa.controller('mainCtrl', function($scope,lufthansaServ,$location,$document,$log,smoothScroll,moment) {
/*----------- Angular Bootstrap Datepicker -----------*/
$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
$scope.format = $scope.formats[1];
$scope.open1 = function() {
$scope.popup1.opened = true;
};
$scope.open2 = function() {
$scope.popup2.opened = true;
};
$scope.setDate = function(year, month, day) {
$scope.dt = new Date(year, month, day);
$scope.dt2 = new Date(year, month, day);

};
   $scope.pick ='seat class';
   $scope.classes = [
      'First class',
      'economy'
   ];
   $scope.status = {
      isopen: false
   };
   $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
   };
   $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
   };
   $scope.selectClass =function(item){
      $scope.pick = item;
   };
   $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
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
$scope.IsVisible = false;
}else {
  round();
      $scope.IsVisible = true;
    //  round();
      var element = document.getElementById('flightss');
      var options = {
         duration: 2000
      }
      smoothScroll(element, options);

}
};
$scope.resizeMap = function(){
google.maps.event.trigger(map,'resize');
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
round();
var element = document.getElementById('go');
var options = {
duration: 1300
}
smoothScroll(element,options);
round();
};
$scope.ShowHide4 = function () {
  oneWay();
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
};
$scope.ShowHide8 = function () {
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
/* Record User's Selected Origin Airport */
$scope.SetOriginAirport = function(originAirport) {
lufthansaServ.setSelectedOriginAirport(originAirport);
};
$scope.selectedOrigin=function(){
lufthansaServ.getSelectedOriginAirport();
};
/* Record User's Selected Destination Airport */
$scope.SetDestinationAirport = function(destAirport) {
lufthansaServ.setSelectedDestinationAirport(destAirport);
};
/* Find All Available Flights */
$scope.SearchFlights = function() {
$location.url('/return');
};
$scope.goToReservation = function(flight) {
  lufthansaServ.setFlightNumber(flight);
$location.url('/reservation');
};
function setIata() {
  lufthansaServ.setSelectedOriginAirport("CAI");
  lufthansaServ.setSelectedDestinationAirport("CAI");
};
function round() {


    var origin=lufthansaServ.getSelectedOriginAirport();
   var destination=lufthansaServ.getSelectedDestinationAirport();
   var departingDate=angular.element('#date1').val();
   var returningDate=angular.element('#date2').val();
  //  var x=moment(departingDate).toDate().getTime();
  //  var y=moment(returningDate).toDate().getTime();
  var clas=$scope.pick;
   lufthansaServ.getRound(origin,destination,departingDate,returningDate,clas).success(function(result){
   $scope.flights = result;
   });
};
function oneWay() {
   var origin=lufthansaServ.getSelectedOriginAirport();
   var destination=lufthansaServ.getSelectedDestinationAirport();
   var departingDate=angular.element('#date1').val();
   var returningDate=angular.element('#date2').val();
   var clas=$scope.pick;
  //  var x=moment(departingDate).toDate().getTime();
  //  var y=moment(returningDate).toDate().getTime();
   lufthansaServ.getOneWay(origin,destination,departingDate,returningDate,clas).success(function(result){
   $scope.flights = result;
   });
};
// function flight() {
//    lufthansaServ.getFlight().success(function(Flight){
//        $scope.flights = Flight;
//    });
//  };
//   flight();
function convert(mom) {
  console.log(moment(mom).format('YYYY-MM-DD'));
  return moment(mom).format('YYYY-MM-DD');
}
setIata();
round();
oneWay();
/* Get offers on page render */
offers();
/* Get news on page render */
news();
$scope.goToReservation = function(flightNumber) {
  lufthansaServ.setFlightNumber(flightNumber);
$location.url('/reserv1');
};
$scope.directToOutgoingFlights = function() {
$location.url('/outgoingFlights');
};
var myCenter = new google.maps.LatLng(30.078114, 31.629798);
function initialize() {
mapProp = {
center:myCenter,
zoom:5,
scrollwheel:true,
draggable:true,
mapTypeId:google.maps.MapTypeId.ROADMAP
};
$scope.map = new google.maps.Map(document.getElementById("map"),mapProp);
var marker = new google.maps.Marker({
position:new google.maps.LatLng(30.078114, 31.629798),
});
}
$scope.googleMap = google.maps.event.addDomListener(window, 'load', initialize);
function putMarkerOrigin(lon, lat){
if($scope.map == null)
$scope.map = new google.maps.Map(document.getElementById("map"),mapProp);
// console.log($scope.map);
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
if($scope.map == null)
$scope.map = new google.maps.Map(document.getElementById("map"),mapProp);
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
});
