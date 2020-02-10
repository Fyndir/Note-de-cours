% Réinitialisation de l'espace

clear all
close all

% On conserve les tracés d'un plot à un autre
hold on

% On définit le nombre de points de discretisation
N = 150;

% Fonction sin sur 500 points
x = [0:2*pi/500:2*pi]'
%x=[-5:5/500:5]
y = sin(x)
%y = 1./(x.*x+1)
% [commenté] si on veut voir le resultat
plot(x,y) 

xprime = [0:2*pi/N:2*pi]'
%xprime = [-5:5/N:5]
yprime = sin(xprime)
%yprime = 1./(x.*x+1)
%plot(xprime,yprime,'go')

p = lagrange(xprime,yprime,x)
plot(x,p,'r')