clear all
%close all
clc

pl=[1 0 -4 1];
format long
beta=roots(pl)
plder=polyder(pl);
format

xn=-3;
eps = 1e-12;;
max=15;
for i=1:max
    x=xn;
    xn=x-polyval(pl,x)/polyval(plder,x);
    er1=abs(xn-x)/abs(xn);
    if(er1<eps) break
end

end
disp(sprintf('iter=%d  err=%.2e',i,er1))
disp(sprintf('x= %.15g',xn))

