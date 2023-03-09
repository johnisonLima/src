let selecionaTudo        = 'modulos/sorteios/selecionaTudo',
    buscaUltimoConcurso  = 'modulos/sorteios/buscaUltimoRegistro'

let btn_cartelaAposta   = document.querySelector('.cartela_aposta').children,
    btn_cartelaSorteio  = document.querySelector('.cartela_estatistica').children,
    qtd_selecionados    = document.querySelector('.value_selected'),
    qtd_primoAposta     = document.querySelectorAll('.qtd_primo'),
    div_intervaloAposta = document.querySelector('.intervalo_apostado .progress_bar'),
    btn_submit           = document.querySelector('.btn_submit'),
    btn_reset           = document.querySelector('.btn_reset'),
    contSelecionadas    = 0,
    contPrimosAposta    = 0,
    somaSelecionadas    = 0,
    arrSelecionadas = []

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
        cartelaAposta()
        rangeSomaAposta()

        // Carregando a cartela do sorteio de acordo com a mudança do switch 
        bnt_switch.addEventListener('change', (event) => { 
            cartelaSorteados(responseTudo)
        })

        for(let i=0; i<btn_cartelaAposta.length; i++){
            btn_cartelaAposta[i].addEventListener('click', function(){                
                // Adicionando e removendo classe da cartela aposta
                this.classList.toggle('selected')

                // Adicionando e removendo classe da cartela sorteio
                for(let j=0; j<btn_cartelaSorteio.length; j++){
                    if(btn_cartelaSorteio[j].id == this.id){
                        btn_cartelaSorteio[j].classList.toggle('selected')
                    }
                }                

                if(this.classList.contains('selected')){
                    contSelecionadas ++
                
                    // Somando os números Selecionados
                    somaSelecionadas = somaSelecionadas + Number(this.id)

                    éPrimo(this.id) ? contPrimosAposta++ : ''

                    // Inserindo dezena no array
                    arrSelecionadas.push(Number(this.id))
                }
                else{                  
                    contSelecionadas --

                    // Subtraindo os números selecionados
                    somaSelecionadas = somaSelecionadas - Number(this.id)

                    éPrimo(this.id) ? contPrimosAposta-- : ''

                    // Buscando o indice no array e excluindo aquele valor
                    let indice = arrSelecionadas.indexOf(Number(this.id))
                    arrSelecionadas.splice(indice, 1)
                }// fim contains selected

                // Ordenando o array
                arrSelecionadas.sort((a, b)=>(a < b) ? -1 : 1)

                // Modificando o valor dos números selecionados
                qtd_selecionados.innerText = contSelecionadas

                // Alterando o valor do ranger da aposta de acordo com a soma
                $('#range_soma_apostados').slider( "option", "value", somaSelecionadas)

                // Adiciionando e removendo a classe selected nos números primos
                for(let j=0; j<qtd_primoAposta.length; j++){
                    if(qtd_primoAposta[j].classList.contains('selected')){
                        qtd_primoAposta[j].classList.remove('selected')
                    }
                    if(qtd_primoAposta[j].innerText == contPrimosAposta){
                        qtd_primoAposta[j].classList.add('selected')
                    }
                }

                // Calculando a distância entre o primeiro e o último número
                div_intervaloAposta.innerText = intervaloAposta(arrSelecionadas)
                div_intervaloAposta.style.width = `${intervaloAposta(arrSelecionadas)}%`
            })
        }

        btn_submit.addEventListener('click', (event) => {
            event.preventDefault()
            
            if(contSelecionadas === qtdDezenasAposta){
                let concursoAposta = ultimoConcurso+1

                console.log(concursoAposta)
            }
            else{
                let msg = ''
                if(contSelecionadas < qtdDezenasAposta){
                    msg = `Quantidade de dezenas insuficientes!<br> <strong>${contSelecionadas}</strong> dezenas selecionadas.`
                }
                else{
                    msg = `Quantidade de dezenas excedentes!<br> <strong>${contSelecionadas}</strong> dezenas selecionadas.`
                }
                mensagem('msgErro', msg)
                console.log('Não pode')
            }
        })

        btn_reset.addEventListener('click', (event) => {
            contSelecionadas    = 0
            somaSorteados       = 0
            contPrimosAposta    = 0
            arrSelecionadas     = []

            qtd_selecionados.innerText = 0
            div_intervaloAposta.innerText = 0
            div_intervaloAposta.style.width = '0%'

            $('#range_soma_apostados').slider( "option", "value", 0)

            // Removendo a classe selected nos números primos
            for(let j=0; j<qtd_primoAposta.length; j++){
                if(qtd_primoAposta[j].classList.contains('selected')){
                    qtd_primoAposta[j].classList.remove('selected')
                }
            }

            // Removendo a classe selected nas cartelas de sorteio e aposta
            for(let j=0; j<btn_cartelaAposta.length; j++){
                if(btn_cartelaAposta[j].classList.contains('selected')){
                    btn_cartelaAposta[j].classList.remove('selected')
                }
                if(btn_cartelaSorteio[j].classList.contains('selected')){
                    btn_cartelaSorteio[j].classList.remove('selected')
                }
            }
        })

    });

    error(() => {})
})