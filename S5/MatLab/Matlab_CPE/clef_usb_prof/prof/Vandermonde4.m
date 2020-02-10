clear all
close all
clc
hold on

% tracer du sinus
nt=500;
x0=-4:8/nt:4;
x0=x0';
y0=(abs(x0)<3.).*4.*(1-abs(2*x0/3));
plot(x0,y0)

% points de collocation
nc=20;
xc=-4:8/nc:4;
xc=xc';
yc=(abs(xc)<3.).*4.*(1-abs(2*xc/3));

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
