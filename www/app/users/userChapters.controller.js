angular.module('app')

.controller('UserChaptersController', function($scope, chapterService, $stateParams, $timeout) {

    $scope.userId = $stateParams.userId;
    $scope.showChapters = false;
    $scope.isLoading = true;


    initialize();

    function getChaptersByUser() {
        return chapterService.getChaptersByUser($scope.userId).then(function(chapters) {
            $scope.chapters = chapters;
            $scope.showChapters = true;
            $timeout(function() {
                $scope.isLoading = false;
            }, 200);
        });
    }

    function initialize() {
        getChaptersByUser();
    }

});