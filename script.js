// Define the colors for the easy level with descriptions
const easyColors = [
    { color: "#3BA34C", description: "Grass Area" },
    { color: "#5C82B1", description: "Sky Reflection" },
    { color: "#EEA6CA", description: "Flowerbed" },
    { color: "#E4B434", description: "Sunlit Path" },
    { color: "#221512", description: "Park Bench" },
    { color: "#8B295E", description: "Roses" },
    { color: "#9C6C50", description: "Dirt Path" },
    { color: "#5F5C5B", description: "Shadowed Area" },
    { color: "#A38DA8", description: "Stone Pavement" }
  ];
  let selectedColor = null;
  
  // Define hard level color sets with descriptions
  const hardColorSets = [
    [
      { color: "#7E8A2D", description: "Forest Green" },
      { color: "#839147", description: "Mossy Stone" },
      { color: "#627A22", description: "Fern Leaves" },
      { color: "#3E5910", description: "Tree Bark" },
      { color: "#5C6E3A", description: "Olive Shade" },
      { color: "#6F7F41", description: "Green Canopy" },
      { color: "#8B9A63", description: "Lichen Rock" },
      { color: "#9BA977", description: "Dappled Light" },
      { color: "#A9B891", description: "Soft Grass" }
    ],
    [
      { color: "#A55B71", description: "Petal Pink" },
      { color: "#C28699", description: "Blossom Blush" },
      { color: "#AB6B82", description: "Rose Haze" },
      { color: "#945269", description: "Cherry Bloom" },
      { color: "#BC8999", description: "Sunset Rose" },
      { color: "#CA9DA8", description: "Dusty Pink" },
      { color: "#D8B1B7", description: "Soft Plum" },
      { color: "#C295A4", description: "Gentle Blush" },
      { color: "#B1798F", description: "Vintage Pink" }
    ]
    // Add more hard color sets with descriptions if needed
  ];
  
  // Define a placeholder grid and a function to generate puzzles
  const gridSize = 9;
  let currentPuzzle = createPuzzle("easy");
  
  // Function to generate a Sudoku puzzle (simple placeholder logic for now)
  function createPuzzle(difficulty) {
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    return grid;
  }
  
  // Function to render the color picker with descriptions for each color
  function renderColorPicker(colors) {
    const colorPicker = d3.select("#color-picker").html(""); // Clear previous colors
    colorPicker.selectAll("div")
      .data(colors)
      .enter()
      .append("div")
      .attr("class", "color")
      .style("background-color", d => d.color)
      .attr("title", d => d.description) // Add hover description as tooltip
      .attr("draggable", true) // Make colors draggable
      .on("dragstart", function(event, d) {
        selectedColor = d.color;
        event.dataTransfer.setData("color", d.color);
      });
  }
  
  // Function to render the color key
  function renderColorKey(sections) {
    const colorKey = d3.select("#color-key").html(""); // Clear previous key
    colorKey.selectAll("div")
      .data(sections)
      .enter()
      .append("div")
      .attr("class", "key-item")
      .each(function(d) {
        const container = d3.select(this);
        container.append("div")
          .attr("class", "key-color")
          .style("background-color", d.color);
        container.append("span")
          .attr("class", "key-label")
          .text(d.description);
      });
  }
  
  // Function to randomly pick a color set from hardColorSets
  function getRandomHardColorSet() {
    const randomIndex = Math.floor(Math.random() * hardColorSets.length);
    return hardColorSets[randomIndex];
  }
  
  // Render Sudoku Grid
  function renderSudokuGrid(puzzle) {
    const gridContainer = d3.select("#sudoku-grid").html(""); // Clear previous grid
    puzzle.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = gridContainer.append("div")
          .attr("class", "cell")
          .attr("data-row", rowIndex)
          .attr("data-col", colIndex)
          .style("background-color", cell === 0 ? "white" : "#ddd") // Grey background for pre-filled cells
          .on("dragover", function(event) {
            event.preventDefault(); // Allow drop
          })
          .on("drop", function(event) {
            const draggedColor = event.dataTransfer.getData("color");
            d3.select(this).style("background-color", draggedColor);
          });
      });
    });
  }
  
  // Difficulty Buttons: Only "easy" and "hard"
  d3.select("#difficulty-buttons")
    .selectAll("button")
    .data(["easy", "hard"])
    .enter()
    .append("button")
    .text(d => d.charAt(0).toUpperCase() + d.slice(1))
    .on("click", function(event, difficulty) {
      currentPuzzle = createPuzzle(difficulty);
      renderSudokuGrid(currentPuzzle);
  
      // Set color scheme based on difficulty level
      if (difficulty === "easy") {
        renderColorPicker(easyColors); // Use easy colors
        renderColorKey(easyColors); // Show color key for easy colors
      } else {
        const hardColors = getRandomHardColorSet(); // Pick random hard color set
        renderColorPicker(hardColors);
        renderColorKey(hardColors); // Show color key for selected hard colors
      }
    });
  
  // Initial Render of Sudoku Grid and Easy Colors
  renderColorPicker(easyColors);
  renderColorKey(easyColors); // Show initial color key for easy colors
  renderSudokuGrid(currentPuzzle);
  