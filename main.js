alaram=""
status="";
object=[];
function preload(){
alaram=loadSound("abc.mp3")
}
function setup(){
  canvas=  createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status:detecting object ";
}
function draw(){
image(video,0,0,380,380);
if(status !=""){
  r   =random(255);
  g   =random(255);
  b   =random(255);
  objectDetector.detect(video,gotresult);
  for (i= 0; i<object.length; i++) {
    document.getElementById("status").innerHTML="Status:object detected ";
    document.getElementById("number_objects").innerHTML="number of objects detected are "+object.length;
    fill(r,g,b);
    percent=floor(object[i].confidence*100);
    text(object[i].label+ ' '+percent+'%',object[i].x,object[i].y);
noFill();
stroke(r,g,b);
rect(object[i].x,object[i].y,object[i].width,object[i].height);
 if(object[i].label=="person"){
   alaram.stop();
 }
 else{
   alaram.play();
 }
}  }
}
function modelloaded(){
  console.log("model is on");
  status=true;
  objectDetector.detect(video,gotresult);
}
function gotresult(error,result){
  if(error){
    console.log("ERROR");
  }
  else{
    console.log(result);
    object=result;
  }
}