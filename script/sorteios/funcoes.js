let primeiroConcurso,
    ultimoConcurso,
    ultimoConcursoAtual,
    somaSorteados

// Buscando o primeiro e o último concurso via ajax
$.ajax({
    url:"modulos/sorteios/buscaPrimeiroRegistro.php",
    method:"POST",
    success:function(responseText){
        let response = JSON.parse(responseText.trim());
        
        primeiroConcurso = Number(response[0].concurso)
    }
})
$.ajax({
    url: "modulos/sorteios/buscaUltimoRegistro.php",
    method: "POST",
    success: function(responseText){
        let response = JSON.parse(responseText.trim());
        
        ultimoConcurso      = Number(response[0].concurso)
        ultimoConcursoAtual = ultimoConcurso
    }
})

function rangeConcurso(){
    // Váriavel para verificar se alterou alguma alça
    // rangeSorteios = false

    $('#range_concursos').each(function(){
        let minValor = primeiroConcurso,
            maxValor = ultimoConcurso            

        $(this).slider({
            range: true,
            step: 1,
            animate: 'fast',
            min: minValor,
            max: maxValor,
            values: [minValor, maxValor],
            create: (event, ui) => {
                // let handleMinimo = $(this).slider('values')[0],
                //     handleMaximo = $(this).slider('values')[1]
                
                // $(this).find('.min-value').html(handleMinimo)
                // .attr('data-selected-value', handleMinimo)
                
                // $(this).find('.max-value').html(handleMaximo).attr('data-selected-value', handleMaximo)
            },
            slide: (event, ui) =>{
                // Se mover alguma alça a váriavel passa a ser verdadeira
                //rangeSorteios = true;

                let valorMinAtual = ui.values[0]
                let valorMaxAtual = ui.values[1]

                $(this).find('.min-value').html(valorMinAtual)
                .attr('data-selected-value', valorMinAtual)

                $(this).find('.max-value').html(valorMaxAtual)
                .attr('data-selected-value', valorMaxAtual)

            },
            stop: (event, ui) =>{
                // Nova consulta ao banco de dados a cada parada no movimento da alça
                selectPeriodoConcurso(ui.values[0], ui.values[1])
            }
        })

        // Criando span e inserindo os valores nas alças
        $(this).find('span[tabindex]:first-of-type')
        .append('<span class="value min-value" data-selected-value></span>')
        .find('.value').html(minValor).attr('data-selected-value', minValor)

        $(this).find('span[tabindex]:last-of-type')
        .append('<span class="value max-value" data-selected-value></span>')
        .find('.value').html(maxValor).attr('data-selected-value', maxValor)
            
    })

    selectPeriodoConcurso = (valorMin, valorMax) =>{
        ultimoConcursoAtual = Number(valorMax)

        $.ajax({
            url: "modulos/sorteios/selecionaPeriodo.php",
            method: "POST",
            data: 
            {
                min: valorMin,
                max: valorMax
            },
            success: function(responseText){
                let responsePeriodo = JSON.parse(responseText.trim())

                rangeSomaSorteados(responsePeriodo)
                qtdPrimosSorteados(responsePeriodo)  
                intervaloSorteado(responsePeriodo)     
            }
        })
    }
}

function rangeSomaSorteados(objetos){
    let soma = 0
    let ultimoSorteio = Object.values(objetos[0])

    for(let i=2; i<=7; i++){
        soma += Number(ultimoSorteio[i])
    }

    $('#range_soma_sorteados').each(function(){		
        let handleSorteios 	= $("#handle_soma_sorteio"),
            handleApostas 	= $("#handle_soma_aposta"),
            minValue 		= 27,
            maxValue 		= 345;
    
        $(this).slider({
            animate: "slow",
            min: minValue,
            max: maxValue,
            values: [soma, 0],
            create: function(event, ui){
                handleSorteios.text($(this).slider("values")[0])
                handleApostas.text($(this).slider("values")[1])
            },
            change: function(event, ui){
                handleSorteios.text(ui.values[0])
                handleApostas.text(ui.values[1])
            }
        })
    })
}

function qtdPrimosSorteados(objetos){
    let primosSOrteado       = document.querySelector('.primo_sorteado')

    let contPrimos,
        selectPrimo,
        ocorrenciaPrimos 	= [],
		porcentagemPrimos 	= []

        primosSOrteado.innerHTML = ''

    // Definindo o tamanho do array e inicializando todos os valores com zero
    ocorrenciaPrimos.length = 7
    ocorrenciaPrimos.fill(0)    

    for(let i=0; i<objetos.length; i++){
        contPrimos = 0
        let ultimoSorteio = Object.values(objetos[i])// Pegando sempre o último concurso

        // Verificando se as dezenas do concurso é primo
        for(let j=2; j<=7; j++){
            if(éPrimo(ultimoSorteio[j])){                
                contPrimos++
            }
        }

        // Colocando a ocorrência dos primos de acordo com as vezes
        for(let j=0; j<=6; j++){
            if(contPrimos == j){
                ocorrenciaPrimos[j] = ocorrenciaPrimos[j]+1
            }
        }       
                
        i == 0 ? selectPrimo = contPrimos : ''
    }

    // Convertendo as ocorrências em porcentagem
    for(let i=0; i<=6; i++){
        porcentagemPrimos.push([ocorrenciaPrimos[i]*100/objetos.length, i])
    }

    // Ordenando de acordo com a primeria coluna
    porcentagemPrimos.sort( (a, b) =>{
        if(a[0] === b[0]){
            return 0
        }
        return (a[0] < b[0]) ? -1 : 1        
    })

    for(let i=0; i<porcentagemPrimos.length; i++){
        primosSOrteado.innerHTML += 
        `<span class="qtd_primo ${porcentagemPrimos[i][1] == selectPrimo ? 'select' : ''}" title="${porcentagemPrimos[i][0]}">
            ${porcentagemPrimos[i][1]}
        </span>`
    }    
}

