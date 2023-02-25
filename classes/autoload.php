<?php
    /* Definindo o caminho que esta o arquivo */
    $pathlocal = dirname(__FILE__); /* Pegando o caminho relativo desse arquivo */

    $file_funcoes = dirname($pathlocal).'/funcoes.php'; 

    if(file_exists($file_funcoes)){
        require_once($file_funcoes); /* Buscando arquivo funcoes.php */
    }
    else{
        exit("O arquivo $file_funcoes não foi localizado, contate o administrador.");
    }

    // Criando função autoload    

    /// Adicionar a classe dir para incluir o caminho
    set_include_path(get_include_path().PATH_SEPARATOR.CLASSESPATH);

    // Registrar e retornar extensões de arquivo padrão para spl_autoload
    spl_autoload_extensions('.class.php');

    // Registra a função na pilha de __autoload da SPL. Se a pilha ainda não estiver ativa, ela será ativada.
    spl_autoload_register();
?>