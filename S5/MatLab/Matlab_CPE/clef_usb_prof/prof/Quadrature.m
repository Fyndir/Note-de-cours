clear all
close all
clc


f = @(x) exp(-x.^2)

N=[2:2:128];
Quad = N;

% trapeze
fprintf('Trapeze\n')
i=1;
for n=N
    h=1/n;
    x=0:h:1;
    Quad(i)=Trapeze(h,x,f);
    i=i+1;
end

for i=1:length(N)
    fprintf('%3d : %.15f\n',N(i),Quad(i))
end

plot(N,Quad,'o')
hold on

% Simpson
fprintf('Simpson\n')
i=1;
for n=N
    h=1./n;
    x=0:h:1;
    Quad(i)=Simpson(h,x,f);
    i=i+1;
end

for i=1:length(N)
    fprintf('%3d : %.15f\n',N(i),Quad(i))
end
plot(N,Quad,'ro')

% *********
% Fonction MatLan Integral
% *********
    fprintf('\n    MatLab integral %.15f\n',integral(f,0,1))

% **************************
% **************************
% **************************

f = @(x) sin(x)

N=[2 4 8 16 32 64 128];
Quad = N;

% trapeze
fprintf('Trapeze\n')
i=1;
for n=N
    h=pi/2/n;
    x=0:h:pi/2;
    Quad(i)=Trapeze(h,x,f);
    i=i+1;
end

for i=1:length(N)-1
    fprintf('%3d : %.15f : %.3e %.4f\n',N(i),Quad(i),1-Quad(i),(1-Quad(i))/(1-Quad(i+1)))
end
fprintf('%3d : %.15f : %.3e\n',N(i),Quad(i),1-Quad(i))

figure(2);
plot(log10(N),log10(abs(1-Quad)),'-ro')
hold on

% Simpson
fprintf('Simpson\n')
i=1;
for n=N
    h=pi/2/n;
    x=0:h:pi/2;
    Quad(i)=Simpson(h,x,f);
    i=i+1;
end

for i=1:length(N)-1
    fprintf('%3d : %.15f : %.3e %.4f\n',N(i),Quad(i),abs(1-Quad(i)),abs(1-Quad(i))/abs(1-Quad(i+1)))
end

fprintf('%3d : %.15f : %.3e\n',N(i),Quad(i),abs(1-Quad(i)))

plot(log10(N),log10(abs(1-Quad)),'-o')

grid on

