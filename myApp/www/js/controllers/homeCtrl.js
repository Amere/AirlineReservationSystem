lufthansa.controller('homeCtrl', function ($scope,lufthansaServ,$state,$cordovaDatePicker,$ionicPlatform,$cordovaVibration,$cordovaToast,$cordovaNativeAudio, $timeout) {


  $scope.goToLanding= function(){
          $state.go('tab.landing');
      };

      var deploy = new Ionic.Deploy();

       $scope.options = {
      date: new Date(),
      mode: 'date', // or 'time'
      minDate: new Date() - 10000,
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };

    $scope.showDatePicker  = function(){
      $ionicPlatform.ready( function(){
        $cordovaVibration.vibrate(100);
        $cordovaToast.show('Here is a message', 'long', 'center').then(function(success) {
              // success
            }, function (error) {
              // error
            });

          $cordovaToast.showShortTop('Here is a message').then(function(success) {
            // success
          }, function (error) {
            // error
          });

          $cordovaToast.showLongBottom('Here is a message').then(function(success) {
            // success
          }, function (error) {
            // error
          });


        $cordovaNativeAudio.preloadSimple('click', 'audio/click.mp3').then(function (msg) {
      console.log(msg);
    }, function (error) {
      alert(error);
    });


  $cordovaNativeAudio.preloadComplex('music', 'audio/music.mp3', 1, 1).then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });


})
    };
    
  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  }
});
