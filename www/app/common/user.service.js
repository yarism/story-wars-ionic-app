(function () {
    angular.module('app')

    .factory('userService', ['Restangular',  function (Restangular) {
        return {
            getUsers: getUsers,
            getPopularUsers: getPopularUsers,
            getUser: getUser,
            getUserStatistics: getUserStatistics,
            getCurrentUserStatistics: getCurrentUserStatistics,
            searchForUser: searchForUser,
            saveUser: saveUser,
            getFavoriteUsers: getFavoriteUsers,
            isFavorite: isFavorite,
            addFavorite: addFavorite,
            removeFavorite: removeFavorite,
            getNotifications: getNotifications
        };

        function getUsers() {
            return Restangular.all('users').getList();
        }

        function getPopularUsers(count) {
            return Restangular.all('users').one('popular', count).getList();
        }

        function getUser(userId) {
            return Restangular.one('users', userId).get();
        }

        function getUserStatistics(userId) {
            return Restangular.one('users', userId).all('statistics').customGET();
        }

        function getCurrentUserStatistics(userId) {
            return Restangular.one('users', 'current').all('statistics').customGET();
        }

        function searchForUser(name) {
            return Restangular.one('users', 'search').one('byName', name).getList();
        }

        function saveUser(user) {
            return user.put();
        }

        function getFavoriteUsers(userId) {
            return Restangular.one('users', userId).all('favorites').getList();
        }

        function isFavorite(friendId) {
            return Restangular.one('users', 'current').one('favorites', friendId).get();
        }

        function addFavorite(friendId) {
            return Restangular.one('users', 'current').all('favorites').post({ friend_id: friendId });
        }

        function removeFavorite(friendId) {
            return Restangular.one('users', 'current').all('favorites').remove({ friend_id: friendId });
        }

        function getNotifications(maxCount) {
            return Restangular.one('users', 'current').one('notifications', maxCount).getList();
        }
    }]);
})();