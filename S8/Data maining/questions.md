## Quelles sont les différentes façons d’obtenir des données afin d’en faire l’analyse? (1 point)

Génération des données ou collecte

## Les enquêtes en ligne sont actuellement utilisées pour récupérer les avis sur des projets et des produits. Néanmoins, nous trouvons encore des gens dans les supermarchés posant des questions ainsi que des enquêtes porte à porte. Pourquoi, à votre avis, ces enquêtes face à face sont toujours utilisées? (1 point)

Les réactions des gens peuvent être différentes, ne touchent pas le même échantillon de la population

## Quelles sont les contraintes ACID? Quelles contraintes sont assouplies par les bases de données NoSQL et pourquoi? (1 point)

(Atomicité, Cohérence, Isolation, Durabilité) des transactions
Les SGBD NoSQL assouplissent généralement une des contraintes parmis "Cohérence", "Isolation" et "Durabilité".

## Quels sont les différents types de base de données NoSQL? Décrivez-les brièvement. (1 point)

Clé/Valeur, Document, Graph, Column-oriented

## Qu’est-ce que la visualisation de données ? Pourquoi les diverses méthodes de visualisation sont importantes ? Expliquez en donnant des exemples. (1 point)

Représentation graphique des données.
Elles permettent d'adapter la représentation à ce dont on a besoin.
Exemples: Afficher des proportions, pie chart

## Quels sont les différents objectifs du Data Mining (Exploration de données). (1 point)

Repérer des tendances par rapport à l'évolution des données.

## Qu’est-ce-que un classificateur? Quels sont les différents types de classificateurs? (1 point)

C'est une fonction du data mining qui assigne un item à une collection.
Binaire ou multiclasse.

## Comment pouvons-nous comparer et évaluer l’efficacité des classificateurs? (1 point)

On utilise un set de données dont on connait les résultats, puis on compte le nombre de vrais positifs, faux positifs, faux négatifs.

## Quelles sont les différentes méthodes de partitionnement de données que vous avez vues pendant vos travaux pratiques ? Quelles sont leurs avantages et limites? (1 point)

KMeans, MiniBatchKMean, Perceptron, Multi-Layer Perceptron, Decision Tree, Random Forest Classifier, Deep Neural Network

## Considérons un fichier CSV contenant les colonnes suivantes : photoId, ville, année et nombredevues. Ce fichier contient les informations détaillées sur les photos d’un site web de photographie. Votre objectif est de coder en Python (utilisation de la bibliothèque pandas préférable) un programme qui peut lire ce fichier CSV et calcule les valeurs suivantes :

1. La photo la plus vue et la moins vue
```py
```

2. La ville dans laquelle le plus grand nombre et le plus petit nombre de photos ont été prises
```py
```

3. L’année pendant laquelle le plus grand nombre de photos a été pris
```py
```

4. Pour chaque ville, le nombre de vues moyenne sur l’année 2018
```py
```

## Qu’est-ce qu’un réseau de neurones artificiel? (1 point)

Un assemblage de plusieurs couches de neurones reliées entre elles. Les neurones sont composés d'une entrée et une sortie auquels sont associés un poids. Les entrées sont additionnées.

## Pourquoi, à votre avis, l’apprentissage par renforcement est pertinent pour la navigation intérieure ou extérieure des robots? (1 point)

Il est facile de détecter les fautes et de lui apprendre à ne pas les refaire.

## Un site web d’annotation a demandé à 10 utilisateurs de décrire une image en utilisant 5 hashtag (mot-diès). Vous trouverez ci-dessous une table détaillant les choix de hashtags des 10 utilisateurs. La table contient 5 colonnes et 10 lignes. Chaque ligne correspond à un utilisateur. Chaque colonne correspond à un hashtag; les valeurs dans la colonne contiennent soit 0 soit 1. Si la valeur est égale à 0, l’utilisateur n’a pas choisi ce hashtag, sinon la valeur est 1. Votre objectif est de trouver toutes les règles d’association dans cette table. Que pensez-vous de cette image. (1.5 points)

Utilisateur	#Architecture	#Nature	#Paris	#StreetArt	#Fractals
U1		1		0	0	1		0
U2		1		1	1	1		1
U3		1		0	0	1		0
U4		1		1	1	1		1
U5		0		1	0	0		1
U6		0		1	1	1		0
U7		0		0	0	0		0
U8		0		0	0	0		0
U9		0		1	1	1		1
U10		1		0	0	1		0

On voit que les tags StreetArt et Architecture sont fortement liés car ils sont quasiment toujours cochés ensemble. Pareil pour Nature, Paris et Fractals.
Etant donné que StreetArt a le plus gros score, l'image à de grandes chances de représenter de l'architecture et du street art.