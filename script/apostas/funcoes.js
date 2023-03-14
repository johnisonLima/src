let atualizar        = 'modulos/qtdDezenas/atualizar'

let qtdDezenasAposta
    
// Buscando quantidade de dezenas que poderão ser apostadas
$.ajax({
    url: "modulos/qtdDezenas/selecionaTudo.php",
    method: "POST",
    success: function(responseText){
        let response = JSON.parse(responseText.trim());
        
        qtdDezenasAposta      = Number(response[0].qtdNum)
    }
})

function formNumAposta(){
    let form = 
         `<form method="post" action="javascript:void(0)" id="form_qtdDezenas">
             <fieldset class="qtd_numAposta">
                 <legend>Quantidade de números da aposta:</legend>
                 <div class="itens_radio">			                        
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio6" value="6" checked>
                         <label for="inlineRadio6">6</label>
                     </div>     
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio7" value="7">
                         <label for="inlineRadio7">7</label>
                     </div>
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio8" value="8">
                         <label for="inlineRadio8">8</label>
                     </div>
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio9" value="9">
                         <label for="inlineRadio9">9</label>
                     </div>
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio10" value="10">
                         <label for="inlineRadio10">10</label>
                     </div>
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio11" value="11">
                         <label for="inlineRadio11">11</label>
                     </div>
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio12" value="12">
                         <label for="inlineRadio12">12</label>
                     </div>  
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio13" value="13">
                         <label for="inlineRadio13">13</label>
                     </div>
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio14" value="14">
                         <label for="inlineRadio14">14</label>
                     </div>
                     <div>
                         <input type="radio" name="radioQtdNum" id="inlineRadio15" value="15">
                         <label for="inlineRadio15">15</label>
                     </div>  
                 </div>
                 <button class="btn_qtd_dezenas" type="submit" onClick="mudarQtdDezenas()">      Enviar
                 </button>            
             </fieldset> 
         </form>`
     
     div_model.classList.add('model_open')
     div_model.firstElementChild.classList.add('msgAlerta')
     div_modelContent.innerHTML = form
}

function mudarQtdDezenas(){
    //let form_qtdDezenas = document.querySelector('#form_qtdDezenas')

    let form = new FormData(form_qtdDezenas)

    HttpPost(atualizar, () =>{
        beforeSend(() => {})

        success(() => {
            let responseQtdAtualizar = xhttp.responseText.trim()

            console.log(responseQtdAtualizar)
        })

        error(() => {})
    },form) // Terceiro parâmetro da função para ser enviada ao php
}