const numeroSorteado = document.getElementById('numero-sorteado');
const botaoSortear = document.getElementById('sortear');
const bingoContainer = document.getElementById('bingo-container');

const colunas = {
  B: { min: 1, max: 15 },
  I: { min: 16, max: 30 },
  N: { min: 31, max: 45 },
  G: { min: 46, max: 60 },
  O: { min: 61, max: 75 },
};

let numerosRestantes = [];
let totalNumerosSorteados = 0;


function criarColunas() {
  for (let letra in colunas) {
    const colunaDiv = document.createElement('div');
    colunaDiv.classList.add('coluna');
    colunaDiv.id = `coluna-${letra}`;

    const titulo = document.createElement('h2');
    titulo.textContent = letra;
    colunaDiv.appendChild(titulo);

    bingoContainer.appendChild(colunaDiv);
  }
}

function inicializarNumeros() {
  numerosRestantes = [];
  for (let i = 1; i <= 75; i++) {
    numerosRestantes.push(i);
  }
}

function criarBolinha(numero) {
  const bolinha = document.createElement('div');
  bolinha.className = 'bolinha';
  bolinha.textContent = numero;


  setTimeout(() => {
    bolinha.style.animation = 'quedaFogo 0.7s ease forwards';
  }, 50);

  return bolinha;
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

  const colunaDiv = document.getElementById(`coluna-${letra}`);
  const bolinha = criarBolinha(numero);
  colunaDiv.appendChild(bolinha);

  if (totalNumerosSorteados === 75) {
    alert('Todos os números foram sorteados!');
  }
}

// Inicialização
criarColunas();
inicializarNumeros();
botaoSortear.addEventListener('click', sortearNumero);
