%function x=somcub(n)

clc
clear all
n=10
m=(1:n).^3
m=m(ones(1,n),:)
m+m'
m=triu(m+m')
m(:)
m=sort(m(:)')
m(m==0)=[] % supprime les elements égaux à 0
[0,diff(m)]
logical([0 diff(m)])
m=m(logical([0,diff(m)]))