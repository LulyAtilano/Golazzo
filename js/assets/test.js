/* Log in */
var provider = new firebase.auth.GoogleAuthProvider();

$('#login-btn').click(function(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        $('#login-btn').hide();
        //console.log(result);
        saveUser(result.user);
        $('.photo-login').append("<img src='"+result.user.photoURL+"' />");
        $('#user-name').append(result.user.displayName);
        $('#logout-btn').removeClass("disabled");
        $('#profile-user').removeClass("disabled");
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

/* Subir archivos grales */

$('#input-Upload-File').change(function(e){
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images/' + file.name).put(file);
});

/* Subir bm's */
/*
window.onload = iniciliazar;
var fichero;
var storageRef;

function iniciliazar(){
    fichero = document.getElementById('input-bm-File');
    fichero.addEventListener("change", subirImagenAFirebase, false);

    storageRef = firebase.storage().ref();
}

function subirImagenAFirebase(){
    var imagenASubir = fichero.files[0].name;

    var uploadTask = storageRef.child('img/' + imagenASubir.name).put(imagenASubir);
}*/

$('#input-bm-File').change(function(e){
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images-bm/' + file.name).child().put(file);
    
    /*storageRef.on("child_added", function(){
        $('#news-gral-users').append(file);
    });*/
});

var config = {
    apiKey: "AIzaSyCQmJhU4rGSzM9eER5wWKYbHqXNFC1YHSQ",
    authDomain: "golazzo-472c0.firebaseapp.com",
    databaseURL: "https://golazzo-472c0.firebaseio.com",
    projectId: "golazzo-472c0",
    storageBucket: "golazzo-472c0.appspot.com",
    messagingSenderId: "717601290131"
};

firebase.initializeApp(config);