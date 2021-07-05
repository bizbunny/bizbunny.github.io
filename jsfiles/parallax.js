//Get the first element in the document with class="example":
var bg = document.querySelector(".smolbackground");
var rotating = document.querySelector(".rotating");

// Get the current frame's height and width:
var width = window.innerWidth || document.documentElement.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight;

document.addEventListener("mousemove", rotate);

//used to transform variables defined above
var transformLayers = [
  {
    el: rotating,
    parallax: 35,
    rotate: true
  }
]

const bgTranslate = 120; 
const bgRotate = 5;

var hScale = (height+bgTranslate)/height,
    wScale = (width+bgTranslate)/width;
const scale = hScale > wScale ? hScale : wScale;

//function used to rotate stuff in screen
function rotate(e) {
  var lerpX = e.pageX / width,
    offsetX = 0.5 - Math.pow(lerpX, 2), //cursor position X
    lerpY = e.pageY / height,
    offsetY = 0.5 - Math.pow(lerpY, 2); //cursor position Y
  for (var i = 0; i < transformLayers.length; i++) {
    var parallax = transformLayers[i].parallax;

    //transform
    var transform;
    if (transformLayers[i].rotate){
      transform = 
    "rotateX(" +
      -offsetY * parallax +
      "deg) rotateY(" +
      -offsetX * parallax * 2  +
      "deg)";
    }else{
       transform =
      "translate3d(" +
      offsetX * parallax +
      "px, " +
      offsetY * parallax +
      "px, 20px)";
    }
    transformLayers[i].el.style.transform = transform;
  }
  
  //pan backgronud
   var bgTransform =
      "translate3d(" +
      offsetX * bgTranslate +
      "px, " +
      offsetY * bgTranslate +
      "px, 20px) rotateX(" +
      -offsetY * bgRotate +
      "deg) rotateY(" +
      -offsetX * bgRotate  +
      "deg) "+ "scale("+scale+")";
  bg.style.transform = bgTransform;
}


