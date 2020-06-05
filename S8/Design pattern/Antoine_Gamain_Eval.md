Antoine Gamain 4 IRC

# 1er exercice : 12 points

## Principe de responsabilité unique (SRP)

> Une classe ne doit posséder qu’une et une seule responsabilité, et réciproquement, une responsabilité ne doit pas être partagée par plusieurs classes.

### L’encapsulation garantit-elle le principe SRP ? Illustrez avec un exemple pris dans l’application.

L'encapsulation est un des 4 pilliers de l'objet tandi que SRP est un des 4 principe SOLID , par définition l'application des pilliers ne suffit pas à respecter le SRP. On peut citer comme exemple la piece de notre jeu d'echec qui avait (avant l'application du dp strategy) la responsabilité de porter les  informations de la pieces et de porter son comportement (déplacement).

### L’architecture MVC garantit-elle ce principe ? Illustrez avec un ou des exemples pris dans l’application.

L'architecture MVC force la segmentation du code en 3 morceau : le model , la view , le controlleur , cependant cette séparation ne garanti pas le principe SRP car on peut tres bien avoir une seul classe gérant le coté graphique ou une seul classe gérant le modele. Cependant l'application du MVC force une segmentation du code ce qui va dans le sens du principe SOLID.

## Principe d’ouverture fermeture (OCP)

> Une classe, une méthode, un module, un système doivent pouvoir être étendus, supporter différentes implémentations (Open for extension) sans pour cela devoir être modifiés (closed for modification).

### L’encapsulation garantit-elle ce principe ? Illustrez avec un exemple pris dans l’application.

L'encapsulation est un des 4 pilliers de l'objet tandi que OCP est un des 4 principe SOLID , par définition l'application des pilliers ne suffit pas à respecter le OCP. Encore une fois l'exemple de la piece du jeu d'echec avant l'application du pattern strategy me parait pertinant : avant l'application de ce pattern , le comportement de la piece etait contenu dans celle-ci par des méthodes , ainsi il etait impossible de modifié le comportement sans modifier le code on etait donc fermé au extension. A l'inverse une foi le pattern strategy mis en place il suffisait de changer l'attribut strategy par un objet implementant la meme interface pour changer le comportement de la piece , on etait donc open au extension et fermer au modification.

### L’architecture MVC garantit-elle ce principe ? Illustrez avec un ou des exemples pris dans l’application.

L'architecture MVC force la segmentation du code en 3 morceau : le model , la view , le controlleur , cependant cette séparation ne garanti pas le principe OCP car on peut tres bien avoir une seul classe gérant le coté graphique ou une seul classe gérant le modele. dans cette situation nous avons donc un code non modulaire et donc ne respectant pas le principe d'OCP.

### Le polymorphisme garantit-il ce principe ? Illustrez avec un ou des exemples pris dans l’application.

Le polymorphisme est un des 4 pilliers de l'objet tandi que OCP est un des 4 principe SOLID , par définition l'application des pilliers ne suffit pas à respecter le OCP. On peut encore une foi prendre l'exemple de la piece. Pour rappel , nous avons une interface qui est implementée dans une classe abstraite qui est heritée dans les pieces. En utilisant le polimorphisme on peut manipuler toute les pieces de notre jeu par l'intermediaire de la classse abstrainte (pas bien , une classe abstraite sert juste à factorisser du code). Une nouvelle piece du jeu qui n'implemente pas cette classe abstraite car elle ne profite pas de la factorisation du code ne sera pas pris en comptet dans le programme mais si elle implement l'intetrface. Donc le polymorphisme ne suffit pas a respecter OCP , cependant il est indispensable pour le mettre en place.

## Citez les Design Patterns que nous avons mis en œuvre dans cette application pour garantir ce principe en expliquant dans quel contexte nous les avons utilisés (classes/interfaces) concernées. 

Les patterns mis en place dans l'application pour respecter OCP danss l'application :

* Command : Car on confit le comportement de l'application a un objet de tyype commande , pour étendre l'application il suffit donc de créer des objet implementant l'interface Command et ceux-ci seront directement pris en compte dans le fonctionnement de l'application sans avoir à toucher au code source , on est donc bien dans de l'OCP.

* Strategy : Car on confit l'intelligence d'une piece à un objet dedié , ainsi pour étendre le comportement des pieces il suffit de déclarer un nouvelle object Strattegy qui implement l'interface strategy et de le passer en attribut de notre piece (possible avec une factory). On est donc dans de l'ouverture au extension via les objects strategy tout en forcant  une structure de comportement . 

* Abstract Factory : Meme logique que les deux autres, nos object factory implemente une meme interface donc on peut créer une nouvelle factory qui l'implemente et de le programme marchera sans changement du code source.

# 2ème exercice : 4 points

> Soit une classe qui contient une référence vers un objet : 
```java
public class ClasseQuiContientUnObjet {
    private TypeDeObjetContenu ObjetContenu; 	 
    // … 
}
```
## Si le pattern mis en œuvre dans cette composition est un Decorator vous paraît-il pertinent de définir un accesseur (getObjetContenu) et/ou un mutateur (setObjetContenu) sur l’attribut ObjetContenu ? Justifiez. 

Le pattern decorateur permet de rajouter du comportement à un object sans avoir à déclarer un grand nombre de sous-classes , il herite egalement du meme type de l'objet qu'il décore. De ce fait je trouve normal de lui donner l'accés à cette attribut. Par exemple une voiture peut etre décorée par une list d'option , cependant on veut tous de meme connaitre le modele de la voiture lorsque l'on manipule une voiture décorée.

## Même question s’il s’agit d’un adapter, d’un proxy, d’une strategy ? 

* Adapteur : le principe de l'adapteur est de limiter l'exposition d'un objet , le mettre a disposition avec un get/set serait à l'encontre meme du dp.

* Proxy : le principe du proxy est de faire croire à la manipulation d'un objet , si on l'expose directement via un get/set on va à l'encontre du pattern.

* Strategie : Je ne suis pas sur de comprendre la question ,
    * dans le cas ou l'on veut parle de l'objet qui contient la strategie : On veut pouvoir accéder à celle-ci via des get/set on veut pouvoir changer le comportement de l'objet donc oui 
    * dans le cas ou l'on parle d'un attribut de la classe strategie : le dp strategie à pour responsabilité de gérer du comportement , mettre un get/set serait lui rajouter de la responsabilité donc non 

# 3ème exercice : 4 points

## Citez les 2 patterns qui vous paraissent les plus appropriés pour résister au changement ? Expliquez en quoi ils permettent cette résistance et pourquoi vous les avez choisis plutôt que d’autres. 

A mon sens les deux pattern qui resiste le plus au changement sont :

* Command : Le principe du pattern est de manipuler notre application par l'intermediare d'un objet command et d'un objet remote . Il resiste très bien au changement car il est adapté dans la majorité les situations car le concept meme d'action est commun à toute les applications. Je pense que la force de ce pattern consiste en l'abstractisation d'une action commune à toute les applications

* Strategy : Le principe du pattern est de déporter l'inteligence d'un objet dans un autre. Il resiste très bien au changement car il est adapté dans la majorité les situations car la plupart des objets vont etre constitué de données et d'action relative à celle-ci. Avec la mise en place de ce DP on permet à l'application de changer son comportement juste en changeant un attribut ce qui est un énorme gain de temps.