'use strict';

app.factory('POTDfactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

  // const getPictures = (callback, userID) => {
  //  firebase.database()
  //   .ref('pictures')
  //   // .orderByChild('uid')
  //   // .equalTo(userID)
  //   .on('value', (pictureData) => {
  //       callback(pictureData.val());
  //     });
  // };

  const getPOTD = () => {
    return $q((resolve, reject) => {
      $http.get(`https://api.nasa.gov/planetary/apod?concept_tags=true&api_key=${FBCreds.nasaApiKey}`)
        .success((dataObject) => {
          resolve(dataObject);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  const addPOTD = newPOTD => firebase.database().ref('potd').push(newPOTD);

  const deleteSong = songId => firebase.database().ref(`songs/${songId}`).remove();

  const getPOTDfromFB = picId => firebase.database().ref(`potd/${picId}`).once('value');

  const editSong = (songFormObj, songId) => firebase.database().ref(`songs/${songId}`).update(songFormObj);

  const rndNum = (little, big) => {
  	let num1 = little || 0, num2 = big || 100;
  	return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  };


  return {
    getPOTD, addPOTD, getPOTDfromFB
  };

}]);
