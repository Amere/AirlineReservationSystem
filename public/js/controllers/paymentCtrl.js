lufthansa.controller('paymentCtrl',function($scope,lufthansaServ,$location){
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];

  $scope.v1 = "";
  $scope.v2 = "";
  $scope.v3 = "";
  $scope.v4 = "";
  $scope.validThru = "";
  $scope.ccv = "";
  $scope.fullName = "";

  if(lufthansaServ.reservInfoFlag != true){
    $location.url('/');
  }

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
    var cardNumber = $scope.v1 +$scope.v2 +$scope.v3 + $scope.v4;
    var cvv = $scope.ccv;
    var exp = $scope.validThru;
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
    } else {


      // Token was created!

      // Get the token ID:
      var token = response.id;
      var retOrOut = lufthansaServ.getReturning_Or_Outgoing();
      if(retOrOut==="Outgoing Only"){//out only
        lufthansaServ.sendStripeToken(token,true).success(function(err,data){
          if(data.errorMessage==null){
            console.log(data);
            $location.url('/confirm');
          }else{
            //console.log(err);
            alert(data.errorMessage.message);
          }
        });
      }else{//out and ret
        lufthansaServ.sendStripeToken(token,false).success(function(err,data){
          if(data.errorMessage==null){
            //$location.url('/confirm');
            if(flagForRetPayment==0){
              createTokeenStripe();
              flagForRetPayment++;
            }else{
              flagForRetPayment=0;
              $location.url('/confirm');
            }
          }else{
           // console.log(err.errorMessage);
             alert(data.errorMessage.message);
          }
        });
      }

    }
  }
  $scope.confirm = function(){
    if($scope.v1!="" && $scope.v2!="" && $scope.v3!="" && $scope.v4!="" && $scope.validThru!="" && $scope.ccv!="" && $scope.fullName!="")
      createTokeenStripe();
         // $location.url('/confirm');
};



});
