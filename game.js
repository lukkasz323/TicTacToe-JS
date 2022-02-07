'use strict';

const winner = document.getElementById('winner');
const buttons = document.querySelectorAll('input'); 
let plr = 'X';
let grid = Array(9);
let id;
let moves = 0;

function nextPlr() { // Swap between players after each turn
    switch (plr) {
        case 'X':
            plr = 'O';
            break;
        case 'O':
            plr = 'X';
    }
}

function checkGameOver() {
    function check(a, b, c) {
        if (grid[a] !== grid[b]) return;
        if (grid[a] !== grid[c]) return;
        if (grid[a] == null && grid[b] == null && grid[c] == null) return;
        moves = 0; // Reset to prevent draw on last chance win
        gameOver(1);
    }
    check(0, 1, 2); // Check all (8) possible combinations for win
    check(3, 4, 5);
    check(6, 7, 8);
    check(0, 3, 6);
    check(1, 4, 7);
    check(2, 5, 8);
    check(0, 4, 8);
    check(2, 4, 6);
    if (moves >= 8) { // Draw if there's no win
        gameOver(0);
    }
}

function gameOver(status) {
    switch (status) {
        case 0: // Draw
            winner.innerHTML = 'Draw!';
            break;
        case 1: // Win
            winner.innerHTML = "'" + plr + "' wins!";
    }
    for (let i = 0; i <= 8; i++) {
        buttons[i].removeEventListener('click', logClick);
    }
}

function logClick(e) {
    id = e.target.id;

    if (grid[id] == null) {
        grid[id] = plr;
        buttons[id].value = plr;
        checkGameOver();
        nextPlr();
        moves++;
    }
}

for (let i = 0; i <= 8; i++) {
    buttons[i].addEventListener('click', logClick);
}