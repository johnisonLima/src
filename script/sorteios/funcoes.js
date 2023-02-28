let primeiroConcurso,
    ultimoConcurso

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
    url:"modulos/sorteios/buscaUltimoRegistro.php",
    method:"POST",
    success:function(responseText){
        let response = JSON.parse(responseText.trim());
        
        ultimoConcurso = Number(response[0].concurso)
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
                loadConcurso(ui.values[0], ui.values[1])
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
}