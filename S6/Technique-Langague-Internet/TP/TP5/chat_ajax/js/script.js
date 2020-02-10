var chat;

function envoyer(){
    chat.posterMessage();
}


function Init(){
    chat = {
        saisie: document.getElementById("msg"),
        posterMessage : posterMessage,
        recupererMessage : recupererMessage
    };

    setInterval(function(){
        $("#receptionarea").empty();
        chat.recupererMessage();
    }, 1000);
    $("#envoi").click(chat.posterMessage());
}

function recupererMessage(){
    user_id = window.location.href.split("=")[1];
    sentdata = {"method" : "recuperer", "user_id" : user_id};
    $.post("ajax/chat.php", sentdata, function(data){
        document.getElementById("receptionarea").innerHTML = data;
        console.log(data);
    })
}

function posterMessage(){
    user_id = window.location.href.split("=")[1];
    message = $("#messagearea").val();
    document.getElementById("messagearea").value = "";
    sentdata = {"method" : "poster", "user_id" : user_id, "message" : message};
    $.post("ajax/chat.php", sentdata, function(data){
        $("#receptionarea").prepend("<p style='color:red'>Vous : " + message + "</p>");
        console.log(data);
    })
}