clear all
clc
format long
n=5;
v0=1
v1=2
i=3;
v=v0/i^3+sqrt(v1)

while (v-1)>1e-6
    v0=v1;
    v1=v;
    i=i+1;
    v=v0/i^3+sqrt(v1)
end
i
format