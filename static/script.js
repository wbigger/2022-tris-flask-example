console.log('Gioco del tris');

let board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
];

let play = function (r, c) {
    console.log(`Hai premuto sulla casella: ${r} ${c}`);
    if (board[r][c] === '-') {
        board[r][c] = 'O';
        console.log("Prima di inviare al server...");
        console.log(board);
      
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", getBoard);
        xhr.open("PUT", "board");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(board));

        // OR
        // Directly call the function
        // updateBoard(board);
    }
}

let getBoard = function() {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", updateBoard);
  xhr.open("GET", "board");
  xhr.responseType = 'json';
  xhr.send();
}

let updateBoard = function() {
  board = this.response
  console.log("Dopo la risposta del server...");
  console.log(board);
    for (r in board) {
        for (c in board) {
            let symbol = board[r][c];
            if (symbol === 'O') {
                let tile = document.getElementById(`item-${r}-${c}`);
                tile.innerHTML = '<span class="circle"></span>';
            } else if (symbol === 'X') {
                let tile = document.getElementById(`item-${r}-${c}`);
                tile.innerHTML = '<span class="cross"><div class="cross-line cross-line-a"></div><div class="cross-line cross-line-b"></div></span>';
            }
        }
    }
}
// VEDI /Users/claudio/Documents/notes/prjs/scuola-classi/4Cinf/tris
