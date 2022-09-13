img = "";

status= "";
objects = [];
function preload() {
img = loadImage('k.jpg');
}

function setup() {
canvas = createCanvas(380,380);
canvas.center();

video = createCapture(VIDEO);
video.size(380,380);
video.hide();

object_detector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded() {
console.log("Model is loaded");
status = true;

}

function gotResults(error,results) {
if (error) {
    console.error(error);
}
else{
    console.log(results);
    objects = results;
}
}

function draw() {
image(video,0,0,640,420);
// fill("blue");
// text("Dog",200,45);
// noFill();
// stroke("red");
// rect(125,50,225,350);
// stroke("blue")
// rect(280,330,125,85);
// fill("red");
// text("Bowl",330,325);

// fill("blue");
// text("Cat",350,85);
// noFill();
// stroke("red");
// rect(285,90,275,325);
if(status != ""){

    r = random(255);
    g = random(255);
    b = random(255);
    object_detector.detect(video , gotResults);
    document.getElementById("number_objects").innerHTML = "Number of objects detcted are : "+objects.length;
for (i=0 ; i<objects.length ; i++){
document.getElementById("status").innerHTML = "Staus : Object Detected ";
noFill();
fill(r,g,b);

first = objects[i].confidence;
percentage = first * 100;
final = Math.floor(percentage);

text(objects[i].label+" "+final+"%",objects[i].x+25,objects[i].y+25);
noFill();
stroke(r,g,b);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}

}
}