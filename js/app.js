/* Servidor */
var config = {
    apiKey: "AIzaSyCQmJhU4rGSzM9eER5wWKYbHqXNFC1YHSQ",
    authDomain: "golazzo-472c0.firebaseapp.com",
    databaseURL: "https://golazzo-472c0.firebaseio.com",
    projectId: "golazzo-472c0",
    storageBucket: "golazzo-472c0.appspot.com",
    messagingSenderId: "717601290131"
};

firebase.initializeApp(config);

/*FUNCION SPLASH*/
$(function(){
    setTimeout(function() {
       $('#splash').fadeOut(500);
    }, 3000);
    $('nav').removeClass("d-none");
    $('header').removeClass("d-none");
    $('main').removeClass("d-none");
    $('footer').removeClass("d-none");
});

/* Log in */
var provider = new firebase.auth.GoogleAuthProvider();

$('#login-btn').click(function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        $('#login-btn').hide();
        //console.log(result);
        saveUser(result.user);
        $('.photo-login').append("<img src='" + result.user.photoURL + "' />");
        $('#user-name').append(result.user.displayName);
        //$('#user-name').append(result.user.displayName);
        $('#logout-btn').removeClass("d-none");
        $('#logout-btn').removeClass("disabled");
        $('#profile-user').removeClass("disabled");
    });
});


/* Función para guardar la info de los usuarios */
function saveUser(user) {
    var userInfo = {
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL,
    }
    firebase.database().ref("users/" + user.uid).set(userInfo);
}

/* Subir archivos grales */
$('#input-Upload-File').change(function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images/' + file.name);
    var task = storageRef.put(file);
});

/* Subir bm's */
$('#input-bm-File').change(function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images-bm/' + file.name).put(file);
    var pathReference = firebase.database().ref().child('img-bm/' + file.name);

    /*$('#news-users').append("<img src='"+file+"' />");
    $('#news-users').append("<img src ='"+storageRef+"'/>");*/
});

$('.carousel').carousel('pause');

/*creando seccion de comentarios*/
$("#commit").click(function () {
        var commit = $("#textArea").val();
        //console.log(commit);
        addCommit(commit);

    $("#textArea").val('');
});

var template = '<section class="texto text-center">' +
                    '<div class="card w-100">' +
                        '<div class="card-body">' +
                            '<h4> _UserName_</h4>' +
                            '<textarea name="textArea" id="textArea"rows="2" class="Text card-text">__commit__</textarea>'+
                        '</div>'+
                    '</div>'+
                '</section>';

function addCommit(comment) {
    var finalTemplate = "";
    /*finalTemplate = template.replace(" _UserName_", );*/
    finalTemplate = template.replace("__commit__", comment);
    $("#goals").append(finalTemplate);
};

/* $("main").append(finalTemplate);*/



       
