#ifndef __FILE_H__
#define __FILE_H__

typedef struct Liste{
    
    int val;
    struct Liste* prevVal;
    struct Liste* nextVal;
    
}Liste;

Liste* enfiler(int val, Liste* liste);

int defiler(Liste** liste);

Liste* find_end(Liste* current);

#endif
