lufthansa.directive('firstSeat',function(){
  var directive={};
  directive.restrict='E';
  directive.scope={seats:"=seats"};
  directive.templateUrl='js/directives/first.html';
  return directive;

});
