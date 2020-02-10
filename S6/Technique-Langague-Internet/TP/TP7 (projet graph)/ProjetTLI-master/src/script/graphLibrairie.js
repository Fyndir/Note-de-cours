var id = 0; //compteur des id
var stopAlgoRankPage = 0.99999; //Valeur à laquelle on peut arrêter l'algo de ranking page
var failSafeAlgoPageRank = 999; //Au cas où il n'y a pas d'état stable on se sert de cette valeur pour stopper l'algorithme
var dumping = 0.825;
var rayon = 12; //rayon de sommets

/*************************************************************************************************/
/****************************************** Classes **********************************************/
/*************************************************************************************************/

// Position avec un couple x, y
class Pos{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    //Renvois la distance entre 2 points
    distancePos(pos){
        return this.distance(pos.x,pos.y);
    }

    //Renvois la distance entre 1 point et une coordonée
    distance(x2,y2){
        return Math.sqrt(Math.pow(this.x-x2,2)+Math.pow(this.y-y2,2));
    }

    //Vérifie l'égalité entre deux positions
    isEqual(pos){
        return this.x == pos.x && this.y == pos.y;
    }
}

// Vertice avec la position x et y
class Vertice{
    constructor(x,y){
        this.id = id;
        this.label = this.generateLabel(id++);
        this.pos = new Pos(x,y);
        this.selected = false;
    }

    //Selectionne le sommet
    select(){
        this.selected = !this.selected;
    }

    //Dessine le sommet en de la couleur pour un sommet
    draw(){
        this.drawColor(verticeColor);

        if(this.selected){
            this.drawSelected();
        }
    }

    //Dessine le sommet de la couleur en paramètre
    drawColor(color){
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.fillStyle = color;
        context.arc(this.pos.x,this.pos.y,rayon,0,2*Math.PI);
        context.fill();
        context.stroke();

        this.drawLabel();
    }

    //Dessine un contour pour indiquer le point selectionné
    drawSelected(){
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = selectedColor;
        context.arc(this.pos.x,this.pos.y,rayon+2,0,2*Math.PI);
        context.stroke();
    }

    //Affiche le label si le sommet en a un et que les labels doivent être affichés
    drawLabel(){
        if(displayLabels && this.label != null && this.label != ""){
            context.beginPath(); 
            context.fillStyle = "#1f0f77";
            context.fillText(this.label,this.pos.x,this.pos.y);
            context.stroke();
        }
    }

    //Génère un label par défaut pour le point en fonction de son id
    generateLabel(id){
        var letter = String.fromCharCode(65 + (id%26));
        for(var i=0;i<(id-id%26)/26;i++){
            letter+="'";
        }
        return letter;
    }

    //Déplace un sommet
    move(x,y){
        this.pos = new Pos(x,y);
    }

    //Change le label
    rename(label){
        this.label = label;
    }

    //Vérifie si le sommet est cliqué
    isClicked(pos){ 
        var hoovered = pos.distancePos(this.pos)<=rayon;
        return hoovered;
    }

    //Vérifie l'égalité entre deux sommets
    isEqual(vertice){
        return this.id == vertice.id;
    }

    //Retourne les sommets sur lequel pointe le sommet (graphe orienté)
    getLinks(){
        var linkedVertices = [];
        var thisVertice = this;
        graph.edges.forEach(function(element){
            if(element.s1 == thisVertice.id){
                var alreadyAdded = false; //Pour éviter d'ajouter deux fois le même sommet;

                linkedVertices.forEach(function(vertice){
                    if(vertice.id == element.s2){
                        alreadyAdded = true;
                    }
                })

                if(!alreadyAdded){
                    linkedVertices.push(graph.getVertice(element.s2));
                }
            }
        });

        return linkedVertices;
    }

    //Retourne les sommets liés à un sommet (non orienté)
    getLinkedVertices(){
        var edges = graph.getEdgesFromVertice(this.id);
        var vertices = [];
        var thisId = this.id;

        edges.forEach(function(edge){
            if(edge.s1 == thisId){
                vertices.push(graph.getVertice(edge.s2));
            } else {
                vertices.push(graph.getVertice(edge.s1));
            }
        })

        return vertices;
    }
}

// Arrête avec ses deux sommets
class Edge{
    constructor(s1,s2){
        this.s1 = s1;
        this.s2 = s2;
        this.value = 1;
        this.selected = false;
    }

    //Séléctionne l'arrête
    select(){
        this.selected = !this.selected;
    }

