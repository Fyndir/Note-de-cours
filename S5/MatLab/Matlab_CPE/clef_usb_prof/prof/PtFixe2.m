clear all
%close all
clc

pl=[1 0 -4 1];
beta=roots(pl)
x=-3:.01:.25;
y=-(1-4*x).^(1/3);
plot(x,x,x,y)
grid on

xn=0;
eps = 1e-6;
max=15;
for i=1:max
    x=xn;
    xn=-(1-4*x)^(1/3);
    er1(i)=abs(xn-x)/abs(xn);
    er2(i)=abs(xn-beta(1))/abs(x-beta(1));
    if(er1<eps) 
        break
    end
end

for i=1:max
    disp(sprintf(' %.2e %.2e',er1(i),er2(i)))
end
disp(sprintf(' phiprim  %.2e\n',4/3*(1-4*beta(1))^(-2/3)))
disp(sprintf(' xn %.20g\n beta %.20g\n',xn,beta(1)))

