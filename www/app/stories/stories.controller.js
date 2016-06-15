(function () {
    'use strict';

    angular.module('app')

    .controller('StoriesController', function($scope, $timeout, storyService) {
        var vm = $scope;

        vm.stories = {};
        vm.mode = 1;

        vm.setMode = setMode;
        vm.getStories = getStories;

        var maxCount = 20;

        activate();

        function activate() {
            setMode(1);
        }

        function setMode(newMode) {
            $scope.isLoading = true;
            $scope.showStories = false;
            vm.mode = newMode;
            getStories();
        }

        function getStories() {
            var promise;
            switch(vm.mode) {
            case 1:
                promise = storyService.getTrendingStories(maxCount);
                break;
            case 2:
                promise = storyService.getFollowedStories(maxCount);
                break;
            case 3:
                promise = storyService.getPopularStories(maxCount);
                break;
            }

            return promise.then(function(stories) {
                    vm.stories = stories;
                    // Stop the ion-refresher from spinning
                    $scope.showStories = true;

                    // TODO: remove this when you find a real solution for why there is lagg
                    $timeout(function() {
                        $scope.isLoading = false;
                    }, 250);
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
    });
})();
