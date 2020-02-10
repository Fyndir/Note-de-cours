%TP3 equations non lineaires

clc
clear all
close all

% DICHOTOMIE
%Polynome Legendre
A = [63/8, 0, -70/8, 0, 15/8, 0] ;
B = [-1:2/499:1];
C = polyval(A,B) ;
plot(B,C)
grid on

%Calcul racines + tri
beta = roots(A);
sort(beta)

%Calcul iterations
a=0.6;
b=1;
e=[1e-6 1e-10 1e-12 1e-14];
log((b-a)./e)/log(2);

%Prgm methode dichotomie
e=1e-6
n=0;

while n <= 100 && b-a > e
    n=n+1;
    m=(a+b)/2;
    if (polyval(A,a)*polyval(m,a) < 0)
        b=(a+b)/2;
    end
    if (polyval(A,a)*polyval(m,a) > 0)
        a=(a+b)/2;
    end
end
n