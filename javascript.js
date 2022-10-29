const boardObject = document.querySelector(".board");
const sizeInput = document.querySelector("#grid-size");

// change grid size whenever grid-size input is changed
let dimension = sizeInput.value;
sizeInput.addEventListener('change', changeGridSize);

// default color button is black
let lastClicked = document.getElementById('black');
initializeBoard(dimension);

// set color mode based on color buttons
const colorButtons = document.querySelectorAll(".color-pick");
setUpColorButtons();

// set up event listeners to implement sketching 
let blockList = document.querySelectorAll(".grid-block");
let mouseDown = false;
setUpGridEventListener();

// implement clear button functionality
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearBoard);


/**
 * Create grid and initialize default color button.
 * @param {number} size   width and height of sketch board
 */
function initializeBoard(size) {
    createGrid(size);
    buttonClicked(lastClicked); // set style for lastClicked
}

/**
 * Create grid of certain size by appending grid block into board.
 * @param {number} size 
 */
function createGrid(size) {
    let gridBlock, rowElement;

    // create grid
    for (let row = 0; row < size; row++) {
        rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let col = 0; col < size; col++) {
            gridBlock = document.createElement('div');
            gridBlock.classList.add('grid-block');
            gridBlock.style.flex = '1 0 0px';
            rowElement.appendChild(gridBlock);
        }
        rowElement.style.flex = '1 0 0px';
        rowElement.style.display = 'flex';   
        boardObject.appendChild(rowElement);
    }
}

/**
 * Set up event listener for color buttons (rainbow, black, color picker, and erase).
 */
function setUpColorButtons() {
    colorButtons.forEach((button) => button.addEventListener('click', (event) => {
        buttonUnclicked(lastClicked);
        lastClicked = button;
        buttonClicked(lastClicked);
        
    }));
}

/**
 * Set up event listeners for grid blocks.
 */
function setUpGridEventListener() {

    //deal with etching through mousedown, mouseover (hover), and mouseup event
    blockList.forEach((block) => {
        block.addEventListener('mousedown', (event) => {
            mouseDown = true;
            event.target.style.backgroundColor = getColor();

        });

        block.addEventListener('mouseover', (event) => {
            if (mouseDown) {
                event.target.style.backgroundColor = getColor();
            }
        });

        block.addEventListener('mouseup', (event) => {
            mouseDown = false;
        });
        /*
        block.addEventListener('mouseenter', (event) => {
            event.target.style.borderWidth = '0.5px';
            event.target.style.borderColor = getRandomColor();
        });

        block.addEventListener('mouseleave', (event) => {
            event.target.style.borderColor = 'transparent';
        });*/

    }
    );
    const container = document.querySelector('body');
    container.addEventListener('mouseup', () => {
    mouseDown = false;
    })

}

/**
 * Remove all children nodes of an element.
 * Source: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
 * @param {node} parent 
 */

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Change grid size by clearing current grid blocks and adding new ones.
 */
function changeGridSize() {
    removeAllChildNodes(boardObject);
    initializeBoard(sizeInput.value);
    lastClicked = document.getElementById('black');

    blockList = document.querySelectorAll(".grid-block");
    setUpGridEventListener();
}

/**
 * Get color based on current color mode. 
 * @returns color for grid block
 */
function getColor() {
    switch (lastClicked.id) {
        case 'black':
            color = 'black';
            break;
        case 'rainbow':
            color = getRandomColor();
            break;
        case 'color-picker':
            color = lastClicked.value;
            break;
        case 'erase':
            color = 'white';
            break;

    }
    return color;
}

/**
 * Change style of button after being clicked.
 * @param {Node} button 
 */

function buttonClicked(button) {
    button.style.borderStyle = 'inset';
    button.style.fontWeight = 'bold';
}

/**
 * Change style of button to be unclicked.
 * @param {Node} button 
 */


function buttonUnclicked(button) {
    button.style.borderStyle = 'solid';
    button.style.fontWeight = 'normal';
}

/**
 * Get a random pastel/light color.
 * @returns random color
 */
function getRandomColor() {
    /* for this random color generator generate colors from 3 R, B, and G values. I only want pastel-ish colors 
    (for aesthetic reason), so by only generating random value from shift to 256, I can avoid the lower RGB values 
    which are associated with darker/bolder colors.*/
    shift = 100;
    var color = 'rgb(';
    for (var i = 0; i < 3; i++) {
      color += Math.floor(shift + Math.random() * (256 - shift));
      if (i != 2) {
        color += ',';
      }
    }
    color += ')';
    return color;
  }
  
  /**
   * Clear color from board.
   */
  function clearBoard() {
    blockList.forEach((block) => block.style.backgroundColor = 'white');
  }