    //Retourne vrai si la flèche doit être courbée
    //faux sinon
    isCurved(){
        if(!graph.directed){
            return false;
        }

        var edge = this;
        var curved = false;

        graph.edges.forEach(function(element){
            if(element.s1 == edge.s2 && element.s2 == edge.s1){
                curved = true;
            }
        });

        return curved;
    }

    //Dessine l'arrête en noir ou jaune si selectionné
    draw(){

        var color = edgeColor;

        if(this.selected){
            color = selectedColor;
        }

        this.drawColor(color,edgeWidth);
    }

    //Dessine l'arrête de la couleur en paramètre
    drawColor(color,widthEdge){
        var curved = this.isCurved();

        context.beginPath();
        context.lineWidth = widthEdge;
        context.strokeStyle = color;
        context.fillStyle = color;

        var sommet1 = graph.getVertice(this.s1);
        var sommet2 = graph.getVertice(this.s2);

        if(!curved){
            context.moveTo(sommet1.pos.x,sommet1.pos.y);
            context.lineTo(sommet2.pos.x,sommet2.pos.y);
            context.stroke();
        }else{ //Dessine le trait courbé
            var d = sommet1.pos.distancePos(sommet2.pos); //Distance entre les deux points
            var x = (sommet1.pos.x + sommet2.pos.x) / 2;
            var y = (sommet1.pos.y + sommet2.pos.y) / 2;
            var theta = Math.atan2((sommet1.pos.y - sommet2.pos.y),(sommet1.pos.x - sommet2.pos.x)); //Angle du segment par rapport à l'axe Y

            context.save();   
            // Centre le contexte au centre du segment entre les deux points
            context.translate(x,y);
            // Oriente le contexte en fonction de l'angle du segment par rapport à l'axe Y
            context.rotate(theta);        
            context.moveTo(-d/2,0);
            context.quadraticCurveTo(0,d/4,d/2,0);
            context.stroke();          
            context.restore();
        }

        this.drawArrow(curved);
        this.drawValue(curved);
    }

    //Dessine la fleche dans le cas d'un graphe orienté
    drawArrow(curved){

        if(graph.directed){

            var sommet1 = graph.getVertice(this.s1);
            var sommet2 = graph.getVertice(this.s2);

            var d = sommet1.pos.distancePos(sommet2.pos); //Distance entre les deux points
            var x = sommet2.pos.x;
            var y = sommet2.pos.y;
            var theta = Math.atan2((sommet1.pos.y - sommet2.pos.y),(sommet1.pos.x - sommet2.pos.x)) - .5*Math.PI; //Angle du segment par rapport à l'axe Y
            var offset = rayon; // Offset pour que la pointe de la flèche se trouve sur le rayon du sommet

            //Si le trait est courbé on rajoute un peu d'angle à la flèche;
            if(curved){
                theta+=rayon*.01*Math.PI;
            }

            //Sauvegarde le contexte pour le remettre comme il faut après les modifications
            context.save();

            // Centre le contexte au centre du sommet destination
            context.translate(x,y);
            // Oriente le contexte en fonction de l'angle du segment par rapport à l'axe Y
            context.rotate(theta);


            // Dessine la fleche (Sans l'angle : comme si elle pointait vers le haut)
            context.beginPath();
            context.moveTo(0,offset);
            context.lineTo(rayon/2,rayon+offset);
            context.lineTo(-rayon/2,rayon+offset);
            context.lineTo(0,offset);
            context.fill();
            context.stroke();

            context.restore();
        }

    }

    //Retroune vrai si l'arrête est relié au point
    //faux sinon
    hasVertice(vertice){
        return this.s1.isEqual(vertice) || this.s2.isEqual(vertice);
    }

    //Vérifie si l'arrête est cliquée
    isClicked(pos){ 
        var sommet1 = graph.getVertice(this.s1);
        var sommet2 = graph.getVertice(this.s2);

        var d = sommet1.pos.distancePos(sommet2.pos); //Distance entre les deux points
        var x = (sommet1.pos.x + sommet2.pos.x)/2;
        var y = (sommet1.pos.y + sommet2.pos.y)/2;

        var middle = new Pos(x,y);
        var cliked = false;

        if(middle.distance(pos.x,pos.y)<=d/2){

            this.drawColor(edgeColor,edgeWidth+4);
            var p = context.getImageData(pos.x,pos.y,1,1).data; 
            var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
            if(hex == edgeColor){
                cliked = true;
            }
        }
        return cliked;
    }

