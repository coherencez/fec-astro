'use strict';

app.factory('dataFactory', [ function () {

  const getPictures = (callback, userID) => {
   firebase.database()
    .ref('pictures')
    // .orderByChild('uid')
    // .equalTo(userID)
    .on('value', (pictureData) => {
        callback(pictureData.val());
      });
  };

  const addSong = newSong => firebase.database().ref('songs').push(newSong);

  const deleteSong = songId => firebase.database().ref(`songs/${songId}`).remove();

  const getSong = songId => firebase.database().ref(`songs/${songId}`).once('value');

  const editSong = (songFormObj, songId) => firebase.database().ref(`songs/${songId}`).update(songFormObj);

  const rndNum = (little, big) => {
  	let num1 = little || 0, num2 = big || 100;
  	return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  };


  return {
    getPictures, addSong, deleteSong, getSong, editSong, rndNum
  };

}]);
