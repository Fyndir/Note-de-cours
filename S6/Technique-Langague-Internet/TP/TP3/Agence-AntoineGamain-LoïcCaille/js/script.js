function Login()
{
    var login = document.getElementById("login");
    var pwd = document.getElementById("pwd");

    users = InitUsers();
    var user;

    users.forEach(function(element){
        if(element['login'] == login.value && element['pwd'] == pwd.value){
            user = element;
        }
    });

    if(user != null){
        localStorage.setItem("login", user['login']);
        document.getElementById("loginForm").submit();
    }
    else
    {
        pwd.value = "";
        document.getElementById("errorMsg").innerHTML = "Connection impossible, votre compte n'existe pas";
    }
}

function GetLogin()
{
    var login = localStorage.getItem("login");
    var user;

    if(login != null && login != ""){
        users = InitUsers();

        users.forEach(function(element){
            if(element['login'] == login){
                user = element;
            }
        })
    }

    return user;
}

function AddPays2BSelected()
{
    pays = InitPays();
    paysSelector = document.getElementById("pays");
    paysSelector.onchange = function() {
        Filter();
    }

    pays.forEach(function(element)
                 {
        pay = document.createElement("option");
        pay.setAttribute("value",element['num']);
        pay.innerHTML = element['name'];
        paysSelector.appendChild(pay);
    });
}

function Filter()
{

    dej2 = document.getElementById("dej2");
    dej3 = document.getElementById("dej3");
    var dej;
    if(dej2.checked) dej = "oui";
    else if(dej3.checked) dej = "non";
    else dej = "";

    enfant2 = document.getElementById("enfants2");
    enfant3 = document.getElementById("enfants3");
    var enfant;
    if(enfant2.checked) enfant = "oui";
    else if(enfant3.checked) enfant = "non";
    else enfant = "";

    prix = document.getElementById("priceRange").value;
    max = document.getElementById("prices1").checked;

    pays = document.getElementById("pays");
    paysVal = pays.options[pays.selectedIndex].value;

    depart = document.getElementById("depart").value;
    retour = document.getElementById("retour").value;

    destinations = FilterValues(dej, enfant, prix, max, paysVal, depart, retour);
    var dest = document.getElementById("destinations");
    dest.innerHTML = "";

    depart = document.getElementById("depart").value;
    retour = document.getElementById("retour").value;

    destinations.forEach(function(element)
                         {
        dest.appendChild(DisplayDestinationIndex(element));
    });
}

function FilterValues(dej, enfant, prix, max, pays, depart, retour)
{
    destinations = InitDestinations();

    if(dej == "oui")
    {
        for( var i = destinations.length; i--;){
            if ( destinations[i]['petit_dej'] == false) 
            {
                destinations.splice(i, 1); 
            }
        }
    }
    else if(dej == "non")
    {
        for( var i = destinations.length; i--;){
            if ( destinations[i]['petit_dej'] == true)  
            {
                destinations.splice(i, 1); 
            }
        }
    }

    if(enfant == "oui")
    {
        for( var i = destinations.length; i--;){
            if ( destinations[i]['enfants'] == false)  
            {
                destinations.splice(i, 1);               
            }
        }
    }
    else if(enfant == "non")
    {
        for( var i = destinations.length; i--;){
            if ( destinations[i]['enfants'] == true)  
            {
                destinations.splice(i, 1);
            }
        }
    }

    if(max)
    {
        for( var i = destinations.length; i--;){
            if (prix < destinations[i]['price'])  
            {
                destinations.splice(i, 1);               
            }
        }
    }
    else
    {
        for( var i = destinations.length; i--;){
            if (prix > destinations[i]['price'])  
            {
                destinations.splice(i, 1);
            }
        }
    }

    if(pays != 0){
        for( var i = destinations.length; i--;){
            if (pays != destinations[i]['country']['num'])  
            {
                destinations.splice(i, 1);
            }
        }
    }

    if(depart != ""){
        for( var i = destinations.length; i--;){
            dateDest = txt2Date(destinations[i]['date_ouverture']);       
            departDate = new Date(depart);  
            if (departDate-dateDest<0)  
            {
                destinations.splice(i, 1);
            }
        }
    }

    if(retour != ""){
        for( var i = destinations.length; i--;){
            dateDest = txt2Date(destinations[i]['date_fermeture']);       
            retourDate = new Date(retour); 
            if (dateDest-retourDate<-7200000)  
            {
                destinations.splice(i, 1);
            }
        }
    }

    return destinations;
}

