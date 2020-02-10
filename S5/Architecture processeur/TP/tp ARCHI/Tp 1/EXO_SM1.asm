;-----------------------------------------------------------------------------
;  FILE NAME   :  EXO_SM1.asm
;  TARGET MCU  :  C8051F020 
;  DESCRIPTION :  Cette suite d'exercices de base est destin�e � faire
;                 d�couvrir le jeu d'instruction de la famille 8051.
;                 Ins�rez votre code sous chaque exercice.
;                 A la fin de la s�ance, vous rendrez ce fichier via E-campus
;                 ou par Email � l'adresse que l'on vous communiquera
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

;Initialisations de p�riph�riques - Fonctionnalit�s Microcontroleur

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

;   1 -  Initialiser l'accumulateur � 0
;        Codez-le de 3 mani�res diff�rentes en utilisant divers modes d'adressage
;        Pour chaque solution, �valuez le nombre d'octets n�cessaires au code et le nombre de cycle processeur
;        V�rifiez en simulation
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
;        Pr�cision: en base 16, on rajoute le suffixe H, en base 2, on ajoute le suffixe B
;        Pi�ge: en assembleur, toute valeur nu�rique doit commencer par un chiffre, aussi on �crit 0FFH au lieu de FFH

MOV R0,#0FFh

;   3 -  Copier le contenu de l'accumulateur dans le registre R1
MOV R1,A
;   4 -  Mettre la valeur 55h dans la case m�moire 40h en m�moire RAM interne.

MOV 40H,#55H
;   5 -  Copier le contenu de la m�moire 40h de la RAM interne dans la case 42h
;        de la RAM Interne.
;        Codez-le de 3 mani�res diff�rentes en utilisant divers modes d'adressage
;        Pour chaque solution, �valuez le nombre d'octets n�cessaires au code et le nombre de cycle processeur
;        V�rifiez en simulation

;        SOLUTION1:  
MOV 42H, 40H

;        SOLUTION2:
MOV R0,#40H
MOV 42H,@R0

;        SOLUTION3:
MOV R1,#42H
MOV @R1,40H

;   6 -  Copier le contenu de la m�moire 40h de la RAM interne dans la case D0h
;        de la RAM Interne � acc�s indirect.
;        Que se passe t'il si on utilise par erreur l'adressage direct sur D0h?

MOV R0,#0D0H
MOV 40H,@R0



;   7 -  Copier le contenu de 20h (DATA) dans la case m�moire 2FFh en m�moire RAM externe (XDATA).
MOV A, 20H
MOV DPTR, #2FFH
MOVX @DPTR,A

;   8 -  Copier le contenu de 0000h (CODE) dans la case m�moire 82h en m�moire RAM interne.
MOV DPTR,#0H
CLR A
MOVC A,@A+DPTR
MOV R1, #82H
MOV @R1,A


;   9  - Echanger le contenu de B avec le contenu de la m�moire 07FFh en m�moire externe (XDATA).

;XCH A,07FFH

;   10 - Initialiser la m�moire 0100h de la m�moire XDATA avec la valeur 22h

;   11 - Copier le contenu de la m�moire 0100h de la XATA dans la case 43h
;        de la RAM Interne

;   12 - Copier le contenu de la m�moire 1234h de la m�moire CODE dans la case 0102h
;        de la m�moire XDATA

;   13 - En une ligne de code, �changer le contenu de A avec le contenu de la m�moire 60h

;   14 - Pousser l'accumulateur dans la pile
 
; EXO 2 --INSTRUCTIONS LOGIQUES - MANIPULATION de BITS              
;******************************************************************************

;   1 -  Compl�menter le bit d'adresse 10h (Attention c'est une adresse Bit)
;        Ou se trouve t'il ?  (r�ponse attendue: c'est le bit X de l'octet  
;        d'adresse YY dans la m�moire DATA)
cpl 10h

;   2 -  Mettre � 1, les bits 0 et 7 (sans changer les autres bits) dans l'octet 
;        d'adresse 22h de la RAM interne.

setb 10h
setb 17h

;   3 -  Idem, mais pour R0.
mov 22H,R0
setb 10h
setb 17h
mov R0,22H


;   4 -  Compl�menter le demi-octet de pds faible de l'adresse 2Ah de la RAM interne.

;   5 -  Copier le bit 7 de l'adresse 20h dans le bit 3 de l'adresse 23h, sans modifier
;        les autres bits.

;   6 -  Mettre � 1 le bit 0 de l'accumulateur sans modifier l'�tat des autres bits de l'accumulateur
;        Codez-le de 2 mani�res diff�rentes
;        Pour chaque solution, �valuez le nombre d'octets n�cessaires au code et le nombre de cycle processeur
;        V�rifiez en simulation

