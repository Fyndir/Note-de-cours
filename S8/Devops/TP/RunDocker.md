Antoine gamain 
Enzo Baldisserri

https://github.com/Fyndir/sample-application-students

# Init des dockers

> Petite Astuce , il existe une interface Grafique pour gérer tous ses container : https://www.portainer.io/

les commandes pour lancer les différents docker :
En premier on créé un reseau pour que nos docker communiquent entre eux :

```bash
docker network create ndevops
```

## Postgres
### Docker File

```dockerfile
# On spécifie l'image de départ
FROM postgres 
# On definie les identifiant de la base de données
ENV POSTGRES_DB=db \
POSTGRES_USER=usr \
POSTGRES_PASSWORD=pwd
# On copie les script sql dans le contenaire pour l'initialisation de la bdd
copy ./SQL /docker-entrypoint-initdb.d
```

### Commande bash

```bash
docker build . -t pg_devops 
docker run --name=pg_devops -v /tmp/data:/var/lib/postgresql/data --network ndevops -d  pg_devops
```
On stock les données dans un fichier exterieur au conteneur pour la persistance des données avec l'option -v
On connecte le contenaire au reseau ndevops avec l'option --network

## API Java

### Docker file
```dockerfile
#Build

# On definie l'image de base
FROM maven:3.6.3-jdk-11 AS myapp-build
# On execute les commandes suivante pour générer notre .jar
ENV MYAPP_HOME /opt/myapp
WORKDIR $MYAPP_HOME
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Run
# On cahnge d'image docker pour avoir notre environnement final sur le jre pour avoir une image plus legere
FROM openjdk:11-jre
ENV MYAPP_HOME /opt/myapp
WORKDIR $MYAPP_HOME
# On recupere les .jar générer dans l'environnement precedent
COPY --from=myapp-build $MYAPP_HOME/target/*.jar $MYAPP_HOME/myapp.jar
EXPOSE 8080
ENTRYPOINT java -jar myapp.jar
```
On remarque qu'on utilise la jdk pour compiler mais que le conteneur sera fourni avec uniquement le jre

### Commande bash

```bash
docker build . -t docker_backend
docker run --name docker_backend --network ndevops docker_backend
```
On connecte le contenaire au reseau ndevops avec l'option --network

## Front Httpd 

### Docker file

```dockerfile
# On definie l'image de départ
FROM httpd
# On copy les sources dans le contenaire pour le reverse proxy
COPY src/*.html /usr/local/apache2/htdocs/
Copy src/*.conf /usr/local/apache2/conf/httpd.conf
```

### Commande bash
```bash
docker build . -t httpd-devops
docker run -dit --name my-running-app --network ndevops -p 80:80 httpd-devops
```
On connecte le contenaire au reseau ndevops avec l'option --network
On expose le port 80 du contenaire pour pouvoir accéder à l'api a l'exterieur du reseau ndevops

# Docker-compose : la libération

Au cour du Tp on a du retaper 10 000 fois les commande bash afin de build et de remonter les conteneurs , long et laborieux.
Il existe un moyen de simplifier cette opération à l'aide d'un docker-compose : 

```yml
version: '3'
services:
  docker_backend:
    build: ./sample-application-http-api-server/.
    container_name : docker_backend
    image : fyndir/docker_backend    
    networks : 
      - ndevops
    depends_on : 
      - pg_devops
  pg_devops:
    container_name: pg_devops
    build: ./Bdd/. 
    networks : 
      - ndevops
    image : fyndir/pg_devops 
  my-running-app :
    container_name : my-running-app
    build : ./Httpd/.
    image : fyndir/my-running-app
    ports : 
      - "80:80"
    networks : 
      - ndevops
    depends_on : 
      - docker_backend
 
networks : 
    ndevops :
```
Ce docker compose permet de builder les differents contenaires avec leurs Dockerfile respectif et de les déployer dans un ordre précis grace au module *depends_on* :

Pour build :
```bash
docker-compose build
```

Pour build et deployer :

```bash
docker-compose up
```

# Travis

On peut declancher des traitement spécifique à la suite d'un push sur git ; pour cela on utilise un outil de CI/CD : travis (https://travis-ci.org/)

