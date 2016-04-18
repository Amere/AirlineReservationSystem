lufthansa.directive('premiumSeat', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {seats: "=seats"};
    directive.templateUrl = 'js/directives/premium.html';
    return directive;
});
