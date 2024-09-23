let resultado = '';
let operacao = '';

function adicionarNumero(numero) {
    resultado += numero;
    document.getElementById('resultado').textContent = resultado;
}

function adicionarOperacao(op) {
    operacao = op;
    resultado += ` ${op} `;
    document.getElementById('resultado').textContent = resultado;
}

function calcular() {
    try {
        const resultadoFinal = eval(resultado);
        document.getElementById('resultado').textContent = resultadoFinal;
        resultado = '';
    } catch (error) {
        document.getElementById('resultado').textContent = 'Erro';
        resultado = '';
    }
}

function limpar() {
    resultado = '';
    document.getElementById('resultado').textContent = '';
}
