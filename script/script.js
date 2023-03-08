let base_url = window.document.URL
let link_menu = document.querySelector('header > nav .home')

link_menu.setAttribute('href', base_url)

// ***********************************************************************************
// ****************************************** POPUP **********************************
// ***********************************************************************************
$(".qtd_numAposta").on('click', () =>{
    $(".model").addClass('model_open')
})
$(".model_close, .bg_overlay").click( () => {
    $(".model").removeClass('model_open')
})

// ***********************************************************************************
// ******************************* NÚMEROS CARTELA **********************************
// ***********************************************************************************
// let cartela_estatistica = document.querySelector('.cartela_estatistica') 
// let cartela_aposta      = document.querySelector('.cartela_aposta')
let qtdDezena_1         = document.querySelectorAll('.volante_qtdDezenas')

qtdDezena_1[0].innerHTML = botoesCartela()
qtdDezena_1[1].innerHTML = botoesCartela()
qtdDezena_1[2].innerHTML = botoesCartela()

// cartela_estatistica.innerHTML += botoesCartela()
// cartela_estatistica = document.querySelector('.cartela_estatistica')

// cartela_aposta.innerHTML = botoesCartela()

// mediaQtdSorteado(cartela_estatistica)

function botoesCartela(){
    let btn = ''
    for(let i=1; i<=60; i++){
        btn += `<button>${zeroEsuerda(i)}</button>`
    }
    return btn
}

// function mediaQtdSorteado(item){
//     let btn = item.children

//     for(let i=2; i<btn.length; i++){
//         btn[i].setAttribute('title', i)
//         btn[i].innerHTML += `
//             <div class="media_sorteado" id="${i}">9.67</div>
//             <div class="qtd_sorteado" id="${i}">65</div>
//         `
//     }
// }

function zeroEsuerda(numero){
    if(numero < 10){
        numero = `0${numero}`
    }
    return numero
}
// ***********************************************************************************
// *************************** TESTE RANGE SOMA *********************************
// ***********************************************************************************
// $('#range_soma_sorteados').each(function(){		
//     let handleSorteios 	= $("#handle_soma_sorteio"),
//         handleApostas 	= $("#handle_soma_aposta"),
//         minValue 		= 27,
//         maxValue 		= 345;

//     $(this).slider({
//         animate: "slow",
//         min:minValue,
//         max:maxValue,
//         values: [110, 200],
//         create: function(event, ui){
//             handleSorteios.text($(this).slider("values")[0]);
//             handleApostas.text($(this).slider("values")[1]);
//           },
//           change: function(event, ui){
//             handleSorteios.text(ui.values[0]);
//             handleApostas.text(ui.values[1]);	
//           }
//     });
// });	

// ***********************************************************************************
// ************************ TESTE RANGE SOMA APOSTAS *********************************
// ***********************************************************************************
// $('#range_soma_apostados').each(function(){		
//     var handle = $("#handle_aposta"),
//         minValue 	= 27,
//         maxValue 	= 345;

//     $(this).slider({
//         animate: "fast",
//         min:minValue,
//         max:maxValue,
//         create: function(event, ui){
//             handle.text(0);	
//           },
//           change: function(event, ui){
//             handle.text(ui.value);
//           }
//     });
// });	