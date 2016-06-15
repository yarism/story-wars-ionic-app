(function () {
    'use strict';

    angular.module('app')

    .factory('chapterService', ['Restangular', function (Restangular) {

        return {
            getChapter: getChapter,
            createChapter: createChapter,
            removeChapter: removeChapter,
            voteOnChapter: voteOnChapter,
            reportChapter: reportChapter,
            getSubmittedChaptersToCurrentRound: getSubmittedChaptersToCurrentRound,
            getSubmittedChaptersCountToCurrentRound: getSubmittedChaptersCountToCurrentRound,
            getChaptersByUser: getChaptersByUser,
            getLatestChapterInStoryByUser: getLatestChapterInStoryByUser
        };

        function getChapter(chapterId) {
            return Restangular.one('stories', storyId).one('chapters', chapterId);
        }

        function createChapter(storyId, content) {
            return Restangular.one('stories', storyId).all('chapters').post({ content: content });
        }

        function removeChapter(chapterId) {
            return Restangular.one('chapters', chapterId).remove()
                .then(function(result) {
                    return result;
                });
        }

        function voteOnChapter(storyId, chapterId) {
            return Restangular.one('stories', storyId).one('chapters', chapterId).all('votes').post();
        }

        function reportChapter(storyId, chapterId, reason) {
            return Restangular.one('stories', storyId).one('chapters', chapterId).all('reports').post({ reason: reason });
        };

        function getSubmittedChaptersToCurrentRound(storyId) {
            return Restangular.one('stories', storyId).one('chapters', 'submitted').getList();
        }

        function getSubmittedChaptersCountToCurrentRound(storyId) {
            return Restangular.one('stories', storyId).one('chapters', 'submittedCount').get();
        }

        function getChaptersByUser(userId) {
            return Restangular.one('users', userId).all('chapters').getList();
        }

        function getLatestChapterInStoryByUser(storyId) {
            return Restangular.one('stories', storyId).one('chapters', 'latestByUser').get();
        }

    }]);
})();