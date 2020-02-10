clear all
clc
close all

% tracer des mesures = points de collocation
xc=0:5:45;
yc=[55 60 58 54 55 60 54 57 52 49];
plot(xc,yc,'ro');
hold on

% points de tracer
x0=0:.01:45;

% % Table des polynomes de Lagrange pour tout x0
x0=x0';
n=length(xc);
nt=length(x0);
P=ones(nt,n);
for i=1:n
    for j=1:n
        if(i~=j)
            P(:,i)=P(:,i).*(x0-xc(j))./(xc(i)-xc(j));
        end
    end
end
%[P]= lagrange(xc,x0);
% le polynome
y=P*yc'
% tracer de la courbe d'interpolation
plot(x0,y,'r')



%axis([-4 4 -15 15])
hold off

