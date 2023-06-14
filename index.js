
//constant definitions
const DEFAULT_COLOR = '#000000';
const DEFAULT_SIZE = 16;
const RANGE_INPUT = document.querySelector('.rangeFinder');
const GRID_VALUE_SIZE = document.querySelector('#gridSizeValue');
const CONTAINER = document.querySelector('#container');
const TOGGLE_GRID = document.querySelector('#gridToggle');
const COLOR_WHEEL = document.querySelector('#color');
const COLOR_MODE = document.querySelector('#colorMode');
const SPACE_MODE = document.querySelector('#space');
const LIGHTEN = document.querySelector('#lighten');
const DARKEN = document.querySelector('#darken');
const ERASER = document.querySelector('#eraser');
const CLEAR = document.querySelector('#clear');
const MODE_LIST = [COLOR_MODE,SPACE_MODE,LIGHTEN,DARKEN,ERASER];

//making container never draggable
CONTAINER.draggable = false;

 //flag for mousedown
 var isMouseDown = false;


 //object of mode flags
 var modeFlagList = {
    'is_colorMode':false,
    'is_spaceMode':false,
    'is_eraserMode':false,
    'is_darkenMode':false,
    'is_lightenMode':false
 };

 //space color list
 var colorList = [
    "#081020","#150E1A",
    "#020306","#050914",
    "#08090C",'#050914',
    "#715D7C","#0E090B",
    "#15070A","#070406",
    "#050914","#150E1A",
    "#29101A","#020306",
    "#20090C","#FEEA49",
    "#080707","#070406",
 ];

 for(let flag in modeFlagList){
    modeFlagList[flag] = false;
 };


 for(let flag in modeFlagList){
    console.log(flag, modeFlagList[flag])
 };

function setFalseFlags(exclude, object){
    for(let flag in object){
        if(flag !== exclude){
            object[flag] = false;
        };
    };
};

var usedColor = '';

//console log mode list to make sure they are all there
console.log(MODE_LIST);

//finds total square grid size
function totalSizeFinder(x){
    return x**2;
};


//makes grid and initializes event listeners in the gridspace
function makeGrid(n, container){
    //style change to make each new grid div take up only a single fractional unit 
    container.style.cssText = `grid-template-columns: repeat(${n},1fr); grid-template-rows: repeat(${n},1fr);`;

    //defines a variable that takes the rangeInput value and squares it, 
    let totalSize = totalSizeFinder(n);

    //used to clear the container div every time the range slider receives a new input value
    container.innerHTML = '';

    console.log(totalSize);
    //for loop to append a newly created div with the class gridSquare, totalSize times to the container div.
    for(let i = 1; i <= totalSize; i++){
        let gridDiv = document.createElement('div');
        gridDiv.classList.add('gridSquare');
        gridDiv.draggable = false;
        container.appendChild(gridDiv);
    };
};


//functions for event handling
function mouseDown(e){
    e.preventDefault();
    setTimeout(() => {
        isMouseDown = true;
    }, 0);
    if (e.target.matches('.gridSquare')){
        e.target.style.backgroundColor = usedColor;
    };
};

function mouseUp(){
    isMouseDown = false;
};

function mouseLeave(){
    isMouseDown = false;
};

function mouseMove(e){
    if(isMouseDown && e.target.matches('.gridSquare')){
        e.target.style.backgroundColor = usedColor;
    }; 
};

function callRandomizer(e){
    randomizer();
}

function randomizer(){
    usedColor = colorList[Math.floor(Math.random() * colorList.length)];
};

function addRandomizer(){
    document.addEventListener('mousemove', callRandomizer);
};

function removeRandomizer(){
    document.removeEventListener('mousemove', callRandomizer);
};


//event adders and removers
function paint(){

    //event listener added to container and listens for mousedown then sets the flag to true
    CONTAINER.addEventListener('mousedown', mouseDown);

    //another event listener added to window that listens for mouseup and makes flag false
    window.addEventListener('mouseup', mouseUp);

    //add event listener for mouseleave event in case mouse leaves the container while painting
    CONTAINER.addEventListener('mouseleave', mouseLeave);

    //add a single event listener for mousemove on the container
    CONTAINER.addEventListener('mousemove', mouseMove);

};


function stopPaint(){
    //event listener added to container and listens for mousedown then sets the flag to true
    CONTAINER.removeEventListener('mousedown', mouseDown);

    //another event listener added to window that listens for mouseup and makes flag false
    window.removeEventListener('mouseup', mouseUp);

    //add event listener for mouseleave event in case mouse leaves the container while painting
    CONTAINER.removeEventListener('mouseleave', mouseLeave);

    //add a single event listener for mousemove on the container
    CONTAINER.removeEventListener('mousemove', mouseMove);
};


function adjustLightness(rgbColor, percent) {
    // Parse the individual red, green, and blue color values
    var [r, g, b] = rgbColor.match(/\d+/g).map(Number);
  
    // Adjust the lightness by the specified percentage for each color channel
    r = Math.min(Math.max(r + (percent * 255 / 100), 0), 255);
    g = Math.min(Math.max(g + (percent * 255 / 100), 0), 255);
    b = Math.min(Math.max(b + (percent * 255 / 100), 0), 255);
  
    // Return the updated color as an RGB string
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}
  
