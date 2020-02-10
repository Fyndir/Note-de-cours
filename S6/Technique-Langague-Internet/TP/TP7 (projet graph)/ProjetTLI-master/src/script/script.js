var canvas;
var context;
var resultAlgo;
var select;
var fcontrols;
var DijkstraControls;

var mouseClicked = false; //Indique si un clique de souris est déclanché
var dragStarted = false; //Indique si un drag est en cours
var hasClicked = false;
var simpleClick = false;
var doubleClickStack = 0;

var hooverdElement; //Element sur lequel se trouve la sourie

var graph;

var displayLabels = true; //Indique si les labels doivent être affichés ou non
var verticeColor = "#e24747"; //Couleur par défaut du sommet (rouge)
var selectedColor = "#d4cd08"; //Couleur par défaut des éléments selectionnés (jaune/orange)
var edgeColor = "#22253c"; //Couleur par défaut du sommet (bleu foncé)
var classAColor = "#1ec93f";
var classBColor = "#43afd6";
var edgeWidth = 4;
var canvasColor = "#ffffff";
var edgePathColor = "#d47e08";

var beg = null;
var end = null;

//Initialise le js au chargement de la page
function init(){
    canvas = document.getElementById("zoneDeTravail");
    context = canvas.getContext("2d");
    resultAlgo = document.getElementById("resultAlgo");

    graph = new Graph();
    DijkstraControls = document.getElementById("DijkstraControls");
    DijkstraControls.style.display = "none";

    //Gestion des ajouts et selections de sommets
    document.getElementById("zoneDeTravail").onmousedown = function(event){
        event = event || window.event;
        event.preventDefault();

        var posX = event.pageX - canvas.offsetLeft;
        var posY = event.pageY - canvas.offsetTop;
        var pos = new Pos(posX,posY);
        click(pos);
    }

    //Gestion du drag
    document.getElementById("zoneDeTravail").onmousemove = function(event) {
        event = event || window.event;
        event.preventDefault();

        var posX = event.pageX - canvas.offsetLeft;
        var posY = event.pageY - canvas.offsetTop;
        var pos = new Pos(posX,posY);
        drag(pos);
    }

    //Gestion du drag
    document.getElementById("zoneDeTravail").onmouseup = function() {

        //clique et drag fini
        dragStarted = false;
        mouseClicked = false;
        simpleClick = false;
    }

    //Gestion de l'orientation
    document.getElementById("directed").onchange = function(){
        graph.directed = !graph.directed;
        graph.drawElements();
        setAlgoSelector();
    }

    //Gestion de l'affichage des labels
    document.getElementById("label").onchange = function(){
        displayLabels = !displayLabels;
        graph.drawElements();
    }

    //Gestion de l'affichage des pondérations
    document.getElementById("valued").onchange = function(){
        graph.valued = !graph.valued;
        graph.drawElements();
    }

    //Gestion de touches
    document.onkeydown = function(event) {
        event = event || window.event;
        event.preventDefault();

        switch(event.keyCode){
            case 46:
                supprimer();
                break;
            default:
        }

        graph.drawElements();
    }

    //Selecteur de rayon
    document.getElementById("rayonS").onchange = function(){
        rayon = parseInt(document.getElementById("rayonS").value);
        edgeWidth = (rayon-12)*.3+4;
        graph.drawElements();
    }

    //Selecteur de couleur des sommets
    document.getElementById("verticeColor").onchange = function(){
        verticeColor = document.getElementById("verticeColor").value;
        graph.drawElements();
    }

    //Selecteur de couleur des arrêtes
    document.getElementById("edgeColor").onchange = function(){
        edgeColor = document.getElementById("edgeColor").value;
        graph.drawElements();
    }

    //Selecteur de couleur de selection
    document.getElementById("selectedColor").onchange = function(){
        selectedColor = document.getElementById("selectedColor").value;
        graph.drawElements();
    }

    //Selecteur de couleur des sommets de la classe A
    document.getElementById("classAColor").onchange = function(){
        classAColor = document.getElementById("classAColor").value;
        graph.drawElements();
    }

    //Selecteur de couleur des sommets de la classe B
    document.getElementById("classBColor").onchange = function(){
        classBColor = document.getElementById("classBColor").value;
        graph.drawElements();
    }

    //Selecteur de couleur de canvas
    document.getElementById("canvasColor").onchange = function(){
        canvasColor = document.getElementById("canvasColor").value;
        graph.drawElements();
    }

    //Selecteur de couleur des chemins
    document.getElementById("pathColor").onchange = function(){
        edgePathColor = document.getElementById("pathColor").value;
        graph.drawElements();
    }

    select = document.getElementById("select");
    select.onchange = function(event){
        if(select.value == 2){
            DijkstraControls.style.display = "block";
            graph.valued = true;
            document.getElementById("valued").checked = true;
        } else {
            DijkstraControls.style.display = "none";
        }
    }

    fcontrols = document.getElementById("fcontrols");
    setAlgoSelector();

    var fontSize = rayon*1.2;
    context.font = fontSize + "px Arial";
    context.textAlign = "center"; 
    context.textBaseline = "middle";
}

