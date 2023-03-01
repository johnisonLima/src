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

                // console.log(responsePeriodo)
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
    let contPrimos,
        ocorrencia_0 		= [],
        ocorrencia_1 		= [],
        ocorrencia_2 		= [],
        ocorrencia_3 		= [],
        ocorrencia_4 		= [],
        ocorrencia_5 		= [],
        ocorrencia_6 		= [],
        porcentagemPrimos 	= [],
        contPrimoCurrent	= 0

    for(let i=0; i<objetos.length; i++){
        contPrimos = 0
        let ultimoSorteio = Object.values(objetos[i])

        for(let j=2; j<=7; j++){
            if(éPrimo(ultimoSorteio[j])){
                contPrimos++
            }
        }
        if(contPrimos == 0){
			ocorrencia_0.push(contPrimos);
		}	
		if(contPrimos == 1){
			ocorrencia_1.push(contPrimos);
		}	
		if(contPrimos == 2){
			ocorrencia_2.push(contPrimos);
		}	
		if(contPrimos == 3){
			ocorrencia_3.push(contPrimos);
		}	
		if(contPrimos == 4){
			ocorrencia_4.push(contPrimos);
		}		
		if(contPrimos == 5){
			ocorrencia_5.push(contPrimos);
		}	
		if(contPrimos == 6){
			ocorrencia_6.push(contPrimos);
		}		
    }

    porcentagemPrimos.push([ocorrencia_0.length*100/objetos.length, 0]);
	porcentagemPrimos.push([ocorrencia_1.length*100/objetos.length, 1]);
	porcentagemPrimos.push([ocorrencia_2.length*100/objetos.length, 2]);
	porcentagemPrimos.push([ocorrencia_3.length*100/objetos.length, 3]);
	porcentagemPrimos.push([ocorrencia_4.length*100/objetos.length, 4]);
	porcentagemPrimos.push([ocorrencia_5.length*100/objetos.length, 5]);
	porcentagemPrimos.push([ocorrencia_6.length*100/objetos.length, 6]);

    console.table(porcentagemPrimos)

}

function éPrimo(num){
    for(let i=2; i<num; i++){
        if(num % i == 0){
            return false
        }
    }
    return true
}