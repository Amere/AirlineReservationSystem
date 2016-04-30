lufthansa.controller('paymentCtrl',function($scope,lufthansaServ,$location){
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];
  $scope.card = [];
  $scope.card.v1 = "";
  $scope.card.validThru = "";
  $scope.card.ccv = "";
  $scope.card.fullName = "";

  // if(lufthansaServ.reservInfoFlag != true){
  //   $location.url('/');
  // }

  $scope.open1 = function() {
      $scope.popup1.opened = true;
  };

  $scope.setPaymentFlag = function(){
    lufthansaServ.setPaymentFlag();
  };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.popup1 = {
        opened: false
    };

  $scope.popup2 = {
      opened: false
  };
  function createTokeenStripe(){
    var cardNumber = $scope.card.v1 ;
    var cvv = $scope.card.ccv;
    var exp = $scope.card.validThru;
    console.log("number "+cardNumber);
    console.log("cvv "+cvv);
    console.log("expMonth "+exp.substring(0,2));
    console.log("expYear "+ exp.substring(3));
    Stripe.card.createToken({
      number: +cardNumber,
      cvc: +cvv,
      exp_month: exp.substring(0,2),
      exp_year: exp.substring(3)
    }, stripeResponseHandler);
  };
var flagForRetPayment = 0;
  function stripeResponseHandler(status, response) {

    if (response.error) { // Problem!
    alert(response.error.message);
    } else { // Token was created!

      // Get the token ID:
      var token = response.id;
      var retOrOut = lufthansaServ.getReturning_Or_Outgoing();
      if(retOrOut==="Outgoing Only"){//out only
        lufthansaServ.sendStripeToken(token,true).success(function(err,data){
          if(!err){
            console.log(data);
            $state.go('tab.landing-confirm')
          }else{
            //console.log(err);
            alert(err.errorMessage.message);
          }
        });
      }else{//out and ret
        lufthansaServ.sendStripeToken(token,true).success(function(err,data){
          if(data.errorMessage==null){
            //$location.url('/confirm');
            if(flagForRetPayment==0){
              createTokeenStripe();
              flagForRetPayment++;
            }else{
              flagForRetPayment=0;
              $location.url('/landing/confirm');
            }
          }else{
            alert(err);
          }
        });
      }

    }
  }
  $scope.confirm = function(){
    // console.log($scope.card.v1);
    //     console.log($scope.card.validThru);
    //         console.log($scope.card.ccv);
    //             console.log($scope.card.fullName);
    // if($scope.card.v1!="" && $scope.card.validThru!="" && $scope.card.ccv!="" && $scope.card.fullName!=""){
    //   console.log("*******");
    //     createTokeenStripe();
  //  }

         // $location.url('/confirm');
};



});
