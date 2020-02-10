function [I] = Simpson(h,x,f)
    I = f(x(1))+f(x(end)) + 4*sum(f(x(2:2:end-1)))+ 2*sum(f(x(3:2:end-2)));
    I = h/3 * I;
end
