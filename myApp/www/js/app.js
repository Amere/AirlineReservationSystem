// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
lufthansa = angular.module('lufthansa', ['ionic', 'angularMoment', 'ionic-datepicker']);

lufthansa.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


lufthansa.config(function($httpProvider){
  $httpProvider.interceptors.push(function(){
    return {
      request: function(req){
        if(req.url.charAt(0)==='/'){
          req.url = 'http://localhost:8080'+req.url;
        }
        return req;
      }
    }
  })
})


lufthansa.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.landing', {
    url: '/landing',
    views: {
      'tab-landing' : {
    templateUrl: 'templates/landing.html',
    controller: 'mainCtrl'
    }
  }
  })
  // Each tab has its own nav history stack:
  .state('tab.landing-reserv1', {
    url:'/landing/reserv1',
    views: {
      'tab-landing' : {
      templateUrl: 'templates/reservationInfo.html',
      controller: 'res1Ctrl'
      }
    }
  })
  .state('tab.landing-reservation', {
    url:'/landing/reservation',
    views:{
      'tab-landing' : {
      templateUrl: 'templates/reservation.html',
      controller: 'reservCtrl'
        }
      }
  })

  .state('tab.landing-payment', {
    url:'/landing/payment',
    views:{
      'tab-landing': {
        templateUrl: 'templates/payment.html',
        controller: 'paymentCtrl'
      }
    }
  })
  .state('tab.landing-confirm', {
    url:'/landing/confirm',
    views:{
      'tab-landing':{
      templateUrl: 'templates/confirmation.html',
      controller: 'confirmController'
      }
    }
  })
      .state('tab.bookingAndPastFlights', {
        url:'/bookingAndPastFlights',
        views:{
          'tab-bookingAndPastFlights':{
          templateUrl: 'templates/booking.html',
          controller: 'bookingCtrl'
          }
        }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/landing');

});
