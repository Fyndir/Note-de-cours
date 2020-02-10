function [result] = scnDegSolver(a, b, c)
    if(a==0)
        if(b==0)
            if(c==0)
                result = 'Infinité de solutions';
            else
                result = 'Pas de solution';
            end;
        else 
            result = -c/b;
        end;
    else
        Delta = b*b-4*a*c;
        if(Delta > 0)
            x1=(-b+sqrt(Delta))/2/a;
            x2=(-b-sqrt(Delta))/2/a;
        elseif(Delta==0)
            x1=-b/2/a;
            x2=x1;
        else
            x1=(-b+i*sqrt(-Delta))/2/a;
            x2=(-b-i*sqrt(-Delta))/2/a;
        end;
        result = [x2 x1];
    end;