    //Vérifie l'égalité entre deux arrêtes
    isEqual(edge){
        if(graph.directed){ //Si le graphe est orienté on différentie s1 vers s2 de s2 vers s1
            return this.s1 == edge.s1 && this.s2 == edge.s2;
        } else { //Sinon on ne différentie pas
            return (this.s1 == edge.s1 && this.s2 == edge.s2) || (this.s1 == edge.s2 && this.s2 == edge.s1)
        }
    }

    drawValue(curved){
        if(graph.valued){

            var sommet1 = graph.getVertice(this.s1);
            var sommet2 = graph.getVertice(this.s2);

            var x = (sommet1.pos.x + sommet2.pos.x)/2;
            var y = (sommet1.pos.y + sommet2.pos.y)/2;

            var theta = Math.atan2((sommet1.pos.y - sommet2.pos.y),(sommet1.pos.x - sommet2.pos.x));
            var yC = -8;

            var down = 1;

            if(theta/Math.PI<-0.5 || theta/Math.PI>0.5){
                theta += Math.PI;
                down = -1;
            }

            context.save();

            context.translate(x,y);
            context.rotate(theta);

            if(curved){
                var d = sommet1.pos.distancePos(sommet2.pos);

                yC += down*((1-.5)^2 * 0 + 2 * (1-.5) * .5 * (d/4) + .5^2 * 0);
            }

            context.beginPath(); 
            context.fillStyle = "#1f0f77";
            context.fillText(this.value,0,yC);
            context.stroke();

            context.restore();

        }
    }
    
    drawPath(setBackDirected){
        
        if(setBackDirected){
            var curved = false;
        } else {
            var curved = this.isCurved();
        } 

        context.beginPath();
        context.lineWidth = edgeWidth;
        context.strokeStyle = edgePathColor;
        context.fillStyle = edgePathColor;

        var sommet1 = graph.getVertice(this.s1);
        var sommet2 = graph.getVertice(this.s2);

        if(!curved){
            context.moveTo(sommet1.pos.x,sommet1.pos.y);
            context.lineTo(sommet2.pos.x,sommet2.pos.y);
            context.stroke();
        }else{ //Dessine le trait courbé
            var d = sommet1.pos.distancePos(sommet2.pos); //Distance entre les deux points
            var x = (sommet1.pos.x + sommet2.pos.x) / 2;
            var y = (sommet1.pos.y + sommet2.pos.y) / 2;
            var theta = Math.atan2((sommet1.pos.y - sommet2.pos.y),(sommet1.pos.x - sommet2.pos.x)); //Angle du segment par rapport à l'axe Y

            context.save();   
            // Centre le contexte au centre du segment entre les deux points
            context.translate(x,y);
            // Oriente le contexte en fonction de l'angle du segment par rapport à l'axe Y
            context.rotate(theta);        
            context.moveTo(-d/2,0);
            context.quadraticCurveTo(0,d/4,d/2,0);
            context.stroke();          
            context.restore();
        }
        this.drawArrow(curved);
    }

}

//Gère l'affichage du graphe et les éléments
class Graph{
    constructor(){
        this.name = "nom_du_graphe";
        this.directed = false;
        this.vertices = [];
        this.edges = [];
        this.valued = false;
    }

    //Renvoit le sommet dont l'id est passé en paramètre
    getVertice(id){
        var vertice = null;
        this.vertices.forEach(function(element){
            if(element.id == id){
                vertice = element;
            }
        });
        return vertice;
    }

    //Renvoit les arrêtes reliées à un sommet dont l'id est en paramètre
    getEdgesFromVertice(id){
        var vertice = this.getVertice(id);
        var edgesFromVertice = [];

        this.edges.forEach(function(element){
            if(element.s1 == vertice.id || element.s2 == vertice.id){
                edgesFromVertice.push(element);
            }
        });

        return edgesFromVertice;
    }

    //Renvoit les arrêtes reliées à un sommet dont l'id est en paramètre et prend en compte l'orientation
    getEdgesFromVerticeO(id){
        var vertice = this.getVertice(id);
        var edgesFromVertice = [];
        var directed = this.directed;

        this.edges.forEach(function(element){

            if(directed){
                if(element.s1 == vertice.id && !contains(edgesFromVertice,element)){
                    edgesFromVertice.push(element);
                }
            } else {
                if((element.s1 == vertice.id || element.s2 == vertice.id) && !contains(edgesFromVertice,element)){
                    edgesFromVertice.push(element);
                }
            }         
        });

        return edgesFromVertice;
    }

