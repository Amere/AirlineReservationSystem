lufthansa.directive('economySeat', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {seats: "=seats"};
    directive.templateUrl = 'js/directives/economy.html';
    return directive;

});
