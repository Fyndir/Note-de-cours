% nombres premiers

clear x
clc
n=10;
x=1:n
x(1)=0;
for i=2:fix(n/2)
    if x(i)~=0
        for j=2*i:i:n
            x(j)=0;
        end
    end
end
x(x>0)
