clear all
close all
clc

nc = 10;
nt = 500;

xc=0:5:45;
yc=[55 60 58 54 55 60 54 57 52 49];
plot(xc,yc,'ro');
hold on

% points de tracer
xr=0:45/(nt-1):45;

% Table des polynomes de Lagrange pour tout x0
    nc=length(xc);
    nt=length(xr);
    for k = 1:nt
        p = 0;
        for i=1:nc
            L=1;          
            for j=1:nc
                if(i~=j)
                    L=L*(xr(k)-xc(j))/(xc(i)-xc(j));
                end
            end
            p=p+L*yc(i);
        end
        yr(k)=p;
    end

% tracer de la courbe d'interpolation
plot(xr,yr,'r')


% points de tracer
clear yr;
xr=2.5;
nt = 1;
% Table des polynomes de Lagrange pour tout x0
    nc=length(xc);
    nt=length(xr);
    for k = 1:nt
        p = 0;
        for i=1:nc
            L=1;          
            for j=1:nc
                if(i~=j)
                    L=L*(xr(k)-xc(j))/(xc(i)-xc(j));
                end
            end
            p=p+L*yc(i);
        end
        yr(k)=p;
    end
p
% tracer de la courbe d'interpolation
plot(xr,yr,'+')

nc=3;
clear yr;
nt=500;
xr=0:30/(nt-1):30;

% Table des polynomes de Lagrange pour tout x0

    for k = 1:nt
        p = 0;
        for i=1:nc
            L=1;          
            for j=1:nc
                if(i~=j)
                    L=L*(xr(k)-xc(j))/(xc(i)-xc(j));
                end
            end
            p=p+L*yc(i);
        end
        yr(k)=p;
    end
p
% tracer de la courbe d'interpolation
plot(xr,yr)