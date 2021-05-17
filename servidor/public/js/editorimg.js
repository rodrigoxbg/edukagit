//const socket = io();

const uploadedImageDiv = document.getElementById("uploadedImage");
const fileUpload = document.getElementById("fileUpload");
fileUpload.addEventListener("change", getImage, false);
let cropper = null;
const cropButton = document.getElementById("cropButton");
cropButton.addEventListener("click", cropImage);
let myGreatImage = null;
//const croppedImage = document.getElementById("croppedImage");
const miimagen = document.getElementById("imagenperf");
const btnsube = document.getElementById("btnsubir");
const btncancelar = document.getElementById("btncancela");

function getImage() {
  const imageToProcess = this.files[0];
  let newImg = new Image(500, 370);
  /*let newImg = new Image(imageToProcess.width, imageToProcess.height);*/
  newImg.src = imageToProcess;
  newImg.src = URL.createObjectURL(imageToProcess);
  newImg.id = "myGreatImage";
  uploadedImageDiv.appendChild(newImg);
  myGreatImage = document.getElementById("myGreatImage");
  cropButton.className='btn btn-success btn-block btn-sm text-white';
  btnsube.disabled =true;
  btncancelar.hidden = false;
  processImage();
}

function processImage() {
 
  cropper = new Cropper(myGreatImage, {    
    viewMode:0,  // **** 0, 1, 2, 3  es acerca dela imagen que tanto se puede alejar o acercar
    dragMode: 'none', //*** importante para no dibujar // 'crop', 'move' or 'none'        
    //initialAspectRatio: NaN, // The initial aspect ratio of the crop box        
    aspectRatio: 1,//**The aspect ratio of the crop box, el que me genera el cuadrado perfecto
    data: null,// An object with the previous cropping result data       
    preview: '', // A selector for adding extra containers to preview        
    modal: true,// **Show the black modal, es la parte oscura del recorte        
    guides: false,//**Show the dashed lines for guiding, es del cuadro recortador        
    center: true,// Show the center indicator for guiding        
    highlight: true,// Show the white modal to highlight the crop box        
    background: false,//***Show the grid background, es la parte de atras         
    autoCrop: true,// Enable to crop the image automatically when initialize     
    autoCropArea: 0.1,//0.1,//****Define the percentage of automatic cropping area when initializes      
    movable: true, // Enable to move the image        
    rotatable: true, // Enable to rotate the image        
    scalable: true, // Enable to scale the image        
    zoomable: false, // true Enable to zoom the image        
    zoomOnTouch: true,// Enable to zoom the image by dragging touch        
    zoomOnWheel: true,// Enable to zoom the image by wheeling mouse        
    wheelZoomRatio: 0.1,// Define zoom ratio when zoom the image by wheeling mouse        
    cropBoxMovable: true,// ***Enable to move the crop box
    // Enable to resize the crop box
    cropBoxResizable: true, //*****falso  para el tamaño del cortador
    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,
    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 150,
    minCropBoxHeight: 150,
    minContainerWidth: 50,
    minContainerHeight: 50, 
    // Shortcuts of events
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null,
    crop(event) {
      const canvas = this.cropper.getCroppedCanvas();
      //croppedImage.src = canvas.toDataURL("image/png");
      miimagen.src = canvas.toDataURL("image/png");
    }
  });
}

async function cropImage() {  
  const imgurl = cropper.getCroppedCanvas().toDataURL();  
  function toDataURL(src, callback) {
    var image = new Image();
    image.crossOrigin = 'Anonymous'; 
    image.onload = function() {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.height = 150; // para modificar tamaño imagen 
        canvas.width = 150; // para modificar tamaño imagen 
        context.drawImage(this, 0, 0, 150,150); // para modificar tamaño imagen 
        var dataURL = canvas.toDataURL('image/jpeg');
        callback(dataURL);
    };
    image.src = src;
  }
  toDataURL(imgurl, async function(dataURL) {
      var URLactual = window.location.pathname; 
      const database64img = dataURL;
      var block = database64img.split(";");
      var contentType = block[0].split(":")[1];
      var realData = block[1].split(",")[1];
      valorimg={contentType,realData,URLactual};
      console.log(valorimg)
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            const options = {
                method : 'POST',
                headers :{'Content-Type': 'application/json'},
                body: JSON.stringify(valorimg)
                };
            const preimg = await fetch('/subeimgperfil',options); // Esperamos a que haga fetch
            const respuesta = await preimg.json(); // Aquí está la respuesta desde el servidor
            if(respuesta.status == 'correcto'){
                window.open('/','_self')
            } // Cierra el IF de la respuesta de FETCH a la lista
            else{
                alert('Algo ha fallado')
            } // Cierra condicional general*/
      //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  });
}

