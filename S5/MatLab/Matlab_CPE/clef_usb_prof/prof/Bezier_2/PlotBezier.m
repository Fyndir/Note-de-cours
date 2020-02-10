function M =  Bezier4(P1,P2,P3,P4,t)
b = [t.^3 t.^2 t ones(1,length(t))'];
mat = [-1  3 -3  1;
        3 -6  3  0;
       -3  3  0  0;
        1  0  0  0];
M = b*(mat*[P1;P2;P3;P4]);
%plot(M(:,1),M(:,2))