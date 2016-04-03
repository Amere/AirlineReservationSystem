/* Create Angular App Instance */


lufthansa = angular.module('lufthansa', ['ui.bootstrap','ngRoute']);

    /**
     * Angular Routes
     */

  lufthansa.config(function($routeProvider) {
    $routeProvider

        // route for the home page
            .when('/', {
                templateUrl : 'partials/landing.html',
                controller  : 'mainCtrl'
            })
            .when('/reservation', {
                templateUrl : 'partials/reservation.html',
                controller  : 'reservCtrl'
            })
            .when('/outgoingFlights', {
                templateUrl : 'partials/outgoingFlights.html',
                controller  : 'mainCtrl'

            })
            .when('/return', {
                templateUrl : 'partials/return.html',
                controller  : 'mainCtrl'
            })
            .when('/payment',{
                templateUrl:'partials/payment.html',
                controller  :'paymentCtrl'
            })
            .when('/bookingAndPastFlights',{
                templateUrl: 'partials/booking.html',
                controller:  'bookingCtrl'
            })
            //Add all parials later and your desired crtl ...
    });
