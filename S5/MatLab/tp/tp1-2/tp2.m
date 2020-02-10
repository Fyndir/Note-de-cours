%% Exercice 1
clc;clear all;close all;
A = [1 -2 ; 2 -4]
B = [2 ; 0]
det(A)
A\B

%% Exercice 2
clc;clear all;close all;
A = [1 -2 ; 1 -4]
B = [2 ; 0]
det(A)
A\B

%% Exercice 3
%% Le système est un système carre
clc;clear all;close all;
A = [1 -2 ; 2 -4]
B = [0 ; 0]
det(A)
A\B

%% Exercice 4
clc;clear all;close all;
A = [1 -2 ; 1 -4]
B = [0 ; 0]
det(A)
A\B

%% Exercice 5
%% C'est un système 3 inconnues 2 equations
clc;clear all;close all;
A = [1 2 3 ; 0 3 1]
B = [1 ; -2]

A\B

%% Exercice 6
clc;clear all;close all;
A = [2 -1 ; 1 1 ; 6 -1]
B = [2 ; 5 ; -5]

A\B

%% Exercice 7
clc;clear all;close all;
A = magic(10)
B = [1:10]
A\B'
cond(A)
B(10) = 10.0001
A\B'
B(10) = 10
A(10,10) = 59.001
%% Exercice 8
clc;clear all;close all;
A=[1 2 3;3 2 1;3 4 7;10 9 8]
B=[12;15;13;17]
A\B

%% Exercice 9
clc;clear all;close all;
A=[0.25 1;0.5 1;1 1;2 1;3 1]
B=[18;10;7;2;1]
A\B
%% Exercice 10
clc;clear all;close all;
A=[1 exp(-0.25);1 exp(-0.5);1 exp(-1);1 exp(-2);1 exp(-3)]
B=[18;10;7;2;1]
plot(A\B)





