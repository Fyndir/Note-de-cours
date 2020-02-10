function window(P1, P2, P3, P4)
[x y]=xy(P1,P2,P3,P4);
dx = max(x)-min(x);
dy = max(y)-min(y);

axis([min(x)-0.1*dx max(x)+0.1*dx min(y)-0.1*dy max(y)+0.1*dy]);
axis square
text(min(x)-0.1*dx,min(y)-0.05*dy,'Bouton droit pour quitter','FontSize',14);
end
