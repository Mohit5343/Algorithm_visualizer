// script.js

const rod1 = document.getElementById("rod1");
const rod2 = document.getElementById("rod2");
const rod3 = document.getElementById("rod3");
const startBtn = document.getElementById("starttoh");
const resetBtn = document.getElementById("resettoh");
const Input = document.getElementById("tohinput");
const InputValue = document.getElementById("tohinputvalue");
const speedinput = document.getElementById("speedtoh");
const speedvalue = document.getElementById("speedtohvalue");
let swap = 0;
let toh_running = false;
let isreset = false;
// Initialize values
let moves = [];
let N = parseInt(Input.value, 10) || 3; // Default to 3 if input is not valid
let discs = [];
let sp = 50;
let abort_signal = false;
// Update number of discs in real-time
Input.addEventListener("input", () => {
  if (toh_running) {
    alert("Animation is running.....");
    return;
  }
  N = parseInt(Input.value, 10) || 3; // Update number of discs
  InputValue.textContent = N;
  createDiscs(); // Re-create discs with updated number
});
speedinput.addEventListener("input", () => {
  sp = parseInt(speedinput.value, 10) || 30; // Update number of discs
  speedvalue.textContent = sp;
  sp = 500 - sp;
});

// Function to create initial discs on the first rod
function createDiscs() {
  document.getElementsByClassName("moves_card")[0].style.left = "-500px";

  abort_signal = false;
  // Clear all rods
  rod1.innerHTML = "";
  rod2.innerHTML = "";
  rod3.innerHTML = "";

  discs = []; // Reset the discs array

  // Create discs and append them to the first rod
  for (let i = N; i > 0; i--) {
    const disc = document.createElement("div");
    disc.classList.add("disc");
    if (window.innerWidth <= 600) {
      disc.style.width = `${10 + i * 10}px`; // Vary disc width for visual effect
      disc.style.height = "10px"; // Vary disc width for visual effect
    } else {
      disc.style.width = `${20 + i * 20}px`; // Vary disc width for visual effect
    }
    disc.dataset.size = i; // Store the size of the disc for reference
    rod1.appendChild(disc);
    discs.push(disc);
  }
}

// Recursive function to solve the Tower of Hanoi
async function moveDiscs(N, fromRod, auxRod, toRod) {
  if (N === 0) return;
  if (abort_signal) return;
  // Move n-1 discs from 'fromRod' to 'auxRod' using 'toRod' as auxiliary
  await moveDiscs(N - 1, fromRod, toRod, auxRod);

  // Move the nth disc from 'fromRod' to 'toRod'
  await moveDisc(fromRod, toRod);

  // Move n-1 discs from 'auxRod' to 'toRod' using 'fromRod' as auxiliary
  await moveDiscs(N - 1, auxRod, fromRod, toRod);
}

// Function to move a single disc
async function moveDisc(fromRod, toRod) {
  moves.push([fromRod.dataset.value, toRod.dataset.value]);
  swap++;
  const disc = fromRod.lastElementChild; // Select the topmost disc

  if (!disc) return;
  if (abort_signal) return;

  // Highlight the disc being moved
  disc.style.background = "red";
  await new Promise((resolve) => setTimeout(resolve, 300));
  playSound("media/swap.mp3");
  // Move disc to the new rod
  toRod.appendChild(disc);

  // Play sound

  // Add a small delay to visualize the movement
  await new Promise((resolve) => setTimeout(resolve, sp));

  // Revert disc color
  disc.style.background = "#523500";
}

// Event listener for the start button
startBtn.addEventListener("click", async () => {
  if(toh_running) {
    alert("Animation is running.....")
    return
  }
  document.getElementsByClassName("moves_card")[0].style.left = "-500px";

  moves = [];
  document.getElementsByClassName("moves_card")[0].innerHTML=''
  if (discs.length === 0) {
    alert("Please select No of discs!");
    return;
  }

  isreset = false;
  toh_running = true;
  await moveDiscs(N, rod1, rod2, rod3); // Start the visualization
  
  //add data of moves
  moves.forEach((val) => {
    let newelement = document.createElement("div");
    newelement.innerHTML = `${val[0]} to ${val[1]}`;

    if(window.innerWidth<=600){
      newelement.style.fontSize="1rem"
    }

    document.getElementsByClassName("moves_card")[0].appendChild(newelement);
  });
  let newelementswap = document.createElement("div");
  newelementswap.innerHTML = `No of Discs=${discs.length}  and Total Moves=${swap}`;
  newelementswap.style.color='red'
  document.getElementsByClassName("moves_card")[0].appendChild(newelementswap);
  
  document.getElementsByClassName("moves_card")[0].style.left = "0px";
  let goback=document.createElement("button")
  goback.innerHTML="<-BACK"
  
  goback.style.width="100%"
  goback.style.marginTop="10px"
  document.getElementsByClassName("moves_card")[0].appendChild(goback);
  goback.addEventListener("click",()=>{
  document.getElementsByClassName("moves_card")[0].style.left = "-500px";

  })
  swap = 0;
  toh_running = false;
});
resetBtn.addEventListener("click", () => {
  document.getElementsByClassName("moves_card")[0].style.left = "-500px";
  
  isreset = true;
  abort_signal = true;
  rod1.innerHTML = "";
  rod2.innerHTML = "";
  rod3.innerHTML = "";
  moves = [];
  discs = []; // Reset the discs array
});


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
