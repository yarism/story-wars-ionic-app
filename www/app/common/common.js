(function () {
    'use strict';

    angular.module('app').factory('common', function($cordovaToast, $window, toaster) {

        return {
            displayError: displayError
        };

        function displayError(err) {
            var message;
            if (err.data) {
                if (err.data.errorMessage) message = err.data.errorMessage;
                else message = err.data;
            } else if (err.errorMessage) {
                message = err.errorMessage;
            } else {
                message = err;
            }
            
            if($window.plugins) {
                $cordovaToast.show(message, 'short', 'center');
            } else {
                toaster.pop('error', '', message);
            }
        }
    });
})();