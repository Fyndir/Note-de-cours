clc

clear u
tic
for i=1:10000
   u(i)=i;
end
toc

clear u
tic;
u=1:10000;
toc

clear u u2
tic
u=1:50000;
for i=1:50000
   u2(i)=u(i)*u(i);
end
toc

clear u u2
tic
u=1:50000;
u2=1:50000;
for i=1:50000
   u2(i)=u(i)*u(i);
end
toc

clear u u2
tic
u=1:100000;
u2=u.*u;
toc

clear u u2
tic
u=1:100000;
u2=1:100000;
u2=u.*u;
toc