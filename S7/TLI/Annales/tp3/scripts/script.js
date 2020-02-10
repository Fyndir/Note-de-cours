/*Repris et adapté par Bruno Mascret de http://dmouronval.developpez.com/tutoriels/html/formulaires-html5/
 * Les trois auteurs et traducteur
 * 
 * Jan Kleinert *
 * Traducteur : Didier Mouronval
 * Bovino
 * 
 * Licence creative commons By
 * http://creativecommons.org/licenses/by/3.0/deed.fr
 */
	function check(input) {
	  if (input.value != document.getElementById('email_addr').value) {
		input.setCustomValidity('Les deux adresses e-mail ne correspondent pas.');
	  } else {
		// le champ est valide : on réinitialise le message d'erreur
		input.setCustomValidity('');
	  }
	}
	
	function getTotal(form){
		form.total.value = (form.nights.valueAsNumber * 15) + 
		((form.guests.valueAsNumber - 1) * 10)
	}