lufthansa.controller('paymentCtrl',function($scope,lufthansaServ,$location,stripe){
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

function PK(){
  $(function(){

  Stripe.setPublishableKey('pk_test_w9rj63MfOpwqhpHG3ekIOxoV');

});
}

  function createTokeenStripe(){
    var cardNumber = $scope.v1 +$scope.v2 +$scope.v3 + $scope.v4;
    var cvv = $scope.ccv;
    var exp = $scope.validThru;
    var other = lufthansaServ.getOtherCompanies();
    var flagPK = false ;
    //Stripe.setPublishableKey('pk_test_GLghvbf0O1mNsV4T8nECOC1u');

      lufthansaServ.getPK().success(function(data){
          if(other==true){
        if(data.errorMessage!=null){

        }else{
          // console.log(data);
          // console.log(data.key);
        Stripe.setPublishableKey(data.key);
        flagPK=true;
        }
      }else{
           PK();
      }
      if(other==true && flagPK===true){
        Stripe.card.createToken({
          number: +cardNumber,
          cvc: +cvv,
          exp_month: exp.substring(0,2),
          exp_year: exp.substring(3)
        }, stripeResponseHandler);
      }else{
        if(other==true && flagPK===false){
        alert('Error while trying to procced with your payment');
        }else{
          if(other==false){
            PK();
          Stripe.card.createToken({
            number: +cardNumber,
            cvc: +cvv,
            exp_month: exp.substring(0,2),
            exp_year: exp.substring(3)
          }, stripeResponseHandler);
        }
        }
      }



      });


    //console.log("number "+cardNumber);
    //console.log("cvv "+cvv);
    //console.log("expMonth "+exp.substring(0,2));
    //console.log("expYear "+ exp.substring(3));


      };
var flagForRetPayment = 0;
  function stripeResponseHandler(status, response) {
    var other = lufthansaServ.getOtherCompanies();
    if (response.error) { // Problem!
    alert(response.error.message);
    } else {
      if(other==true){
        var otherToken = response.id;
        console.log(otherToken+' token hereeeeeee');
        lufthansaServ.sendStripeTokenOther(otherToken).success(function(data){
          if(data.errorMessage==null){
            //console.log(data);
            PK()
            $location.url('/confirm');
          }else{
            //console.log(err);
            PK();
          //  console.log(data);
            alert(data.errorMessage.message);
          }
        })
      }else{
      var token = response.id;
      var retOrOut = lufthansaServ.getReturning_Or_Outgoing();
      if(retOrOut==="Outgoing Only"){//out only
        lufthansaServ.sendStripeToken(token,true).success(function(data){
          if(data.errorMessage==null){
            console.log(data);
            lufthansaServ.setReceipt2(data.refNum);
            PK()
            $location.url('/confirm');
          }else{
            //console.log(err);
            PK();
            alert(data.errorMessage.message);
          }
        });
      }else{//out and ret
        lufthansaServ.sendStripeToken(token,false).success(function(data){
          if(data.errorMessage==null){
            //$location.url('/confirm');
            if(flagForRetPayment==0){
              createTokeenStripe();
              flagForRetPayment++;
            }else{
              flagForRetPayment=0;
              PK();
              $location.url('/confirm');
            }
          }else{
            // console.log(err.errorMessage);
            PK();
            alert(data.errorMessage.message);
          }
        });
      }
      }


      // Token was created!

      // Get the token ID:

    }
  }
  $scope.confirm = function(){
    if($scope.v1!="" && $scope.v2!="" && $scope.v3!="" && $scope.v4!="" && $scope.validThru!="" && $scope.ccv!="" && $scope.fullName!="")
      createTokeenStripe();
         // $location.url('/confirm');
};



});
