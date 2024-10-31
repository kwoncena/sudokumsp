document.addEventListener("DOMContentLoaded", () => {
    const colors = document.querySelectorAll(".color");
    const gridCells = document.querySelectorAll(".main-grid-cell");
    const deleteButton = document.getElementById("btn-delete");
    let selectedColor = null;

    // Set selected color when a color is clicked
    colors.forEach(color => {
        color.addEventListener("click", () => {
            selectedColor = color.style.backgroundColor;
        });
    });

    // Apply selected color to grid cell on click
    gridCells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (selectedColor) {
                cell.style.backgroundColor = selectedColor;
            }
        });
    });

    // Clear cell color when delete button is clicked
    deleteButton.addEventListener("click", () => {
        gridCells.forEach(cell => cell.style.backgroundColor = "transparent");
    });
});
