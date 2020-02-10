var cryptomonaies;

function InitOnload(){
    loadDoc();
}

function loadDoc(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            DisplayResult(this.responseText);
        }
    };
    xhttp.open("GET", "cryptomonnaies.json", true);
    xhttp.send();
}

function DisplayResult(objStr){
    
    cryptomonaies = JSON.parse(objStr);
    
    MakeSelect();
}

function MakeSelect(){
    
    obj = cryptomonaies['data'];
    
    select = document.createElement("select");
    select.setAttribute("onchange","OnChangeCrypto(this.value)");
    
    for(i=0;i<obj.length;i++){
        option = document.createElement("option");
        option.value = obj[i]['id'];
        option.innerHTML = obj[i]['name'];
        select.appendChild(option);
    }
    
    document.createElement("p");
    
    document.getElementById("select").appendChild(select);
    
    UpdateContent(1);
    
}

function OnChangeCrypto(value){
    console.log(value);
    UpdateContent(value);
}

function UpdateContent(id){

    var cryptomonaie;
    content = document.getElementById("content");
    
    cryptomonaies['data'].forEach(function(element){
        if(element["id"] == id){
            cryptomonaie = element;
        }
    })
   
    content.innerHTML = "";
    
    line1 = document.createElement("p");
    line1.innerHTML = cryptomonaie["name"] + ", " + cryptomonaie["symbol"] + " (" + cryptomonaie["slug"] + ")";
    content.appendChild(line1);

    line2 = document.createElement("p");
    line2.innerHTML = "Circulating supply : " + cryptomonaie["circulating_supply"] + " - Total supply : " + cryptomonaie["total_supply"] + " - Max supply : " + cryptomonaie["max_supply"];
    content.appendChild(line2);

    line3 = document.createElement("p");
    line3.innerHTML = "Date added : " + FormatDate(cryptomonaie["date_added"]);
    content.appendChild(line3);

    line4 = document.createElement("p");
    line4.innerHTML = "Num market pairs : " + cryptomonaie["num_market_pairs"];
    content.appendChild(line4);
    
    if(cryptomonaie["tags"].length > 0){
        tag = document.createElement("p");
        tag.innerHTML = "Tags : ";
        
        tagList = document.createElement("ul");
        cryptomonaie["tags"].forEach(function(element){
            var t = document.createElement("li");
            t.innerHTML = element;
            tagList.appendChild(t);
        })
        
        content.appendChild(tagList);
    }
    
    
    platform = document.createElement("p");
    if(cryptomonaie["platform"] != null){
        p = cryptomonaie["platform"];
        platform.innerHTML = "Plateform : \n\tId : " + p["id"] + " - Name : " + p["name"] + " - Symbol : " + p["symbol"] + " - Slug : " + p["slug"] + " - Token address : " + p["token_address"];
    } else {
        platform.innerHTML = "Plateform : null";
    }
    content.appendChild(platform);
    
    line5 = document.createElement("p");
    line5.innerHTML = "CMC rank : " + cryptomonaie["cmc_rank"];
    content.appendChild(line5);
    
    line6 = document.createElement("p");
    line6.innerHTML = "Last Updated : " + FormatDate(cryptomonaie["last_updated"]);
    content.appendChild(line6);
    
    cours = document.createElement("p");
    cours.innerHTML = "Cours : " + cryptomonaie["quote"]["EUR"]["price"] + "€";
    content.appendChild(cours);
    
}

function FormatDate(dateU){
    return dateU;
}