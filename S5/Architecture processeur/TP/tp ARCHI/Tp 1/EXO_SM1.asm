;-----------------------------------------------------------------------------
;  FILE NAME   :  EXO_SM1.asm
;  TARGET MCU  :  C8051F020 
;  DESCRIPTION :  Cette suite d'exercices de base est destinée à faire
;                 découvrir le jeu d'instruction de la famille 8051.
;                 Insérez votre code sous chaque exercice.
;                 A la fin de la séance, vous rendrez ce fichier via E-campus
;                 ou par Email à l'adresse que l'on vous communiquera
;	Contributor : ANTOINE GAMAIN  , LUCAS PHILIPPE , LOIC CAILLE
;                 
;******************************************************************************
;******************************************************************************
; NE PAS MODIFIER LES DIRECTIVES et INSTRUCTIONS SUIVANTES:
;******************************************************************************
$include (c8051f020.inc)               ; Include register definition file.
;-----------------------------------------------------------------------------
; EQUATES
;-----------------------------------------------------------------------------
GREEN_LED      equ   P1.6              ; Port I/O pin connected to Green LED.
;-----------------------------------------------------------------------------
; RESET and INTERRUPT VECTORS
;-----------------------------------------------------------------------------

               ; Reset Vector
               cseg AT 0
               ljmp Main               ; Locate a jump to the start of code at 
                                       ; the reset vector.

;-----------------------------------------------------------------------------
; CODE SEGMENT
;-----------------------------------------------------------------------------
Blink          segment  CODE

               rseg     Blink        ; Switch to this code segment.
               using    0            ; Specify register bank for the following
                                     ; program code.

Table_ex:          db  'VOILA UN EXEMPLE DE CHAINE A COPIER!!!'

;Initialisations de périphériques - Fonctionnalités Microcontroleur

Main:          ; Disable the WDT. (IRQs not enabled at this point.)
               ; If interrupts were enabled, we would need to explicitly disable
               ; them so that the 2nd move to WDTCN occurs no more than four clock 
               ; cycles after the first move to WDTCN.
               mov   WDTCN, #0DEh
               mov   WDTCN, #0ADh
               ; Enable the Port I/O Crossbar
               mov   XBR2, #40h
               ; Set P1.6 (LED) as digital output in push-pull mode.  
               orl   P1MDIN, #40h	 
               orl   P1MDOUT,#40h 
; Programme Principal
;******************************************************************************
;******************************************************************************
; VOUS POUVEZ FAIRE des MODIFICATIONS A PARTIR D'ICI
;******************************************************************************


; EXO 1 -- INSTRUCTIONS DE TRANSFERT DE DONNEES               
;******************************************************************************

;   1 -  Initialiser l'accumulateur à 0
;        Codez-le de 3 manières différentes en utilisant divers modes d'adressage
;        Pour chaque solution, évaluez le nombre d'octets nécessaires au code et le nombre de cycle processeur
;        Vérifiez en simulation
;        SOLUTION1:  
MOV A,#02H ; On remplit A pour tester
MOV A,#00H
         
;        SOLUTION2:
MOV A,#02H ; On remplit A pour tester
CLR A
          
;        SOLUTION3:
MOV A,#02H ; On remplit A pour tester
MOV R1,#00H
MOV A,@R1


;   2 -  Mettre la valeur FFh dans le registre R0
;        Précision: en base 16, on rajoute le suffixe H, en base 2, on ajoute le suffixe B
;        Piège: en assembleur, toute valeur nuérique doit commencer par un chiffre, aussi on écrit 0FFH au lieu de FFH

MOV R0,#0FFh

;   3 -  Copier le contenu de l'accumulateur dans le registre R1
MOV R1,A
;   4 -  Mettre la valeur 55h dans la case mémoire 40h en mémoire RAM interne.

MOV 40H,#55H
;   5 -  Copier le contenu de la mémoire 40h de la RAM interne dans la case 42h
;        de la RAM Interne.
;        Codez-le de 3 manières différentes en utilisant divers modes d'adressage
;        Pour chaque solution, évaluez le nombre d'octets nécessaires au code et le nombre de cycle processeur
;        Vérifiez en simulation

;        SOLUTION1:  
MOV 42H, 40H

;        SOLUTION2:
MOV R0,#40H
MOV 42H,@R0

;        SOLUTION3:
MOV R1,#42H
MOV @R1,40H

;   6 -  Copier le contenu de la mémoire 40h de la RAM interne dans la case D0h
;        de la RAM Interne à accès indirect.
;        Que se passe t'il si on utilise par erreur l'adressage direct sur D0h?

MOV R0,#0D0H
MOV 40H,@R0



;   7 -  Copier le contenu de 20h (DATA) dans la case mémoire 2FFh en mémoire RAM externe (XDATA).
MOV A, 20H
MOV DPTR, #2FFH
MOVX @DPTR,A

;   8 -  Copier le contenu de 0000h (CODE) dans la case mémoire 82h en mémoire RAM interne.
MOV DPTR,#0H
CLR A
MOVC A,@A+DPTR
MOV R1, #82H
MOV @R1,A


;   9  - Echanger le contenu de B avec le contenu de la mémoire 07FFh en mémoire externe (XDATA).

;XCH A,07FFH

;   10 - Initialiser la mémoire 0100h de la mémoire XDATA avec la valeur 22h

;   11 - Copier le contenu de la mémoire 0100h de la XATA dans la case 43h
;        de la RAM Interne

;   12 - Copier le contenu de la mémoire 1234h de la mémoire CODE dans la case 0102h
;        de la mémoire XDATA

;   13 - En une ligne de code, échanger le contenu de A avec le contenu de la mémoire 60h

;   14 - Pousser l'accumulateur dans la pile
 
