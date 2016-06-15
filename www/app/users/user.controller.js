angular.module('app')

.controller('UserController', function($scope, userService, authService, $stateParams) {
    $scope.userId = $stateParams.userId;
    $scope.isLoading = false;

    initialize();

    function getUser() {
        return userService.getUser($scope.userId).then(function(user) {
            $scope.user = user;
        });
    }

    function getUserStatistics() {
        return userService.getUserStatistics($scope.userId).then(function(statistics) {
            $scope.user.statistics = statistics;
        });
    }

    function isFavorite() {
        $scope.notCurrentUser = true;
        $scope.isLoading = true;
        return userService.isFavorite($scope.userId).then(function(isFavorite) {
            $scope.isFavorite = isFavorite;
            $scope.isLoading = false;
        });
    }

    $scope.addFavorite = function() {
        $scope.isLoading = true;
        return userService.addFavorite($scope.userId).then(function() {
            $scope.isFavorite = true;
            $scope.isLoading = false;
        });
    };

    $scope.removeFavorite = function() {
        $scope.isLoading = true;
        return userService.removeFavorite($scope.userId).then(function() {
            $scope.isFavorite = false;
            $scope.isLoading = false;
        });
    };

    function initialize() {
        getUser();
        getUserStatistics();
        if (authService.isLoggedIn()) {
            if (authService.getCurrentUser().id == $scope.userId) {
                return;
            }
        }
        isFavorite();
    }

});