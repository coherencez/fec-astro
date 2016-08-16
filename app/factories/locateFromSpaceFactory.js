'use strict';

app.factory('locateFromSpaceFactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

  const getLongLat = (city) => {
    let apiKey = FBCreds.openWeatherApiKey,
        cityZip = city;
    return $q((resolve, reject) => {
      $http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${cityZip},us&APPID=${apiKey}`)
        .success((dataObject) => {
          resolve(dataObject);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  const getImgFromSpace = (lon, lat, date) => {
    return $q((resolve, reject) => {
      $http.get(`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&cloud_score=True&api_key=DEMO_KEY`)
        .success((dataObject) => {
          resolve(dataObject);
        })
        .error((error) => {
          reject(error);
        });
    });
  };


  return {
    getLongLat, getImgFromSpace
  };

}]);