var lightenTimeout = null;

function mouseDownLighten(e){
    e.preventDefault();
    setTimeout(() => {
        isMouseDown = true;
    }, 0);
    if (e.target.matches('.gridSquare')){
        clearTimeout(lightenTimeout);
        lightenTimeout = setTimeout(() => {
            var currentColor = window.getComputedStyle(e.target).backgroundColor;
            var cssColor = adjustLightness(currentColor, 10);
            e.target.style.backgroundColor = cssColor;
        }, 100);
    };
};



function mouseMoveLighten(e) {
    e.preventDefault();
    if (isMouseDown && e.target.matches('.gridSquare')) {
        clearTimeout(lightenTimeout);
        lightenTimeout = setTimeout(() => {
            var currentColor = window.getComputedStyle(e.target).backgroundColor;
            var cssColor = adjustLightness(currentColor, 10);
            e.target.style.backgroundColor = cssColor;
        }, 10); // Delay of 100 milliseconds
    };
};

function lighten(){
    //event listener added to container and listens for mousedown then sets the flag to true
    CONTAINER.addEventListener('mousedown', mouseDownLighten);

    //another event listener added to window that listens for mouseup and makes flag false
    window.addEventListener('mouseup', mouseUp);

    //add event listener for mouseleave event in case mouse leaves the container while painting
    CONTAINER.addEventListener('mouseleave', mouseLeave);

    //add a single event listener for mousemove on the container
    CONTAINER.addEventListener('mousemove', mouseMoveLighten);
};

function stopLighten(){
    //event listener added to container and listens for mousedown then sets the flag to true
    CONTAINER.removeEventListener('mousedown', mouseDownLighten);

    //another event listener added to window that listens for mouseup and makes flag false
    window.removeEventListener('mouseup', mouseUp);

    //add event listener for mouseleave event in case mouse leaves the container while painting
    CONTAINER.removeEventListener('mouseleave', mouseLeave);

    //add a single event listener for mousemove on the container
    CONTAINER.removeEventListener('mousemove', mouseMoveLighten);
};


