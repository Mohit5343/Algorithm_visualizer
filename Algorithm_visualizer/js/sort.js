// Get elements for sliders
const barsInput = document.getElementById("barsInput");
const barsValue = document.getElementById("barsValue");
const barContainer = document.querySelector(".bar_container");
const bars = []; // Array to keep track of bar DOM elements
let arr = [];

let countswap = 0;
let n = parseInt(barsInput.value, 10) || 10;

let speed = 100; // Default speed
let issorting = false;
// Initialize bars
const start = async () => {
  barContainer.innerHTML = "";
  arr = [];
  bars.length = 0; // Clear the bars array

  // Generate bars
  for (let i = 0; i < n; i++) {
    let height = Math.floor(Math.random() * 100) + 1; // Random height between 1 and 100%
    arr.push(height);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${height}%`;
    bar.style.width = `${Math.max(5, 110 - n)}px`;

    barContainer.appendChild(bar);
    bars.push(bar); // Store reference to the bar DOM element
  }
};
barsInput.addEventListener("input", () => {
  if (issorting) {
    alert("Algo is Running....");
    return;
  }
  if (window.innerWidth <= 600) {
    n = parseInt(barsInput.value, 10) || 10; // Update the n variable
    n = Math.max(5, parseInt(n / 5));
  } else {
    n = parseInt(barsInput.value, 10) || 10; // Update the n variable
  }
  barsValue.textContent = n; // Update the displayed number of bars value
  start(); // Regenerate the bars immediately
});

// Update speed in real-time (if you have a speed input)
const speedInput = document.getElementById("speedInput");
const speedValue = document.getElementById("speedValue");

speedInput.addEventListener("input", () => {
  countswap = 0;
  speed = parseInt(speedInput.value, 10) || 100; // Update the speed variable
  speedValue.textContent = speed; // Update the displayed speed value
  speed = 500 - speed;
});
// ------------------------------------------------------------------------------------------------------
const swapBars = async (index1, index2) => {
  countswap++;
  bars[index1].style.backgroundColor = "red";
  bars[index2].style.backgroundColor = "green";
  await new Promise((resolve) => setTimeout(resolve, speed));
  await playSound("media/swap.mp3");

  // Swap heights
  bars[index1].style.height = `${arr[index2]}%`;
  bars[index2].style.height = `${arr[index1]}%`;
  bars[index1].style.backgroundColor = "green";
  bars[index2].style.backgroundColor = "red";

  // Swap array elements
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

  // Add a delay to visualize the swap
  await new Promise((resolve) => setTimeout(resolve, speed));

  // Reset colors after swap
  bars[index1].style.backgroundColor = "#000000";
  bars[index2].style.backgroundColor = "#000000";
};

// Update number of bars (n) in real-time

const bubbleSort = async () => {
  issorting = true;
  let n = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        await swapBars(i, i + 1);
        swapped = true;
      }
    }
    bars[n - 1].style.backgroundColor = "green";
    bars[n - 1].style.transform = "translateY(-10px)";

    await new Promise((resolve) => setTimeout(resolve, 500));
    bars[n - 1].style.transform = "translateY(0px)";

    n--;
  } while (swapped);

  while (n >= 0) {
    bars[n].style.backgroundColor = "green";
    n--;
  }
  if (countswap === 0) alert("Already Sorted");
  else alert(`Total No. of Swap:${countswap}`);
  countswap = 0;
  issorting = false;
};
document.getElementById("bubble").addEventListener("click", () => {
  if (!issorting) {
    if(bars.length==0)
      alert("Please create bars!")
    else
    bubbleSort();
    
  } else alert("ALgorithm is already chosen");
});
// Visualization function for merge
const visualizeMerge = async (start, mid, end) => {
  for (let i = start; i <= end; i++) {
    bars[i].style.backgroundColor = "blue";
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
  for (let i = start; i <= end; i++) {
    bars[i].style.backgroundColor = "#000000";
  }
};

// Merge function
const merge = async (start, mid, end) => {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];

      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    bars[k].style.height = `${arr[k]}%`;
    bars[k].style.backgroundColor = "green";
    await playSound("media/swap.mp3");

    await new Promise((resolve) => setTimeout(resolve, speed));
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = `${arr[k]}%`;
    bars[k].style.backgroundColor = "green";
    await playSound("media/swap.mp3");

    await new Promise((resolve) => setTimeout(resolve, speed));
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = `${arr[k]}%`;
    bars[k].style.backgroundColor = "green";
    await playSound("media/swap.mp3");

    await new Promise((resolve) => setTimeout(resolve, speed));
    j++;
    k++;
  }

  await visualizeMerge(start, mid, end);
};

// Merge sort function
const mergeSort = async (start, end) => {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
};

// Start merge sort
const startMergeSort = async () => {
  issorting = true;
  document.getElementById("merge").classList.add("button_active");
  await mergeSort(0, arr.length - 1);
  document.getElementById("merge").classList.remove("button_active");
  issorting = false;
  
};

// Add event listener for merge sort button
document.getElementById("merge").addEventListener("click", () => {
  if (!issorting) {
    if(bars.length==0){
      alert("Please create bars!")
              return
    }
    else
    startMergeSort();
    
  } else alert("ALgorithm is already chosen");
});

// QUICK SORT***********************************************************************

// Quick Sort
const partition = async (low, high) => {
  let pivot = arr[low];
  bars[low].style.backgroundColor = "yellow";
  let i = low;

  for (let j = low + 1; j <= high; j++) {
    if (arr[j] < pivot) {
      i++;
      await swapBars(i, j);
    }
  }

  await swapBars(low, i);

  return i;
};

const quickSort = async (low, high) => {
  if (low < high) {
    let pi = await partition(low, high);
    bars[pi].style.backgroundColor = "green";
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
};

const startQuickSort = async () => {
  issorting = true;
  document.getElementById("quick").classList.add("button_active");
  await quickSort(0, arr.length - 1);
  document.getElementById("quick").classList.remove("button_active");
  if (countswap === 0) alert("Already Sorted");
  else alert(`Total No. of Swap:${countswap}`);
  countswap = 0;
  issorting = false;
};
document.getElementById("quick").addEventListener("click", () => {
  if (!issorting) {
    if(bars.length==0){
      alert("Please create bars!")
              return
    }
    else
    startQuickSort();
    
  } else alert("ALgorithm is already chosen");
});
// ************************************************************************************************************

// LInearSort********************************************
// Linear Sort
const linearSort = async () => {
  document.getElementById("linear").classList.add("button_active");
  issorting = true;
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      await swapBars(i, minIdx); // Swap and visualize the bars
    }
  }
  if (countswap === 0) alert("Already Sorted");
  else alert(`Total No. of Swap:${countswap}`);
  countswap = 0;
  issorting = false;
};
document.getElementById("linear").addEventListener("click", () => {
  if (!issorting) {
    if(bars.length===0){
      alert("Please create bars!")
        return
    }
    else
    linearSort();
   
  } else alert("ALgorithm is already chosen");
});
// *************************************************************************************************************

// SelectonSort********************************************************************
const selectionSort = async () => {
  issorting = true;
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      await swapBars(i, minIdx); // Swap and visualize the bars
    }
    bars[i].style.backgroundColor = "green";
  }
  bars[n - 1].style.backgroundColor = "green";
  if (countswap === 0) alert("Already Sorted");
  else alert(`Total No. of Swap:${countswap}`);
  countswap = 0;
  issorting = false;
};

document.getElementById("selection").addEventListener("click", () => {
  if (!issorting) {
    if(bars.length==0)
      alert("Please create bars!")
    else
  selectionSort();
   
  } else alert("ALgorithm is already chosen");
});

const reset = () => {
  issorting=false
  barContainer.innerHTML = ""; // Clear the bars
  arr = []; // Clear the array
  bars.length = 0; // Clear the bars array

  // Optionally, you can reset other elements like button states here if needed
};
async function playSound(src) {
  try {
    const sound = new Audio(src); // Create a new audio element
    sound.preload = "auto"; // Preload the audio file
    sound.currentTime = 0; // Reset the sound to the beginning
    await sound.play(); // Play the sound
  } catch (error) {
    console.error("Error playing sound:", error); // Log error if playing fails
  }
}

document.getElementById("reset_sort").addEventListener("click", reset);
