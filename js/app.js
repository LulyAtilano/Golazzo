/* Log in */
var provider = new firebase.auth.GoogleAuthProvider();

$('#login-btn').click(function(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        $('#login-btn').hide();
        console.log(result);
        saveUser(result.user);
        $('.photo-login').append("<img src='"+result.user.photoURL+"' />");
        $('#user-name').append(result.user.displayName);
        $('#logout-btn').removeClass(disabled);
    });
}); 


/* Función para guardar la info de los usuarios */
function saveUser(user) {
    var userInfo = {
        uid:user.uid,
        name:user.displayName,
        photo:user.photoURL,
    }
    firebase.database().ref("users/" + user.uid).set(userInfo);
}

/*
firebase.database().ref("users").on("child_added", function(s){
    var user = s.val();
    $('#root').append("<img src='"+user.photoURL+"' />");
});*/

/* Almacenar fotos */
/*
service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
};
*/

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