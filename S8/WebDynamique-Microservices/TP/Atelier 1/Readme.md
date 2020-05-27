# Atelier 1
 
## Membre du Groupe
 
- Baldisserri Enzo
- Gamain Antoine
- Guillotin Antoine
- Valade Dorian
 
## Eléments réalisés du cahier des charges
 
* Affichage des cartes (Static et Dynamique)
* Création des cartes (Dynamique)
 
## Eléments non-réalisés du cahier des charges
 
* Recherche de carte (Static)
 
## Source vers le projet
 
https://github.com/Gladear/JEECardGame/tree/web-dynamique
https://github.com/Gladear/JEECardGame/tree/atelier1-webstatique
 
## Avantage/inconvénients du Web Statique et Web Dynamique
 
### Web Statique
 
#### Avantages

- Généralement moins cher à créer et maintenir
- Meilleure répartitions des tâches entre les développeurs, le front et le back sont complètement indépendants
 
#### Inconvénients

- Parfois plus complexe à mettre en oeuvre
- Dépendant du JavaScript
 
### Web Dynamique
 
#### Avantages

- Plus simple à mettre en place
- Plus simple à gérer si utilisation d'un CMS (discutable, on peut envisager d'utiliser un CMS Headless en statique)
 
#### Inconvénients

- Généralement plus cher à créer et maintenir
 
## Questions de l'atelier
 
### Qu’est-ce que le pattern MVC ? Quels avantages présente-t-il ?
 
Modèle-vue-contrôleur ou MVC est un motif d'architecture logicielle qui découpe l'application en trois parties :
 
* Modèle : Contient tous les objets de données
* Vue : Contient toute l'interface graphique
* Contrôleur : Contient l'intelligence de l'application , ce module sert à faire communiquer la vue avec le modèle
 
L'avantage de ce pattern de conception est de bien séparer son code afin de faciliter sa maintenance et son évolution.
 
### Qu’est-ce que le Web dynamique ? Pourquoi est-il intéressant ?

Un site web dynamique est un site web sur lequel les pages sont générées en temps réel. Le code est lancé côté serveur et retourne une page HTML générée au client.
Il est intéressant car facile à mettre en place et permet (selon les langages) de faire du templating directement dans des fichiers HTML.
 
### Comment sont récupérés les fichiers par le Web Browser en Web statique ?

Le navigateur récupère des ressources statiques exposées publiquement sur le serveur via des requêtes HTTP.
On peut ensuite demander plus d'information à une API grâce à l'AJAX.
 
### Quels sont les avantages d’utiliser du Web Statique avec des services REST ?

Les services REST permettent d’uniformiser nos API tout en conservant un couplage faible entre le client et le serveur (comparé au SAOP).

### Comment fonctionne l’AJAX ?

AJAX = Asynchronous JavaScript And XML.
Le navigateur effectue des requêtes HTTP de manière asynchrone sans quitter la page. Le JavaScript peut récupérer les réponses et les traiter comme il le souhaite. Il est commun d'utiliser le format JSON pour la communication car c'est un format très facilement utilisable en JavaScript.
 
![](https://www.w3schools.com/xml/ajax.gif)
 
### Qu’est-ce que JEE ?
 
Le terme « JEE » signifie Jakarta Enterprise Edition. Anciennement raccourci en « J2EE », puis ayant signifié "Java Entreprise Edition", le projet a été confié à Oracle en 2018 qui l'a renommé en "Jakarta". Il fait quant à lui référence à une extension de la plate-forme standard. Autrement dit, la plate-forme Java EE est construite sur le langage Java et la plate-forme Java SE, et elle y ajoute un grand nombre de bibliothèques remplissant tout un tas de fonctionnalités que la plate-forme standard ne remplit pas d'origine. L'objectif majeur de Java EE est de faciliter le développement d'applications web robustes et distribuées, déployées et exécutées sur un serveur d'applications.
 
 
### Comment fonctionne un serveur JEE ?
 
![](https://cdn.discordapp.com/attachments/712549613374144572/714730476404998184/JEE-Fctnm.png)
 
### Qu’est-ce qu’un Web Container en JEE ?
 
Un Web container en JEE contient tout les fichiers HTML CSS JS JSP JSF d’une application.
 
les Beans et les servlets ne sont pas stockées dedans.
 
### Que représente les Servlet dans JEE ?
 
C'est l’objet qui permet de faire le liens avec les requêtes Http.
Elles répondent à ces requêtes avec du text/HTML
 
### Qu’est-ce que JSP ?
 
JSP ou Java Server Page sont des objet basé sur la technologie des servlets. Ces fichiers ne sont accessible que par le server. Cela sert de Template
 
### Quel est le cycle de vie d’un JSP ?
 
![](https://cdn.discordapp.com/attachments/712549613374144572/714732853493235792/JSP-cycle_vvie.png)
 
### Qu’apporte JSTL aux JSP ?

Le JSTL est une librairie Java de balisage. JSTL apporte au JSP l’ajout de données dynamique, des instructions et boucle conditionnel...
 
### Qu’est-ce qu’un Javabean ? Quels sont ces propriétés/contraintes ? Comment utilise-t-on les Javabean avec les JSP ?
 
Les JavaBeans sont des classes qui encapsulent de nombreux objets en un seul. Elles sont sérialisables, ont un constructeur à argument zéro et permettent d'accéder aux propriétés en utilisant les méthodes getter et setter. Le nom "Bean" a été donné pour englober cette norme, qui vise à créer des composants logiciels réutilisables pour Java. 
 
### Que permet de faire JDBC ? Quelle est la différence entre Statement et PrepareStatement ?

JBDC est une interface de programmation qui permet aux programmes JAVA de communiquer avec une base de données.
Statement permet d'envoyer une requête à la base, prepareStatement est un statement particulier qui permet de mieux saisir et modifier les valeur des ses requêtes tout en étant plus optimisé.
