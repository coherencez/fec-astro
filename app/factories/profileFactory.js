'use strict';

app.factory('profileFactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

// adding favorites to firebase section
  const getPictureObj = picId => firebase.database().ref(`pictures/${picId}`).once('value');
  const getFromFav = picId => firebase.database().ref(`favorites/${picId}`).once('value');
  const addToFavoritesList = newPic => firebase.database().ref('favorites').push(newPic);
  const addToProfile = newPic => firebase.database().ref('profile').push(newPic);

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

// data scraping test for astronomical events//having cors issue
  const getEvents = () => {
    return $q((resolve, reject) => {
      $http.get('http://in-the-sky.org/newscal.php?month=8&year=2016&maxdiff=7#datesel')
      .success((dataObject) => {
        resolve(dataObject);
      })
      .error((error) => {
        reject(error);
      });
    });
  };

  const getSunMoonPhases = () => {
    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        queryString = `http://api.usno.navy.mil/rstt/oneday?date=${month}/${day}/${year}&loc=Nashville, TN`;
    return $q((resolve, reject) => {
      $http.get(queryString)
      .success((dataObject) => {
        resolve(dataObject);
      })
      .error((error) => {
        reject(error);
      });
    });
  };



  return {
    getPictureObj, addToFavoritesList, getFavorites, deleteFromFavorites, assignFavId, addToProfile, getFromFav,
    getEvents, getSunMoonPhases
  };

}]);
