const items = [
  "Winter is Coming", "Dracarys", "The North Remembers", "You know nothing, Jon Snow",
  "Valar Morghulis", "Hodor", "Red Wedding", "Iron Throne", "Wildfire",
  "The Night King", "White Walkers", "Faceless Men", "House Stark", "House Lannister",
  "House Targaryen", "Jon Snow", "Daenerys Targaryen", "Arya Stark", "Cersei Lannister",
  "Tyrion Lannister", "Bran Stark", "Sansa Stark", "Jaime Lannister", "Melisandre",
  "Hold the Door", "Longclaw", "Direwolves", "Three-Eyed Raven", "King's Landing",
  "Battle of the Bastards"
];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateBingoBoard() {
  const board = document.getElementById('bingo-board');
  board.innerHTML = "";

  const shuffledItems = shuffle(items).slice(0, 24);
  const cells = [];

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;

    if (i === 12) {
      cell.textContent = "FREE";
      cell.classList.add('marked');
    } else {
      const text = shuffledItems.shift();
      cell.textContent = text;
    }

    cell.addEventListener('click', () => {
      cell.classList.toggle('marked');
      checkForBingo(cells);
    });

    board.appendChild(cell);
    cells.push(cell);
  }
}

function checkForBingo(cells) {
  const winPatterns = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20]
  ];

  const allMarked = cells.every(cell => cell.classList.contains('marked'));

  if (allMarked) {
    setTimeout(() => alert("🎉 BINGO! Cartela cheia! 🎉"), 100);
  }
    }
  


window.onload = () => {
  generateBingoBoard();
};
