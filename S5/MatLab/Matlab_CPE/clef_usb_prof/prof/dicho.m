clear all
close all
hold off

%pl = [63 0 -70 0 15 0]/8;
pl = [2 -exp(1) -exp(1)^2]
x=-1:2/500:1;
y=polyval(pl,x);
%figure(1)
plot(x,y)
grid on
rac=sort(roots(pl))

a=0.2;
b=3;
eps = 1e-6;
for i=1:100
    m=(a+b)/2;
    if(polyval(pl,m)*polyval(pl,a)>0)
        a=m;
    else
        b=m;
    end
%     err1(i)=abs(rac(5)-m);
%     err2(i)=b-a;
    if(b-a < eps) break
end
%figure(2)
%semilogy([1:size(err1,2)],err1,'r--',[1:size(err2,2)],err2,'-')
end
m
