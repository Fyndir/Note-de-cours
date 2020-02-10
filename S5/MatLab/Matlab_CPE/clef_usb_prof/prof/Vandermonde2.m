clear all
close all
clc
hold on

% tracer du sinus
nt=500;
x0=-5:10/nt:5;
x0=x0';
y0=1./(x0.*x0+1);
plot(x0,y0)

% points de collocation
nc=10;
xc=-5:10/nc:5;
xc=xc';
yc=1./(xc.*xc+1);

% matrice de Vandermonde
A=ones(nc+1,1);
format long
for i=1:nc
    A=[A (xc.^i)];
end

% resolution du systeme
a=A\yc;

% coefficients du polynome
a=fliplr(a') ;

% tracer des points
y=polyval(a,xc);
plot(xc,y,'ro')

% tracer de la courbe d'interpolation
y=polyval(a,x0);
plot(x0,y,'r')
