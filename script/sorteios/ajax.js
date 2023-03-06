let selecionaTudo        = 'modulos/sorteios/selecionaTudo',
    buscaUltimoConcurso  = 'modulos/sorteios/buscaUltimoRegistro'

let btn_cartelaAposta   = document.querySelector('.cartela_aposta').children,
    btn_cartelaSorteio  = document.querySelector('.cartela_estatistica').children

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

        for(let i=0; i<btn_cartelaAposta.length; i++){
            btn_cartelaAposta[i].addEventListener('click', function(){
                
                this.classList.toggle('selected')

                console.log(btn_cartelaAposta[i])
                console.log(btn_cartelaSorteio[i])
            })
        }
    });

    error(() => {})
})