function RemoveUnusedFormElement(destination)
{

    dej = document.getElementById("dejLabel");
    enfant = document.getElementById("enfantLabel");

    if(!destination['petit_dej']){
        dej.style.display = "none";
        document.getElementById("dej").value = false;
    }

    if(!destination['enfants']){
        enfant.style.display = "none";
        document.getElementById("NbEnfant").value = 0;
    }
}

function SendForm()
{
    if(VerifChamp(false))
    {
        dej = document.getElementById("dejeuner").checked;
        document.getElementById("dej").value = dej;
        document.getElementById("prixFinal").value = CalculePrix(false);
        document.getElementById("renseignement").submit();
    }
}

function VerifChamp(display)
{
    erreur = "";
    dateDepart = document.getElementById("depart").value;
    dateRetour = document.getElementById("retour").value;
    nbAdulte = document.getElementById("NbAdulte").value;
    nbEnfant = document.getElementById("NbEnfant").value;
    nom = document.getElementById("nom").value;
    prenom = document.getElementById("prenom").value;
    mail = document.getElementById("mail").value;


    if(dateDepart == "" || dateRetour == "" || nbAdulte == "" || prenom == "")
    {
        erreur="Un ou plusieurs champs du formulaire ne sont pas correctement remplis.";
    }

    if(mail = "" || nom == "" || nbEnfant == "")
    {
        erreur="Un ou plusieurs champs du formulaire ne sont pas correctement remplis.";
    }

    if (erreur=="")
    {
        dateDepartd = new Date(document.getElementById("depart").value);
        dateRetourd = new Date(document.getElementById("retour").value);
        duree = (dateRetourd-dateDepartd)/1000/60/60/24;

        if (duree < 0)
        {
            erreur += "La durée du séjour doit être suppérieure ou égale à un jour.";  
        }
    }

    document.getElementById("Erreur").innerHTML = erreur;
    if (erreur=="")
    {
        if(display)
        {
            document.getElementById("Prix").innerHTML = CalculePrix(true);
        }
        else 
        {
            return true;
        }

    }

    if(!display) return false;
}

function CalculePrix(display)
{   

    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);

    var destinations = InitDestinations();
    var destination;

    destinations.forEach(function(element)
                         {
        if(element['link'] == destinationName) destination = element;
    });

    prixJourneeAdulte = destination['price']

    erreur = "";
    dateDepart = new Date(document.getElementById("depart").value); 
    dateRetour = new Date(document.getElementById("retour").value);
    duree = (dateRetour-dateDepart)/1000/60/60/24;

    if (duree < 0)
    {
        erreur += "La durée du séjour doit être suppérieure ou égale à un jour.\n";  
    }

    nbAdulte = parseInt(document.getElementById("NbAdulte").value);
    nbEnfant = parseInt(document.getElementById("NbEnfant").value);
    dejeuner = document.getElementById("dej").checked;

    if(nbAdulte>=1)
    {
        prixJournee = prixJourneeAdulte*(nbAdulte + 0.4*nbEnfant);

        if(dejeuner)
        {
            prixJournee += 8*(nbAdulte+nbEnfant);
        }

        prix=prixJournee*duree;
    }
    else
    {
        erreur += "Il faut au moins un adulte.";
    }

    if (erreur == "")
    {
        if(display)
        {
            return "Le Prix de votre voyage sera de " + prix + "€.";
        }
        else
        {
            return prix;
        }
    }            
    else
    {
        return erreur;
    }
}

function AfficherPrix()
{
    VerifChamp(true);
}

function LogOut()
{
    localStorage.removeItem("login");
}

