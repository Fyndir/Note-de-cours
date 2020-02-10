var id = document.getElementById("imageData");
var context = id.getContext("2d");
var img = new Image();
img.src = "800px-Detailaufnahme_Weihnachtsstern_-_groß.bmp";
img.onload = function() {
  context.drawImage(img, 0, 0, id.width, id.height);
}

function imageData(r, g, b) {
  context.clearRect(0, 0, id.width, id.height)
  context.drawImage(img, 0, 0, id.width, id.height);
  var data = context.getImageData(0, 0, id.width, id.height);
  for(i=0; i< data.data.length; i+=4)
    if(data.data[i] > r - 20  && data.data[i] < r + 20 &&
       data.data[i+1] > g - 20 && data.data[i + 1] < g + 20 &&
       data.data[i+2] > b - 20 && data.data[i + 1] < b + 20) {
      data.data[i]=0;
      data.data[i+1]=0;
      data.data[i+2]=0;
    }
  context.putImageData(data, 0, 0);
}


function imageCouleur() {
  var input = document.getElementById("couleur");
  var r = parseInt(input.value.substr(1,2), 16);
  var g = parseInt(input.value.substr(3,2), 16);
  var b = parseInt(input.value.substr(5,2), 16);
  imageData(r, g, b);
}