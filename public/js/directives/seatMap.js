lufthansa.directive('seat',function(){
  var directive = {};
  directive.restrict = 'E';
//  directive.template ="here is a seat";
  directive.scope = { seat: "=seat"};
  return directive;
})
