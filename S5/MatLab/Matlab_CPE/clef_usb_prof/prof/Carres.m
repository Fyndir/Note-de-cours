%function x=somcub(n)

clc
clear all
n=5
m=(1:n).^2
m=m(ones(1,n),:)
m+m'
m=triu(m+m')
m(:)
m=sort(m(:)')
m(m==0)=[] % supprime les elements égaux à 0
