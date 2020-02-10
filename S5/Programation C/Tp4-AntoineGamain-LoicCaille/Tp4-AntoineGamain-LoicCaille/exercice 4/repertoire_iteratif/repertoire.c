/*
* Ligne de commande qui lit des arborescences fichiers
* Auteurs : Antoine Gamain  Loic Caille 
* 06/11/2018 initialisation 
*/

#include <stdio.h>
#include <stdlib.h> 
#include <dirent.h>
#include "repertoire.h"
#include <string.h>

typedef struct folder
{
	char folder_path[256];
	struct folder* next_folder;
}folder;


int main()
{
	lire_dossier("test");	
	return 0;
}

void lire_dossier(char* path)
{
    struct dirent *lecture;
    DIR *rep;
    char real_path[256]="";
    char real_pathFolder[256]="";
    folder* first, *last, *current, *new;
    
    first = malloc(sizeof(folder));
    
    strcpy(first->folder_path,path);
    first->next_folder = NULL;
    
    last = first;
    current = first;
    
    while(current->folder_path != NULL)
    {

		rep = opendir(current->folder_path);

		while ((lecture = readdir(rep))) 
		{    
			if(strcmp(lecture->d_name,".") && strcmp(lecture->d_name,".."))
			{
				
				sprintf(real_path,"%s/%s",current->folder_path,lecture->d_name);
				printf("%s \n", real_path);
				if (lecture->d_type == DT_DIR)
				{
					sprintf(real_pathFolder,"%s/%s",current->folder_path,lecture->d_name); 
					new = malloc(sizeof(folder));
					strcpy(new->folder_path,real_pathFolder);
					new->next_folder = NULL;
					
					last->next_folder = new;
					last = new;
				}
			}

		}
		current = current->next_folder;
	}
    
    
    closedir(rep);
}
