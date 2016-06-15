angular.module('app')

.controller('UserFavoritesController', function($scope, userService, $stateParams, $timeout) {

    $scope.userId = $stateParams.userId;
    $scope.showFavorites= false;
    $scope.isLoading = true;


    initialize();

    function getFavoritesByUser() {
        return userService.getFavoriteUsers($scope.userId).then(function(users) {
            $scope.showFavorites = true;
            $scope.users = users;
            $timeout(function() {
                $scope.isLoading = false;
            }, 200);
        });
    }

    function initialize() {
        getFavoritesByUser();
    }

});