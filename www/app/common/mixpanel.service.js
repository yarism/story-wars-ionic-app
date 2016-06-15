(function() {
    'use strict';

    var app = angular.module('app');

    app.factory('mixpanelService', [
        function() {
			var currentUserId = null;
			
			return {
                setUser: setUser
            };
			
			function setUser(user) {
				if(!user || !user.id) {
					currentUserId = null;
					return;
				}
				if(user.id === currentUserId) {
					return; // Do not set same user again
				}
				
				currentUserId = user.id;
				
                mixpanel.identify(user.id);
                mixpanel.people.set({
                    "$first_name": user.name
                });
			}
		}]);
})();