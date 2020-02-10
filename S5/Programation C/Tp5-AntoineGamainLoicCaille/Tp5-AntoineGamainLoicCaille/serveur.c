/* Fichier: serveur.c
 * Communication client-serveur
 * Auteurs: John Samuel, Antoine Gamain, Loïc Caille
 */


#include <sys/types.h> 
#include <sys/socket.h>
#include <sys/epoll.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "serveur.h"

int main() {

  int socketfd;
  int bind_status;
  int client_addr_len;

  struct sockaddr_in server_addr, client_addr;

  /*
   * Creation d'un socket
   */
  socketfd = socket(AF_INET, SOCK_STREAM, 0);
  if ( socketfd < 0 ) {
    perror("Unable to open a socket");
    return -1;
  }

  int option = 1;
  setsockopt(socketfd, SOL_SOCKET, SO_REUSEADDR, &option, sizeof(option));

  //détails du serveur (adresse et port)
  memset(&server_addr, 0, sizeof(server_addr));
  server_addr.sin_family = AF_INET;
  server_addr.sin_port = htons(PORT);
  server_addr.sin_addr.s_addr = INADDR_ANY;

  bind_status = bind(socketfd, (struct sockaddr *) &server_addr, sizeof(server_addr));
  if (bind_status < 0 ) {
    perror("bind");
    return(EXIT_FAILURE);
  } 
  listen(socketfd, 10); 
  recois_envoie_message(socketfd); 

  return 0;
}

/* accepter la nouvelle connection d'un client et lire les données
 * envoyées par le client. En suite, le serveur envoie un message
 * en retour
 */
int recois_envoie_message(int socketfd) {
  struct sockaddr_in client_addr;
  char data[1024];

  int client_addr_len = sizeof(client_addr);
 
  // nouvelle connection de client
  int client_socket_fd = accept(socketfd, (struct sockaddr *) &client_addr, &client_addr_len);
  if (client_socket_fd < 0 ) {
    perror("accept");
    return(EXIT_FAILURE);
  }
    
  int active = 1;
  
  while(active){

    memset(data, 0, sizeof(data));

    //lecture de données envoyées par un client
    int data_size = read (client_socket_fd, (void *) data, sizeof(data));
	
    if (data_size < 0) {
      perror("erreur lecture");
      return(EXIT_FAILURE);
    }
	  
    printf ("Message recu: %s\n", data);
    char code[10];
    sscanf(data, "%s:", code);

    //Si le message commence par le mot: 'message:' 
    if (strcmp(code, "message:") == 0) {
      renvoie_message(client_socket_fd, data);
    } else if (strcmp(code, "calcul:") == 0) {
      renvoie_calcul(client_socket_fd, data);
    } else if (strcmp(code, "shutdown") == 0) {
      shutdownServeur(client_socket_fd, socketfd);
      active = 0;
    }
    
  }
  
}

int shutdownServeur(int client_socket_fd, int socketfd){
    
  char shdMsg[256] = "shutdowning server\n";
    
  printf("%s",shdMsg);
  int data_size = write (client_socket_fd, (void *) shdMsg, strlen(shdMsg));
    
  //fermer le socket 
  close(socketfd);
}

/* renvoyer un message (*data) au client (client_socket_fd)
 */
int renvoie_message(int client_socket_fd, char *data) {
  
  char rdata[1024];
  memset(rdata, 0, sizeof(rdata));
  char message[100];
  printf("Votre message (max 1000 caracteres): ");
  fgets(message, 1024, stdin);
  strcpy(rdata, "message: ");
  strcat(rdata, message);
  
  
  int data_size = write (client_socket_fd, (void *) rdata, strlen(rdata));
      
  if (data_size < 0) {
    perror("erreur ecriture");
    return(EXIT_FAILURE);
  }
  
}

int renvoie_calcul(int client_socket_fd, char *data) {
  
  sprintf(data,"resultat = %f",calcul(data));
  int data_size = write (client_socket_fd, (void *) data, strlen(data));
      
  if (data_size < 0) {
    perror("erreur ecriture");
    return(EXIT_FAILURE);
  }
  
}

int recois_numeros_calcul(int socketfd){
  struct sockaddr_in client_addr;
  char data[1024];

  int client_addr_len = sizeof(client_addr);
 
  // nouvelle connection de client
  int client_socket_fd = accept(socketfd, (struct sockaddr *) &client_addr, &client_addr_len);
  if (client_socket_fd < 0 ) {
    perror("accept");
    return(EXIT_FAILURE);
  }

  memset(data, 0, sizeof(data));

  //lecture de données envoyées par un client
  int data_size = read (client_socket_fd, (void *) data, sizeof(data));
      
  if (data_size < 0) {
    perror("erreur lecture");
    return(EXIT_FAILURE);
  }
        
  printf ("Message recu: %s\n", data);
  char code[10];
  sscanf(data, "%s:", code);

  //Si le message commence par le mot: 'message:' 
  if (strcmp(code, "message:") == 0) {
    renvoie_message(client_socket_fd, data);
  }

  //fermer le socket 
  close(socketfd);
}


float calcul(char* data){
  
  float num1, num2;
  char op;
    
  sscanf(data,"calcul: %f %c %f", &num1, &op, &num2);

  switch(op){
    case '+' :
      return Add(num1,num2);
      break;

    case '-' :
      return Substract(num1,num2);
      break;

    case '*' :
      return Mult(num1,num2);
      break;

    case '/' :
      return Divide(num1,num2);
      break;

    default :
      puts("Erreur dans les données rentrées par l'utilisateur");
      break;
  }
      
  return 0;
}

float Add(float num1,float num2)
{
 return num1+num2; 
}

float Substract(float num1,float num2)
{
 return num1-num2; 
}

float Mult(float num1,float num2)
{
  return num1*num2;
}

float Divide(float num1,float num2)
{
  return num1/num2;
}