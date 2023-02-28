let base_url = window.document.URL
let link_menu = document.querySelector('header > nav .home')

link_menu.setAttribute('href', base_url)

// ***********************************************************************************
// *************************** TESTE RANGE CONCURSOS *********************************
// ***********************************************************************************
// let minValue = 2051
// let maxValue = 2561
// $('#range_concursos').each(function(){
//     $(this).slider({
//         range: true,
//         step: 1,
//         animate: "fast",
//         min:minValue,
//         max:maxValue,
//         values: [minValue, maxValue],
//         create:function(event, ui){
//             let handleMinimun = $(this).slider("values")[0];
//             let handleMaximum = $(this).slider("values")[1];
    
//             $(this).find('.min-value').html(handleMinimun).attr('data-selected-value', handleMinimun);
//             $(this).find('.min-value').html(handleMaximum).attr('data-selected-value', handleMaximum);			
//         },
//         slide:function(event, ui){
//             // Se houve alteração em uma das alças a váriavel passa a ser verdadeira
//             acionouRangerSorteios = true;
    
//             currentValueMin = ui.values[0];
//             currentValueMax = ui.values[1];
    
//             $(this).find('.min-value').html(currentValueMin).attr('data-selected-value', currentValueMin);
//             $(this).find('.max-value').html(currentValueMax).attr('data-selected-value', currentValueMax);						
//         },
//         stop: function(event, ui){
//             // Fazendo a consulta no banco de acordo com a alça do range
//             // loadConcurso(ui.values[0], ui.values[1]);				
//         }    
//     })

//     $(this).find('span[tabindex]:first-of-type').append('<span class="value min-value" data-selected-value></span>').find('.value').html(minValue).attr('data-selected-value', minValue);
// 	$(this).find('span[tabindex]:last-of-type').append('<span class="value max-value" data-selected-value></span>').find('.value').html(maxValue).attr('data-selected-value', maxValue);
// })
// ***********************************************************************************
// ******************************* NÚMEROS CARTELA **********************************
// ***********************************************************************************
let cartela_estatistica = document.querySelector('.cartela_estatistica') 
let cartela_aposta      = document.querySelector('.cartela_aposta')
let qtdDezena_1             = document.querySelectorAll('.volante_qtdDezenas')

qtdDezena_1[0].innerHTML = botoesCartela()
qtdDezena_1[1].innerHTML = botoesCartela()
qtdDezena_1[2].innerHTML = botoesCartela()

cartela_estatistica.innerHTML += botoesCartela()
cartela_estatistica = document.querySelector('.cartela_estatistica')

cartela_aposta.innerHTML = botoesCartela()

mediaQtdSorteado(cartela_estatistica)

function botoesCartela(){
    let btn = ''
    for(let i=1; i<=60; i++){
        btn += `<button>${zeroEsuerda(i)}</button>`
    }
    return btn
}

function mediaQtdSorteado(item){
    let btn = item.children

    for(let i=2; i<btn.length; i++){
        btn[i].setAttribute('title', i)
        btn[i].innerHTML += `
            <div class="media_sorteado" id="${i}">9.67</div>
            <div class="qtd_sorteado" id="${i}">65</div>
        `
    }
}

function zeroEsuerda(numero){
    if(numero < 10){
        numero = `0${numero}`
    }
    return numero
}
// ***********************************************************************************
// *************************** TESTE RANGE SOMA *********************************
// ***********************************************************************************
$('#range_soma_sorteados').each(function(){		
    let handleSorteios 	= $("#handle_soma_sorteio"),
        handleApostas 	= $("#handle_soma_aposta"),
        minValue 		= 27,
        maxValue 		= 345;

    $(this).slider({
        animate: "slow",
        min:minValue,
        max:maxValue,
        values: [110, 200],
        create: function(event, ui){
            handleSorteios.text($(this).slider("values")[0]);
            handleApostas.text($(this).slider("values")[1]);
          },
          change: function(event, ui){
            handleSorteios.text(ui.values[0]);
            handleApostas.text(ui.values[1]);	
          }
    });
});	

// ***********************************************************************************
// ************************ TESTE RANGE SOMA APOSTAS *********************************
// ***********************************************************************************
$('#range_soma_apostados').each(function(){		
    var handle = $("#handle_aposta"),
        minValue 	= 27,
        maxValue 	= 345;

    $(this).slider({
        animate: "fast",
        min:minValue,
        max:maxValue,
        create: function(event, ui){
            handle.text(0);	
          },
          change: function(event, ui){
            handle.text(ui.value);
          }
    });
});	