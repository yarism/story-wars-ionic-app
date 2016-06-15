(function () {
    'use strict';

    angular.module('app')

    .factory('storyService', ['Restangular', function (Restangular) {

        return {
            createStory: createStory,
            removeStory: removeStory,
            getStory: getStory,
            reportStory: reportStory,
            getStories: getStories,
            getPopularStories: getPopularStories,
            getFollowedStories: getFollowedStories,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            getNewStories: getNewStories,
            getTrendingStories: getTrendingStories,
            getStoriesByUser: getStoriesByUser
        };

        function createStory(title, content) {
            return Restangular.all('stories').post({ title: title, content: content, categoryId: 1 })
                .then(function(result) {
                    return result.storyId;
                });
        }

        function removeStory(storyId) {
             return Restangular.one('stories', storyId).remove();
        }

        function getStory(storyId) {
            return Restangular.one('stories', storyId).get();
        }

        function reportStory(storyId, reason) {
            return Restangular.one('stories', storyId).all('reports').post({ reason: reason });
        }

        function getStories() {
            return Restangular.all('stories').getList();
        }

        function getPopularStories(count) {
            return Restangular.all('stories').one('popular', count).getList();
        }

        function getFollowedStories(count) {
            return Restangular.all('stories').one('following', count).getList();
        }

        function subscribe(storyId) {
            return Restangular.one('stories', storyId).all('subscribe').post();
        }

        function unsubscribe(storyId) {
            return Restangular.one('stories', storyId).all('subscribe').remove();
        }

        function getNewStories(count) {
            return Restangular.all('stories').one('newest', count).getList();
        }

        function getTrendingStories(count) {
            return Restangular.all('stories').one('trending', count).getList();
        }

        function getStoriesByUser(userId) {
            return Restangular.one('users', userId).all('stories').getList();
        }
    }]);
})();
