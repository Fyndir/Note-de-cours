## Quelles sont les différentes façons d’obtenir des données afin d’en faire l’analyse? (1 point)

* Surveys: Manual surveys,Online surveys
* Sensors : Temperature, pressure, humidity, rainfall ,Acoustic, navigation ,Proximity, presence sensors
* Social networks
* Video surveillance cameras
* Web

## Les enquêtes en ligne sont actuellement utilisées pour récupérer les avis sur des projets et des produits. Néanmoins, nous trouvons encore des gens dans les supermarchés posant des questions ainsi que des enquêtes porte à porte. Pourquoi, à votre avis, ces enquêtes face à face sont toujours utilisées? (1 point)

Les réactions des gens peuvent être différentes, ne touchent pas le même échantillon de la population

## Quelles sont les contraintes ACID? Quelles contraintes sont assouplies par les bases de données NoSQL et pourquoi? (1 point)

* Atomicity: Each transaction must be "all or nothing".
* Consistency: Any transaction must bring database from one valid state to another.
* Isolation: Both concurrent execution and sequential execution of transactions must bring the database to same state.
* Durability: Irrespective of power losses, crashes, a transaction once committed to the database must remain in that state.

Many NoSQL stores compromise consistency (in the sense of the CAP theorem) in favor of availability, partition tolerance, and speed. 

## Quels sont les différents types de base de données NoSQL? Décrivez-les brièvement. (1 point)

Base de données non relationnelles qui ne présente pas de contrainte de lien ce qui la rend bien plus rapide.  
**Type 1 : Entrepôts clé-valeur (ECV)**  
Les données sont stockées en clé-valeur : une clé plus un BLOB (dans lequel on peut mettre : nombre, date, texte, XML, photo, vidéo, structure objet).  
**Type 2 : Bases orientées documents**  
Ces bases de données stockent des données semi-structurées : le contenu est formaté JSON ou XML, mais la structure n'est pas contrainte.  
**Type 3 : Bases orientées colonnes**  
Ces bases de données se rapprochent des bases de données relationnelles, à ceci près qu'elles permettent de remplir un nombre de colonnes variable.  
**Type 4 : Bases de données orientées graphes**  
Ces bases de données, basées sur la théorie des graphes, sont gérées par noeuds, relations et propriétés. Elles gèrent des données spatiales, sociales ou financières (dépôts/retraits).

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

```py
import pandas as pd
import random as rd
                                                            
generatedViewScore = []
for i in range(6):
    generatedViewScore.append(rd.randint(0,100000))

data = {
    "PhotoId" : range(0,6),
    "City" : ["Paris","Lyon","Lyon","Marseille","Paris","Paris"],
    "Year" : ["2018","2018","2018","2015","2012","2012"],
    "ViewNb" : generatedViewScore
}

df = pd.DataFrame(data)

print(df)

```
1. La photo la plus vue et la moins vue
```py
# Most viewed photo

# Sorted by Views Number
sorted_df = df.sort_values(by=['ViewNb'],ascending=False)

# Print the first row
print(sorted_df.iloc[0])

# Less viewed photo

# Sorted by Views Number
sorted_df = df.sort_values(by=['ViewNb'],ascending=True)

# Print the first row
print(sorted_df.iloc[0])
```

2. La ville dans laquelle le plus grand nombre et le plus petit nombre de photos ont été prises
```py
# City where the most photos has been taken and the less

# We only need the city column
city_df = df[['City']]

# How many photos has been taken for each city
grouped_df = city_df.groupby(['City']).size().reset_index(name='counts')

# We sort them
sorted_grouped_df = grouped_df.sort_values(by=['counts'],ascending=False)

# We take the first and the last
max_row = sorted_grouped_df.iloc[0][['City']]
min_row = sorted_grouped_df.iloc[-1][['City']]

print(max_row)
print(min_row)
```

3. L’année pendant laquelle le plus grand nombre de photos a été pris
```py
# Year where the most photo has been taken

# We only need the year column
year_df = df[['Year']]

# How many photos has been taken every years
grouped_df = year_df.groupby(['Year']).size().reset_index(name='counts')

# We sort them
sorted_grouped_df = grouped_df.sort_values(by=['counts'],ascending=False)

# We take the first and the last
max_year = sorted_grouped_df.iloc[0][['Year']]
print(max_year)
```
4. Pour chaque ville, le nombre de vues moyenne sur l’année 2018
```py
# Average views on 2018 for each city

# We only keep data from 2018
df_2018 = df[df['Year'] == '2018']

# We only keep 'City' and 'ViewNb' 
city_views_on_2018_df = df_2018[['City','ViewNb']]

# We group by city and year
grouped_df = city_views_on_2018_df.groupby(['City']).agg(['mean']).reset_index()
print(grouped_df)
```

## Qu’est-ce qu’un réseau de neurones artificiel? (1 point)

Un assemblage de plusieurs couches de neurones reliées entre elles. Les neurones sont composés d'une entrée et une sortie auquels sont associés un poids. Les entrées sont additionnées.

## Pourquoi, à votre avis, l’apprentissage par renforcement est pertinent pour la navigation intérieure ou extérieure des robots? (1 point)

