const arrayLen=100;
let myArray=[];
let canvas, context;
let iter;
const border=40;
let FPS;
let arraySize;
let rWidth, rLen, CanvasDrawHeight;
let timerID=setInterval( update, 100 );

timerID = window.setTimeout(update, 1000/FPS);

// Get the values set by the controls
document.getElementById("values").addEventListener("change", updateVars);
document.getElementById("speed").addEventListener("change", updateVars);
document.getElementById("start").onclick = updateVars;
updateVars();

// Initialise a windows resize event
window.addEventListener("resize", updateVars);


// Update function for the bar animation
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

// Single bubble sort iteration
function bubble(){
    for (let i=0; i<arraySize-iter-1; i++) {
        if ( myArray[i] > myArray[i+1] ) {
            let temp = myArray[i];
            myArray[i] = myArray[i+1];
            myArray[i+1] = temp;
        }
    }
}

// Update variables
function updateVars() {
// Get the canvas
    canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth-border;
    canvas.height = window.innerHeight-border;
    context = canvas.getContext("2d");
// Get the new variables
    arraySize = document.getElementById("values").value;
    FPS = document.getElementById("speed").value;
    iter=0;
// Randomize myArray
    myArray=[];
    for(let i=0; i<arraySize; i++) {
        myArray.push(Math.floor(Math.random()*arrayLen));
    }
// Initialise the redraw function
    clearInterval(timerID);
    timerID=setInterval( update, 1000/FPS );

// Redo the size variables
    rWidth = (canvas.width)/arraySize;
    rLen = (canvas.height)/arrayLen;
    canvasDrawHeight = canvas.height;

}




