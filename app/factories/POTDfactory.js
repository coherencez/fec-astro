'use strict';

app.factory('POTDfactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

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

  const getFOTD = () => {
    return $q((resolve, reject) => {
      $http.get(`https://astroapp-e14f8.firebaseio.com/facts/.json`)
        .success((dataObject) => {
          resolve(dataObject);
        })
        .error((error) => {
          reject(error);
        });
    });
  };


  const addPOTD = newPOTD => firebase.database().ref('potd').push(newPOTD);

  const getPOTDfromFB = picId => firebase.database().ref(`potd/${picId}`).once('value');

  const rndNum = (little, big) => {
  	let num1 = little || 0, num2 = big || 100;
  	return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  };


  return {
    getPOTD, addPOTD, getPOTDfromFB, getFOTD, rndNum
  };

}]);
