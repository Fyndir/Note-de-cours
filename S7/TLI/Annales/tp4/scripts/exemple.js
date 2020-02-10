/*
 * Script simple de démonstration d'utilisation d'AJAX avec un objet HTTPRequest 
 */ 

/* cette fonction renvoie le prix actuel d'une chambre, qui peut varier en fonction de la saison*/


function getPrix(fm){
	
	
	//création d'un objet permettant de réaliser des requêtes à des services distants
	var xhr = new XMLHttpRequest();
	
	//verification qu'il est possible d'envoyer une requête sur l'oobjet xhr.
	prepareXHR(xhr,fm);
	
	//ouverture de la requete
	xhr.open("GET", "http://une/adresse/de/ressource.php", true);
	//envoie de la requête; il sera possible de passer des paramètres GET avec cette requête:
	//xhr.send("toto=truc&titi=valeur2") comme si on faisait prix.php?toto=truc&titi=valeur2 directement à la main dans un navigateur
	xhr.send(null);
	
}

function traitement(reponse,fm){
	//pensez bien à ce que la ligne suivante implique dans le document HTML!!!
	fm.prix_nights.value=reponse;
}


function prepareXHR(xhr,fm){
	//création d'une fonction qui se déclenchera chaque fois que l'état de xhr change: 
	// readyState = 4 signifie que le serveur a répondu et que la réponse a été donnée
	//  status = 200 signifie que la requête a bien été envoyée (404 signifierait pas de ressource à cette adresse
	// status = 0 signifie qu'il n'y a pas encore de requête envoyée
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			
			/*xhr.responseText contient la réponse du serveur distant
			 *		 on utilise une fonction traitement (callback) pour traiter cette réponse, histoire de ne pas encombrer le code ici!
			 */
			traitement(xhr.responseText,fm);
			
		}
		
	};	
}