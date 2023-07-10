const pirate_music = new Audio("assets/pirate_music.mp3");
pirate_music.loop = true;
pirate_music.volume = 0.3;

let random = new Audio("assets/random.mp3");
random.volume = 0.5;

let clear = new Audio("assets/clear.mp3");
clear.volume = 0.3;

let calculate = new Audio("assets/calculate.mp3");

function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function aleatorizarItens() {
  const itensInputs = document.getElementsByClassName('item-value-input');

  for (let i = 0; i < itensInputs.length; i++) {
    const valorAleatorio = gerarNumeroAleatorio(1, 20);
    const pesoAleatorio = gerarNumeroAleatorio(1, 5);

    itensInputs[i].value = valorAleatorio;
    itensInputs[i + 1].value = pesoAleatorio;

    i++;
  }
}

function limparItens() {
  const itensInputs = document.getElementsByClassName('item-value-input');

  for (let i = 0; i < itensInputs.length; i++) {
    itensInputs[i].value = 0;
    itensInputs[i + 1].value = 0;

    i++;
  }
}

function calcularResultados() {}

document.getElementById('aleatorizar').addEventListener('click', function () {
  random.play();
  aleatorizarItens();
  calcularMochila();
});

document.getElementById('limpar').addEventListener('click', function () {
  clear.play();
  limparItens();
});

document.getElementById('calcular').addEventListener('click', function () {
  calculate.play();
  calcularResultados();
});

function calcularMochila() {
  const capacidade = parseInt(document.getElementById('capacidade').value);
  const itens = document.getElementsByClassName('item');
  const qtdItensElement = document.querySelector('.result-item .item-value');
  const valorTotalElement = document.querySelectorAll('.result-item .item-value')[1];
  const pesoTotalElement = document.querySelectorAll('.result-item .item-value')[2];

  let qtdItens = 0;
  let valorTotal = 0;
  let pesoTotal = 0;

  const dp = [];
  for (let i = 0; i <= itens.length; i++) {
    dp[i] = [];
    for (let j = 0; j <= capacidade; j++) {
      dp[i][j] = 0;
    }
  }

  for (let i = 1; i <= itens.length; i++) {
    const valor = parseInt(itens[i - 1].querySelector('.item-value-input').value);
    const peso = parseInt(itens[i - 1].querySelectorAll('.item-value-input')[1].value);

    for (let j = 1; j <= capacidade; j++) {
      if (peso > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], valor + dp[i - 1][j - peso]);
      }
    }
  }

  let j = capacidade;
  for (let i = itens.length; i > 0; i--) {
    const valor = parseInt(itens[i - 1].querySelector('.item-value-input').value);
    const peso = parseInt(itens[i - 1].querySelectorAll('.item-value-input')[1].value);

    if (dp[i][j] > dp[i - 1][j]) {
      itens[i - 1].classList.add('item-taken');
      qtdItens++;
      valorTotal += valor;
      pesoTotal += peso;
      j -= peso;
    } else {
      itens[i - 1].classList.remove('item-taken');
    }
  }

  qtdItensElement.textContent = qtdItens;
  valorTotalElement.textContent = valorTotal;
  pesoTotalElement.textContent = pesoTotal;
}

document.getElementById('calcular').addEventListener('click', function () {
  calcularMochila();
});

window.onclick = function () {
  pirate_music.play();
};