function makeReservation()
{
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);

    nom = document.getElementById("nom").value;
    prenom = document.getElementById("prenom").value;
    mail = document.getElementById("mail").value;
    tel = document.getElementById("tel").value;
    depart = document.getElementById("depart").value;
    retour = document.getElementById("retour").value;
    nbAdulte = document.getElementById("NbAdulte").value;
    nbEnfant = document.getElementById("NbEnfant").value;
    dej = params.get('dej');
    rens = document.getElementById("rens").value;
    login = localStorage.getItem("login");
    prix = parseInt(params.get('prixFinal'));
    var destination;

    destinationStr = params.get('destination');
    destinations = InitDestinations();
    destinations.forEach(function(element){
        if(element['link'] == destinationStr){
            destination = element;
        }
    })

    var newReservation = 
        {
            nom: nom,
            prenom: prenom,
            mail: mail,
            tel: tel,
            depart: depart,
            retour: retour,
            nbAdulte: nbAdulte,
            nbEnfant: nbEnfant,
            dej: dej,
            rens: rens,
            login: login,
            destination: destination,
            prix: prix
        };

    var reservations;

    if(localStorage.getItem("reservations") != null)
    {
        reservations = JSON.parse(localStorage.getItem("reservations"));
    }
    else
    {
        reservations = [];
    }

    reservations.push(newReservation);

    localStorage.setItem("reservations", JSON.stringify(reservations));

    document.getElementById("renseignement").submit();
}

function RemoveReservation(reservation)
{
    var reservations = JSON.parse(localStorage.getItem("reservations"));

    for( var i = reservations.length; i--;){
        if ( JSON.stringify(reservations[i]) == reservation)  
        {
            reservations.splice(i, 1); 
        }
    }

    localStorage.setItem("reservations", JSON.stringify(reservations));
}

// Init functions

function InitOnload()
{

    // Initialisation en fonction de la page
    var path = window.location.pathname;
    var paths = path.split("/");
    var page = (paths[paths.length -1]).split(".")[0];

    var user = GetLogin();

    switch(page)
    {
        case 'index':
            InitIndex();
            break;
        case 'reservation':
            InitReservation();
            break;
        case 'recap':
            InitRecap();
            break;
        case 'panier':
            InitPanier(user);
            break;
        default:
    }

    // Initialisation pour toutes les pages

    //Gestion des Utilisateur

    if(user != null){
        document.getElementById("user").style.visibility = "visible";
        document.getElementById("userName").innerHTML = user['name'];
        var logNav = document.getElementById("logNav");
        logNav.innerHTML = "Se deconnecter";
        logNav.setAttribute("href","index.html");
        logNav.setAttribute("onclick","LogOut()");
    }
}

function InitIndex()
{
    DisplayDestinationsIndex(InitDestinations());

    var filtreRadio = document.getElementsByClassName("filtreradio");

    for(var i = 0, max = filtreRadio.length; i < max; i++) {
        filtreRadio[i].onclick = function() {
            Filter();
        }
    }

    depart = document.getElementById("depart");
    depart.onchange = function() {
        Filter();
    }

    retour = document.getElementById("retour");
    retour.onchange = function() {
        Filter();
    }

    AddPays2BSelected();

    var slider = document.getElementById("priceRange");
    var output = document.getElementById("priceDisplay");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
        Filter();
    }
}

function InitReservation()
{
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);

    destinationName = params.get('destination');

    var destinations = InitDestinations();
    var destination;

    destinations.forEach(function(element)
                         {
        if(element['link'] == destinationName) destination = element;
    });

    RemoveUnusedFormElement(destination);

    document.getElementById("dest").innerHTML = destination['name'] + ' ( ' + destination['price'] + ' € / par adulte)';
    document.getElementById("image").src = "img/" + destination['picture'];
    document.getElementById("image").alt = destination['name'];

    document.getElementById("destination").value = destination['link'];
    document.getElementById("prixJour").value = destination['price']; 
}

function InitRecap()
{

    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);

    destinationName = params.get('destination');
    prix = parseInt(params.get('prixFinal'));
    nom = params.get('nom');
    prenom = params.get('prenom');
    mail = params.get('mail');
    tel = params.get('tel');
    depart = params.get('depart');
    retour = params.get('retour');
    nbAdulte = params.get('adulte');
    nbEnfant = params.get('enfant');
    dejeuner = params.get('dej');
    rens = params.get('rens');

    var destinations = InitDestinations();
    var destination;

    destinations.forEach(function(element)
                         {
        if(element['link'] == destinationName) destination = element;
    });

    document.getElementById("dest").innerHTML = destination['name'] + '  ' + prix + ' €';
    document.getElementById("image").src = "img/" + destination['picture'];
    document.getElementById("image").alt = destination['name'];

    document.getElementById("nom").value = nom;
    document.getElementById("prenom").value = prenom;
    document.getElementById("mail").value = mail;
    document.getElementById("tel").value = tel;
    document.getElementById("depart").value = depart;
    document.getElementById("retour").value = retour;
    document.getElementById("NbAdulte").value = nbAdulte;

    RemoveUnusedFormElement(destination);

    if(destination['enfants']) document.getElementById("NbEnfant").value = nbEnfant;

    if(dejeuner == 'true')
    {
        document.getElementById("dej").checked = true;  
    }
    else
    {
        document.getElementById("dej").checked = false;
    }
    document.getElementById("rens").value = rens;

}

