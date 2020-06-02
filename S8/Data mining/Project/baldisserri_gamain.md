# Contributor

- Baldisserri Enzo 4IRC
- Gamain Antoine 4IRC

# But du projet

Le projet se compose en deux parties distinctes :

-   la partie de collecte des données liées à nos images
-   la partie d'exploitation des données. Pour cela l'utilisateur renseigne un fichier avec ces préferences et à l'aide du datamining le programme devra lui suggérer des images proche de celles qu'il a renseigné.

# Dataset

Nous avons décidé d'utiliser un set d'image trouvé sur kaggle représentant les 809 pokémons [ici](https://www.kaggle.com/vishalsubbiah/pokemon-images-and-types). 

## Avantages : 

- Les images sont petites donc rapide à traiter
- Les images sont dans un style tres cartoon ce qui permet d'avoir de forts contrastes de couleur et ainsi simplifier leur extraction
- Le dataset contient également un fichier csv qui permet de rajouter des informations aux pokémons (type1,type2). On verra cependant par la suite que ces données ont été abandonnées apres un test infructueux.
- Les pokémons faisant parti de la culture populaire et étant connu des deux membres de l'équipe de developement ,il était facile de juger la pertinence des propositions du programme

## Inconvénients :

- Les images de notre dataset font toutes la même taille , ce qui élimine cette dimension dans l'algorithme de proposition
- Toutes les images ne partagent pas le même format (PNG JPG) ce qui complique leur exploitation et peut perturber le programme de collecte
- Les images contenant de la transparence (PNG) perturbe la collecte de données car celle-ci est interpretée par la couleur noire
- La taille du dataset ne permet pas d'avoir un algorithme de proposition précis , il est néanmoins pertinent pour un POC 

# Fonctionnement

## Collecte

L'algorithme de cette partie fonctionne comme expliqué dans le schéma ci-dessous : 

<img src="https://cdn.discordapp.com/attachments/622447959891640341/696715656338473050/Collect.png">

On peut voir que l'on utilise l'algorithme de mini batch K-means , nous avons choisi cet algo de clustering car, en nous basant sur le tp fait au préalable il était celui qui fournissait les meilleurs résultats comparés aux ressources nécessaires à son fonctionnement. En effet après un test , les résultats que nous avons obtenu avec le K-means étaient similaires mais prenaient beaucoup plus de temps. La projet tournant sur nos machines personnelles , nous avons opté pour l'algo le moins coûteux.

Afin d'éviter les lourdeurs liées a l'extraction des données (extraction à chaque run du programme) ,celles-ci sont stockées au format json. Nous avons choisi ce format car il est le format standard de stockage de données commun à la majorité des langages de programmation . Il est donc extrêmement facile à exploiter et à transmettre. Cela permet également d'avoir les deux parties du programme indépendantes.   

## Exploitation

L'algorithme de cette partie fonctionne comme expliqué dans le schéma ci-dessous : 

<img src="https://cdn.discordapp.com/attachments/622447959891640341/696718695866826837/Exploit_1.png">

Nous avons choisi de partir sur un classifier de type "Random forest". Nous avons choisi cette méthode car elle était facile à mettre en place. Les données que nous utilisions au départ étaient les 3 couleurs principales de l'image ainsi que les types du pokémon présent dans le fichier csv fourni avec le dataset. Au vu des premiers résultats nous avons choisi d'éliminer la dimension 'types du pokémon' car elle perturbait les suggestions du classifieur.

Au départ , nous avons utilisé l'intégralité de notre set d'image comme jeu d'entraînement ainsi que comme jeu de test. Le but de cette manipulation était de vérifier que les images renseignées dans les préférences de l'utilisateur ressortaint bien dans les suggestions du classificateur. Cette manipulation a été concluante , nous avons donc aprés cette vérification cloisonné le jeu d'entraînement et le jeu de test. Les pokémons préférés de l'utilisateurs provenaint tous du jeu d'entrainement. Les résultats ont gagné en précision.

# Evaluation des resultats

Dans le but de déterminer la qualité de nos résultats , nous avons constitué un dataset de pokémons qui étaient majoritairement bleus.
Voici les suggestions du classificateur :

<img src="https://media.discordapp.net/attachments/622447959891640341/696741190103597136/Capture_decran_2020-04-06_17-19-17.png?width=641&height=686">

On peut voir que 3 pokémons sur les 6 proposés correspondent à nos critères, cependant le gris et le violet sont des teintes proches du bleu donc leur suggestion n'est pas illogique

# Conclusion

Il reste encore plusieurs piste à creuser , le classificateur n'étant qu'un moyen parmis tant d'autres de suggérer des images. On peut par exemple imaginer l'utilisation de tensorflow ou encore rajouter des paramêtres à notre dataset afin d'améliorer la pertinence des résultats (plus de couleurs , ajout de label , prise en compte de la taille de l'image dans le cas d'un autre dataset). Néanmoins le résultat final que nous obtenons est plutôt encourageant: 4/6 images pertinantes avec 33 images marquées favorites sur 400. Il serait intéressant de refaire l'expérience avec un jeu plus dense et un dataset plus complet qui contiendrait plusieurs images correspondant à un même pokémon.    