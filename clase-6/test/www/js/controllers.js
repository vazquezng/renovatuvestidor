angular.module('starter.controllers', [])

.controller('CameraCtrl', function($scope, $Camera, $cordovaCamera, $ionicPopup) {
    var options = {quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false};
    $scope.getPhoto = function() {

        $Camera.getPicture().then(function(imageURI) {
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function(err) {
            console.err(err);
        }, options);
    };
    $scope.takePhoto = function(){
        try{
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.takePhoto = imageData;//"data:image/jpeg;base64," + imageData;
            }, function(err) {
                alert(err);
            });
        }catch(e){
            alert(err);
        }

    };

    $scope.searchPhoto = function(){
        var extendsOptions = angular.extend({}, options, {destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY});
        $cordovaCamera.getPicture(extendsOptions).then(function(imageData) {
            /*$ionicPopup.alert({
                title: 'image encode',
                template: imageData
            });*/

            $scope.searchPhoto = 'data:image/jpeg;base64,'+imageData;
        }, function(err) {
        });
    };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('GlobalizationCtrl', function($scope, $translate) {
  $scope.texts = ['love', 'run', 'like', 'father'];
  $scope.changeTranslate = function(defaultTranslate){
      if(defaultTranslate){
          $translate.use('en');
      }else{
          $translate.use('es');
      }
  };

});
