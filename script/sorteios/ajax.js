let selecionaTudo        = 'modulos/sorteios/selecionaTudo'
let buscaUltimoConcurso  = 'modulos/sorteios/buscaUltimoRegistro'


HttpPost(selecionaTudo, () =>{
    beforeSend(() => {})

    success(() =>{        
        //let responseTudo = JSON.parse(xhttp.responseText.trim())

        rangeConcurso()
    });

    error(() => {})
})