clear all
%close all
clc
hold on

pl = [1 0 -4 1];
x=-3:6/500:3;
y=polyval(pl,x);
%figure(1)
plot(x,y)
grid on
beta=sort(roots(pl))
%hold on


phi=[1 0 0 1]/4;
y=polyval(phi,x);
plot(x,x,x,y)
grid on

x=-2;
eps = 1e-10;
max=8;
for i=1:max
    xs=x;
    x=polyval(phi,x);
    er1(i)=abs(x-xs)/abs(x);
    er2(i)=abs(x-beta(2))/abs(xs-beta(2));
    if(er1<eps) 
        %break
    end
end

disp(sprintf('Nb iter = %d\n',i))
disp(sprintf('e(n)  %.2e\n',er1))
disp(sprintf('e(n+1)/e(n)  %f\n',er2))
disp(sprintf('phiprim(beta2) %f\n',polyval(polyder(phi),beta(2))))
disp(sprintf(' x  = %.20g\n beta(2)= %.20g\n',x,beta(2)))


