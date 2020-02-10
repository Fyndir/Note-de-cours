%% Exercice 1

clc
clear all
close all
format long
%Borne de l'integrale
a=0;
b=1;

n=32; %n est le nombre d'intervales
h=(b-a)/n; %h est le pas

x=[a:h:b]; % suite de nb de 0 à 1 avec un pas de h

img=f(x); % stocke les images de exp(-x²) pour toute les valeurs de x

%Méthode des trapezes

tramp=h*((img(1)+img(end))/2+sum(img(2:1:end-1)))


% Méthode de simson

simson=(h/3)*(img(1)+img(end)+2*sum(img(3:2:end-1))+4*sum(img(2:2:end-1)))


fct_quad=quad(@f,a,b)

fct_quadl=quadl(@f,a,b)

%% Ordre de convergence des trapezes

clc
clear all
close all
format long
%Borne de l'integrale
a=0;
b=pi/2;
    
n=128; %n est le nombre d'intervales
h=(b-a)/n; %h est le pas

x=[a:h:b]; % suite de nb de 0 à 1 avec un pas de h

img=sin(x); % stocke les images de exp(-x²) pour toute les valeurs de x

%Méthode des trapezes

tramp=h*((img(1)+img(end))/2+sum(img(2:1:end-1)));

taux_de_convergence=1-tramp

%% Ordre de convergence de simson

clc
clear all
close all
format long
%Borne de l'integrale
a=0;
b=pi/2;

n=128; %n est le nombre d'intervales
h=(b-a)/n; %h est le pas

x=[a:h:b]; % suite de nb de 0 à 1 avec un pas de h

img=sin(x); % stocke les images de exp(-x²) pour toute les valeurs de x

%Méthode des trapezes

simson=(h/3)*(img(1)+img(end)+2*sum(img(3:2:end-1))+4*sum(img(2:2:end-1)));

taux_de_convergence=1-simson
