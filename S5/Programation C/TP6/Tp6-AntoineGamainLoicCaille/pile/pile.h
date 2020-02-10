#ifndef __PILE_H__
#define __PILE_H__

typedef struct Liste{
    
    int val;
    struct Liste* prevVal;
    
}Liste;

Liste* empiler(int val, Liste* liste);

int depiler(Liste** liste);

#endif
