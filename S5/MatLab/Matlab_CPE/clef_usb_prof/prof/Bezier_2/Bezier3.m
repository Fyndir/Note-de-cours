function M =  Bezier3(P1,P2,P3,t)
b = [t.^2 t ones(1,length(t))']
mat = [-1 -2  1;
       -2  2  0;
        1  0  0]
M = b*(mat*[P1;P2;P3])
