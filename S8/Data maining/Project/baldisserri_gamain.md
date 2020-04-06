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

L'algorithme de cette partie fonctionne avec l'algorithme ci dessous : 

<img src="https://cdn.discordapp.com/attachments/622447959891640341/696715656338473050/Collect.png">

## Exploitation



# Evaluation des resultats



# Conclusion

