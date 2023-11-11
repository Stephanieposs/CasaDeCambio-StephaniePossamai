

buscarMoedasAJAX(carregarSelectMoedas);
cotacao();
dataAtual();

//AJAX
function buscarMoedasAJAX(carregarSelectMoedas) {
    //AJAX - Fazer uma requisição HTTPs / Consumo de API
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

function carregarSelectMoedas(moedas) {
    //carregando as moedas no select da tela... 
    let listaMoedas = document.getElementById("idMoedas")
    let listaMoedas2 = document.getElementById("idMoedas2")

    for (let i = 0; i < moedas.value.length; i++) {
        console.log(moedas.value[i].simbolo)

        let optionMoeda = document.createElement("option")
        optionMoeda.value = moedas.value[i].simbolo
        optionMoeda.innerText = moedas.value[i].nomeFormatado

        listaMoedas.appendChild(optionMoeda)
        listaMoedas2.appendChild(optionMoeda)
    }

}

function cotacao() {
    var xhr = new XMLHttpRequest()

    xhr.open("GET", "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='11-09-2023'&@dataFinalCotacao='01-31-2025'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")

    xhr.addEventListener("load", function () {
        let resposta = xhr.responseText
        let moedas = JSON.parse(resposta)
        console.log("moedas")
        console.log(moedas)
        console.log(moedas.value[0])
    })
    xhr.send()
}

// funcao para pegar a data atual
function dataAtual() {
    const date = new Date();
    const ano = date.getFullYear();
    console.log(ano);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    var data = (ano+"-"+mes+"-"+dia)
    return data
}