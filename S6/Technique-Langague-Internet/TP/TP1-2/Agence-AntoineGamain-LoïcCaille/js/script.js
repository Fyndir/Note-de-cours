function Destination()
{
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);

    destination = params.get('destination');
    prixJourneeAdulte = parseInt(params.get('prix'));

    document.getElementById("dest").innerHTML = FormatTxt(destination) + ' ( ' + prixJourneeAdulte + ' € / par adulte)';
    document.getElementById("image").src = "img/" + destination + ".jpg";

    document.getElementById("destination").value = destination;
    document.getElementById("prixJour").value = prixJourneeAdulte; 
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

    prixJourneeAdulte = parseInt(params.get('prix'));

    erreur = "";
    dateDepart= new Date(document.getElementById("depart").value); 
    dateRetour=	new Date(document.getElementById("retour").value);
    duree = (dateRetour-dateDepart)/1000/60/60/24;

    if (duree < 0)
    {
        erreur += "La durée du séjour doit être suppérieure ou égale à un jour.\n";  
    }

    nbAdulte = parseInt(document.getElementById("NbAdulte").value);
    nbEnfant = parseInt(document.getElementById("NbEnfant").value);
    dejeuner = document.getElementById("dejeuner").checked;

    if(nbAdulte>=1)
    {
        console.log('test');
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

function AfficherPrix() {
    VerifChamp(true);
}

function RecapValues() {

    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);

    destination = params.get('destination');
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

    document.getElementById("dest").innerHTML = FormatTxt(destination) + '  ' + prix + ' €';
    document.getElementById("image").src = "img/" + destination + ".jpg";

    document.getElementById("nom").value = nom;
    document.getElementById("prenom").value = prenom;
    document.getElementById("mail").value = mail;
    document.getElementById("tel").value = tel;
    document.getElementById("depart").value = depart;
    document.getElementById("retour").value = retour;
    document.getElementById("NbAdulte").value = nbAdulte;
    document.getElementById("NbEnfant").value = nbEnfant;
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

function FormatTxt(txt) {

    var i;
    var beg = "";
    for (i = 0; i < txt.length; i++) { 
        if(txt.charAt(i) == txt.charAt(i).toUpperCase())
        {
            beg = txt.substr(0,i);
            end = txt.substr(i,txt.length-i);
        }
    }
    
    if(beg != "")
    {
        txt = beg +' '+end;    
    }

    ftxt = txt.charAt(0).toUpperCase() + txt.substr(1); 

    return ftxt;
}