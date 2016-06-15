angular.module('app')

.controller('LoginController', function($scope, $state, authService, common, $ionicLoading, $ionicHistory) {
    $scope.isLoggedIn = authService.isLoggedIn;
    $scope.createUser = createUser;
    $scope.logout = logout;
    $scope.loginLocal = loginLocal;
    $scope.loginOauth = loginOauth;
    $scope.isBusy = false;
    $scope.verifyNewAccountMessage = '';

    // TODO: Move this
    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    };


    function loginSuccess() {
        $state.go('app.stories');
    }

    function loginFailed(err) {
        console.log('loginFailed', JSON.stringify(err));
        common.displayError('Login failed');
    }

    function logout() {
        authService.logout();
    }

    function loginLocal(username, password) {
        $ionicLoading.show();
        authService.loginLocal(username, password)
            .then(function() {
                loginSuccess();
            },
            function(err) {
                loginFailed(err);
            })
            .finally(function() {
                $ionicLoading.hide();
            });
    }

    function loginOauth(provider) {
        $ionicLoading.show();
        authService.loginProvider(provider)
            .then(function() {
                loginSuccess();
            },
            function(err) {
                loginFailed(err);
            })
            .finally(function() {
                $ionicLoading.hide();
            });
    }

    function createUser(name, username, password) {
        $ionicLoading.show();
        return authService.createUser(name, username, password)
            .then(function(response) {
                $scope.verifyNewAccountMessage = 'Verification mail sent. Check your inbox.';
            },
            function(err) {
                common.displayError(err);
            })
            .finally(function() {
                $ionicLoading.hide();
            });
    }
});