/* Create Angular App Instance */


lufthansa = angular.module('lufthansa', ['ngRoute']);

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
                controller  : 'outgoingFlightsCtrl'
            })
            .when('/payment',{
                templateUrl:'partials/payment.html',
                controller  :'paymentCtrl'
            })
            //Add all parials later and your desired crtl ...
    });
