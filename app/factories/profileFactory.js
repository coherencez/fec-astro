'use strict';

app.factory('profileFactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

// adding favorites to firebase section
  const getPictureObj = picId => firebase.database().ref(`pictures/${picId}`).once('value');
  const addToFavoritesList = newPic => firebase.database().ref('favorites').push(newPic);

  const deleteSong = songId => firebase.database().ref(`songs/${songId}`).remove();

  const rndNum = (little, big) => {
  	let num1 = little || 0, num2 = big || 100;
  	return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  };

  const getFavorites = (callback, userID) => {
   firebase.database()
    .ref('favorites')
    .orderByChild('uid')
    .equalTo(userID)
    .on('value', (pictureData) => {
        callback(pictureData.val());
      });
  };



  return {
    getPictureObj, addToFavoritesList, getFavorites
  };

}]);
