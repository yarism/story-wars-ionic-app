angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "app/sidemenu/menu.html",
                controller: 'SidemenuController',
                data : {requireLogin : true }
            })

        .state('app.stories', {
            url: "/stories",
            views: {
                'menuContent': {
                    templateUrl: "app/stories/stories.html",
                    controller: 'StoriesController'
                }
            }
        })

        .state('app.readstory', {
            url: "/stories/:storyId",
            views: {
                'menuContent': {
                    templateUrl: "app/stories/story.html",
                    controller: 'StoryController'
                }
            }
        })

        .state('app.users', {
            url: '/users/:userId',
            views: {
                'menuContent': {
                    templateUrl: 'app/users/user.html',
                    controller: 'UserController'
                }
            }
        })

        .state('app.usersStories', {
            url: '/users/:userId/stories',
            views: {
                'menuContent': {
                    templateUrl: "app/users/stories.html",
                    controller: 'UserStoriesController'
                }
            }
        })


        .state('app.usersFavorites', {
            url: '/users/:userId/favorites',
            views: {
                'menuContent': {
                    templateUrl: "app/users/favorites.html",
                    controller: 'UserFavoritesController'
                }
            }
        })

        .state('app.usersChapters', {
            url: '/users/:userId/chapters',
            views: {
                'menuContent': {
                    templateUrl: "app/users/chapters.html",
                    controller: 'UserChaptersController'
                }
            }
        })

        .state('join', {
            url : '/join',
            templateUrl : 'app/login/join.html',
            controller : 'LoginController',
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'app/login/signup.html',
            controller: 'LoginController'
        })

        .state('login', {
            url : '/login',
            templateUrl : 'app/login/login.html',
            controller : 'LoginController',
        })

        .state('agreement', {
            url: '/agreement',
            templateUrl: 'app/login/agreement.html',
            controller: 'LoginController'
        })

        .state('intro', {
            url : '/intro',
            templateUrl : 'app/intro/intro.html',
            controller : 'IntroController',
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/stories');
    });
