// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'restangular', 'satellizer', 'toaster', 'ngIOS9UIWebViewPatch'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, authService, $state) {
    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            window.StatusBar.styleLightContent();
        }

        // Init Google Analytics
        if (window.analytics) {
            window.analytics.startTrackerWithId('UA-65045223-1');
        }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

        var shouldLogin = toState.data !== undefined
                    && toState.data.requireLogin
                    && !authService.isLoggedIn();

        // NOT authenticated - wants any private stuff
        if(shouldLogin) {
            //$state.go('intro');
            $state.go('join');
            event.preventDefault();
            return;
        }
    });

    $rootScope.$watch(
        function() {
            return authService.isLoggedIn();
        },
        function(newVal, oldVal) {
            if(newVal === false) {
                // User has logged out, go to login page
                $state.go('join');
            }
        }
    );

    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        })
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                // $rootScope.$broadcast('loading:show');
                return config;
            },
            response: function(response) {
                // $rootScope.$broadcast('loading:hide');
                return response;
            }
        }
    })
})

// Satellizer config
// Restangular config
.config(function(RestangularProvider, $authProvider, facebookClientId, googleClientId, backendUrl) {
    RestangularProvider.setBaseUrl(backendUrl + '/api');

    // Configuration common for all providers.
    var commonConfig = {
        // Popup should expand to full screen with no location bar/toolbar.
        popupOptions: {
            location: 'no',
            toolbar: 'no',
            width: window.screen.width,
            height: window.screen.height
        },
    };
    // Change the platform and redirectUri only if we're on mobile
    // so that development on browser can still work.
    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
        $authProvider.platform = 'mobile';
        commonConfig.redirectUri = 'http://localhost/';
    }

    $authProvider.facebook(angular.extend({}, commonConfig, {
        url: backendUrl + '/auth/facebook',
        clientId: facebookClientId
    }));

    $authProvider.google(angular.extend({}, commonConfig, {
        url: backendUrl + '/auth/google',
        clientId: googleClientId
    }));

    $authProvider.loginUrl = backendUrl + '/auth/login';
});