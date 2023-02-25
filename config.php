<?php 
    // Diretório do Sistema
    define('BASEPATH', dirname(__FILE__).'/');
    define('CLASSESPATH', 'classes/');
    define('MODULOSPATH', 'modulos/');
    

    // Dados do Servidor
    define('SERVIDOR_NAME', $_SERVER['SERVER_NAME']); // Nome do servidor onde o script é executado
    define('SERVIDOR', $_SERVER['SERVER_SOFTWARE']); // Identificação do servidor
    define('SERVER_PROTOCOLO', $_SERVER['SERVER_PROTOCOL']); // Protocolo de revisão de informação
    define('SERVER_DIR', $_SERVER['DOCUMENT_ROOT']); // Diretório raiz do servidor
    define('SERVER_IDIOMA', $_SERVER['HTTP_ACCEPT_LANGUAGE']); // Idioma da requisição atual
    define('SERVER_IP', $_SERVER['SERVER_ADDR']); // Endereço IP do servidor
    define('SERVER_DATA', $_SERVER['REQUEST_TIME']); // Data e hora do início da solicitação
    define('SERVER_ADMIN', $_SERVER['SERVER_ADMIN']); // Nome do admin do servidor 
    define('SERVER_HOST', $_SERVER['SERVER_NAME']);

    // Dados do Usuário
    define('USER_IP', $_SERVER['REMOTE_ADDR']);
    define('USER', $_SERVER['HTTP_HOST']);

    // Banco de Dados
    define('DBHOST', 'localhost');
    define('DBUSER', 'root');
    define('DBPASS', 'vertrigo');
    define('DBNAME', 'megasena');
?>