function adjustDarkness(rgbColor, percent){
    // Parse the individual red, green, and blue color values
    var [r, g, b] = rgbColor.match(/\d+/g).map(Number);
  
    // Adjust the lightness by the specified percentage for each color channel
    r = Math.min(Math.max(r - (percent * 255 / 100), 0), 255);
    g = Math.min(Math.max(g - (percent * 255 / 100), 0), 255);
    b = Math.min(Math.max(b - (percent * 255 / 100), 0), 255);
  
    // Return the updated color as an RGB string
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function mouseDownDarken(e){
    e.preventDefault();
    setTimeout(() => {
        isMouseDown = true;
    }, 0);
    if (e.target.matches('.gridSquare')){
        clearTimeout(lightenTimeout);
        lightenTimeout = setTimeout(() => {
            var currentColor = window.getComputedStyle(e.target).backgroundColor;
            var cssColor = adjustDarkness(currentColor, 10);
            e.target.style.backgroundColor = cssColor;
        }, 10);
    };
};



function mouseMoveDarken(e) {
    e.preventDefault();
    if (isMouseDown && e.target.matches('.gridSquare')) {
        clearTimeout(lightenTimeout);
        lightenTimeout = setTimeout(() => {
            var currentColor = window.getComputedStyle(e.target).backgroundColor;
            var cssColor = adjustDarkness(currentColor, 10);
            e.target.style.backgroundColor = cssColor;
        }, 10); 
    };
};


function darken(){
    //event listener added to container and listens for mousedown then sets the flag to true
    CONTAINER.addEventListener('mousedown', mouseDownDarken);

    //another event listener added to window that listens for mouseup and makes flag false
    window.addEventListener('mouseup', mouseUp);

    //add event listener for mouseleave event in case mouse leaves the container while painting
    CONTAINER.addEventListener('mouseleave', mouseLeave);

    //add a single event listener for mousemove on the container
    CONTAINER.addEventListener('mousemove', mouseMoveDarken);
};

function removeDarken(){
    //event listener added to container and listens for mousedown then sets the flag to true
    CONTAINER.removeEventListener('mousedown', mouseDownDarken);

    //another event listener added to window that listens for mouseup and makes flag false
    window.removeEventListener('mouseup', mouseUp);

    //add event listener for mouseleave event in case mouse leaves the container while painting
    CONTAINER.removeEventListener('mouseleave', mouseLeave);

    //add a single event listener for mousemove on the container
    CONTAINER.removeEventListener('mousemove', mouseMoveDarken);
};


//toggles classes for a nodelist
function toggleClassBtns(btns, toggle){
    btns.forEach(function(btn){
        btn.classList.toggle(toggle);
    });
};

//removes class from a nodelist
function removeClass(btns, remove){
    btns.forEach(function(btn){
        btn.classList.remove(remove)
    });
};


//function to create another Mode list with removed list item 
function removeMode(remove, list){
    var newModeList = [];

    for(var i = 0; i <= list.length-1; ++i){
        if(remove !== list[i]){
            newModeList.push(list[i]);
        };
    };

    return newModeList;
};

//sets false flags
function setFalseFlags(exclude, object){
    for(let flag in object){
        if(flag !== exclude){
            object[flag] = false;
        };
    };
};


//make initial grid space
makeGrid(DEFAULT_SIZE,CONTAINER);


//make dynamic gridspace depending on the range input and also displays that input inside the html
GRID_VALUE_SIZE.innerHTML = RANGE_INPUT.value + ' x ' + RANGE_INPUT.value;
RANGE_INPUT.addEventListener('input', function (e) {
    GRID_VALUE_SIZE.innerHTML = RANGE_INPUT.value + ' x ' + RANGE_INPUT.value;


    let gridToggleButton = document.querySelector('#gridToggle');
    gridToggleButton.classList.remove('buttonActivate')

    console.log(e);
    console.log(RANGE_INPUT.value);

    makeGrid(RANGE_INPUT.value, CONTAINER);

}, false);


//toggles grid button style and the outline for the entire grid
TOGGLE_GRID.addEventListener('click', function(e){

    let btns = document.querySelectorAll('.gridSquare');
    toggleClassBtns(btns, 'gridSquare-noOutline');

    let gridToggleButton = document.querySelector('#gridToggle');
    gridToggleButton.classList.toggle('buttonActivate')
    
});


//event listener to check input change of the color wheel and display it to the console
COLOR_WHEEL.addEventListener('input',function(e){
    console.log(COLOR_WHEEL.value);
    if(modeFlagList.is_colorMode){
        usedColor = COLOR_WHEEL.value;
    }
});


//toggles the class off for rest of mode list, adds the styling for the color mode once active
COLOR_MODE.addEventListener('click', function(e){
    removeDarken();
    stopLighten();
    removeRandomizer();
    removeClass(removeMode(COLOR_MODE,MODE_LIST),'buttonActivate');
    setFalseFlags('is_colorMode', modeFlagList);
    COLOR_MODE.classList.toggle('buttonActivate');
    e.preventDefault();
    COLOR_MODE.draggable = false;
    
    usedColor = COLOR_WHEEL.value;
    modeFlagList.is_colorMode = !modeFlagList.is_colorMode;
    if(modeFlagList.is_colorMode){
        paint();
    }else{
        stopPaint();
    }
});





SPACE_MODE.addEventListener('click', function(e){
    removeDarken();
    stopLighten();
    removeClass(removeMode(SPACE_MODE,MODE_LIST),'buttonActivate');
    setFalseFlags('is_spaceMode', modeFlagList);
    SPACE_MODE.classList.toggle('buttonActivate');
    e.preventDefault();
    SPACE_MODE.draggable = false;

    modeFlagList.is_spaceMode = !modeFlagList.is_spaceMode;
    if(modeFlagList.is_spaceMode){
        addRandomizer();
        paint();
    }else{
        stopPaint();
        removeRandomizer();
    }
    
});



LIGHTEN.addEventListener('click', function(e){
    stopPaint();
    removeDarken();
    removeRandomizer();
    setFalseFlags('is_lightenMode', modeFlagList);
    removeClass(removeMode(LIGHTEN,MODE_LIST),'buttonActivate');
    LIGHTEN.classList.toggle('buttonActivate');
    e.preventDefault();
    LIGHTEN.draggable = false;

    modeFlagList.is_lightenMode = !modeFlagList.is_lightenMode;
    if(modeFlagList.is_lightenMode){
        lighten();
    }else{
        stopLighten();
    }
});


DARKEN.addEventListener('click', function(e){
    stopPaint();
    stopLighten();
    removeRandomizer();
    removeClass(removeMode(DARKEN,MODE_LIST),'buttonActivate');
    setFalseFlags('is_darkenMode', modeFlagList);
    DARKEN.classList.toggle('buttonActivate');
    e.preventDefault();
    DARKEN.draggable = false;

    modeFlagList.is_darkenMode = !modeFlagList.is_darkenMode;
    if(modeFlagList.is_darkenMode){
        darken();
    }else{
        removeDarken();
    }

});



ERASER.addEventListener('click', function(e){
    removeDarken();
    stopLighten();
    removeRandomizer();
    removeClass(removeMode(ERASER,MODE_LIST),'buttonActivate');
    setFalseFlags('is_eraserMode', modeFlagList);
    ERASER.classList.toggle('buttonActivate');
    e.preventDefault();
    ERASER.draggable = false;
    
    modeFlagList.is_eraserMode = !modeFlagList.is_eraserMode;
    if(modeFlagList.is_eraserMode){
        usedColor = '#ffffff';
        paint();
    }else{
        stopPaint();
    }

});

CLEAR.addEventListener('click', function(e){
    let gridToggleButton = document.querySelector('#gridToggle');
    gridToggleButton.classList.remove('buttonActivate')
    makeGrid(RANGE_INPUT.value, CONTAINER);
});











