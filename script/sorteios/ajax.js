let selecionaTudo        = 'modulos/sorteios/selecionaTudo'
let buscaUltimoConcurso  = 'modulos/sorteios/buscaUltimoRegistro'

HttpPost(selecionaTudo, () =>{
    beforeSend(() => {})

    success(() =>{                 
        // Convertendo do fornato JSON para o javaScript interpretar     
        let responseTudo = JSON.parse(xhttp.responseText.trim())

        rangeConcurso()
        rangeSomaSorteados(responseTudo)
        qtdPrimosSorteados(responseTudo)  
        intervaloSorteado(responseTudo)     
        cartelaSorteados(responseTudo)

        // Carregando a cartela do sorteio de acordo com a mudança do switch 
        bnt_switch.addEventListener('change', (event) => { 
            cartelaSorteados(responseTudo)
        })
    });

    error(() => {})
})