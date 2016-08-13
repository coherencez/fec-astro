'use strict';

app.factory('weatherFactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

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


  return {
    getPOTD
  };

}]);
