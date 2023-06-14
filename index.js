
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
const MODE_LIST = [COLOR_MODE,SPACE_MODE,LIGHTEN,DARKEN,ERASER];

//making container never draggable
CONTAINER.draggable = false;

 //flag for mousedown
 var isMouseDown = false;


 //object of mode flags
 var modeFlagList = {
    'is_colorMode':false,
    'is_spaceMode':false,
 }

 for(let flag in modeFlagList){
    modeFlagList[flag] = false;
 }

 for(let flag in modeFlagList){
    console.log(flag, modeFlagList[flag])
 }


 //newColor
 var newColor = '';

//console log mode list to make sure they are all there
console.log(MODE_LIST);

//finds total square grid size
function totalSizeFinder(x){
    return x**2
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
        e.target.style.backgroundColor = newColor;
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
        e.target.style.backgroundColor = newColor;
    }; 
}


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


function setFalseList(list){
    for(var i = 0; i<= list.length-1; ++i){
        list[i] = false;
        console.log("list contents", list[i])
    }
}


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
    newColor = COLOR_WHEEL.value;
});


//toggles the class off for rest of mode list, adds the styling for the color mode once active
COLOR_MODE.addEventListener('click', function(e){
    removeClass(removeMode(COLOR_MODE,MODE_LIST),'buttonActivate');

    COLOR_MODE.classList.toggle('buttonActivate');
    e.preventDefault();
    COLOR_MODE.draggable = false;
    newColor = COLOR_WHEEL.value;

    console.log("iscoloemodeBefore",modeFlagList.is_colorMode);
    modeFlagList.is_colorMode = !modeFlagList.is_colorMode;
    console.log("iscoloemodeAfter",modeFlagList.is_colorMode);

    if(modeFlagList.is_colorMode){
        paint();
    }else{
        stopPaint();
    }
    
});



SPACE_MODE.addEventListener('click', function(e){
    removeClass(removeMode(SPACE_MODE,MODE_LIST),'buttonActivate');
    SPACE_MODE.classList.toggle('buttonActivate');
    e.preventDefault();
    SPACE_MODE.draggable = false;
    newColor = '#ff2929';
    console.log("iscoloemodew/before",is_colorMode);
    is_spaceMode = !is_spaceMode;
    console.log("iscoloemodew/After",is_colorMode);
    if(is_spaceMode){
        paint();
    }else{
        stopPaint();
    }
    console.log(e);
    console.log(is_spaceMode);
});



LIGHTEN.addEventListener('click', function(e){
    removeClass(removeMode(LIGHTEN,MODE_LIST),'buttonActivate');
    LIGHTEN.classList.toggle('buttonActivate');
});

DARKEN.addEventListener('click', function(e){
    removeClass(removeMode(DARKEN,MODE_LIST),'buttonActivate');
    DARKEN.classList.toggle('buttonActivate');
});

ERASER.addEventListener('click', function(e){
    removeClass(removeMode(ERASER,MODE_LIST),'buttonActivate');
    ERASER.classList.toggle('buttonActivate');
});











