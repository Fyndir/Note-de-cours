function window3(P1, P2, P3)
[x y]=xy3(P1,P2,P3);
dx = max(x)-min(x);
dy = max(y)-min(y);

axis([min(x)-0.1*dx max(x)+0.1*dx min(y)-0.1*dy max(y)+0.1*dy]);
%axis square