function InitPanier(user)
{
    var reservations = JSON.parse(localStorage.getItem("reservations"));
    
    console.log(localStorage.getItem("reservations"));

    if(reservations != null && reservations != "")
    {
        var userReservations = [];

        reservations.forEach(function(element){
            if(element["login"] == user["login"]){
                userReservations.push(element);
            }
        })

        if(userReservations.length > 0){

            DisplayReservations(userReservations);
        }
        else
        {
            var msgVide = document.createElement("p");
            msgVide.innerHTML = "Votre panier est vide";
            msgVide.setAttribute("id","panierVide");
            document.getElementById("paniers").appendChild(msgVide);
        }
    }
    else
    {
        var msgVide = document.createElement("p");
        msgVide.innerHTML = "Votre panier est vide";
        msgVide.setAttribute("id","panierVide");
        document.getElementById("paniers").appendChild(msgVide);
    }
}

// Database function simulators

function InitUsers()
{
    var admin =
        {
            login: "admin",
            pwd: "Admin123",
            name: "Admin"
        }; 
    var usr1 =
        {
            login: "user1",
            pwd: "mdpU1",
            name: "Utilisateur 1"
        };
    var usr2 =
        {
            login: "user2",
            pwd: "mdpU2",
            name: "Utilisateur 2"
        };
    var usr3 =
        {
            login: "user3",
            pwd: "mdpU3",
            name: "Utilisateur 3"
        };
    var usr4 =
        {
            login: "user4",
            pwd: "mdpU4",
            name: "Utilisateur 4"
        };
    var users = [admin,usr1,usr2,usr3,usr4];

    return users;
}

function InitPays()
{
    var etats_unis =
        {
            num: 1,
            name: 'Etats-Unis'
        };
    var allemagne =
        {
            num: 2,
            name: 'Allemagne'
        }; 
    var italie =
        {
            num: 3,
            name: 'Italie'
        }; 
    var belegique =
        {
            num: 4,
            name: 'Belegique'
        };
    var france =
        {
            num: 5,
            name: 'France'
        };
    var japon =
        {
            num: 6,
            name: 'Japon'
        };
    var hongrie =
        {
            num: 7,
            name: 'Hongrie'
        };
    var monaco =
        {
            num: 8,
            name: 'Monaco'
        };

    pays = [etats_unis,allemagne,italie,belegique,france,japon,hongrie,monaco];

    return pays;
}

