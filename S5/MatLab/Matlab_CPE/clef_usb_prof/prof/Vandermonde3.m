clear all
close all
clc
hold on

% tracer du sinus
nt=500;
x0=-3:6/nt:3;
x0=x0';
y0=(abs(x0)<1.)*2;
plot(x0,y0)

% points de collocation
nc=10;
xc=-3:6/nc:3;
xc=xc';
yc=(abs(xc)<1.)*2;

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