function intervaloSorteado(objetos){
    let intervaloSOrteado    = document.querySelector('.intervalo_sorteado')
    let ultimoSorteio = Object.values(objetos[0])

    // Pegando a diferença entre a primeira e última dezena   
    let intervalo = Number(ultimoSorteio[7]) - Number(ultimoSorteio[2])+1

    intervaloSOrteado.lastElementChild.style.width = `${intervalo}%`
    intervaloSOrteado.lastElementChild.innerText = intervalo
}

function cartelaSorteados(objetos){
    let dezena              = 1,
        cartelaSorteados    = []

    while(dezena <= 60){
        let totalDezena             = 0,
            penultimoConcursoDezena = true,
            ultimoConcursoDezena    = 0,
            intervaloConcursos      = 0,
            mediaIntervaloDezena    = 0,
            concursoAnterior        = 0
        
        for(let i=0; i<=objetos.length-1; i++){
            let dezenaUm     = objetos[i].primeiraDezena, 
                dezenaDois   = objetos[i].segundaDezena, 
                dezenaTrês   = objetos[i].terceiraDezena, 
                dezenaQuatro = objetos[i].quartaDezena, 
                dezenaCinco  = objetos[i].quintaDezena, 
                dezenaSeis   = objetos[i].sextaDezena,
                concurso     = Number(objetos[i].concurso)

            if(dezenaUm == dezena ||  dezenaDois == dezena || dezenaTrês == dezena || 
               dezenaQuatro == dezena || dezenaCinco == dezena || dezenaSeis == dezena){

                if(totalDezena == 0){
                    // Último concurso que a dezena saiu
                    ultimoConcursoDezena = concurso
                }
                else{
                    // Concursos que a dezena saiu
                    // Intervalo entra as saídas da dezena
                    intervaloConcursos += (concursoAnterior - concurso)

                    if(penultimoConcursoDezena){
                        // Penultima vez que o dezena saiu  
                        penultimoConcursoDezena = false
                    }                    
                }

                concursoAnterior = concurso
				totalDezena++;
            }
        }
        // Calculando média e colocando apenas duas casas decimais
        mediaIntervaloDezena = Number((intervaloConcursos/totalDezena).toFixed(2))  
        
        // Inserindo os valores DEZENA, ÚLTIMO SORTEIOS QUE A DEZENA SAIU, MÉDIA SAÍDA E TOTAL
        cartelaSorteados.push([dezena, ultimoConcursoDezena, mediaIntervaloDezena, totalDezena])

        dezena++
    }    

    // Ordenando em ordem decrescente de acordo com segundo índice
    cartelaSorteados.sort((a, b) =>{
        if(a[1] === b[1]){
            return 0
        }
        return (a[1] > b[1]) ? -1 : 1        
    })

    let cartela = document.querySelector('.cartela_estatistica')

    for(let i=0; i<cartelaSorteados.length; i++){
        let dezena          = cartelaSorteados[i][0],
            intervaloDezena = ultimoConcursoAtual - cartelaSorteados[i][1],
            mediaInDezena   = cartelaSorteados[i][2],
            totalDezena     = cartelaSorteados[i][3]

        cartela.innerHTML += 
            `<button class="${verificaIntervalo(intervaloDezena)}">
                ${dezena}
                <div class="media_sorteado">${mediaInDezena}</div>
                <div class="qtd_sorteado">${totalDezena}</div>
            </button>`

        cartela.lastChild.setAttribute('id', dezena)
        cartela.lastChild.setAttribute('title', intervaloDezena)
    }
    
    function verificaIntervalo(intervalo){
        if(intervalo == 0){
            return 'zeroIntervalo'
        }
        else if(intervalo == 1){
            return 'umIntervalo'
        }
        else if(intervalo == 2){
            return 'doisIntervalo'
        }
        else if(intervalo == 3){
            return 'tresIntervalo'
        }
        else if(intervalo == 4){
            return 'quatroIntervalo'
        }
        else if(intervalo == 5){
            return 'cincoIntervalo'
        }
        else if(intervalo == 6){
            return 'seisIntervalo'
        }
        else if(intervalo == 7){
            return 'seteIntervalo'
        }
        else if(intervalo == 8){
            return 'oitoIntervalo'
        }
        else if(intervalo == 9){
            return 'noveIntervalo'
        }
        else if(intervalo > 9 && intervalo < 20){
            return 'dezIntervalo'
        }
        else if(intervalo > 19){
            return 'vinteIntervalo'
        }
    } 

}

function zeroEsuerda(numero){
    if(numero < 10){
        numero = `0${numero}`
    }
    return numero
}

function éPrimo(num){
    for(let i=2; i<num; i++){
        if(num % i == 0){
            return false
        }
    }
    return true
}
