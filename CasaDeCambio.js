buscarMoedasAJAX(carregarSelectMoedas1);
buscarMoedasAJAX(carregarSelectMoedas2);


var botao = document.getElementById("idButton")

botao.addEventListener("click", buscarCotacaoEntrada)
var dataAt = dataAtual()
var conversao1 = 0;
var conversao2 = 0;

// pegar cotacao de uma moeda 
// fazer conversao da moeda pra rela e de real pra outra moeda


function buscarMoedasAJAX(carregarSelectMoedas) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda")

    xhr.addEventListener("load", function () {
        let resposta = xhr.responseText
        let moedas = JSON.parse(resposta)
        //console.log(lMoedas);
        carregarSelectMoedas(moedas)
    })
    xhr.send()
}
function carregarSelectMoedas1(moedas) {
    //carregando as options com as moedas
    let listaMoedas = document.getElementById("idMoedas")
    for (let i = 0; i < moedas.value.length; i++) {
        let optionMoeda = document.createElement("option")
        optionMoeda.value = moedas.value[i].simbolo
        optionMoeda.innerText = moedas.value[i].nomeFormatado

        listaMoedas.appendChild(optionMoeda)
    }
}
function carregarSelectMoedas2(moedas) {
    //carregando as options com as moedas
    let listaMoedas2 = document.getElementById("idMoedas2")
    for (let i = 0; i < moedas.value.length; i++) {
        let optionMoeda = document.createElement("option")
        optionMoeda.value = moedas.value[i].simbolo
        optionMoeda.innerText = moedas.value[i].nomeFormatado

        listaMoedas2.appendChild(optionMoeda)
    }
}

// converte a moeda de entrada para real
function buscarCotacaoEntrada() {
    var moedaEntrada = document.getElementById("idMoedas").value
    var valor = document.getElementById("idValor").value
    var xhr = new XMLHttpRequest()

    if (moedaEntrada == 'BRL') {
        conversao1 = valor;
        console.log(conversao1)
    } else {
        xhr.open("GET", "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='" + moedaEntrada + "'&@dataCotacao='" + dataAt + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
        xhr.addEventListener("load", function () {
            let resposta = xhr.responseText
            let moedas = JSON.parse(resposta)
            console.log("moedas")
            console.log(moedas)

            let tamanho = moedas.value.length
            // conversao da primera moeda para reais
            conversao1 = valor * moedas.value[tamanho - 1].cotacaoCompra;
            console.log(conversao1)
        })
        xhr.send()
    }
    buscarCotacaoSaida()
}
// converte real para a moeda de saida
function buscarCotacaoSaida() {
    var moedaSaida = document.getElementById("idMoedas2").value
    var xhr = new XMLHttpRequest()

    if (moedaSaida == 'BRL') {
        conversao2 = conversao1;
        console.log(conversao2)
    } else {
        xhr.open("GET", "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='" + moedaSaida + "'&@dataCotacao='" + dataAt + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")

        xhr.addEventListener("load", function () {
            let resposta = xhr.responseText
            let moedas = JSON.parse(resposta)
            console.log("moedas")
            console.log(moedas)

            let tamanho = moedas.value.length
            // conversao de reais pra moeda de saida
            conversao2 = conversao1 / (moedas.value[tamanho - 1].cotacaoVenda);
            console.log(conversao2)
        })
        xhr.send()
    }
}

// funcao para pegar a data atual
function dataAtual() {
    const date = new Date();
    const ano = date.getFullYear();
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    var data = (mes + "-" + dia + "-" + ano)
    return data
}