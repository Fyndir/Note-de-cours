# Atelier 2
 
## Membre du Groupe
 
- Baldisserri Enzo
- Gamain Antoine
- Guillotin Antoine
- Valade Dorian
 
## Eléments réalisés du cahier des charges
 
* Affichage des cartes
* Achat/Vente des cartes avec gestion de l’argent
* Authentification basique d’un utilisateur
 
## Eléments non-réalisés du cahier des charges
 
* NA
 
## Source vers le projet
 
https://github.com/Gladear/JEECardGame/tree/springboot
 
## Tableau comparaison entre architecture MVC/SOA/Microserice
 
![](https://cdn.discordapp.com/attachments/712549613374144572/715101750876438538/2-5.png)
En termes simples, un monolithe est semblable à un grand conteneur dans lequel tous les composants logiciels d'une application sont assemblés.
 
L'architecture orientée services est essentiellement un ensemble de services. Ces services communiquent entre eux. La communication peut impliquer soit un simple transfert de données, soit deux ou plusieurs services coordonnant une activité. Il faut trouver un moyen de relier les services entre eux.
 
Les micro-services, également appelés architecture de micro-services, sont un style d'architecture qui structure une application comme un ensemble de petits services autonomes et indépendant modélisés autour d'un domaine d'activité.
 
## Questions de l'atelier
 
### Qu’est ce que des Services Web Full Rest ? Quelles sont les contraintes imposées par ce type de service ?
 
![](https://cdn.discordapp.com/attachments/712549613374144572/715105436524740610/RESTCreatedNewResourceUsingByPutMethod.png)
 
### Qu’est ce qu’un gestionnaire de dépendance ? Maven est-il le seul ? Quel est l’avantage d’utiliser un gestionnaire de dépendances ? Quelles sont les grandes étapes de fonctionnement de Maven ?
 
Un gestionnaire de dépendances permet de gérer les dépendances d’un projet généralement à partir d’un unique fichier de configuration. Dans l’éco-système de la JVM, il existe aussi Gradle, notamment utilisé pour les projets sur Android, mais il existe plein de gestionnaires de dépendances pour différents écosystèmes (Python et pip, Node et npm, Go a un gestionnaire intégré, etc…).
Le gestionnaire de dépendances évite d’avoir à installer les dépendances d’un projet à la main. Il limite donc aussi les problèmes pouvant arriver lors de leur installation. Le fichier de configuration indique par exemple les versions de ces dépendances.
Le cycle de vie par défaut de Maven contient plusieurs phases dont les principales sont : validate, compile, test, package, install et deploy.
 
### Qu’est ce que Spring ? qu’apporte Spring boot vis-à-vis de Spring ?
 
Spring est un framework qui apporte un support à la structure d’un  projet Web Java. Spring Boot est une extension à Spring qui permet d'éliminer de lourd fichier de configuration.
 
### Qu’est ce que Spring Boot ? Quels sont les points communs/différences entre JEE et Spring Boot ?
 
Spring boot et JEE sont des frameworks permettant de développer des serveurs Web en Java. Tous deux utilisent un système de route et des servlet. Contrairement au JEE, spring gere de maniere autonome la connexion avec les bases de données, et les relations entre les entités. Spring sert à la réalisation de projet web statique.
 
### Qu’est ce qu’une annotation ? Quels apports présentent les Annotations ?
 
Les annotations en Java sont des instructions que l’on ajoute sur les attributes, constructor, méthodes et classes. Il peuvent être évaluées par le code Java pour effectuer toutes sortes d’actions. Spring les utilisent pour enregistrer des services, des entités, pour automatiquement lier des repository et des services, etc.
 
### Comment fait-on pour créer un Web Service Rest avec Spring Boot ?
 
Pour créer un web service rest Spring Boot, il faut créer un controller et l’annoter avec `@RestController`. On peut ensuite lui ajouter des méthodes taguées avec `@RequestMapping` qui correspondront aux différentes routes du web services.
 
### Qu’est ce qu’un container de Servlet ? Comment fonctionne un container de Servlet ?
 
Un conteneur de servlets est un logiciel qui exécute des servlets. Parfois, ils sont appelés moteur web ou moteur de servlets.Le logiciel le plus connu est Tomcat 
 
### Expliquer la philosophie « Convention over Configuration » de Spring boot ?
 
Plutôt que de proposer de configurer l’entièreté du projet, Spring Boot met en valeur le fait d’utiliser une architecture spécifique (e.g. les dossiers `public` ou `ressources` qui contiennent les ressources statiques), certains noms de méthodes prédéfinies (par exemple, `findBy<Attribute>` dans les repository) et autre.  Par exemple, s'il existe une classe "Ventes" dans le modèle, la table correspondante dans la base de données est appelée "ventes" par défaut. Ce n'est que si l'on s'écarte de cette convention, comme par exemple la table "ventes de produits", qu'il faut écrire du code concernant ces noms.
 
### Expliquer ce qu’il se passe lors de l’exécution «SpringApplication .run(App.class,args) »
SpringApplication.run lance une application Spring independemanent de la méthode main. Ca créé un ApplicationContext adapté et lance le serveur Tomcat.
Une fois lancé, le serveur est accessible depuis le localhost:8080 par défaut. 
 
### Qu’est ce qu’un DAO ? En quoi est-ce intéressant d’utiliser ce pattern ? Qu’est ce qu’un Singleton ? Que permet de réaliser les Entity dans Spring boot ? Est-ce spécifique à SpringBoot ?
 
DAO (Data Access Object) permet de faire le lien entre le stockage et le traitement des données. DAO est également utilisé dans JEE mais celui ci est géré automatiquement dans Spring Boot. 
 
### Combien d’instances avez-vous crées lors de l’usage de «Service » en Spring boot? Pourquoi ?
 
Seule une instance des services est créée. Spring boot s’occupe de d'instancier les services qu’une seule fois et de les passer aux controllers dépendants.
 
### Que fournit le CRUD Repository de Spring boot ? Que sont les CRUD ? 
 
Les CRUD Repository fournissent des fonctionnalités de bases pour créer, récupérer, mettre à jour et supprimer des objets.
 
### Qui réalise l’implémentation de la méthode `findByProperty` lors de la création d’un repository en Spring Boot ?
 
C’est l’ORM intégré à Spring, JPA.
 
### Comment gère-t-on les relations One To One, One to Many et Many to Many avec JPA ?
 
Premièrement, on crée un attribut correspondant à la classe liée. Il faut ensuite ajouter des annotations permettant à JPA de savoir quel est le type de relation. On utilisera alors `@OneToOne`, `@OneToMany` ou `@ManyToOne` pour préciser le type de type de relation.
