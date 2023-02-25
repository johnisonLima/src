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
    define('CLASS_DIR', 'classes/');

    set_include_path(get_include_path().PATH_SEPARATOR.CLASS_DIR);

    spl_autoload_extensions('.class.php');

    spl_autoload_register();


    // printf(spl_autoload_register());



?>