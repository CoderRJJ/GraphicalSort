const arraySize=100;
const arrayLen=100;
let myArray=[];
let canvas, context;
const FPS=30;
let iter=0;
const border=40;

// Initialise the redraw function
setInterval( update, 1000/FPS );
// Initialise a windows resize event
window.addEventListener("resize", restart);

// Get the canvas
canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth-border;
canvas.height = window.innerHeight-border;
context = canvas.getContext("2d");
let rWidth = (canvas.width)/arraySize;
let rLen = (canvas.height)/arrayLen;
let canvasDrawHeight = canvas.height;

// Randomize myArray
for(let i=0; i<arraySize; i++) {
    myArray.push(Math.floor(Math.random()*arrayLen));

}

function update() {
    if (iter==arraySize) {return;}
    bubble();
    iter++;

    // Draw the rectangles
    context.fillStyle = "Azure";
    context.fillRect(0,0, canvas.width, canvas.height);
    
    let rStart = 0;
    for(let i=0; i<arraySize; i++) {
        context.fillStyle = "CadetBlue";
        context.fillRect(rStart,canvasDrawHeight-(rLen*myArray[i]), rWidth-1, rLen*myArray[i]);
        rStart += rWidth
    }
}

function bubble(){
    for (let i=0; i<arraySize-iter-1; i++) {
        if ( myArray[i] > myArray[i+1] ) {
            let temp = myArray[i];
            myArray[i] = myArray[i+1];
            myArray[i+1] = temp;
        }
    }
}

function restart() {
    location.reload(); 
}






