lufthansa.directive('businessSeat',function(){
  var directive={};
  directive.restrict='E';
  directive.scope={seats:"=seats"};
  directive.templateUrl='js/directives/business.html';
  return directive;
});
