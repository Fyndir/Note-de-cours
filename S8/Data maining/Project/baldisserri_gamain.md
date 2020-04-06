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

![alt text](https://app.diagrams.net/?lightbox=1&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R3Vhdb9MwFP01EU%2BgfDRZ%2BsjaDgaMTavQ2BNyHS8xOHHm2m3Dr8eunaap16rA1kSTps4%2Bvld2js%2F9SJxglK8%2BMFBmVzRBxPHdZOUEY8f3vYHvO%2BrPTSqNnLlDDaQMJ8aoAab4NzKga1CBEzRvGXJKCcdlG4S0KBDkLQwwRpdtswdK2ruWIEUWMIWA2OgdTnim0Th0G%2FwjwmlW7%2By5ZiUHtbEB5hlI6HILCiZOMGKUcj3KVyNEFHk1L9rvYs%2Fq5mAMFfwYB8Avh4%2B33y7o%2FWNF78DsMop%2FvK1pXgAizBOb0%2FKqpgAlkhEzpYxnNKUFIJMGPWdUFAlS%2B7hy1th8obSUoCfBn4jzylwvEJxKKOM5Mat6T7XR3ocz0JwKBtGhJzIiASxF%2FIBduLkCqV1Ec8RZJf0YIoDjRfscwIgo3dg1PMuBofpvaLdYHzujwHk%2FnAlu8S%2BFU6phyShEc3mU82WGOZqWYE3EUgZem80ZgL%2FS9Z1cC05wgVosLxDjaHWYZ5sX4xBEoXZZNsHg1QrPtgIhcl%2BIurPXJtjwSMFGnQq2H7RLcln13fivJ%2Fdq8i6sp%2BPV9uK4MrMOrsv73wRjXG8olkfcBGA4MAcw9dQLdwJNH8x47dz65hj%2FLoTQ0sGNZEwV4Aw8Ski656qkyoovFJ3Izmcso%2FlMHJHHniNfxTt01QVvK3%2FFT6Sv%2BKXS17AXcfSM8RAdGQ9xl%2Bkrsli%2F1fUWilIPmDwFLZRsZbfpR4SrOip1HaVqlMjuUtupVWkjf8gbo%2FRdebcu5wQSj9oS9wNb4qct0Z7%2F2kQeH5v091zVaVQeW7SPAIGC7FM1pIIgwZSiS4YLiEv52qNmYIGg%2FHeFC3wOOMw%2BXyFQzDtXuldn5f4ofdALpfegLfJO9d71dFsU7Ejj1G2RZ7%2FRjWgBAddVozhYXbbiMFnHmSuUrbwDjNiBqPM6ibpNhHUXda%2BuifKOfqvotI3y7O5%2FAhnmgqFa2267VbIaqS19P2CYrQXufppef%2B28uoRh73RuF%2FQLXFhE9en70C6JweDlSJTT5uupTuTNN%2Bhg8gc%3D"Logo Title Text 1")

<img src="https://app.diagrams.net/?lightbox=1&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R3Vhdb9MwFP01EU%2BgfDRZ%2BsjaDgaMTavQ2BNyHS8xOHHm2m3Dr8eunaap16rA1kSTps4%2Bvld2js%2F9SJxglK8%2BMFBmVzRBxPHdZOUEY8f3vYHvO%2BrPTSqNnLlDDaQMJ8aoAab4NzKga1CBEzRvGXJKCcdlG4S0KBDkLQwwRpdtswdK2ruWIEUWMIWA2OgdTnim0Th0G%2FwjwmlW7%2By5ZiUHtbEB5hlI6HILCiZOMGKUcj3KVyNEFHk1L9rvYs%2Fq5mAMFfwYB8Avh4%2B33y7o%2FWNF78DsMop%2FvK1pXgAizBOb0%2FKqpgAlkhEzpYxnNKUFIJMGPWdUFAlS%2B7hy1th8obSUoCfBn4jzylwvEJxKKOM5Mat6T7XR3ocz0JwKBtGhJzIiASxF%2FIBduLkCqV1Ec8RZJf0YIoDjRfscwIgo3dg1PMuBofpvaLdYHzujwHk%2FnAlu8S%2BFU6phyShEc3mU82WGOZqWYE3EUgZem80ZgL%2FS9Z1cC05wgVosLxDjaHWYZ5sX4xBEoXZZNsHg1QrPtgIhcl%2BIurPXJtjwSMFGnQq2H7RLcln13fivJ%2Fdq8i6sp%2BPV9uK4MrMOrsv73wRjXG8olkfcBGA4MAcw9dQLdwJNH8x47dz65hj%2FLoTQ0sGNZEwV4Aw8Ski656qkyoovFJ3Izmcso%2FlMHJHHniNfxTt01QVvK3%2FFT6Sv%2BKXS17AXcfSM8RAdGQ9xl%2Bkrsli%2F1fUWilIPmDwFLZRsZbfpR4SrOip1HaVqlMjuUtupVWkjf8gbo%2FRdebcu5wQSj9oS9wNb4qct0Z7%2F2kQeH5v091zVaVQeW7SPAIGC7FM1pIIgwZSiS4YLiEv52qNmYIGg%2FHeFC3wOOMw%2BXyFQzDtXuldn5f4ofdALpfegLfJO9d71dFsU7Ejj1G2RZ7%2FRjWgBAddVozhYXbbiMFnHmSuUrbwDjNiBqPM6ibpNhHUXda%2BuifKOfqvotI3y7O5%2FAhnmgqFa2267VbIaqS19P2CYrQXufppef%2B28uoRh73RuF%2FQLXFhE9en70C6JweDlSJTT5uupTuTNN%2Bhg8gc%3D">

## Exploitation



# Evaluation des resultats



# Conclusion

