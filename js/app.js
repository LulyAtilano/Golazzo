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
        //$('#logout-btn').removeClass("d-none");
        $('#logout-btn').removeClass("disabled");
        $('#profile-user').removeClass("disabled");
    });
});

var userInfo = {};

/* Función para guardar la info de los usuarios */
function saveUser(user) {
    userInfo = {
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
    //console.log(firebase.storage().ref('images/').bucket);
    //console.log(file.name);

    /* Se refleja el archivo guardado de Firebase a la sección goals */
    storageRef.getDownloadURL().then(function(url){
        addImage(url);
    });
});

var templateImage = '<section class="texto text-center">' +
                    '<div class="card w-100">' +
                        '<div class="card-body">' +
                            '<h5 class="float-left"> _UserName_</h5>' +
                            '<div id="comment-user">'+
                                '<img src="_Photo-User__"/>'+'<img style="width:250px; height: 150px;" src="__Ur__" width: 150px;/>' +
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</section>';

function addImage(url) {
    var finalTemplate = "";
    //console.log(userInfo.name);
    finalTemplate = templateImage.replace(" _UserName_",userInfo.name + " dice: ")
    .replace("_Photo-User__", userInfo.photo)
    .replace("__Ur__", url)
    $("#goals").append(finalTemplate);
};

/* Subir bm's */
$('#input-bm-File').change(function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images-bm/' + file.name);
    var task = storageRef.put(file);

    /* Se refleja el archivo guardado de Firebase a la sección de carrusel */
    storageRef.getDownloadURL().then(function(url){
        $('#img-carousel').append('<div class="carousel-item">'+
            '<img style="width:100%; height: 243px;" class="d-block w-100 center" src="'+ url +'"/>'+
          '</div>');
        //'<img src="'+ url+'"/>'
    });
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
                            '<h5 class="float-left"> _UserName_</h5>' +
                            '<div id="comment-user">'+
                            '<img src="_Photo-User__"/>'+'<textarea name="textArea" id="textArea" class="Text card-text col-sm-10">__commit__</textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</section>';

function addCommit(comment) {
    var finalTemplate = "";
    //console.log(userInfo.name);
    finalTemplate = template.replace(" _UserName_",userInfo.name + " dice: ")
    .replace("_Photo-User__", userInfo.photo)
    .replace("__commit__", comment);
    $("#goals").append(finalTemplate);
};

/* Ranking */
$(document).ready(function(){
    $("#btn3").click(function(){
        $("#li-btn-3").append('<i class="fas fa-heartbeat --indigo"></i>');
    });

    $("#btn4").click(function(){
        $("#li-btn-4").append('<i class="fas fa-heartbeat --indigo"></i>');
    });

    $("#btn5").click(function(){
        $("#li-btn-5").append('<i class="fas fa-heartbeat --indigo"></i>');
    });

    $("#btn6").click(function(){
        $("#li-btn-6").append('<i class="fas fa-heartbeat --indigo"></i>');
    });
});
