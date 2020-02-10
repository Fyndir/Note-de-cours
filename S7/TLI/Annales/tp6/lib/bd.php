<?php

	/*
		Utilisation:
	
		1) renseignez les variables dbName, pass et user
		2) fabriquez un objet BD:
		
		$maBD = new BD();
		
		3) vous pouvez alors exécuter des requêtes
	
		$resultat = $maBD->requete("requete en SQL");
		
		$resultat est un tableau contenant le résultat de votre requête.
		
		faites print_r($resultat) pour voir la structure de ce tableau.	
	
	*/
$maBD = new BD();
$resultat = $maBD->requete("SELECT * FROM Personne where NumPersonne= 1;");
print_r($resultat);

	class BD{
	
		private $dbName = "cinema";//mettre le nom de votre base de donnée
		private $pass = "tp"; //donnez le mot de passe de votre bd 
		private $user = "root"; //donnez le nom d'utilisateur de la bd (probablement "root")
		
		private function getDB(){
			$db = null;
			try{
				$db = new PDO('mysql:host=localhost;dbname='.$this->dbName, $this->user, $this->pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			}
			catch (Exception $e){
					die('Erreur : ' . $e->getMessage());
				}
			return $db;
		}
		
		public function requete($sql){
			$resu = null;
			
			$db = $this->getDB();
			
			foreach  ($db->query($sql) as $row) {
				$resu[] = $row;
			}
			return $resu;
		}
	}
	
	
	
	


?>