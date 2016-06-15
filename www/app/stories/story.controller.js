(function () {
    'use strict';

    angular.module('app')

    .controller('StoryController', function($scope, $ionicModal, $stateParams, $ionicScrollDelegate, storyService, chapterService) {
        var vm = $scope;
        $scope.submittedChaptersIndex = 0;
        $scope.subscribeIsLoading = false;
        $scope.reportChapterModal = null;
        var storyId = $stateParams.storyId;
        var storedType;
        var storedId;

        vm.story = {};

        vm.getStory = getStory;

        initialize();

        function initModal() {
            $ionicModal.fromTemplateUrl('app/stories/reportChapter.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.reportChapterModal = modal;
            });
        }

        // Store to use in the modal
        $scope.storeChapter = function(type, id) {
            storedType = type;
            storedId = id;
        };

        $scope.reportChapter = function(reason) {
            if (storedType === "story") {
                storyService.reportStory(storyId, reason)
                    .then(function() {
                        $scope.reportChapterModal.hide();
                    });
            }
            else if (storedType === "chapter") {
                chapterService.reportChapter(storyId, storedId, reason)
                    .then(function() {
                        $scope.reportChapterModal.hide();
                    });
            }
        }

        $scope.isWrite = function() {
            return $scope.story && $scope.story.state_text === 'Write';
        };

        $scope.isVote = function() {
            return $scope.story && $scope.story.state_text === 'Vote';
        };

        $scope.voteOnChapter = function(chapterId) {
            mixpanel.track("Vote on chapter", {
                "StoryId": storyId
            });
            chapterService.voteOnChapter(storyId, chapterId)
                .then(function() {
                    vm.story.user_can_vote = false;
                });
        };

        $scope.createChapter = function(content) {
            mixpanel.track("Create chapter", {
                "StoryId": storyId
            });
            chapterService.createChapter(storyId, content)
                .then(function() {
                    vm.story.user_can_write = false;
                });
        };

        $scope.showNextChapter = function(disabled) {
            if (!disabled) {
                $ionicScrollDelegate.resize();
                $scope.submittedChaptersIndex = $scope.submittedChaptersIndex + 1;
            }
        };

        $scope.showPrevChapter = function(disabled) {
            if (!disabled) {
                $ionicScrollDelegate.resize();
                $scope.submittedChaptersIndex = $scope.submittedChaptersIndex - 1;
            }
        };

        $scope.subscribe = function() {
            mixpanel.track("Subscribing", {
                "StoryId": storyId
            });
            $scope.subscribeIsLoading = true;
            return storyService.subscribe(storyId).then(function() {
                $scope.isSubscribing = true;
                $scope.subscribeIsLoading = false;
            });
        };

        $scope.unsubscribe = function() {
            $scope.subscribeIsLoading = true;
            return storyService.unsubscribe(storyId).then(function() {
                $scope.isSubscribing = false;
                $scope.subscribeIsLoading = false;
            });
        };

        function getSubmittedChapters(story) {
            return chapterService.getSubmittedChaptersToCurrentRound(story.id)
                .then(function(chapters) {
                    $scope.submittedChapters = chapters;
                });
        }

        function getStory() {
            $scope.subscribeIsLoading = true;
            storyService.getStory(storyId)
                .then(function(story) {
                    vm.story = story;
                    $scope.isSubscribing = story.is_subscriber;
                    $scope.subscribeIsLoading = false;
                    if (story.state_text === 'Vote') {
                        return getSubmittedChapters(story);
                    }
                });
        }

        function initialize() {
            mixpanel.track("Read story", {
                "StoryId": storyId
            });
            getStory();
            initModal();
        }

    });
})();
