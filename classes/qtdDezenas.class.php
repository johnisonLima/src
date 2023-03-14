<?php
    require_once(dirname(__FILE__).'/autoload.php'); 

    class qtdDezenas extends base{
        public function __construct($campos = array()){
            parent:: __construct();
    
            $this->tabela = 'qtd_num_aposta';

            if(sizeof($campos) <= 0){
                $this->campos_valores = array(
                    'qtdNum' => NULL
                );
            }
            else{
                $this->campos_valores = $campos;
            }
            $this->campopk = 'id';
        }
    }    
?>