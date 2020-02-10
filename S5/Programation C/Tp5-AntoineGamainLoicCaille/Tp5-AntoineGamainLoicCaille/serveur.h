#ifndef __SERVER_H__
#define __SERVER_H__

#define PORT 8089

/* accepter la nouvelle connection d'un client et lire les données
 * envoyées par le client. En suite, le serveur envoie un message
 * en retour
 */
int recois_envoie_message(int socketfd);

int recois_numeros_calcule(int socketfd);

int renvoie_message(int client_socket_fd, char *data);

int renvoie_calcul(int client_socket_fd, char *data);

int shutdownServeur(int client_socket_fd, int socketfd);

float calcul(char* data);

float Add(float num1,float num2);

float Substract(float num1,float num2);

float Mult(float num1,float num2);

float Divide(float num1,float num2);

float Mod(float num1,float num2);

float And(float num1,float num2);

float Or(float num1,float num2);

#endif