Il est facile de détecter les fautes et de lui apprendre à ne pas les refaire.

## Un site web d’annotation a demandé à 10 utilisateurs de décrire une image en utilisant 5 hashtag (mot-diès). Vous trouverez ci-dessous une table détaillant les choix de hashtags des 10 utilisateurs. La table contient 5 colonnes et 10 lignes. Chaque ligne correspond à un utilisateur. Chaque colonne correspond à un hashtag; les valeurs dans la colonne contiennent soit 0 soit 1. Si la valeur est égale à 0, l’utilisateur n’a pas choisi ce hashtag, sinon la valeur est 1. Votre objectif est de trouver toutes les règles d’association dans cette table. Que pensez-vous de cette image. (1.5 points)

| Utilisateur | #Architecture | #Nature\| | #Paris | #StreetArt | #Fractals |
|-------------|---------------|-----------|--------|------------|-----------|
| U1          | 1             | 0         | 0      | 1          | 0         |
| U2          | 1             | 1         | 1      | 1          | 1         |
| U3          | 1             | 0         | 0      | 1          | 0         |
| U4          | 1             | 1         | 1      | 1          | 1         |
| U5          | 0             | 1         | 0      | 0          | 1         |
| U6          | 0             | 1         | 1      | 1          | 0         |
| U7          | 0             | 0         | 0      | 0          | 0         |
| U8          | 0             | 0         | 0      | 0          | 0         |
| U9          | 0             | 1         | 1      | 1          | 1         |
| U10         | 1             | 0         | 0      | 1          | 0         |

On voit que les tags StreetArt et Architecture sont fortement liés car ils sont quasiment toujours cochés ensemble. Pareil pour Nature, Paris et Fractals.  
Etant donné que StreetArt a le plus gros score, l'image à de grandes chances de représenter de l'architecture et du street art.

## On considère une entreprise avec plusieurs sites web internes qui utilisent HTML et CSS. Votre objectif est de récupérer toutes les pages web de tous ces sites web internes afin de créer un répertoire centralisé. Vous avez accès à toutes les pages web (HTML et CSS), mais vous ne pouvez pas accéder aux bases de données utilisées par les sites web. Quelle est votre approche pour télécharger toutes les pages web ? Quels sont les inconvénients de votre approche? (1.5 points)

Cela s'appelle du web crawling. Cela consiste à parcourir des pages internet automatiquement à l'aide d'un robot. L'inconvénient est que l'on se base 
sur l'achitecture de la page. Si elle est amenée à changer (changement de nom de classe, ...) il faut mettre à jour le crawler.

## Qu’est-ce qu’une base de données NoSQL? Quels sont les différents types de base de données NoSQL? Décrivez-les brièvement. (1 point)

Base de données non relationnelles qui ne présente pas de contrainte de lien ce qui la rend bien plus rapide.  
**Type 1 : Entrepôts clé-valeur (ECV)**  
Les données sont stockées en clé-valeur : une clé plus un BLOB (dans lequel on peut mettre : nombre, date, texte, XML, photo, vidéo, structure objet).  
**Type 2 : Bases orientées documents**  
Ces bases de données stockent des données semi-structurées : le contenu est formaté JSON ou XML, mais la structure n'est pas contrainte.  
**Type 3 : Bases orientées colonnes**  
Ces bases de données se rapprochent des bases de données relationnelles, à ceci près qu'elles permettent de remplir un nombre de colonnes variable.  
**Type 4 : Bases de données orientées graphes**  
Ces bases de données, basées sur la théorie des graphes, sont gérées par noeuds, relations et propriétés. Elles gèrent des données spatiales, sociales ou financières (dépôts/retraits).

## Le nettoyage de données est une étape importante avant de faire l’analyse de données. Pourquoi ? Quels sont les différents types d’erreurs ? Comment peut-on les résoudre? (1 point)

Une préparation des données soignée permet une analyse plus efficace, limite les erreurs et imprécisions qui peuvent survenir lors du traitement des données et facilite l'accès des utilisateurs à l'intégralité des données traitées.

Type d'erreur lors du nettoyage de données :

* Syntactical errors :
    * Lexical errors (e.g., user entered a string instead of a number)
    * Data format errors (e.g, order of last name, first name)
    * Irregular data errors (e.g., usage of different metrics)
* Semantical errors : 
    * Violation of integrity constraints
    * Contradiction
    * Duplication
    * Invalid data (unable to detect despite presence of triggers and integrity constraints)
* Data coverage errors :
    * missing values
    * missing data

Resoudre ces erreurs :

* Handling Syntactical errors :
    * Validation using schema (e.g., XSD, JSONP)
    * Data transformation
* Handling Semantic errors :
    * Duplicate elimination using techniques like specifying integrity constraints like functional dependencies
* Handling Coverage errors :
    * Interpolation techniques
    * External data sources
    
## Qu’est-ce que un réseau de neurones récurrents? Comment-est-il différent des autres approches de réseau de neurones artificiels? (1 point)

https://fr.wikipedia.org/wiki/R%C3%A9seau_de_neurones_r%C3%A9currents

slide 131 text mining

