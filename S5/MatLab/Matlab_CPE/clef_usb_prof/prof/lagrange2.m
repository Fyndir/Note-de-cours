clear all
close all

prompt  = {'Nb de Points de collocation','Nb de points de tracer'};
title   = 'Interpolation';
lines= 1;
def     = {'4','500'};
q = inputdlg(prompt,title,lines,def);
n=str2num(q{1});
nt=str2num(q{2});

% tracer du sinus
x0=(-5:10/nt:5)';
y0=1./(x0.*x0+1);
plot(x0,y0);
hold on

% points de collocation
xc=(-5:10/n:5)';
yc=1./(xc.*xc+1);
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
%P=Lagrange(xc,x0);

% le polynome
y=P*yc;
% tracer de la courbe d'interpolation
plot(x0,y,'r')

