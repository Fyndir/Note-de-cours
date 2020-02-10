<?php
	$pass ="machin"; //mot de passe renseigné pour la connexion à la base de donnée
	
	$db = new PDO('mysql:host=localhost;dbname='.$dbName, 'root', $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	
?>
