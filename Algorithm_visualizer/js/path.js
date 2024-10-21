
const gridContainer = document.querySelector('.grid_container');
const gridSizeInput = document.getElementById('path_input');
const gridSizeValue = document.getElementById('path_input_value');
const startButton = document.getElementById('start_path');
const dijkstraButton = document.getElementById('dijkastra');
const floodFillButton = document.getElementById('flood_fill');
let data =  `<h2>1.Dijkstra's Algorithm</h2>The first selected cell represents the source point, indicated by <span id="green">green</span>.
<br>
The second selected cell represents the destination point, highlighted in <span id="red">red</span>.
<br>
Any remaining selected cells represent obstacles, colored black.
<br>
After the algorithm runs, the shortest path between the source and destination is highlighted in<span id="yellow"> yellow</span>.
<h2>2.Flood Fill Algorithm Algorithm</h2>
The first selected cell represents the source point, indicated by <span id="green">green</span>.
<br>
Any remaining selected cells represent obstacles, colored black.

`
  


let do_this=1
let isrunning=false
let gridSize = parseInt(gridSizeInput.value);
let startCell = null;
let endCell = null;
let selectedAlgorithm = null; // To keep track of the selected algorithm

// Display the initial grid size
gridSizeValue.textContent = gridSize;

// Update the grid size when the slider is moved
gridSizeInput.addEventListener('input', (event) => {
    if(isrunning){
        alert("algorithm is running......")
        return
    }
    gridSize = parseInt(event.target.value);
    gridSizeValue.textContent = gridSize;
    createGrid(gridSize); // Recreate grid when size changes
});

// Create an n x n grid
function createGrid(n) {
    gridContainer.innerHTML = '';
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    // Generate grid cells
    for (let i = 0; i < n * n; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = i;

        // Add click event to set start, end, or obstacles
        
        cell.addEventListener('click', () => handleCellClick(cell));
        gridContainer.appendChild(cell);
    }
}

// Handle cell click for setting start, end, and obstacles
function handleCellClick(cell) {
    if(isrunning){
        alert("Algorithm Running....")
        return
    }
    if (selectedAlgorithm === 'dijkstra') {
        // Handle setting start and end points for Dijkstra
        if (!startCell) {
            startCell = cell;
            cell.classList.add('start');
        } else if (!endCell && cell !== startCell) {
            endCell = cell;
            cell.classList.add('end');
        } else if (cell !== startCell && cell !== endCell) {
            // Toggle obstacle for other cells
            cell.classList.toggle('obstacle');
        }
    } else if (selectedAlgorithm === 'floodFill') {
        // Handle setting the start point for Flood Fill
        if (!startCell) {
            startCell = cell;
            cell.classList.add('start');
        } else {
            // Toggle obstacle for other cells
            cell.classList.toggle('obstacle');
        }
    }
}
// Define a function that creates the popup
function showPopup(val) {
   if(do_this===0)
    return
    // Create the popup container
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
    popupContainer.style.top='0'
    // Create the popup box
    const popupBox = document.createElement('div');
    popupBox.classList.add('popup-box');

    // Add content to the popup
    popupBox.innerHTML = `
        <p>${val}</p>
        <div class="closePopupBtn">OK</div>
    `;
     
    // Append the popup box to the container
    popupContainer.appendChild(popupBox);

    // Append the container to the body
    document.body.getElementsByClassName("pathcontainer")[0].appendChild(popupContainer);
    const closePopupBtn = document.getElementsByClassName('closePopupBtn')[0];
    closePopupBtn.addEventListener('click', function() {
        popupContainer.style.top='-100vh'
        do_this=0
    });
    
}
// Event listener for Dijkstra button
dijkstraButton.addEventListener('click', () => {
    if(isrunning){
        alert("algorithm is running......")
        return
    }
    showPopup(data)
    selectedAlgorithm = 'dijkstra'; // Set the selected algorithm
    resetGrid(); // Reset visited cells
});

// Event listener for Flood Fill button
floodFillButton.addEventListener('click', () => {
    if(isrunning){
        alert("algorithm is running......")
        return
    }
    showPopup(data)

    selectedAlgorithm = 'floodFill'; // Set the selected algorithm
    resetGrid(); // Reset visited cells
});

// Event listener for the "Start" button
startButton.addEventListener('click', async () => {
    if(isrunning){
        alert("algorithm is running......")
        return
    }
    if (selectedAlgorithm === 'dijkstra') {
        isrunning=true
        await runDijkstra();
       
    } else if (selectedAlgorithm === 'floodFill') {
        isrunning=true
        await runFloodFill();
    } else {
        alert('Please select an algorithm first!');
    }
    isrunning=false
});

// Dijkstra's algorithm to find the shortest path
async function runDijkstra() {
    if (!startCell || !endCell) {
        alert('Please set both start and end points!');
        return;
    }

    const distances = new Map();
    const prev = new Map();
    const queue = [startCell];

    distances.set(startCell, 0);

    while (queue.length > 0) {
        let currentCell = queue.shift();

        // If we reached the end cell
        if (currentCell === endCell) {
            highlightShortestPath(prev);
            return;
        }
    
        for (let [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
            const neighbor = getNeighbor(currentCell, dx, dy);
            
            if (neighbor && !neighbor.classList.contains('visited') && !neighbor.classList.contains('obstacle')) {
                neighbor.classList.add('visited');

                let newDist = (distances.get(currentCell) || 0) + 1;
                if (!distances.has(neighbor) || newDist < distances.get(neighbor)) {
                    distances.set(neighbor, newDist);
                    prev.set(neighbor, currentCell);
                    queue.push(neighbor);
                }

                await sleep(100); // Delay for visualization (100ms)
            }
        }
    }
}

// Highlight the shortest path found by Dijkstra's algorithm
async function highlightShortestPath(prev) {
    let cell = endCell;
    while (cell !== startCell) {
        await sleep(300)
        await playSound("media/swap.mp3")
        cell.classList.add('path');
        cell = prev.get(cell);
    }
    startCell.classList.add('path');
}

// Flood fill using DFS
async function runFloodFill() {
    if (!startCell) {
        alert('Please set a starting point!');
        return;
    }

    await floodFillDFS(startCell);
}

// Flood fill helper function (DFS)
async function floodFillDFS(cell) {
    if (!cell || cell.classList.contains('visited') || cell.classList.contains('obstacle')) {
        return;
    }

    cell.classList.add('visited');
    await sleep(100); // Delay for visualization (100ms)

    for (let [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        const neighbor = getNeighbor(cell, dx, dy);
        await floodFillDFS(neighbor);
    }
}

// Helper function to get neighboring cells
function getNeighbor(cell, dx, dy) {
    const index = parseInt(cell.dataset.index);
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        const neighborIndex = newY * gridSize + newX;
        return document.querySelector(`.grid-cell[data-index='${neighborIndex}']`);
    }
    return null;
}

// Sleep function for async delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Reset the grid by clearing visited and path classes, but keep obstacles
function resetGrid() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.classList.remove('visited', 'path', 'start', 'end');
    });
    startCell = null;
    endCell = null;
}

// Create the initial grid
createGrid(gridSize);
