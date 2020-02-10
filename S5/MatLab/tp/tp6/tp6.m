clc;
clear all; 
close all; 
format long; 
hold on;
grid on;

a=0;
b=2*pi;
nt=500; %n est le nombre de points a tracer
hr=(b-a)/nt; %h est le pas


xr=a:hr:b; % suite de nb de 0 à 2pi avec un pas de h
yr=sin(xr); % on stocke les images de sin(x)

plot(xr, yr); % afficher les points, reliés

nc= 5; % nombre de point de collocation
hc=(b-a)/nc; %hc est le pas
xc=a:hc:b;
yc=sin(xc);

plot(xc, yc, 'ro'); % afficher les points (cercles)

% Algo permettant de calculer le polynôme d'interpolation
% pour toutes les abscisses dans xr (version "classique")

P = 1:1:nt+1;

for k = 1:1:nt+1
    
    %[initialisation ACC E...]
    P(k) = 0;

    for i = 1:1:nc+1
        
        %[initialisation ACC M...]
        L = 1;
    
        for j = 1:1:nc+1
           
            if(i~=j)
                
                %[accumulation _...]
                L = L * ((xr(k)-xc(j)) / (xc(i)-xc(j)));
                
            end
            
        end
        
        %[accumulation _...]
        P(k) = P(k) + L * yc(i);
        
    end
    

end

plot(xr, P, 'r'); % afficher les points
%%
clc;
clear all; 
close all; 
format long; 
hold on;
grid on;
a=-4;
b=4;
nt=500; %n est le nombre de points a tracer
hr=(b-a)/nt; %h est le pas


xr=a:hr:b; % suite de nb de -4 à 4 avec un pas de h

yr=f(xr);% on stocke les images de f(x)

plot(xr,yr,'blue');


nc= 20; % nombre de point de collocation
hc=(b-a)/nc; %hc est le pas
xc=a:hc:b;
yc=f(xc);

plot(xc, yc, 'ro'); % afficher les points (cercles)



% Algo permettant de calculer le polynôme d'interpolation
% pour toutes les abscisses dans xr (version "classique")

P = 1:1:nt+1;

for k = 1:1:nt+1
    
    %[initialisation ACC E...]
    P(k) = 0;

    for i = 1:1:nc+1
        
        %[initialisation ACC M...]
        L = 1;
    
        for j = 1:1:nc+1
           
            if(i~=j)
                
                %[accumulation _...]
                L = L * ((xr(k)-xc(j)) / (xc(i)-xc(j)));
                
            end
            
        end
        
        %[accumulation _...]
        P(k) = P(k) + L * yc(i);
        
    end
    

end

plot(xr, P, 'r'); % afficher les points

