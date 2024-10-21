# 📊 Sorting Visualizer, Pathfinding Algorithm & Tower of Hanoi Visualizer

Welcome to the **Sorting Visualizer, Pathfinding Algorithm, and Tower of Hanoi Visualizer** project! This web application allows you to visualize various sorting algorithms, pathfinding techniques, the Flood Fill algorithm, and the Tower of Hanoi problem in real-time. Designed to help users explore these algorithms visually, it’s perfect for learning and comparing their behavior interactively.

---

## 🌐 Live Demo

[**Try the App Here!**](https://mohitkumar054-algorithm-visualizer.netlify.app/)  
Explore the visualizers directly in your browser with no installation required!

---

## ✨ Features

- **Sorting Algorithms**
  - Selection Sort
  - Bubble Sort
  - Merge Sort
  - Quick Sort
  - Insertion Sort

- **Pathfinding Algorithms**
  - Dijkstra's Algorithm
  - Flood Fill

- **Puzzle Solver**
  - Tower of Hanoi Visualizer

- **Interactive Visualizations**
  - Color-coded visualization of sorting and pathfinding
  - Visual feedback for each step in real-time
  - Sound effects to enhance the experience

- **Customization Options**
  - Set start and end points for pathfinding
  - Visualize potential paths and the optimal path
  - Customize sorting speed and array size
  - Visualize Tower of Hanoi disk movements step by step

---

## 🧠 Algorithms

### Sorting Algorithms:
1. **Selection Sort**: 
   - Finds the smallest element in the unsorted part of the array and swaps it with the first element of the unsorted portion. It continues shrinking the unsorted section while sorting the array in place.
   - **Time Complexity**: O(n²)

2. **Bubble Sort**: 
   - Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process repeats until no swaps are needed.
   - **Time Complexity**: O(n²)

3. **Merge Sort**: 
   - A divide-and-conquer algorithm that splits the array into smaller sub-arrays, recursively sorts them, and then merges them back together.
   - **Time Complexity**: O(n log n)

4. **Quick Sort**: 
   - A divide-and-conquer algorithm that picks a pivot element, partitions the array around the pivot, and recursively sorts the partitions.
   - **Time Complexity**: O(n log n) (average case)

5. **Insertion Sort**: 
   - Builds the sorted array one element at a time, by picking each element and inserting it into its correct position in the already sorted part.
   - **Time Complexity**: O(n²)

### Pathfinding Algorithms:
1. **Dijkstra's Algorithm**: 
   - A popular algorithm to find the shortest path between nodes in a graph, which may represent road networks. It works by selecting the least costly unvisited node and updating the cost of its neighbors.
   - **Time Complexity**: O(V²) or O(E + V log V) with priority queues.

2. **Flood Fill**: 
   - Used to determine the area connected to a given node in a multi-dimensional array (commonly used in paint bucket tools). The algorithm starts at a node and "fills" all connected nodes in a specific direction until it can't proceed further.
   - **Time Complexity**: O(n), where n is the number of nodes in the region to be filled.

### Puzzle Solver:
1. **Tower of Hanoi**: 
   - A classic problem involving three rods and a number of disks of different sizes. The objective is to move all the disks from the first rod to the third rod, following certain rules. This visualizer demonstrates the step-by-step movement of disks.
   - **Time Complexity**: O(2^n), where n is the number of disks.

---

## 🛠️ Installation

To get started, clone the repository and install the dependencies.

```bash
git clone https://github.com/Mohit5343/Algorithm_visualizer.git
cd sorting-visualizer
npm install