function InitDestinations()
{
    pays = InitPays();

    var monterySalinas = 
        {
            name:'Monterey Salinas',
            country:pays[0],
            state:'Californie',
            track:'Laguna Seca',
            price:200,
            link:'montereySalinas',
            picture:'montereySalinas.jpg',
            date_ouverture:new Date(2019, 1, 1),
            date_fermeture:new Date(2019, 12, 31),
            enfants:true,
            petit_dej:true
        };
    var nurburg = 
        {
            name:'Nürburg',
            country:pays[1],
            state:'Rhineland',
            track:'Nürburgrin',
            price:150,
            link:'nurburg',
            picture:'nurburg.jpg',
            date_ouverture:new Date(2019, 2, 24),
            date_fermeture:new Date(2019, 11, 10),
            enfants:true,
            petit_dej:false
        };
    var monza = 
        {
            name:'Monza',
            country:pays[2],
            state:'Lombardy',
            track:'Monza',
            price:450,
            link:'monza',
            picture:'monza.jpg',
            date_ouverture:new Date(2019, 4, 4),
            date_fermeture:new Date(2019, 9, 25),
            enfants:false,
            petit_dej:true
        };
    var leMans = 
        {
            name:'Le Mans',
            country:pays[4],
            state:'Pays de la Loire',
            track:'Le Mans',
            price:200,
            link:'leMans',
            picture:'leMans.jpg',
            date_ouverture:new Date(2019, 3, 12),
            date_fermeture:new Date(2019, 10, 10),
            enfants:true,
            petit_dej:true
        };
    var Stavelot = 
        {
            name:'Stavelot',
            country:pays[3],
            state:'Liège',
            track:'Spa',
            price:80,
            link:'stavelot',
            picture:'stavelot.jpg',
            date_ouverture:new Date(2019, 5, 1),
            date_fermeture:new Date(2019, 8, 15),
            enfants:true,
            petit_dej:false
        };
    var indianapolis = 
        {
            name:'Indianapolis',
            country:pays[0],
            state:'Indiana',
            track:'Indianapolis',
            price:750,
            link:'indianapolis',
            picture:'indianapolis.jpg',
            date_ouverture:new Date(2019, 4, 25),
            date_fermeture:new Date(2019, 4, 27),
            enfants:false,
            petit_dej:false
        };
    var nihonmatsu = 
        {
            name:'Nihonmatsu',
            country:pays[5],
            state:'Fukushima Prefecture',
            track:'Ebisu',
            price:1000,
            link:'nihonmatsu',
            picture:'nihonmatsu.jpg',
            date_ouverture:new Date(2019, 5, 15),
            date_fermeture:new Date(2019, 8, 9),
            enfants:false,
            petit_dej:false
        };
    var mogyorod = 
        {
            name:'Mogyoród',
            country:pays[6],
            state:'Pest',
            track:'Hungaroring',
            price:350,
            link:'mogyorod',
            picture:'mogyorod.jpg',
            date_ouverture:new Date(2019, 2, 3),
            date_fermeture:new Date(2019, 10, 14),
            enfants:false,
            petit_dej:true
        };
    var monteCarlo = 
        {
            name:'Monte-Carlo',
            country:pays[7],
            state:'Monaco',
            track:'Circuit de Monaco',
            price:1375,
            link:'monteCarlo',
            picture:'monteCarlo.jpg',
            date_ouverture:new Date(2019, 6, 1),
            date_fermeture:new Date(2019, 8, 31),
            enfants:true,
            petit_dej:true
        };

    var destinations = [monterySalinas,nurburg,monza,leMans,Stavelot,indianapolis,nihonmatsu,mogyorod,monteCarlo];

    return destinations;
}

// Displays

function DisplayDestinationsIndex(destinations)
{
    var dest = document.getElementById("destinations");

    destinations.forEach(function(element)
                         {
        dest.appendChild(DisplayDestinationIndex(element));
    });

}

function DisplayDestinationIndex(destination)
{
    var link = document.createElement("a");
    link.setAttribute("href", "reservation.html?destination=" + destination['link'])

    var article = document.createElement("article");
    article.setAttribute("class","destination");

    var h3 = document.createElement("h3");
    h3.innerHTML = destination['name'];

    var img = document.createElement("img");
    img.setAttribute("src", "img/" + destination['picture']);
    img.setAttribute("alt", destination['name']);

    var pays = document.createElement("p");
    pays.setAttribute("class", "infos");
    pays.innerHTML = destination['country']['name'];

    var etat = document.createElement("p");
    etat.setAttribute("class", "infos");
    etat.innerHTML = destination['state'];

    var circuit = document.createElement("p");
    circuit.setAttribute("class", "infos");
    circuit.innerHTML = destination['track'];

    var petit_dej = document.createElement("p");
    petit_dej.setAttribute("class","infos2");
    petit_dej.innerHTML = "Petit-déjeuner : " + Bool2Text(destination['petit_dej']);

    var enfant = document.createElement("p");
    enfant.setAttribute("class","infos2");
    enfant.innerHTML = "Enfants : " + Bool2Text(destination['enfants']);

    var prix = document.createElement("p");
    prix.setAttribute("class", "prix");
    prix.innerHTML = destination['price'] + "€ par jour";

    var dates = document.createElement("p");
    dates.setAttribute("class","dates");
    dates.innerHTML = "Ouvert du " + Date2Text(destination['date_ouverture']) + " au " + Date2Text(destination['date_fermeture']) + " 2019";

    article.appendChild(h3);
    article.appendChild(img);
    article.appendChild(pays);
    article.appendChild(etat);
    article.appendChild(circuit);
    article.appendChild(petit_dej);
    article.appendChild(enfant);
    article.appendChild(prix);
    article.appendChild(dates);

    link.appendChild(article);
    return link;
}