/*************************************************************************************************/
/************************************ Interface Graphique ****************************************/
/*************************************************************************************************/

// Réinitialise le canvas
function reinit(){ 
    //Efface le canvas
    clearCanvas();
    //On vide les listes des objets
    graph.vertices = [];
    graph.edges = [];
    //On remet à 0 les id
    id = 0;
}

//Efface le canvas
function clearCanvas(){

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = canvasColor;
    context.fillStyle = canvasColor;
    context.rect(0,0,canvas.width,canvas.height);
    context.fill()
    context.stroke();

}

//Gère le sleep de l'application
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Se déclanche lors d'un clique et analyse s'il s'agit d'un simple clique, double clique ou d'un drag
async function click(pos) {
    hooverdElement = null;
    mouseClicked = true;

    //Test si la souris se trouve sur un élément
    //Test si la souris se trouve sur un élément
    detectHooveredElement(pos);

    if(hasClicked){
        doubleClickStack = 2;
    }
    hasClicked = true;
    await sleep(200); //On attends pour decteter si l'action est un simple/double clique ou un drag
    hasClicked = false;
    if(doubleClickStack>0){ //Double clique
        if(doubleClickStack == 2){
            //console.log('double clique');
            if(hooverdElement != null){
                doubleClick();
            }
        }
        doubleClickStack--;
    } else if(!dragStarted){ //Simple clique
        //console.log('simple clique');
        simpleClick = true;
        singleClick(pos); 
    }

    graph.drawElements();
}

//Detecte l'élément sur lequel se trouve la souris au moment du clique
function detectHooveredElement(pos){

    var i=0;

    while(i<graph.vertices.length && hooverdElement==null){
        if(graph.vertices[i].isClicked(pos)){
            hooverdElement = graph.vertices[i];
        }
        i++;
    }

    i=graph.edges.length-1;

    clearCanvas();
    while(i>=0 && hooverdElement==null){
        if(graph.edges[i].isClicked(pos)){
            hooverdElement = graph.edges[i];
        }
        i--;
    }
    graph.drawElements();
}

//Gère les simples clique
function singleClick(pos){
    if(hooverdElement != null){
        hooverdElement.select();
        testSelect();
    } else {
        ajouterSommet(pos.x,pos.y);
    }
}

//Gère les doubles clique
function doubleClick(){
    mouseClicked = false;
    if(hooverdElement != null){
        if(hooverdElement instanceof Vertice){
            var newLabel = prompt("Nouveau Label : ");
            if(newLabel != null && newLabel != ""){
                renomerSommet(hooverdElement.id,newLabel);
            }
        } else if(hooverdElement instanceof Edge){
            var newPonderation = prompt("Nouvelle pondération : ");
            if(newPonderation != null && newPonderation != ""){
                pondererArrete(hooverdElement.s1,hooverdElement.s2,newPonderation);
            }
        }
    }
}

//Gère les drags
function drag(pos){
    //Si un clique est en cours et que la souris bouge, passe en mode drag
    if(mouseClicked && !dragStarted){
        dragStarted = true;
    }

    /*if(dragStarted && !simpleClick){
        console.log('drag')
    }*/

    //Si mode drag on bouge l'objet sur lequel on a cliqué (=/= de l'objet selectionné)
    if(dragStarted && hooverdElement != null && !simpleClick){
        if(hooverdElement instanceof Vertice){
            deplacerSommet(hooverdElement.id,pos.x,pos.y);
            graph.drawElements();
        }
    }
}

//Applique la logique relative à la selection d'éléments
function testSelect(){
    if(hooverdElement instanceof Edge){
        graph.edges.forEach(function(element){
            if(!element.isEqual(hooverdElement)){
                element.selected = false;
            }
        });
        graph.vertices.forEach(function(element){
            element.selected = false;
        });
    } else if (hooverdElement instanceof Vertice){ //Si l'objet sélectionné est un sommet on le séléctionne ou si un autre sommet est séléctionné
        //on ajoute une arrête entre le sommet séléctionné et celui déjà séléctionné 
        var otherVertice = null;
        graph.vertices.forEach(function(element){
            if(!element.isEqual(hooverdElement) && element.selected){
                element.select();
                otherVertice = element;
            }
        });
        if(otherVertice != null){
            hooverdElement.select();
            ajouterArrete(otherVertice.id,hooverdElement.id);
        }
    }
}