```yaml
language: java
sudo: false
install: true

service: 
  - docker

jobs:
  include:
    - stage: "Tests"                
      name: "Test"  
      if: branch = master   # permet de lancer le job uniquement sur la branche master donc l'environnement de prod       
      script:        
      - mvn clean verify # Maven 
      - mvn package -DskipTests  # Maven test           
      - docker build Bdd/. -t $user/pg_devops # Build docker image
      - docker build Httpd/. -t $user/my-running-app # Build docker image
      - docker build sample-application-http-api-server/. -t $user/docker_backend # Build docker image
      - docker build sample-application-db-changelog-job/. -t $user/db-changelog-job # Build docker image
      - docker login -u $user -p $psw # Log on hub.docker.com
      - docker push $user/docker_backend #Push image on the web-site
      - docker push $user/db-changelog-job #Push image on the web-site
      - docker push $user/pg_devops #Push image on the web-site
      - docker push $user/my-running-app #Push image on the web-site

cache:
  directories:
  - .autoconf
  - $HOME/.m2 # permet de mettre maven en cache

```
On devrait séparer les etapes de build et de publish dans la  théorie , cependant je n'arrive pas à recuperer les .jar générer 

## SonarCloud

Initialisation de SonarCloud:
- Création d'une organisation sur [SonarCloud](https://sonarcloud.io/)
- "Analyze new project" > "sample-application-students"
- Ajout du fichier vide nommé .sonarcloud.properties dans le dépôt git
- Fini !

# Ansible

Ansible permet de jouer un grand nombre d'instruction sur plusieurs machines en meme temps

Pour cela on commence par renseigner un fichier setup.yml  : 

```yaml
all : 
  vars:
    ansible_user: centos
    ansible_ssh_private_key_file: ~/.ssh/ssh_devops # chemin absolu du fichier contenant la clef ssh
  children:
    prod:
      hosts : 
        antoine-gamain-formation.takima.io # addresses des machines que l'on souhaite manipuler
```

> le fichier contient la clef ssh et l'adresse des machines que l'on souhaite manipuler

## Role Ansible
Pour avoir une config propre , on passe par la création de role : un role ansible correspond à un ensemble de script appeler quand le role est spécifié
on utilise la commande 

```bash
ansible-galaxy nom_de_role init
``` 

cette commande va initialiser le role en créant un arborescence ainsi qu'un grand nombre de main.yml

le fichier main.yml placer dans le dossier task sera exécuter à l'appel du role

###  le role **common** :

```yml
- name : Open port 80
  firewalld:
    port: 80/tcp
    permanent: true
    state: enabled
    immediate: true
- name : Open port 22
  firewalld:
    port: 22/tcp
    permanent: true
    state: enabled
    immediate: true
```
il permet d'ouvrir les ports : 80,22,5432 (HTTP,SSH,postgres)

### le role **docker**

```yml
- name: Install yum-utils
  yum:
          name: yum-utils
          state: latest
- name: Install device-mapper-persistent-data
  yum:
          name: device-mapper-persistent-data
          state: latest
- name: Install lvm2
  yum:
          name: lvm2
          state: latest
- name: Add Docker stable repository
  yum_repository:
          name: docker-ce
          description: Docker CE Stable - $basearch
          baseurl: https://download.docker.com/linux/centos/7/$basearch/stable
          state: present
          enabled: yes
          gpgcheck: yes
          gpgkey: https://download.docker.com/linux/centos/gpg
- name: Install Docker
  yum:
      name: docker-ce
      state: present
- name: Make sure Docker is running
  service: name=docker state=started
  tags: docker
  
- name: Install python setup tools
  yum: name=python-setuptools
  tags: docker

- name: Install Pypi
  easy_install: name=pip
  tags: docker

- name: Install docker-py
  pip: name=docker-py
  tags: docker

```

le script installe tout les outils necessaires pour faire tourner docker sur la machine ciblée


## le fichier playbook

le fichier playbook contient les instructions à exécuter sur les machines, il peut appeler les roles defini dessus :

``` yml

- hosts: all
  gather_facts: false
  become: true
  roles : 
    - common
    - docker

  tasks:
  - name : Create docker network
    docker_network:
      name: ndevops
  - name : Run BDD
    docker_container:
      name: pg_devops
      image : fyndir/pg_devops
      networks: 
        - name : ndevops    
  - name : Run backend
    docker_container:
      name: docker_backend
      image : fyndir/docker_backend
      networks: 
        - name: ndevops    
  - name : Run HTTPD
    docker_container:
      name: my-running-app
      image : fyndir/my-running-app
      networks: 
        - name: ndevops
      ports : 
        - "80:80"
```

> Ce playbook permet de recupérer les images docker sur hub.docker.com et de les deployer sur la machine ciblé

on lance le playbook avec la commande :

```bash
ansible-playbook -i ansible/inventories/setup.yml ansible/playbook.yml 
```


