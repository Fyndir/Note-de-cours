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


int main()
{
	
	lire_dossier("test");	
	return 0;
}


void lire_dossier(char * path)
{
    struct dirent *lecture;
    DIR *rep;
    rep=opendir(path);
    char real_path[255];
    
    while ((lecture = readdir(rep))) 
    {    
    	if(strcmp(lecture->d_name,".") && strcmp(lecture->d_name,".."))
    	{
    		sprintf(real_path,"%s/%s",path,lecture->d_name);
			printf("%s \n", real_path);
			if (lecture->d_type == DT_DIR)
			{ 
				lire_dossier(real_path);
			}
		}

    }
    closedir(rep);
}
