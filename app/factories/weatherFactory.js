'use strict';

app.factory('weatherFactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {

  const getCurrentWeather = (city, unit) => {
    let apiKey = FBCreds.openWeatherApiKey,
        cityZip = city,
        unitOfMeasure = unit;
    return $q((resolve, reject) => {
      $http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${cityZip},us&units=${unitOfMeasure}&APPID=${apiKey}`)
        .success((dataObject) => {
          resolve(dataObject);
        })
        .error((error) => {
          reject(error);
        });
    });
  };


  return {
    getCurrentWeather
  };

}]);