;        SOLUTION1 en utilisant les instructions de manipulation "bit" :  

;        SOLUTION2 en utilisant les instructions logiques:

;   7 -  Mettre � 0 le bit 0 de l'accumulateur sans modifier l'�tat des autres bits de l'accumulateur
;        Codez-le de 2 mani�res diff�rentes
;        Pour chaque solution, �valuez le nombre d'octets n�cessaires au code et le nombre de cycle processeur
;        V�rifiez en simulation

;        SOLUTION1 en utilisant les instructions de manipulation "bit" :  

;        SOLUTION2 en utilisant les instructions logiques:

;   8 -  Transf�rer le bit 0 de l'accumulateur dans le bit de carry du registre PSW (registre d'�tat)  
;        Codez-le de 2 mani�res diff�rentes
;        Pour chaque solution, �valuez le nombre d'octets n�cessaires au code et le nombre de cycle processeur
;        V�rifiez en simulation

;        SOLUTION1 en utilisant les instructions de manipulation "bit" - pas d'alt�ration du contenu de l'accumulateur:  


;        SOLUTION2 en utilisant les instructions logiques - le contenu de l'accumulateur peut �tre alt�r�:



;EXO 3 -- INSTRUCTIONS ARITHMETIQUES - Arithm�tique non sign�e            
;*******************************************************************************

;   1 -  Incr�menter l'accumulateur de 1
inc A

;   2 -  D�cr�menter l'octet 33h de la RAM Interne

dec 33H

;   3 -  Additionner les registres R6 et R7, stocker le r�sultat dans R5. Quelles sont les limitations?

mov A,R6
ADD A,R7
MOV R5,A

;   4 -  Pour s'affranchir des limitations pr�c�dentes, refaire la m�me op�ration,
;        mais stocker le r�sultat dans R4 (LSB) et R5(MSB). 

;   5 -  Faire l'op�ration R0-R1 et placer le r�sultat dans R7. Que se passe t'il si R1>R0?


;EXO 4 -- INSTRUCTIONS DE SAUT CONDITIONNEL ET INCONDITIONNEL              
;*************************************************************

;   1 -  Placez une valeur quelconque dans R3, incr�mentez la jusqu'� ce qu'elle atteigne
;        la valeur B6h (pensez � initialiser R3)
	
	MOV R3, #0A0H
	RB: INC R3
	MOV A,R3
	CJNE A,#0B6H,RB
;   2 -  Remplir la m�moire RAM interne de l'adresse 20h � 40h avec la valeur 0ddh.
	MOV R1,#19H	
	R: INC R1
	MOV @R1,#0DDH
	CJNE R1,#40H,R

;   3 -  Placez une valeur quelconque dans R3, d�cr�mentez la, jusqu'� ce qu'elle atteigne 
;        une valeur contenue dans R6 (pensez � initialiser R3 et R6)
	MOV R3,#19H	
	Mov R6,#05H
	S: dec R3
	MOV A,R3
	SUBB A,R6	
	CJNE A,#00H,S
;   4 -  Remplir la m�moire RAM interne de l'adresse 20h � 40h avec des codes ASCII
;        �grainant l'alphabet.

;   5 -  2 valeurs quelconques sont plac�es dans R0 et R4.
;        Trouver la plus grande valeur et stockez la dans R2.

;   6 - Lire le contenu de l'adresse 0000h � 0002h dans l'espace code et le copier
;        � l'adresse 0...2h de l'espace XDATA


; EXO 5 -- MANIPULATION DES BANCS de REGISTRES R0-R7
; **************************************************

;    1 - Commuter le banc de registres R0-R7 sur le banc 2. V�rifier.
	setb psw.4
	clr psw.3
	
;    2 - Mettre � z�ro la case d'adresse 08h de la ram interne en utilisant un adressage
;        par registre (utiliser un registre R0...R7) 
MOV R0, #00H
MOV 08h, R0

;    3 - Copier le contenu de A dans le registre R4 sans utiliser "R4" dans l'instruction.
MOV A, #44H
MOV 14H, A ; car R4 sur le banc 2
;    4 - Remettre � z�ro le banc de registre 3 	(tous les registres R0...R7 du banc 3)

;    5 - Remettre � z�ro le banc de registre 3 	(tous les registres R0...R7 du banc 3)
;        par une autre m�thode que dans l'exercice pr�c�dent



;******************************************************************************
;******************************************************************************
; NE PAS MODIFIER LES DIRECTIVES et INSTRUCTIONS SUIVANTES:
;******************************************************************************
  
bcl:   jmp bcl
;-----------------------------------------------------------------------------
; End of file.

END



