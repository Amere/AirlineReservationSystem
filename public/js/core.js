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
<<<<<<< HEAD
            })
            .when('/return', {
                templateUrl : 'partials/return.html',
                controller  : 'mainCtrl'
=======
>>>>>>> dev
            })
            //Add all parials later and your desired crtl ...
    });
