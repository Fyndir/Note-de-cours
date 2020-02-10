/*Initialisation du matrice 3*3 */
var pion = new Array(3);
for (i = 0; i< 3; i++) {
    pion[i] = new Array(3);
    for (j = 0; j< 3; j++) {
        pion[i][j] = 0; //vide
    }
}

var fini = false;
var turnX = false;
var id = document.getElementById("tic_tac_toe");
var context = id.getContext("2d");
tic_tac_toe();

/*Detection du clic souris*/
document.getElementById("tic_tac_toe").onmousedown  = function(event) {
    event = event || window.event;
    event.preventDefault();
    ajouter(this, event);
}

function ligne(type, x, y) {
    context.strokeStyle =  "#ff0000";
    context.lineWidth = 10;
    context.beginPath();
    if (type == 'horizontal') {
        context.moveTo(0,y+100);
        context.lineTo(600,y+100);
    }
    else if (type == 'vertical') {
        context.moveTo(x+100,0);
        context.lineTo(x+100,600);
    }
    else if (type == 'diagonal-left') {
        context.moveTo(0, 0);
        context.lineTo(600,600);
    }
    else if (type == 'diagonal-right') {
        context.moveTo(0, 600);
        context.lineTo(600,0);
    }
    context.closePath();
    context.stroke();
}

function lignes(x,y) {
    context.strokeStyle =  "#00b33c";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(x+20,y+20);
    context.lineTo(x+180,y+180);
    context.moveTo(x+180,y+20);
    context.lineTo(x+20,y+180);
    context.closePath();
    context.stroke();
}

function cirque(x, y) {
    context.strokeStyle =  "#00b33c";
    context.lineWidth = 10;
    context.beginPath();
    context.arc(x, y, 80, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
}

function tic_tac_toe() {
    context.strokeStyle =  "#ffb33c";
    context.lineWidth = 10;
    context.moveTo(0,200);
    context.lineTo(600,200);
    context.moveTo(0,400);
    context.lineTo(600,400);
    context.moveTo(200,0);
    context.lineTo(200,600);
    context.moveTo(400,0);
    context.lineTo(400,600);
    context.stroke();
}

function indiceDiagonale(indexX, indexY) {
    if((indexX == 0 && indexY == 0)  ||
       (indexX == 1 && indexY == 1 ) ||
       (indexX == 2 && indexY == 2 ) ||
       (indexX == 2 && indexY == 0 ) ||
       (indexX == 0 && indexY == 2 ) ) {
        return true;
    }
    return false;
}

/*Verification*/
function verifier(indexX, indexY) {
    var milieu = false;
    if ( indiceDiagonale(indexX, indexY)) {
        if(pion[indexX][indexY] == pion[0][0] &&
           pion[0][0] == pion[1][1] &&
           pion[1][1] == pion[2][2]) {
            ligne('diagonal-left', 0, 0);
            fini = true;
            return;
        }
        else if(pion[indexX][indexY] == pion[0][2] &&
                pion[0][2] == pion[1][1] &&
                pion[1][1] == pion[2][0]) {
            ligne('diagonal-right', 0, 0);
            fini = true;
            return;
        }
    }
    if (pion[indexX][indexY] ==  pion[0][indexY] &&
        (pion[0][indexY] == pion[1][indexY] && 
         pion[1][indexY] == pion[2][indexY] )) {
        ligne('horizontal', 0, indexY * 200);
        fini = true;
        return;
    }
    if (pion[indexX][indexY] ==  pion[indexX][0] &&
        pion[indexX][0] == pion[indexX][1] && 
        pion[indexX][1] == pion[indexX][2] ) {
        ligne('vertical', indexX * 200, 0);
        fini = true;
    }    
}

/*Ajouter un pion*/
function ajouter(canvas, event) {
    if(fini) {
        return;
    }

    var posX = event.pageX - canvas.offsetLeft;
    var posY = event.pageY - canvas.offsetTop;
    var indexX = -1;
    var indexY = -1;

    if (posX < 200) {
        indexX = 0;
    } 
    else if (posX >= 200 && posX < 400) {
        indexX = 1;
    }
    else if (posX >= 400 && posX < 600) {
        indexX = 2;
    }
    if (posY < 200) {
        indexY = 0;
    } 
    else if (posY >= 200 && posY < 400) {
        indexY = 1;
    }
    else if (posY >= 400 && posY < 600) {
        indexY = 2;
    } 
    if (indexX != -1 && indexY != -1) {
        if (pion[indexX][indexY] == 0) {
            if(turnX) {
                lignes(indexX * 200, indexY * 200);
                turnX = false;
                pion[indexX][indexY] = 1;
            }
            else {
                cirque(indexX * 200 + 100, indexY * 200 + 100);
                turnX = true;
                pion[indexX][indexY] = 2;
            }
            verifier(indexX, indexY);
        }
    }
}

function ajouterClavier(indexX, indexY) {
    if(fini) {
        return;
    }

    if (indexX != -1 && indexY != -1) {
        if (pion[indexX][indexY] == 0) {
            if(turnX) {
                lignes(indexX * 200, indexY * 200);
                turnX = false;
                pion[indexX][indexY] = 1;
            }
            else {
                cirque(indexX * 200 + 100, indexY * 200 + 100);
                turnX = true;
                pion[indexX][indexY] = 2;
            }
            verifier(indexX, indexY);
        }
    }
}

document.onkeydown = function(event) {
    event = event || window.event;
    event.preventDefault();

    switch(event.keyCode){
        case 103:
            ajouterClavier(0, 0)
            break;
        case 104:
            ajouterClavier(1, 0)
            break;
        case 105:
            ajouterClavier(2, 0)
            break;
        case 100:
            ajouterClavier(0, 1)
            break;
        case 101:
            ajouterClavier(1, 1)
            break;
        case 102:
            ajouterClavier(2, 1)
            break;
        case 97:
            ajouterClavier(0, 2)
            break;
        case 98:
            ajouterClavier(1, 2)
            break;
        case 99:
            ajouterClavier(2, 2)
            break;
        default:
    }
}