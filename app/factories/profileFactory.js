'use strict';

app.factory('profileFactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

// adding favorites to firebase section
  const getPictureObj = picId => firebase.database().ref(`pictures/${picId}`).once('value');
  const addToFavoritesList = newPic => firebase.database().ref('favorites').push(newPic);

  const deleteFromFavorites = favId => firebase.database().ref(`favorites/${favId}`).remove();

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

  const assignFavId = (dataList) => {
    let picArray = [];
    let picList = dataList;
    angular.forEach(picList, (v, k) => {
      picList[k].favId = k;
      picArray.push(picList[k]);
    });
    return picArray;
  };



  return {
    getPictureObj, addToFavoritesList, getFavorites, deleteFromFavorites, assignFavId
  };

}]);
