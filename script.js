const bingoTableBody = document.getElementById('bingo-body');
const numeroSorteado = document.getElementById('numero-sorteado');
const botaoSortear = document.getElementById('sortear');

const colunas = {
  B: {min: 1, max: 15},
  I: {min: 16, max: 30},
  N: {min: 31, max: 45},
  G: {min: 46, max: 60},
  O: {min: 61, max: 75},
};

let numerosRestantes = [];

// Inicializa todos os números do bingo
function inicializarNumeros() {
  numerosRestantes = [];
  for (let i = 1; i <= 75; i++) {
    numerosRestantes.push(i);
  }
}

// Gera uma linha de bingo com uma célula por letra
function gerarLinha() {
  const linha = document.createElement('tr');
  for (let letra in colunas) {
    const celula = document.createElement('td');
    celula.textContent = ''; // vazio inicialmente
    linha.appendChild(celula);
  }
  return linha;
}

// Cria o corpo da tabela com 15 linhas
function montarTabela() {
  bingoTableBody.innerHTML = '';
  for (let i = 0; i < 15; i++) {  // Criando 15 linhas
    bingoTableBody.appendChild(gerarLinha());
  }
}

// Sorteia um número aleatório não repetido
function sortearNumero() {
  if (numerosRestantes.length === 0) {
    alert('Todos os números foram sorteados!');
    return;
  }

  const indice = Math.floor(Math.random() * numerosRestantes.length);
  const numero = numerosRestantes.splice(indice, 1)[0];

  // Descobre a letra da coluna
  let letra = '';
  for (let l in colunas) {
    const faixa = colunas[l];
    if (numero >= faixa.min && numero <= faixa.max) {
      letra = l;
      break;
    }
  }

  numeroSorteado.textContent = `Número sorteado: ${letra}${numero}`;

  // Preenche a última célula vazia na coluna correspondente (célula mais abaixo)
  const colIndex = Object.keys(colunas).indexOf(letra);
  for (let i = bingoTableBody.rows.length - 1; i >= 0; i--) {
    const cell = bingoTableBody.rows[i].cells[colIndex];
    if (cell.textContent === '') {
      cell.textContent = numero;
      break;
    }
  }
}

// Inicialização
inicializarNumeros();
montarTabela();

botaoSortear.addEventListener('click', sortearNumero);
