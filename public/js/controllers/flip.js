lufthansa.controller('flip', function ($scope) {

    $scope.flip = function () {
        $(document).ready(function () {
            var ratio = 0.5;
            $('.resized-splitflap')
                .splitFlap({
                    charWidth: 50 * ratio,
                    charHeight: 100 * ratio,
                    imageSize: (2500 * ratio) + 'px ' + (100 * ratio) + 'px'
                });
        });
    };
    $scope.flip();
});