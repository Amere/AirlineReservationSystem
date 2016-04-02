lufthansa.directive('seat',function(){
  var directive = {};
  directive.restrict = 'E';
  directive.template ="<img src='images/economeySeat.png' ng-click='click()'>";
  directive.scope = { seat: "=seat",imagesrc:"=src_"};
  directive.link=function(scope,element,attrs){
    scope.click= function(){
      var r;
      if(scope.seat.reserved==true){
        r="the seat is reserved";
      }else {
        r= "the seat is available";
      }
      alert('you have chose '+scope.seat.seatCode+' '+scope.seat.class+'\n'+r);
    }
  };
  return directive;
})
