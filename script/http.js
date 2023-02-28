/*
    readyState = Estado de leitura, o estado que o XMLHttpRequest retorna para o cliente.
    0 UNSENT - Clinete foi criado. Ainda não ligou. open().
    1 OPENED - open() foi chamado.
    2 HEADERS_RECEIVED - send() chamdo, e os cabeçalhos e status estão disponíveis.
    3 LOADING - Baixando. Contem dados parciais. responseText().
    4 DONE    - A operação é concluída. 
*/ 

/*
    status = Retorna o número/código de status de HTTP
    0 UNSENT
    1 OPENED
    200 LOADING
    200 DONE - A solicitação foi bem-sucedida.
*/

var xhttp = new XMLHttpRequest();// instanciando o XMLHttpRequest para recuperar informações da página

function HttpGet(url, callback, parameters=''){
    xhttp.onreadystatechange = callback // Retorno da chamada do cliente
    xhttp.open('GET', `${url}.php${parameters}`, true) // Método de solicitação, URL para enviar a solicitação, assícrona=true
    xhttp.send() // Envia a solicitação para o servidor
}

function HttpPost(url, callback, parameters=''){
    xhttp.onreadystatechange = callback
    xhttp.open('POST', `${url}.php`, true)
    if(typeof(parameters) != 'object'){// Se os dados não forem enviados atráves do FormData
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    }
    xhttp.send(parameters)
}

// Enquanto o estado de leitura da solicitação não for concluído
function beforeSend(callback){
    if(xhttp.readyState < 4){
        callback()
    }
}

// Se tudo for concluído
function success(callback){
    if(xhttp.readyState == 4 && xhttp.status == 200){
        callback()
    }
}

function error(callback){
    xhttp.onerror = callback
}







