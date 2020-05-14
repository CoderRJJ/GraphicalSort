const arrayLen=100;
let myArray=[];
let dummyArray=[];
let swapSeqX=[];
let swapSeqY=[];
let canvas, context;
let iter;
const border=40;
let FPS, arraySize, sortType;
let rWidth, rLen, CanvasDrawHeight;
let timerID=setInterval( update, 100 );
let iterMax=0;

timerID = window.setTimeout(update, 1000/FPS);

// Get the values set by the controls
document.getElementById("values").addEventListener("change", updateVars);
document.getElementById("speed").addEventListener("change", updateVars);
document.getElementById("sort").addEventListener("change", updateVars);
document.getElementById("start").onclick = updateVars;
updateVars();

// Initialise a windows resize event
window.addEventListener("resize", updateVars);

// Update function for the bar animation
function update() {
   // if (iter==arraySize) {return;}

    switch(sortType) {
        case 'Bubble'   : Bubble(); break;
        case 'Insertion': Insertion(); break;
        case 'Quick'    : Quick(); break;
        default         : Bubble(); break;
    }
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
function Bubble(){
    for (let i=0; i<arraySize-iter-1; i++) {
        if ( myArray[i] > myArray[i+1] ) {
            let temp = myArray[i];
            myArray[i] = myArray[i+1];
            myArray[i+1] = temp;
        }
    }
}
// Single insertion sort iteration
function Insertion(){
    let key = myArray[iter];
    let i = iter-1;

    while (i >= 0 && myArray[i] > key) { 
        myArray[i + 1] = myArray[i]; 
        i = i - 1; 
    } 
    myArray[i + 1] = key; 
} 
// Single Quick Sort iteration
function Quick() {
    if (iter<iterMax) {
        let temp = myArray[swapSeqX[iter]];
        myArray[swapSeqX[iter]] = myArray[swapSeqY[iter]];
        myArray[swapSeqY[iter]] = temp;
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
    sortType = document.getElementById("sort").value;

// Randomize myArray
    myArray=[];
    for(let i=0; i<arraySize; i++) {
        myArray.push(Math.floor(Math.random()*arrayLen));
    }

    switch(sortType) {
        case 'Bubble'   : iter=0; break;
        case 'Insertion': iter=1; break;
        case 'Quick'    : iter=0; iterMax=0;
                          swapSeqX=[]; swapSeqY=[]; dummyArray=[]; iterMax=0;
                          for (let i=0; i<arraySize; i++) {dummyArray[i]=myArray[i];}
                          dummyArray=makeSeq(dummyArray, 0, arraySize-1 ); 
                          break;
        default         : iter=0; break;
    }
   
    // Initialise the redraw function
    clearInterval(timerID);
    timerID=setInterval( update, 1000/FPS );

// Redo the size variables
    rWidth = (canvas.width)/arraySize;
    rLen = (canvas.height)/arrayLen;
    canvasDrawHeight = canvas.height;
}

function makeSeq( arr, left, right ) {
    if (arr.length > 1) {
        let index = partition(arr, left, right); 
        if (left < index-1) {makeSeq(arr, left, index-1);}
        if(index < right){makeSeq(arr, index, right);}
    }
    return arr;
}
function partition(arr, left, right) {
    let middle=Math.floor((left+right)/2);
    let pivot = arr[middle];
    let i = left;
    let j = right;
    while (i <= j) {
        while(arr[i] < pivot) {i++;}
        while(arr[j] > pivot) {j--;}
    
        if(i <= j) {
            swapSeqX.push(i); swapSeqY.push(j);
            let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            iterMax++;
            i++;
            j--;
        }
    }
    return i;
}