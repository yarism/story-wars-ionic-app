angular.module('app')

.controller('AppController', function($scope, $ionicModal, $state, storyService) {

    $scope.newStoryModal = null;
    $scope.createStory = createStory;

    activate();

    function activate() {
        $ionicModal.fromTemplateUrl('app/stories/newStory.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.newStoryModal = modal;
        });
    }

    function createStory(newStory) {
        var title = newStory.title;
        var content = newStory.content;

        storyService.createStory(title, content)
            .then(function(storyId) {
                $scope.newStoryModal.hide(); // Hide modal on story created successfully
                $state.go('app.readstory', { "storyId": storyId});
            },
            function(error) {
                // TODO: Error handling. Maybe use one global error handler in
                // the httpInterceptor?
            });
    };

});
