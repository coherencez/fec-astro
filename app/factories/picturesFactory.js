'use strict';

app.factory('picturesFactory', ['$q', '$http', 'FBCreds', function ($q, $http, FBCreds) {
// begin load to firebase section
  let dateArray = [],
      imgArray = [],
      counter = 0;

  const getRandomDates = () => {
			// retrieve random date between 01 Jan 1995 ~ 31 Dec 2016
			let rndYear = Math.floor(Math.random() * (2017 - 1995)) + 1995,
				  rndMonth = Math.floor(Math.random() * (13 - 1)) + 1,
				  rndDay = Math.floor(Math.random() * (32 - 1)) + 1;

			// convert int to string for api call
			let year = rndYear.toString(),
			    month = rndMonth.toString(),
			    day = rndDay.toString();

			// format day/month to always contain 2 chars (req for api call)
			if (month.length === 1) {
				month = ('0' + month);
			}

			if (day.length === 1) {
				day = ('0' + day);
			}
	    // build date obj and push to private array
			let dateObj =   {
												year: year,
												month: month,
												day: day
											};

				dateArray.push(dateObj);
        // call getRandomDates until counter reaches 10 (10 dates === 10 pictures)
				if (counter === 10) {
					return;
				}
				counter++;

			getRandomDates();
  };

  const getPicsForFirebase = (x) => {
    return $q((resolve, reject) => {
      $http.get(`https://api.nasa.gov/planetary/apod?concept_tags=true&date=${x.year}-${x.month}-${x.day}&api_key=${FBCreds.nasaApiKey}`)
        .success((dataObject) => {
          resolve(dataObject);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  const fillImgArray = data => imgArray.push(data);

  const clearArrays = () => {
    dateArray.length = 0;
    imgArray.length = 0;
    counter = 0;
  };

  const addToPictureList = newPic => firebase.database().ref('pictures').push(newPic);

  const getPictures = (callback, userID) => {
   firebase.database()
    .ref('pictures')
    // .orderByChild('uid')
    // .equalTo(userID)
    .on('value', (pictureData) => {
        callback(pictureData.val());
      });
  };

  const assignId = (dataList) => {
    let picArray = [];
    let picList = dataList;
    angular.forEach(picList, (v, k) => {
      picList[k].id = k;
      picArray.push(picList[k]);
    });
    return picArray;
  };
// end send to firebase section

// adding favorites to firebase section
  const getPictureObj = picId => firebase.database().ref(`pictures/${picId}`).once('value');
  const addToFavoritesList = newPic => firebase.database().ref('favorites').push(newPic);

  const deleteSong = songId => firebase.database().ref(`songs/${songId}`).remove();
  const editSong = (songFormObj, songId) => firebase.database().ref(`songs/${songId}`).update(songFormObj);
  

  const rndNum = (little, big) => {
  	let num1 = little || 0, num2 = big || 100;
  	return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  };



  return {
    getPicsForFirebase, addToPictureList, getRandomDates, fillImgArray, clearArrays, dateArray, imgArray,
    getPictures, assignId, getPictureObj, addToFavoritesList
  };

}]);
