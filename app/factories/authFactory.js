'use strict';

app.factory('authFactory', [function () {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  let currentUserId = null,
      userProfileObjReference = null;

  //Auth function that takes in a generic provided (so it works with email or google eventually)
  const authWithProvider = function(provider) {
    return firebase.auth().signInWithPopup(provider);
  };

  //isAuth function to see if currentUserId === true
  const userState = function() {
    return (currentUserId) ? true : false;
  };


  //getUser function returns current userId
  const getUser = function() {
    return currentUserId;
  };

  const getUserObjRef = function() {
    return userProfileObjReference;
  };


  const setUser = function(id) {
    currentUserId = id;
    // console.log(currentUserId, "currentUserId")
  };

  const setUserProfReference = function(userObjRef) {
    userProfileObjReference = userObjRef;
    console.log(userProfileObjReference, "obj reference")
  };

  const createWithEmail = function (email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
    console.warn(errorCode, errorMessage);
    });
  };

  const authWithEmail = function (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
    console.warn(errorCode, errorMessage);
    });
  };

  const createUserProfile = userObj => firebase.database().ref('profile').push(userObj);

  const getProfile = (uid) => {
          return firebase.database()
                  .ref(`profile`)
                  .orderByChild('uid')
                  .equalTo(uid)
                  .once('value');
  };

  return {
    authWithProvider, userState, getUser, setUser, googleProvider, createWithEmail, authWithEmail, createUserProfile,
    getUserObjRef, setUserProfReference, getProfile
  };

}]);

app.run(["$location", "FBCreds", "authFactory", function ($location, FBCreds, authFactory) {
  const authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain,
    databaseURL: FBCreds.databaseURL,
    storageBucket: FBCreds.storageBucket
  };

  firebase.initializeApp(authConfig);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      authFactory.setUser(user.uid); //set current user on login, switch to main view
      $location.url("/profile");
    } else {
      authFactory.setUser(null); //this is to rest the current user to hide board.
      $location.url("/splash");
    }
  });
}]);
