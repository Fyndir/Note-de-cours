import sys
moyenne = 0
if (len(sys.argv) > 2):
    notes = list(map(lambda arg: int(arg) , sys.argv[1:]))
    for note in notes:
        if note > 20 or note < 0 :
            print('Note non valide')
            break
        else:
            moyenne += note
    print('Moyenne ; {}'.format(moyenne / len(notes)))
else:
    print('Aucune Moyenne à afficher')
    sys.exit(0)