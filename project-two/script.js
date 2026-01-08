const board = document.getElementById("board");

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const cell = document.createElement("div");
    const isBlack = (row + col) % 2 === 0;

    cell.className = `cell ${isBlack ? "black" : "white"}`;

    if (isBlack && (row <= 1 || row >= 6)) {
      cell.textContent = "O";
    }

    board.appendChild(cell);
  }
}