    //Dessine le graphe
    drawElements(){
        //Efface le canvas
        clearCanvas();

        //Dessine les arrêtes en premier pour qu'elles soient sous les sommets
        this.edges.forEach(function(element){
            element.draw();
        })

        //Dessine les sommets
        this.vertices.forEach(function(element){
            element.draw();
        })
    }
}

// Utilisée pour l'algo de page rank
class PageRankItem{
    constructor(vertice,rank,links){
        this.vertice = vertice;
        this.rank = rank;
        this.links = links;
    }

    display(i){
        return i+" : "+this.vertice.label+" : "+this.rank;
    }
    
    isEqual(item){
        return this.vertice.isEqual(item.vertice);
    }
}

// Utilisée pour l'algo de dijkstra
class DijkstraItem{
    constructor(s){
        this.s = s;
        this.distanceToBeg = null;
        this.done = false;
        this.from = null;
        this.vertices = this.getVertices();
    }

    isEqual(item){
        return this.s.isEqual(item.s);
    }

    getVertices(){

        var vertices = new Array(2);
        vertices[0] = [];
        vertices[1] = [];
        var edges = graph.getEdgesFromVerticeO(this.s.id);
        var thisItem = this;

        if(graph.directed){
            edges.forEach(function(element){
                vertices[0].push(graph.getVertice(element.s2));
                vertices[1].push(element.value);
            });
        } else {
            edges.forEach(function(element){
                if(element.s1 == thisItem.s.id){
                    vertices[0].push(graph.getVertice(element.s2));
                    vertices[1].push(element.value);
                } else {
                    vertices[0].push(graph.getVertice(element.s1));
                    vertices[1].push(element.value);
                }
            });
        }
        return vertices;
    }
}

/*************************************************************************************************/
/***************************************** Librairie *********************************************/
/*************************************************************************************************/

//Ajoute un sommet avec les coordonées en paramètre
function ajouterSommet(x,y){
    graph.vertices.push(new Vertice(x,y));
}

//Supprime le sommet dont l'id est en paramètre
function supprimerSommet(id){  
    for(var i=0;i<graph.vertices.length;i++){
        if(graph.vertices[i].id == id){
            graph.vertices.splice(i, 1);
        }
    }

    //Supprime les arrêtes reliés au sommet
    graph.edges.forEach(function(element){
        if(element.s1 == id || element.s2 == id){
            supprimerArrete(element.s1,element.s2);
            supprimerArrete(element.s2,element.s1);
        } 
    });
}

//Deplace le sommet avec les coordonnées en paramètre
function deplacerSommet(id,x,y){
    var vertice = null;

    graph.vertices.forEach(function(element){
        if(element.id == id){
            vertice = element;
        }
    });

    if(vertice != null){
        vertice.move(x,y);
    }
}

//Renomme le sommet
function renomerSommet(id,label){
    var sommet = graph.getVertice(id);
    sommet.label = label;
}

//Ajoute une arrête
function ajouterArrete(id1,id2){
    graph.edges.push(new Edge(id1,id2));
}

//Supprime une arrête
function supprimerArrete(id1,id2){     
    var edges = [];

    graph.edges.forEach(function(element){
        if(graph.directed){
            if(!(element.s1 == id1 && element.s2 == id2)){
                edges.push(element);
            }
        } else {
            if(!((element.s1 == id1 && element.s2 == id2) || (element.s1 == id2 && element.s2 == id1))){
                edges.push(element);
            }
        }
    });

    graph.edges = edges;
}

//Pondere une arrête
function pondererArrete(id1,id2,ponderation){
    graph.edges.forEach(function(element){
        if(graph.directed){
            if(element.s1==id1 && element.s2==id2){
                element.value = ponderation;
            }
        } else {
            if((element.s1==id1 && element.s2==id2) || (element.s1==id2 && element.s2==id1)){
                element.value = ponderation;
            }
        }
    });
}

/*************************************************************************************************/
/**************************************** Algorithmes ********************************************/
/*************************************************************************************************/

//Affiche la boite de dialoge pour changer le label d'un sommet
function renameVertice(){

    //Renomme le sommet selectionné et le deselectionne
    if(selectedElement.length>0){
        var newLabel = prompt("Nouveau Label : ");
        if(newLabel != null && newLabel != ""){
            selectedElement[0].rename(newLabel);
        }
        selectedElement = [];
        drawElements();
    } else { //Si aucun sommet n'est selection, on affiche un message d'erreur
        alert("Vous n'avez selectionné aucun sommet à renomer");
    }
}

