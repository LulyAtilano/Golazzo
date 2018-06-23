/* Log in */
var provider = new firebase.auth.GoogleAuthProvider();

$('#login-btn').click(function(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        $('#login-btn').hide();
        $('#photo-login').append("<img src='"+result.user.photoURL+"' />");
    });
}); 

/* Blog */


/* Servidor */
var config = {
    apiKey: "AIzaSyCQmJhU4rGSzM9eER5wWKYbHqXNFC1YHSQ",
    authDomain: "golazzo-472c0.firebaseapp.com",
    databaseURL: "https://golazzo-472c0.firebaseio.com",
    projectId: "golazzo-472c0",
    storageBucket: "",
    messagingSenderId: "717601290131"
};

firebase.initializeApp(config);