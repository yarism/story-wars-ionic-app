(function() {
    'use strict';

    var app = angular.module('app');

    app.factory('authService', [
        '$location', '$rootScope', '$q', 'userService', 'Restangular', '$auth', 'mixpanelService',
        function($location, $rootScope, $q, userService, Restangular, $auth, mixpanelService) {
            var currentUser = {};
            var getUserPromise = null;

            if($auth.isAuthenticated()) {
                // Refresh an old token
                refreshToken().then(function() {
                    // Attempt to get logged in user immediately
                    return getCurrentUserFromServer();
                });
            }

            $rootScope.$watch(function() {
                return $auth.isAuthenticated();
            }, function(newValue, oldValue) {
                getCurrentUserFromServer();
            });

            return {
                loginLocal: loginLocal,
                loginProvider: loginProvider,
                logout: logout,
                createUser: createUser,
                changePassword: changePassword,
                getCurrentUser: getCurrentUser,
                getCurrentUserFromServer: getCurrentUserFromServer,
                isLoggedIn: isLoggedIn,
                isAdmin: isAdmin
            };

            function logout() {
                $auth.logout().then(function() {
                    currentUser = {};
                    mixpanelService.setUser(currentUser);
                });
            }

            function getCurrentUserFromServer() {
                if (!$auth.isAuthenticated()) {
                    currentUser = {};
                    return $q.when({});
                }

                if (getUserPromise === null) {
                    getUserPromise = Restangular.one('users', 'current').get()
                        .then(function(user) {
                                if (!user) {
                                    currentUser = {};
                                    logout();
                                } else {
                                    currentUser = user;
                                    mixpanelService.setUser(currentUser);
                                }
                                getUserPromise = null;
                                return currentUser;
                            },
                            function(err) {
                                currentUser = {};
                                logout();
                                getUserPromise = null;
                                return currentUser;
                            });
                }

                return getUserPromise;
            }

            function createUser(name, username, password) {
                // Will return a message about verification mail or an error
                return Restangular.all('users').post({
                    name: name,
                    username: username,
                    password: password
                });
            }

            function loginLocal(username, password) {
                return $auth.login({
                        username: username,
                        password: password
                    })
                    .then(function(response) {
                        getCurrentUserFromServer();
                    });
            }

            function loginProvider(provider) {
                return $auth.authenticate(provider)
                    .then(function(response) {
                        getCurrentUserFromServer();
                    });
            }

            function refreshToken() {
                if($auth.isAuthenticated()) {
                    return Restangular.one('auth', 'refreshToken').get()
                        .then(function(response) {
                            $auth.setToken(response.token);
                        });
                } else {
                    return $q.when();
                }
            }

            function changePassword(oldPassword, newPassword) {
                return userService.changePassword(currentUser.id, oldPassword, newPassword);
            }

            function getCurrentUser() {
                return currentUser;
            }

            function isLoggedIn() {
                return $auth.isAuthenticated();
            }

            function isAdmin() {
                return currentUser.is_admin;
            }
        }
    ]);
})();