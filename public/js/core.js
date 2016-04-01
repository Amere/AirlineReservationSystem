/* Create Angular App Instance */


lufthansa = angular.module('lufthansa', ['ngAnimate','ui.bootstrap','ngRoute']);

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
                controller  : 'mainCtrls'
            })
            .when('/payment',{
                templateUrl:'partials/payment.html',
                controller  :'paymentCtrl'
            })
            //Add all parials later and your desired crtl ...
    });