//Convertit du rgb à l'héxadécimal
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

//Supprime l'élément séléectionné
function supprimer(){
    graph.vertices.forEach(function(element){
        if(element.selected){
            supprimerSommet(element.id);
        }
    });
    graph.edges.forEach(function(element){
        if(element.selected){
            supprimerArrete(element.s1,element.s2);
        }
    });
}

function lancerAlgo(){

    var result;
    switch(select.value){
        case "0":
            result = algoPageRank();
            break;
        case "1":
            result = algoBipartition();
            if(result.classeA != null){
                result.classeA.forEach(function(element){
                    element.drawColor(classAColor);
                });
            }
            if(result.classeB != null){
                result.classeB.forEach(function(element){
                    element.drawColor(classBColor);
                });
            }
            break;
        case "2":
            if(beg != null && end != null){
                result = algoDijkstra(beg,end);
                drawPath(result.edges);
            } else {
                var result = {};
                result.resultAlgoStr = "Le chemin n'est pas défini";
            }
            break;
    }

    resultAlgo.innerHTML = result.resultAlgoStr;
}

function drawPath(edges){

    clearCanvas();

    graph.edges.forEach(function(element){
        element.draw();
    });

    var setBackDirected = false;

    if(!graph.directed){
        setBackDirected = true;
        graph.directed = true;
    }

    edges.forEach(function(element){
        var edge = new Edge(element.s1,element.s2);
        edge.drawPath(setBackDirected);
    });
    
    if(setBackDirected){
        graph.directed = false;
    }

    graph.vertices.forEach(function(element){
        element.draw();
    });

}

function initAlgos(){

    var algos = [];

    var pageRank = {
        id: 0,
        name: "Page Rank",
        directed: true,
        notDirected: false,
    };
    algos.push(pageRank);

    var bipartition = {
        id: 1,
        name: "Bipartition",
        directed: false,
        notDirected: true,
    };
    algos.push(bipartition);

    var dijkstra = {
        id: 2,
        name: "Dijkstra",
        directed: true,
        notDirected: true,
    };
    algos.push(dijkstra);

    return algos;
}

function setAlgoSelector(){

    var algos = initAlgos();
    var aviableAlgos = [];

    algos.forEach(function(element){
        if(graph.directed){
            if(element.directed){
                aviableAlgos.push(element);
            }
        } else {
            if(element.notDirected){
                aviableAlgos.push(element);
            }
        }
    });

    select.innerHTML = "";
    aviableAlgos.forEach(function(element){
        var option = document.createElement("option");
        option.value = element.id;
        option.innerHTML = element.name;
        select.appendChild(option);
    });

}

function setBeg(){
    var found = false;
    graph.vertices.forEach(function(element){
        if(element.selected){
            beg = element;
            element.select();
            found = true;
            graph.drawElements();
        }
    });

    if(!found){
        resultAlgo.innerHTML = "Aucun sommet séléectionné";
    } else {
        resultAlgo.innerHTML = "Le sommet : " + beg.label + "est le début du chemin";
    }
}

function setEnd(){
    var found = false;
    graph.vertices.forEach(function(element){
        if(element.selected){
            end = element;
            element.select();
            found = true;
            graph.drawElements();
        }
    });

    if(!found){
        resultAlgo.innerHTML = "Aucun sommet séléectionné";
    } else {
        resultAlgo.innerHTML = "Le sommet : " + end.label + "est la fin du chemin";
    }
}

/*************************************************************************************************/
/************************************** Export / Import ******************************************/
/*************************************************************************************************/

async function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    let exportFileDefaultName = 'graph.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);7
    linkElement.setAttribute('target', '_blank');
    linkElement.click();
}

function exportInfo(){
    var blop=JSON.stringify(graph);	
    exportToJsonFile(blop);
}

function importInfo() {
    var file = fileInput.files[0];


    var reader = new FileReader();

    reader.onload = function(e) {
        Object.assign(graph,JSON.parse(JSON.parse(reader.result)));

        var vertices = [];
        var edges = [];

        graph.vertices.forEach(function(element){
            var vertice = new Vertice(0,0);
            var pos = new Pos(0,0);
            Object.assign(vertice,element);
            Object.assign(pos,vertice.pos);
            vertice.pos = pos;
            vertices.push(vertice);
        });

        graph.edges.forEach(function(element){
            var edge = new Edge(0,0);
            Object.assign(edge,element);
            edges.push(edge);
        });

        graph.vertices = vertices;
        graph.edges = edges;
        graph.drawElements();
        fcontrols.reset();
    }

    reader.readAsText(file);

}