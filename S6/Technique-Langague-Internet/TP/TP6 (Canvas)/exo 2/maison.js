function maison() {
    var id = document.getElementById("maison");
    var context = id.getContext("2d");
    context.strokeStyle =  "#ffb33c";
    context.lineWidth = 10;
    context.beginPath();
    context.rect(400, 200, 250, 200);
    context.lineTo(300,100);
    context.lineTo(550,100);
    context.lineTo(650,200);
    context.moveTo(300,100);
    context.lineTo(200,200);
    context.lineTo(200,400);
    context.lineTo(400,400);

    //Porte
    context.rect(550, 300, 50, 100);

    //Fenetre carée
    context.rect(440, 300, 50, 50);
    
    //Fenetre ronde
    context.moveTo(300,250);
    context.lineTo(300,190);
    context.moveTo(270,220);
    context.lineTo(330,220);
    context.stroke();  
    context.beginPath();
    context.arc(300, 220, 30, 0, 2 * Math.PI);
    
    context.stroke();
    
    //Arbre
    
    //Tronc
    context.beginPath();
    context.strokeStyle =  "#96600b";
    context.fillStyle =  "#96600b";
    
    context.moveTo(67,400);
    context.lineTo(103,400);
    context.quadraticCurveTo(90, 300, 105, 220);
    context.lineTo(65,220);
    context.quadraticCurveTo(80, 300, 67, 405);
    context.fill();
    
    context.stroke();
    
    //Feuilles
    
    for(i=0; i<100; i++){
        
        h = Math.floor(Math.random() * 200);
        w = Math.floor(Math.random() * 80);
        r = Math.floor(Math.random() * 30);
        ce = Math.floor(Math.random() * 50);
        
        if(i%2){
            color = "#2cd1"+(ce+10);
            context.strokeStyle =  color;
        } else {
            color = "#137c"+(ce+10);
            context.strokeStyle =  color;
        }
        
        context.beginPath();
        context.arc(50+w, 250-h, 25+r, 0, 2 * Math.PI);
        context.stroke();
    }
    
    context.strokeStyle =  "#e21010";
    context.fillStyle = "#e21010";
    
    for(i=0; i<10; i++){
        
        h = Math.floor(Math.random() * 220);
        w = Math.floor(Math.random() * 120);
        
        context.beginPath();
        context.arc(30+w, 270-h, 6, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }
}

maison();