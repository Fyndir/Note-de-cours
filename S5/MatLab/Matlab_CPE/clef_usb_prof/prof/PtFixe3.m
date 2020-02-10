clear all
%close all
clc

pl=[1 0 -4 1];
beta=roots(pl)
x=-3:.001:-.01;
y=-(4-1./x).^(1/2);
plot(x,x,x,y)
grid on

be=beta(1);
phiprim=-.5*(4-1./be).^(-1/2)/(be.*be);

xn=-2.5;
eps = 1e-15;;
max=10;
for i=1:max
    x=xn;
    xn=-(4-1./x)^(1/2);
    er1(i)=abs(xn-x)/abs(xn);
    er2(i)=abs(xn-beta(1))/abs(x-beta(1));
    if(er1(i)<eps) break
end

end

disp(sprintf('e(n)  %.2e\n',er1))
disp(sprintf('e(n+1)/e(n)  %f\n',er2))
disp(sprintf(' phiprim  %f\n',phiprim))
disp(sprintf(' iter  %d\n',i))
disp(sprintf(' xn %.20g\n beta %.20g\n',xn,beta(1)))


