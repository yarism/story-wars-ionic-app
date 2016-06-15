angular.module('app')

.controller('UserStoriesController', function($scope, storyService, $stateParams, $timeout) {

    $scope.userId = $stateParams.userId;
    $scope.showStories = false;
    $scope.isLoading = true;


    initialize();

    function getStoriesByUser() {
        return storyService.getStoriesByUser($scope.userId).then(function(stories) {
            $scope.stories = stories;
            $scope.showStories = true;
            $timeout(function() {
                $scope.isLoading = false;
            }, 200);
        });
    }

    function initialize() {
        getStoriesByUser();
    }

});