const bingoTableBody = document.getElementById('bingo-body');
const numeroSorteado = document.getElementById('numero-sorteado');
const botaoSortear = document.getElementById('sortear');

const colunas = {
  B: { min: 1, max: 15 },
  I: { min: 16, max: 30 },
  N: { min: 31, max: 45 },
  G: { min: 46, max: 60 },
  O: { min: 61, max: 75 },
};

let numerosRestantes = [];
let totalNumerosSorteados = 0;


function inicializarNumeros() {
  numerosRestantes = [];
  for (let i = 1; i <= 75; i++) {
    numerosRestantes.push(i);
  }
}


function gerarLinha() {
  const linha = document.createElement('tr');
  for (let letra in colunas) {
    const celula = document.createElement('td');
    celula.textContent = ''; 
    linha.appendChild(celula);
  }
  return linha;
}


function montarTabela() {
  bingoTableBody.innerHTML = '';
  for (let i = 0; i < 15; i++) {
    bingoTableBody.appendChild(gerarLinha());
  }
}


function sortearNumero() {
  if (numerosRestantes.length === 0) {
    alert('Todos os números foram sorteados!');
    return;
  }

  const indice = Math.floor(Math.random() * numerosRestantes.length);
  const numero = numerosRestantes.splice(indice, 1)[0];
  totalNumerosSorteados++;


  let letra = '';
  for (let l in colunas) {
    const faixa = colunas[l];
    if (numero >= faixa.min && numero <= faixa.max) {
      letra = l;
      break;
    }
  }

  numeroSorteado.textContent = `Número sorteado: ${letra}${numero}`;


  const colIndex = Object.keys(colunas).indexOf(letra);
  for (let i = bingoTableBody.rows.length - 1; i >= 0; i--) {
    const cell = bingoTableBody.rows[i].cells[colIndex];
    if (cell.textContent === '') {
      cell.textContent = numero;
      break;
    }
  }


  if (totalNumerosSorteados === 75) {
    alert('Todos os números foram sorteados e a tabela está completa!');
  }
}

inicializarNumeros();
montarTabela();
botaoSortear.addEventListener('click', sortearNumero);
