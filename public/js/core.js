/* Create Angular App Instance */
lufthansa = angular.module('lufthansa', ['ui.bootstrap', 'ngRoute', 'ngAnimate','smoothScroll']);
/**
 * Angular Routes
 */

lufthansa.config(function ($routeProvider) {

    //Add all parials later and your desired crtl ...
// route for the home page
    $routeProvider
.when('/', {
    templateUrl: 'partials/landing.html',
    controller: 'mainCtrl'
})
    .when('/reservation/', {
        templateUrl: 'partials/reservation.html',
        controller: 'reservCtrl'


    })
    .when('/outgoingFlights', {
        templateUrl: 'partials/outgoingFlights.html',
        controller: 'mainCtrl'

    })
    .when('/return', {
        templateUrl: 'partials/return.html',
        controller: 'mainCtrl'
    })
    .when('/payment', {
        templateUrl: 'partials/payment.html',
        controller: 'paymentCtrl'
    })
    .when('/bookingAndPastFlights', {
        templateUrl: 'partials/booking.html',
        controller: 'bookingCtrl'
    })
    .when('/confirm', {
        templateUrl: 'partials/confirmation.html',
        controller: 'confirmController'
    })
    .when('/reserv1', {
        templateUrl: 'partials/reservationInfo.html',
        controller: 'res1Ctrl'

    })
//Add all parials later and your desired crtl ...
})
