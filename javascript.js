const boardObject = document.querySelector(".board");
const dimension = 14;
let lastClicked = document.getElementById('black');
initializeBoard(dimension);

// set color mode based on color buttons
const colorButtons = document.querySelectorAll(".color-pick");
colorButtons.forEach((button) => button.addEventListener('click', (event) => {
    buttonUnclicked(lastClicked);
    lastClicked = button;
    buttonClicked(lastClicked);
    
}));

const blockList = document.querySelectorAll(".grid-block");
let mouseDown = false;
//deal with etching through mousedown, mouseover (hover), and mouseup event
blockList.forEach((block) => {
        block.addEventListener('mousedown', (event) => {
            mouseDown = true;
            fillColor(event.target);

        });

        block.addEventListener('mouseover', (event) => {
            if (mouseDown) {
                fillColor(event.target);
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


const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearBoard);



function initializeBoard(size) {
    createGrid(size);
    buttonClicked(lastClicked); // set style for lastClicked
}

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


function fillColor(block) {
    block.style.backgroundColor = getColor();
}

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

function buttonClicked(button) {
    button.style.borderStyle = 'inset';
    button.style.fontWeight = 'bold';
}

function buttonUnclicked(button) {
    button.style.borderStyle = 'solid';
    button.style.fontWeight = 'normal';
}


function getRandomColor() {
    // for this random color generator, I only want pastel-ish colors (for aesthetic reason). By only generating random value 
    // from shift to 256, I can avoid the lower RGB values which are associated with darker/bolder colors.
    shift = 160;
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
  
  function clearBoard() {
    blockList.forEach((block) => block.style.backgroundColor = 'white');
  }