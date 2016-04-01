lufthansa.directive('seat',function(){
  var directive = {};
  directive.restrict = 'E';
  directive.template ="<img src='images/economeySeat.png'>";
  directive.scope = { seat: "=seat",imagesrc:"=src_"};
  return directive;
})
