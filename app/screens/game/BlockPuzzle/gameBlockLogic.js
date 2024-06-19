export const shapes = [
    [[1], [1], [1], [1]], // I shape
    [[1, 1], [1, 1]], // O shape
    [[1, 0], [1, 0], [1, 1]], // L shape
    [[0, 1], [0, 1], [1, 1]], // J shape
    [[1, 1, 0], [0, 1, 1]], // S shape
    [[0, 1, 1], [1, 1, 0]], // Z shape
    [[0, 1, 0], [1, 1, 1]], // T shape
];

export const getRandomShape = () => {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
};

export const isValidPosition = (board, shape, x, y) => {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] === 1) {
                if (
                    x + i >= board.length ||
                    y + j >= board[0].length ||
                    board[x + i][y + j] !== 0
                ) {
                    return false;
                }
            }
        }
    }
    return true;
};

export const placeShape = (board, shape, x, y) => {
    const newBoard = board.map(row => row.slice());
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] === 1) {
                newBoard[x + i][y + j] = 1;
            }
        }
    }
    return newBoard;
};
