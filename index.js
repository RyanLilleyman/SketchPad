


const DEFAULT_SIZE = 16;
const RANGE_INPUT = document.querySelector('.rangeFinder');
const GRID_VALUE_SIZE = document.querySelector('#gridSizeValue');
const CONTAINER = document.querySelector('#container');
const TOGGLE_GRID = document.querySelector('#gridToggle');

function totalSizeFinder(x){
    return x**2
};


function makeGrid(n, container){
    //style change to make each new grid div take up only a single fractional unit 
    container.style.cssText = `grid-template-columns: repeat(${n},1fr); grid-template-rows: repeat(${n},1fr);`;


    //defines a variable that takes the rangeInput value and squares it, 
    let totalSize = totalSizeFinder(n);

    //used to clear the container div everytime the range slider receives a new input value
    container.innerHTML = '';

    console.log(totalSize);
    //for loop to append a newly created div with the class gridSquare, totalSize times to the container div.
    for(let i = 1; i <= totalSize; i++){
        let gridDiv = document.createElement('div');
        gridDiv.classList.add('gridSquare');
        container.appendChild(gridDiv);
    };
};


function toggleClass(btns, toggle){
    btns.forEach(function(btn){
        btn.classList.toggle(toggle);
    });
};




makeGrid(DEFAULT_SIZE,CONTAINER);

GRID_VALUE_SIZE.innerHTML = RANGE_INPUT.value + ' x ' + RANGE_INPUT.value;
RANGE_INPUT.addEventListener('input', function (e) {
    GRID_VALUE_SIZE.innerHTML = RANGE_INPUT.value + ' x ' + RANGE_INPUT.value;

    console.log(e);
    console.log(RANGE_INPUT.value);

    makeGrid(RANGE_INPUT.value, CONTAINER);

}, false);


TOGGLE_GRID.addEventListener('click', function(e){
    console.log(e);
    let btns = document.querySelectorAll('.gridSquare');
    console.log(btns);
    toggleClass(btns, 'gridSquare-noOutline');
});









