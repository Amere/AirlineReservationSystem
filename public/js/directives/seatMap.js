lufthansa.directive('seat',function(lufthansaServ){
  var directive = {};
  directive.restrict = 'E';
  directive.scope = { seat: "=" , imagesrc:"="};
  directive.template ="<img src="+"{{getImageSrc()}}"+" ng-click='click()'>";
  directive.link=function(scope,element,attrs){

    scope.getImageSrc = function(){
      var imageOfSeat;
      if(scope.seat.class=="firstClass"){
        if(scope.seat.reserved=="true"){
          imageOfSeat="images/firstClassSeatReserved.png"
        }else{
          imageOfSeat="images/firstClassSeat.png"
        }
      }else{
        if(scope.seat.class=="business"){
          if(scope.seat.reserved=="true"){
            imageOfSeat="images/businessClassSeatReserved.png"
          }else{
            imageOfSeat="images/businessClassSeat.png"
          }
        }else{
          if(scope.seat.class=="economy"){
            if(scope.seat.reserved=="true"){
            imageOfSeat="images/economeySeatReserved.png"
          }else{
            imageOfSeat="images/economeySeat.png"
          }
          }else{
            if(scope.seat.reserved=="true"){
            imageOfSeat="images/premiumEconomySeatReserved.png"
            }else{
            imageOfSeat="images/premiumEconomySeat.png"
          }
          }
        }
      }
      return imageOfSeat;
    }
    scope.click= function(){

      var r;
      if(scope.seat.reserved=="true"){
        lufthansaServ.setSeat(scope.seat.seatCode);
        lufthansaServ.setPossible(false);
        lufthansaServ.setSeatClass(scope.seat.class)
      }else {
        lufthansaServ.setSeat(scope.seat.seatCode);
        lufthansaServ.setPossible(true);
        lufthansaServ.setSeatClass(scope.seat.class);
      }
    }
  };
  return directive;
});
