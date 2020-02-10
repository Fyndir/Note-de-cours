clear all;
hold on

%% Exercice 1 %%
disp 'EXERCICE 1'

% Question 1

x1 = -10:0.1:10
figure(1)
plot(x1, (x1 -2)/2, 'b')
plot(x1, x1/2, 'r')

% Question 2
s = [1 -2; 2 -4]
det(s)

% Question 3
% La solution théorique est aucune solution

% Question 4
% On a vu qu'aucune solution n'exister, donc cela n'est pas nécessaire

%% Exercice 2 %%

disp '####### EXERCICE 2 #########'

% Question 5
x1 = -10:0.1:10
figure(2)
hold on
plot(x1, x1/2 - 1, 'b')
plot(x1, x1/4, 'r')

% Question 6
s = [1 -2; 1 -4]
det(s)

% Question 7
% La solution est unique car il y a 2 inconnues et 2 équations ainsi qu'un
% déterminant non nul

% Question 8
A = s
B = [2, 0]'
A\B

%% Exercice 3 %%

disp '####### EXERCICE 3 #########'

% Question 9
% Ce système est un système homogènes de degrée 2

% Question 10
s = [1 -2; 2 -4]
det(s)

% Question 11
% La solution théorique est : aucune solution

% Question 12
% Cela ne sert à rien surtout si on divise le vecteur nul

%% Exercice 4 %%

disp '####### EXERCICE 4 #########'

% Question 13
% C'est encore un systeme homogène de degrée 2

% Question 14
s = [1 -2; 1 -4]
det(s)

% Question 15
% La solution théorique est une solution unique pour x1 et x2

% Question 16
A = s
B = [0 0]'
A\B % Poser question au prof pourquoi c'est nul

%% Exercice 5 %%

disp '####### EXERCICE 5 #########'

% Question 17
% C'est un système linéraire possèdant 2 équations et 3 inconnues

% Question 18
% Il existe une infinité de solutions car il y a plus d'inconnues que d'équations

% Question 19
A = [1 2 3; 0 3 1]
B = [1 -2]'
A\B
% Matlab donne la solution x1 = 0 ; x2 = -1 ; x3 = 1

% Question 20
% Cette solution vérifie bien le système précédant

%% Exercie 6 %%

disp '####### EXERCICE 6 #########'

% Question 21
% Ce systèmes est un système linéraire possèdant 2 inconnues et 3 équations

% Question 22
x1 = -2:0.1:6
figure(3)
hold on
plot(x1, 2*x1 -2, 'g')
plot(x1, 5 -x1, 'r')
plot(x1, 5 - 6*x1, 'b')
% il n'y a pas de solution car les 3 courbes ne se croissent pas en un
% point


% Question 23
A = [2 -1; 1 1; 6 -1]
B = [2 5 -5]'
s = A\B

% Question 24
A*s
% bien différent de B

% Question 25
 plot(s(1,1), s(2,1), 'r*')

 %% Exercie 7 %%
 
 disp '####### EXERCICE 7 #########'
 
 % Question 26
 A = magic(10)
 
 % Question 27
 b = [1:10]'
 
 % Question 28
 s1 = A\b
 
 % Question 29
 % Warning: Matrix is close to singular or badly scaled. Results may be inaccurate.
 % RCOND =  1.243297e-18. 
 
 % Question 30
 cond(A)

 % Question 31
 b(10) = 10.0001
 
 % Question 32
 s2 = A\b
 
 % Question 33
 abs(s2 - s1)
 
% Question 34
b(10) = 10
A(10,10) = 59.001

% Question 35
s3 = A\b
disp 'Comparaison de s1 et s2'
abs(s2 - s1)
disp 'Comparaison de s2 et s3'
abs(s3 - s2)
disp 'Comparaison de s1 et s3'
abs(s3 - s1)


%% Exercice 8 %%

disp '####### EXERCICE 8 #########'

% Question 36
A = [1 2 3; 3 2 1; 3 4 7; 10 9 8]
b = [12 15 13 17]'
A\b

% Question  37
x = inv(A'*A)*(A'*b)

% Question 38
% Les solutions sont idientiques

%% Exercice 9 %%

disp '####### EXERCICE 9 #########'

% Question 39
t = [0.25 0.5 1 2 3];
y = [18 10 7 2 1];
figure(4)
plot(t,y, 'b*')

% Question 40
A = t';
A(:,2) = 1;
b = y'

% Question 41
s = A\b
% Question 42
plot(t, A*s, 'r')

%% Exercice 10

disp '####### EXERCICE 10 #########'

% Question 43
t = [0.25 0.5 1 2 3];
y = [18 10 7 2 1];
A = ones(5,2)
A(:,2) = exp(-t)

% Question 44
b = y';
s=A\b

% Question 45
plot(t, A*s, 'g')