//Retourne l'angle entre deux vecteurs de même taille
function angle(v1,v2){
    if(v1.length != v2.length){
        return -1;
    }

    var magV1 = magnitude(v1);
    var magV2 = magnitude(v2);
    var dot = dotProduct(v1,v2);

    return dot/(magV1*magV2);
}

//retourne la magnitude d'un vecteur
function magnitude(vector){
    var magnitudeSquared = 0;
    vector.forEach(function(element){
        magnitudeSquared += Math.pow(element,2);
    })
    return Math.sqrt(magnitudeSquared);
}

//Retourne le dot product de deux vecteurs de même taille
function dotProduct(v1,v2){
    var dot=0;
    for(var i=0;i<v1.length;i++){
        dot+=v1[i]*v2[i];
    }
    return dot;
}

//Met les valeurs de list1 dans list2
function setList(list1,list2){
    for(var i=0;i<list1.length;i++){
        list2[i]=list1[i];
    }
}

//Vérifie la présence d'un objet (d'une classe qui a la méthode "isEqual") dans une liste
//Retourne vrai si la liste le contient
//faux sinon
function contains(list,value){
    var contain = false;

    list.forEach(function(element){
        if(element.isEqual(value)){
            contain = true;
        }
    })

    return contain;
}

//Vérifie qu'un objet (d'une classe qui a la méthode "isEqual") est dans deux listes
//Retourne vrai si les deux listes on un objet en commun
//faux sinon
function bothContains(list1,list2){
    var contain = false;

    list1.forEach(function(element){
        if(contains(list2,element)){
            contain = true;
        }
    })

    return contain;
}

//Calcul algo page rank
function algoPageRank(){

    var rankObjList = [];
    var vCurrent = [];
    var vPrec = [];
    var startRank = 1/graph.vertices.length;
    var result;
    var dt = (1-dumping)/graph.vertices.length;

    //On initialise pour chaque sommet son rang de départ et le nombre de liens qu'il a
    graph.vertices.forEach(function(vertice){
        rankObjList.push(new PageRankItem(vertice,startRank,vertice.getLinks()));
        vCurrent.push(startRank);
    });

    var k = 0;

    do{
        setList(vCurrent,vPrec);
        for(var i=0;i<rankObjList.length;i++){
            vCurrent[i] = 0;
            for(var j=0;j<rankObjList.length;j++){
                if(contains(rankObjList[j].links,rankObjList[i].vertice)){
                    vCurrent[i]+=vPrec[j]/rankObjList[j].links.length;
                }
            }
            vCurrent[i] = dt + dumping*vCurrent[i];
            rankObjList[i].rank = vCurrent[i];
        }
        k++;

    } while (angle(vCurrent,vPrec)<stopAlgoRankPage && k <= failSafeAlgoPageRank);

    var tot = 0;

    rankObjList.forEach(function(element){
        tot+=element.rank;
    });

    var mlt = 1/tot;

    rankObjList.forEach(function(element){
        element.rank *= mlt;
    });
    
    var rankObjListOrdered = [];
    //On ordonne les pages
    for(var k=0;k<rankObjList.length;k++){

        var max = -1;
        var pageMax = null;

        rankObjList.forEach(function(element){
            if(element.rank>max && !contains(rankObjListOrdered,element)){
                max = element.rank;
                pageMax = element;
            }
        });

        rankObjListOrdered.push(pageMax);
    }

    var resultAlgoStr = "";

    var o = 1;
    rankObjListOrdered.forEach(function(element){
        resultAlgoStr+=element.display(o++)+"<br>";
    });

    return {resultAlgoStr: resultAlgoStr};
}

