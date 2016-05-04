lufthansa.controller('paymentCtrl',function($scope,lufthansaServ,$state, $ionicPopup){
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

  function PK(){
    $(function(){

    Stripe.setPublishableKey('pk_test_w9rj63MfOpwqhpHG3ekIOxoV');

  });
  }


  function createTokeenStripe(){
    var cardNumber = $scope.card.v1;
    var cvv = $scope.card.ccv;
    var exp = $scope.card.validThru;
    console.log(lufthansaServ.getOtherCompanies());
    var other = lufthansaServ.getOtherCompanies(); ///////////////////////////
    var flagPK = false ;
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
      showAlert2('Error while trying to procced with your payment');
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

      };
var flagForRetPayment = 0;
  function stripeResponseHandler(status, response) {
    var other = lufthansaServ.getOtherCompanies(); ///////////////////////
    console.log(other);
    showAlert2(other);
    if (response.error) { // Problem!
    showAlert2(response.error.message);
    } else {
      if(other==true){
        var otherToken = response.id;
        console.log(otherToken+' token hereeeeeee');
        lufthansaServ.sendStripeTokenOther(otherToken).success(function(data){
          if(data.errorMessage==null){
            console.log(data);
            PK();
              $state.go('tab.landing-confirm');
          }else{
            //console.log(err);
            PK();
            console.log(data);
            showAlert2(data.errorMessage.message);
          }
        })
      }else{
      var token = response.id;
      var retOrOut = lufthansaServ.getReturning_Or_Outgoing();
      if(retOrOut==="Outgoing Only"){//out only
        lufthansaServ.sendStripeToken(token,true).success(function(data){
          if(data.errorMessage==null){
            console.log(data);
            lufthansaServ.setReceipt(data.refNum);
            PK();
              $state.go('tab.landing-confirm');

          }else{
            //console.log(err);
            PK();
            showAlert2(data.errorMessage.message);
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
                $state.go('tab.landing-confirm');
            }
          }else{
            // console.log(err.errorMessage);
            PK();
            showAlert2(data.errorMessage.message);
          }
        });
      }
      }


      // Token was created!

      // Get the token ID:

    }
  }
  $scope.confirm = function(){

    //console.log($scope.card.v1);
    //    console.log($scope.card.validThru);
    //        console.log($scope.card.ccv);
    //            console.log($scope.card.fullName);
    if($scope.card.v1!="" && $scope.card.validThru!="" && $scope.card.ccv!="" && $scope.card.fullName!=""){
      //console.log("*******");
        createTokeenStripe();
    }else{
      //console.log("/////////");
      showAlert();
    }


         // $location.url('/confirm');
};

showAlert = function() {
   var alertPopup = $ionicPopup.alert({
         title: 'Missing Data',
         template: 'please enter missing fields'
       });

       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };
     showAlert2 = function(message) {
        var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: ''+message
            });

            alertPopup.then(function(res) {
              console.log('Thank you for not eating my delicious ice cream cone');
            });
  };

});