; EXO 2 --INSTRUCTIONS LOGIQUES - MANIPULATION de BITS              
;******************************************************************************

;   1 -  Complémenter le bit d'adresse 10h (Attention c'est une adresse Bit)
;        Ou se trouve t'il ?  (réponse attendue: c'est le bit X de l'octet  
;        d'adresse YY dans la mémoire DATA)
cpl 10h

;   2 -  Mettre à 1, les bits 0 et 7 (sans changer les autres bits) dans l'octet 
;        d'adresse 22h de la RAM interne.

setb 10h
setb 17h

;   3 -  Idem, mais pour R0.
mov 22H,R0
setb 10h
setb 17h
mov R0,22H


;   4 -  Complémenter le demi-octet de pds faible de l'adresse 2Ah de la RAM interne.

;   5 -  Copier le bit 7 de l'adresse 20h dans le bit 3 de l'adresse 23h, sans modifier
;        les autres bits.

;   6 -  Mettre à 1 le bit 0 de l'accumulateur sans modifier l'état des autres bits de l'accumulateur
;        Codez-le de 2 manières différentes
;        Pour chaque solution, évaluez le nombre d'octets nécessaires au code et le nombre de cycle processeur
;        Vérifiez en simulation

;        SOLUTION1 en utilisant les instructions de manipulation "bit" :  

;        SOLUTION2 en utilisant les instructions logiques:

;   7 -  Mettre à 0 le bit 0 de l'accumulateur sans modifier l'état des autres bits de l'accumulateur
;        Codez-le de 2 manières différentes
;        Pour chaque solution, évaluez le nombre d'octets nécessaires au code et le nombre de cycle processeur
;        Vérifiez en simulation

;        SOLUTION1 en utilisant les instructions de manipulation "bit" :  

;        SOLUTION2 en utilisant les instructions logiques:

;   8 -  Transférer le bit 0 de l'accumulateur dans le bit de carry du registre PSW (registre d'état)  
;        Codez-le de 2 manières différentes
;        Pour chaque solution, évaluez le nombre d'octets nécessaires au code et le nombre de cycle processeur
;        Vérifiez en simulation

;        SOLUTION1 en utilisant les instructions de manipulation "bit" - pas d'altération du contenu de l'accumulateur:  


;        SOLUTION2 en utilisant les instructions logiques - le contenu de l'accumulateur peut être altéré:



;EXO 3 -- INSTRUCTIONS ARITHMETIQUES - Arithmétique non signée            
;*******************************************************************************

;   1 -  Incrémenter l'accumulateur de 1
inc A

;   2 -  Décrémenter l'octet 33h de la RAM Interne

dec 33H

;   3 -  Additionner les registres R6 et R7, stocker le résultat dans R5. Quelles sont les limitations?

mov A,R6
ADD A,R7
MOV R5,A

;   4 -  Pour s'affranchir des limitations précédentes, refaire la même opération,
;        mais stocker le résultat dans R4 (LSB) et R5(MSB). 

;   5 -  Faire l'opération R0-R1 et placer le résultat dans R7. Que se passe t'il si R1>R0?


;EXO 4 -- INSTRUCTIONS DE SAUT CONDITIONNEL ET INCONDITIONNEL              
;*************************************************************

;   1 -  Placez une valeur quelconque dans R3, incrémentez la jusqu'à ce qu'elle atteigne
;        la valeur B6h (pensez à initialiser R3)
	
	MOV R3, #0A0H
	RB: INC R3
	MOV A,R3
	CJNE A,#0B6H,RB
;   2 -  Remplir la mémoire RAM interne de l'adresse 20h à 40h avec la valeur 0ddh.
	MOV R1,#19H	
	R: INC R1
	MOV @R1,#0DDH
	CJNE R1,#40H,R

;   3 -  Placez une valeur quelconque dans R3, décrémentez la, jusqu'à ce qu'elle atteigne 
;        une valeur contenue dans R6 (pensez à initialiser R3 et R6)
	MOV R3,#19H	
	Mov R6,#05H
	S: dec R3
	MOV A,R3
	SUBB A,R6	
	CJNE A,#00H,S
;   4 -  Remplir la mémoire RAM interne de l'adresse 20h à 40h avec des codes ASCII
;        égrainant l'alphabet.

;   5 -  2 valeurs quelconques sont placées dans R0 et R4.
;        Trouver la plus grande valeur et stockez la dans R2.

;   6 - Lire le contenu de l'adresse 0000h à 0002h dans l'espace code et le copier
;        à l'adresse 0...2h de l'espace XDATA


; EXO 5 -- MANIPULATION DES BANCS de REGISTRES R0-R7
; **************************************************

;    1 - Commuter le banc de registres R0-R7 sur le banc 2. Vérifier.
	setb psw.4
	clr psw.3
	
;    2 - Mettre à zéro la case d'adresse 08h de la ram interne en utilisant un adressage
;        par registre (utiliser un registre R0...R7) 
MOV R0, #00H
MOV 08h, R0

;    3 - Copier le contenu de A dans le registre R4 sans utiliser "R4" dans l'instruction.
MOV A, #44H
MOV 14H, A ; car R4 sur le banc 2
;    4 - Remettre à zéro le banc de registre 3 	(tous les registres R0...R7 du banc 3)

;    5 - Remettre à zéro le banc de registre 3 	(tous les registres R0...R7 du banc 3)
;        par une autre méthode que dans l'exercice précédent



;******************************************************************************
;******************************************************************************
; NE PAS MODIFIER LES DIRECTIVES et INSTRUCTIONS SUIVANTES:
;******************************************************************************
  
bcl:   jmp bcl
;-----------------------------------------------------------------------------
; End of file.

END