//Calcul algo bipartition
function algoBipartition(){

    var classeA = []; //Sommets de la classe A
    var classeB = []; //Sommets de la classe B
    var bipartion = true;

    var orderedVertices = [];
    //On ordonne les sommets en fonction du nombre de leur arrêtes
    for(var k=0;k<graph.vertices.length;k++){

        var max = -1;
        var verticeMax = null;

        graph.vertices.forEach(function(element){
            var nbLinkedVertices = element.getLinkedVertices().length;
            if(nbLinkedVertices>max && !contains(orderedVertices,element)){
                max = nbLinkedVertices;
                verticeMax = element;
            }
        });

        orderedVertices.push(verticeMax);
    }

    for(var i=0;i<orderedVertices.length;i++){

        var linkedVertices = orderedVertices[i].getLinkedVertices();

        if(!bothContains(classeA,linkedVertices)){ //S'il n'y a pas d'objet en commun entre la liste des sommets de la classe A et des sommets reliés au sommet
            //On Ajoute le sommet à la classe A
            classeA.push(orderedVertices[i]);
        } else if(!bothContains(classeB,linkedVertices)){ //S'il ne peux pas être ajouté à la classe A
            //Et qu'il n'y a pas d'objet en commun entre la liste des sommets de la classe B et des sommets reliés au sommet
            //On Ajoute le sommet à la classe B
            classeB.push(orderedVertices[i]);
        } else { //Ne peut être ajouté dans aucune des classes
            i = graph.vertices.length;
            bipartion = false;
        }
    }

    var resultAlgo = {};

    if(bipartion){  
        resultAlgo.classeA = classeA;
        resultAlgo.classeB = classeB;
        
        classAIds = [];
        classeA.forEach(function(element){
            var id = {id: element.id};
            classAIds.push(id);
        })
        
        classBIds = [];
        classeB.forEach(function(element){
            var id = {id: element.id};
            classBIds.push(id);
        })

        var algorithm = {
            name: "biparti",
            classe_A: classAIds,
            classe_B: classBIds,
        };
        
        var algo = {
            algorithm: algorithm
        };
        
        resultAlgo.resultAlgoStr = JSON.stringify(algo);   
    } else {
        resultAlgo.resultAlgoStr = "Bipartition impossible";
    }

    return resultAlgo;
}

//Calcul de l'algo de dijkstra
//beg : id du sommet de départ
//end : id du sommet d'arrivé
function algoDijkstra(beg,end){

    var endItem;
    var begItem;
    var nbItems = graph.vertices.length;
    var items = [];

    graph.vertices.forEach(function(element){
        var dItem = new DijkstraItem(element,nbItems);
        if(dItem.s.isEqual(beg)){
            begItem = dItem;
        } else if(dItem.s.isEqual(end)){
            endItem = dItem;
        } else {
            items.push(dItem);
        }
    });

    begItem.distanceToBeg = 0;

    items.unshift(begItem);
    items.push(endItem);

    dijkstraRecursive(begItem,items);

    begItem;

    var path = [];
    curItem = endItem;
    var returnedToBeg = false;
    var edges = [];
    
    var p = {id: curItem.s.id, label: curItem.s.label};
    path.unshift(p);

    while(!returnedToBeg){
        
        var edge = {s2: curItem.s.id};
        curItem = curItem.from;
        edge.s1 = curItem.s.id;
        edges.push(edge)

        var p = {id: curItem.s.id, label: curItem.s.label};
        path.unshift(p);

        if(curItem.isEqual(begItem)){
            returnedToBeg = true;
        }
    }

    var algorithm = {
        name: "dijkstra",
        length: endItem.distanceToBeg,
        path: path
    }

    var algo = {
        algorithm: algorithm
    }

    var resultAlgo = {};
    resultAlgo.resultAlgoStr = JSON.stringify(algo);
    resultAlgo.edges = edges;

    return resultAlgo;


}

function dijkstraRecursive(item,items){
    itemList = [];

    for(var i=0;i<item.vertices[0].length;i++){
        var dItem = getItem(item.vertices[0][i],items);
        var distanceFromBegThroughItem = parseInt(item.distanceToBeg)+parseInt(item.vertices[1][i]);

        if((dItem.distanceToBeg==null || dItem.distanceToBeg>distanceFromBegThroughItem) && !dItem.done){

            dItem.distanceToBeg = distanceFromBegThroughItem;
            dItem.from = item;
            itemList.push(dItem);
        }
    }

    var orderedItems = [];
    //On ordonne les items en fonction de leur distance
    for(var k=0;k<itemList.length;k++){

        var max = -1;
        var itemMax = null;

        itemList.forEach(function(element){
            if(element.distanceToBeg>max && !contains(orderedItems,element)){
                max = element.distanceToBeg;
                itemMax = element;
            }
        });

        orderedItems.unshift(itemMax);
    }

    item.done = true;

    for(var k=0;k<orderedItems.length;k++){
        if(!orderedItems[k].done){
            dijkstraRecursive(orderedItems[k],items);
        }
    }
}

function getItem(s,list){
    item = null;
    list.forEach(function(element){
        if(element.s.isEqual(s)){
            item = element;
        }
    });
    return item;
}