clear all
clc
close all

prompt  = {'Nb de Points de collocation','Nb de points de tracer'};
title   = 'Interpolation';
lines= 1;
def     = {'4','500'};
q = inputdlg(prompt,title,lines,def);
n=str2num(q{1});
nt=str2num(q{2});

% tracer du sinus
x0=(-4:8/nt:4)';
for i=1:size(x0,1)
   if abs(x0(i))>=3
       y0(i)=0;
   else
       y0(i)=4*(1-abs(2*x0(i)/3));
   end
end
plot(x0,y0);
hold on

% points de collocation
xc=(-4:8/n:4)';
for i=1:size(xc,1)
   if abs(xc(i))>=3
       yc(i)=0;
   else
       yc(i)=4*(1-abs(2*xc(i)/3));
   end
end
yc=yc';

plot(xc,yc,'go');

% Table des polynomes de Lagrange pour tout x0
    n=size(xc,1);
    nt=size(x0,1);
    P=ones(nt,n);
    for i=1:n
        for j=1:n
            if(i~=j)
                P(:,i)=P(:,i).*(x0-xc(j))./(xc(i)-xc(j));
            end
        end
    end

% le polynome
y=P*yc;
% tracer de la courbe d'interpolation
plot(x0,y,'r')
axis([-4 4 -15 15])
hold off

