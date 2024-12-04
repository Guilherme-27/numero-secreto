//Isso é um teste!

let tentativas = 1;
let numeroLimite = 100;
let listaSorteados = [];
numeroSecreto = gerarNumeroRandomico();

function textoNaTela (elemento, texto){
    let componente = document.querySelector(elemento);
    componente.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    textoNaTela('h1', 'Jogo do número secreto');
    textoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
    if (chute == numeroSecreto){
        textoNaTela('h1', 'Acertou!');
        textoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroSecreto > chute){
            textoNaTela('p', 'O número é maior');
        } else {
            textoNaTela('p', 'O número é menor');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroRandomico() {
    let quantidadeDeElementosNaLista = listaSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaSorteados = [];
    }
    numeroEscolhido =  parseInt(Math.random()* numeroLimite + 1);
    if (listaSorteados.includes(numeroEscolhido)) {
        return gerarNumeroRandomico();
    } else {
        listaSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function botaoReiniciar() {
    limparCampo();
    exibirMensagemInicial();
    tentativas = 1;
    numeroSecreto = gerarNumeroRandomico();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}