clear all
close all
clc

%% Liste de fonctions utiles
f=@(x) (x/8).*(63.*x.^4 - 70.*x.^2 + 15);

%% Applications

% Q1
% n >=  ln( (b-a) / e ) / ln(2)

%Q2
x = -1:0.005:1
LP = (x/8).*(63.*x.^4 - 70.*x.^2 + 15)
figure(1)
grid on;
plot(x, LP, '-r')

%Q3
% Elles existent

%Q4
beta = roots([63/8 0 -70/8 0 15/8 0])

%Q5
beta = sort(beta)

%Q6
f(beta)

% Les valeurs sont relativement proche de zéro

% Q7
% Grafiquement l'interval parait correct pour Beta5

% Q8
% 14 / 23 / 28 / 32

% Q9 / 10

a = 0.6
b = 1
epsilon = 1e-14
i_max = 100
i = 0

In = [];
Errn = [];
while(abs(b-a) >= epsilon && i < i_max)
    i=i+1;
    
    mid = f( (a+b)/2 );
    In = [In; b-a];
    Errn = [Errn; abs(mid - beta(5))];
    if f(a)*mid < 0
        b = (a+b)/2;
    elseif f(a)*mid > 0
        a = (a+b)/2;
    else
        a = (a+b)/2;
        b = (a+b)/2;
        break
    end
end
% Q11

n = 1:i
figure
semilogy(n, In, 'r--')
hold on;
semilogy(n, Errn, '-')

% Q12
% Log(In) = n*ln(2) + ln(epsilon)
% Sur une échelle logaritmique il parait evidenent qu'une courbe
% logarithmique soir linéaire

% Q13
% Oui

% Q14
% Parce qu'on temps à tendre vers la valeur finale donc un delta = 0

% Q15
% Bof

%% La méthode par substitution
% Q16
figure
F2 = [1 0 -4 1]
x = -3:0.01:3
f2 = polyval(F2, x)
plot(x, f2)

%Q17
beta = sort(roots(F2))

% Q18
% Vérifié
hold on;
% Q19
plot(x, polyval([1/4 0 0 1/4], x), 'r')

% Q20
% Elle possède 3 points fixes et corrrespondent aux valeurs de beta

% Q21 / 23
epsilon = 1e-15
i_max = 50
x0 = 0
errn = []
crit_conv = 1
i = 0
% Afin de vérifier on se propose de calculer la dérivée de phi
dphi = [3/4 0 0]
verrn = []
phip_b = polyval(dphi, beta(2));

while(crit_conv > epsilon && i < i_max)
    i = i+1;
    xt = x0;
    x0 = polyval([1/4 0 0 1/4], x0);
    en = abs(x0 - beta(2)) / abs(xt - beta(2));
    errn = [errn; en];
    verrn = [verrn; en*phip_b];
    crit_conv = abs(x0 - xt) / abs(xt);
end
format long
i
errn
verrn
% Q23
% La théorie ne correspond pas

%Q24
% C'est un point fixe répulsif pour phi

%% La méthode de Newton

% 25

format long;
f2 = [1 0 -4 1]
fp2 = polyder(f2)
epsilon = 1e-15
i_max = 50
x0 = -3
Xn = []
err = 1
i = 0
while(err > epsilon  && i < i_max)
    i = i+1;
    xn =  x0 - polyval(f2, x0)/polyval(fp2, x0);
    Xn = [Xn ; xn];
    err = abs(xn - x0)/abs(x0);
    x0 = xn;
end
i
Xn

% Q29 - Oui c'est juste