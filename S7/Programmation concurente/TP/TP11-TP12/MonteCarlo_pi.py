# Code de antoine gamain

import random, time , os
from multiprocessing  import Process, Semaphore , Array , Value , Pool

# calculer le nbr de hits dans un cercle unitaire (utilisé par les différentes méthodes)
def frequence_de_hits_pour_n_essais(nb_iteration):    
    count = 0
    for i in range(nb_iteration):
        x = random.random()
        y = random.random()
        # si le point est dans l’unit circle
        if x * x + y * y <= 1:
            count += 1
    return count


def frequence_de_hits_pour_n_essais_multiprocess(nb_iteration):    
    nb_iteration_process = nb_iteration//os.cpu_count()
    pool = Pool() 
    Processes = []
    for i in range(os.cpu_count()):
        Processes.append(pool.apply_async(frequence_de_hits_pour_n_essais, args = [nb_iteration_process,]))
    count = sum(process.get() for process in Processes)
    return count

if __name__ == "__main__":  
    # Nombre d’essai pour l’estimation
    Datedeb = time.time()
    nb_total_iteration = 10000000
    nb_hits=frequence_de_hits_pour_n_essais(nb_total_iteration)
    dateFin= time.time()

    print("Valeur estimée Pi par la méthode Mono−Processus : ", 4 * nb_hits / nb_total_iteration,"Temps necessaire au calcul : {} secondes".format(dateFin-Datedeb) )

    nb_hits=frequence_de_hits_pour_n_essais_multiprocess(nb_total_iteration)
    DateFinMultiProcess = time.time()

    print("Valeur estimée Pi par la méthode Multi−Processus : ", 4 * nb_hits / nb_total_iteration,"Temps necessaire au calcul : {} secondes".format(DateFinMultiProcess-dateFin) )


  

    #TRACE :
    # Calcul Mono−Processus : Valeur estimée Pi par la méthode Mono−Processus : 3.1412604