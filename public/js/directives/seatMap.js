lufthansa.directive('seat',function(){
  var directive = {};
  directive.restrict = 'E';
  directive.template = "<div ng-repeat='plane in planes'><div ng-repeat='seat in plane.seats'><h1>{{seat.placeCode}}</h1></div></div>";
  directive.scope = { planes: "=seatN"};
  return directive;
})
