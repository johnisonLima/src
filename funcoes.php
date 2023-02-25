<?php
    inicializa();

    function inicializa(){
        $pathlocal = dirname(__FILE__);

        $file_config = $pathlocal.'/config.php'; 
        if(file_exists($file_config)){
            require_once($file_config);
        }
        else{
            exit("O arquivo $file_config não foi localizado, contate o administrador.");
        }
        // Verificando se as constantes principais estão presentes no sistema config.php
        $const = array('BASEPATH', 'CLASSESPATH', 'MODULOSPATH', 'DBHOST', 'DBUSER', 'DBPASS', 'DBNAME');

        foreach($const as $value){
            if(!defined($value)){
                exit('Configuração básica do sistema ausente:<b> '.$value.'</b>, contate o administrador.');
            }
        }
        require_once(BASEPATH.CLASSESPATH.'autoload.php');
    }//inicializa
?>