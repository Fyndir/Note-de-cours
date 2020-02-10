function [I] = trapeze(h,x,f)
    I = h *((f(x(1))+f(x(end)))/2 + sum(f(x(2:end-1))));
end
