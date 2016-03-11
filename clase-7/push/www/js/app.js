// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        try{
            var notificationOpenedCallback = function(jsonData) {
              alert(JSON.stringify(jsonData));
            };

            window.plugins.OneSignal.init("db348c06-c2c5-4411-b756-734654ec37ca",
                                           {googleProjectNumber: "870000048585"},
                                           notificationOpenedCallback);

            window.plugins.OneSignal.setSubscription(true);
            //Only Android
            window.plugins.OneSignal.enableNotificationsWhenActive(true);

            window.plugins.OneSignal.getIds(function(ids) {
                    alert(ids.userId)
                    
                    //Envio push directo device
                  /*var notificationObj = { contents: {en: "message body"},
                                          include_player_ids: []};
                  window.plugins.OneSignal.postNotification(notificationObj,
                    function(successResponse) {
                      console.log("Notification Post Success:", successResponse);
                    },
                    function (failedResponse) {
                      console.log("Notification Post Failed: ", failedResponse);
                      alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
                    }
                );*/
            });
        }catch(e){
            alert(e);
        }


  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