function DisplayReservations(reservations)
{
    panier = document.getElementById("paniers");

    reservations.forEach(function(element){
        panier.appendChild(DisplayReservation(element));
    })
}

function DisplayReservation(reservation)
{
    var value = JSON.stringify(reservation);

    var article = document.createElement("article");
    article.setAttribute("class","panier");

    var h3 = document.createElement("h3");
    h3.innerHTML = reservation['destination']['name'];

    var supr = document.createElement("a");
    supr.setAttribute("class","removeReservation");
    supr.setAttribute("href","panier.html");
    supr.setAttribute("onclick","RemoveReservation('"+value+"')");

    var suprIcon = document.createElement("i");
    suprIcon.setAttribute("class","fas fa-times-circle");
    supr.appendChild(suprIcon);

    var img = document.createElement("img");
    img.setAttribute("src", "img/" + reservation['destination']['picture']);
    img.setAttribute("alt", reservation['destination']['name']);

    var pays = document.createElement("p");
    pays.setAttribute("class", "infos");
    pays.innerHTML = reservation['destination']['country']['name'];

    var etat = document.createElement("p");
    etat.setAttribute("class", "infos");
    etat.innerHTML = reservation['destination']['state'];

    var circuit = document.createElement("p");
    circuit.setAttribute("class", "infos");
    circuit.innerHTML = reservation['destination']['track'];
    
    var nom = document.createElement("p");
    nom.setAttribute("class","infos");
    nom.innerHTML = reservation['prenom'] + " " + reservation['nom'];
    
    var mail = document.createElement("p");
    mail.setAttribute("class","infos");
    mail.innerHTML = reservation['mail'];
    
    var tel = document.createElement("p");
    tel.setAttribute("class","infos");
    tel.innerHTML = reservation['tel'];

    var adulte = document.createElement("p");
    adulte.setAttribute("class","infos");
    adulte.innerHTML = "Adultes : " + reservation['nbAdulte'];

    var enfant = document.createElement("p");
    enfant.setAttribute("class","infos");
    enfant.innerHTML = "Enfants : " + reservation['nbEnfant'];

    var petit_dej = document.createElement("p");
    petit_dej.setAttribute("class","infos");
    petit_dej.innerHTML = "Petit-déjeuner : " + Bool2Text(reservation['dej'] == "true");

    var prix = document.createElement("p");
    prix.setAttribute("class", "prix");
    prix.innerHTML = reservation['prix'] + "€";

    var dates = document.createElement("p");
    dates.innerHTML = "Du " + Date3Text(reservation['depart']) + " au " + Date3Text(reservation['retour']) + " 2019";
    
    article.appendChild(h3);
    article.appendChild(supr);
    article.appendChild(img);
    article.appendChild(pays);
    article.appendChild(etat);
    article.appendChild(circuit);
    article.appendChild(nom);
    article.appendChild(mail);
    article.appendChild(tel);
    article.appendChild(adulte);
    article.appendChild(enfant);
    article.appendChild(petit_dej);
    article.appendChild(prix);
    article.appendChild(dates);
    
    if(reservation['rens'] != null && reservation['rens'] != ""){
        var rens = document.createElement("small");
        rens.innerHTML = "<strong>Renseignements :</strong> " + reservation['rens'];
        article.appendChild(rens);
    }

    return article;
}

// "Converters"
function Date2Text(date)
{
    var d = new Date(date);
    var day = d.getDate();
    var month = d.getMonth();
    if(month == 0) month = 12;

    return day + "/" + month;
}

function Date3Text(date)
{
    var d = new Date(date);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    if(month == 0) month = 12;

    return day + "/" + month;
}

function Bool2Text(b)
{
    if(b)
    {
        return "Oui";
    }
    return "Non";
}

function txt2Date(dateTxt)
{
    date = new Date(dateTxt);
    date.setMonth(date.getMonth() - 1);          
    return date;
}