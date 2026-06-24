const socket = io();
const chess = new Chess()
const boardElement = document.querySelector('.chessboard')
const turnDot = document.getElementById('turn-dot');
const turnText = document.getElementById('turn-text');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;
let lastMove = null;


const renderBoard = () => {
    const board = chess.board()
    boardElement.innerHTML = ""
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement('div')
            squareElement.classList.add('square',
                (rowindex + squareindex) % 2 === 0 ? 'light' : 'dark'
            )
            const squareName = `${String.fromCharCode(97 + squareindex)}${8 - rowindex}`;
            if (lastMove) {
                if (squareName === lastMove.from) {
                    squareElement.classList.add('last-move-from');
                }
                if (squareName === lastMove.to) {
                    squareElement.classList.add('last-move-to');
                }
            }

            squareElement.dataset.row = rowindex
            squareElement.dataset.col = squareindex

            if (square) {
                const pieseElement = document.createElement('div')
                pieseElement.classList.add('piece',
                    square.color === 'w' ? 'white' : 'black'
                )
                pieseElement.innerText = getPieceUnicode(square)

                const isPlayersPiece = playerRole === square.color;
                const isPlayersTurn = playerRole === chess.turn();
                pieseElement.draggable = isPlayersPiece && isPlayersTurn;

                pieseElement.addEventListener('dragstart', (e) => {
                    if (!pieseElement.draggable) return;

                    draggedPiece = pieseElement;
                    sourceSquare = { row: rowindex, col: squareindex };

                    e.dataTransfer.setData("text/plain", "");

                    // 🔴 UPDATE: highlight legal moves
                    const from = `${String.fromCharCode(97 + sourceSquare.col)}${8 - sourceSquare.row}`;

                    const moves = chess.moves({
                        square: from,
                        verbose: true
                    });

                    clearHighlights();

                    moves.forEach(move => {
                        const file = move.to[0];
                        const rank = move.to[1];

                        const row = 8 - parseInt(rank);
                        const col = file.charCodeAt(0) - 97;

                        const selector = `[data-row="${row}"][data-col="${col}"]`;
                        const square = document.querySelector(selector);

                        if (!square) return;

                        // Capture move check
                        if (move.captured) {
                            square.classList.add("capture-highlight");
                        } else {
                            square.classList.add("highlight");
                        }
                    });
                });

                pieseElement.addEventListener('dragend', (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                })

                squareElement.appendChild(pieseElement)

            }

            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault()
            })

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault()

                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    }
                    handleMove(sourceSquare, targetSource)
                }
            })
            boardElement.appendChild(squareElement)
        })
    });

    if (playerRole === "b") {
        boardElement.classList.add("flipped");
    }
    else {
        boardElement.classList.remove("flipped");

    }

    updateTurnUI();
}

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q',
    }

    const test = chess.move(move);

    if (test) {
        socket.emit('move', move);
    } else {
        renderBoard();
    }
}

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "♟",
        r: "♜",
        n: "♞",
        b: "♝",
        q: "♛",
        k: "♚",

        P: "♙",
        R: "♖",
        N: "♘",
        B: "♗",
        Q: "♕",
        K: "♔"
    };

    return unicodePieces[piece.type] || ''
}

const clearHighlights = () => {
    document.querySelectorAll('.square').forEach(square => {
        square.classList.remove('highlight');
        square.classList.remove('capture-highlight');
    });
};

const updateTurnUI = () => {
    const turn = chess.turn(); // w or b

    if (turn === 'w') {
        turnText.innerText = "White to move";
        turnDot.style.background = "#ffffff";
        turnDot.style.boxShadow = "0 0 12px #ffffff";
    } else {
        turnText.innerText = "Black to move";
        turnDot.style.background = "#000000";
        turnDot.style.boxShadow = "0 0 12px #000000";
    }
};

socket.on('playerRole', (role) => {
    playerRole = role
    renderBoard();
})

socket.on("spectatorRole", function () {
    playerRole = null;
    renderBoard();
});

socket.on('boardState', (fen) => {
    chess.load(fen)
    renderBoard();
    updateTurnUI();
})

socket.on('move', (move) => {
    chess.move(move);

    lastMove = move;
    renderBoard();
    updateTurnUI();
});
renderBoard();
