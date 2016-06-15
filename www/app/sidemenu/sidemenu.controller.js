angular.module('app')

.controller('SidemenuController', function($scope, $q, userService, $ionicSideMenuDelegate, authService) {
    $scope.user = {};
    $scope.logout = logout;

    $scope.$watch(function() {
            return $ionicSideMenuDelegate.isOpen();
        },
        function(isOpen) {
            if (isOpen) {
                // Refresh statistics on open
                getCurrentUserStatistics();
            }
        });

    $scope.$watch(function() {
            return authService.getCurrentUser();
        },
        function(newValue) {
            $scope.user = newValue;
            getCurrentUserStatistics();
        });

    activate();

    function activate() {
        getCurrentUser();
    }

    function getCurrentUser() {
        authService.getCurrentUserFromServer()
            .then(function(user) {
                $scope.user = user;
                getCurrentUserStatistics();
            });
    }

    function getCurrentUserStatistics() {
        console.log('Refreshing user statistics');
        return userService.getCurrentUserStatistics($scope.user.id)
            .then(function(statistics) {
                $scope.user.statistics = statistics;
            });
    }

    function logout() {
        authService.logout();
    }
});