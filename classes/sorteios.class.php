<?php 
    require_once(dirname(__FILE__).'/autoload.php'); 

    class sorteios extends base{
        public function __construct($campos = array()){
            parent:: __construct();

            $this->tabela = 'sorteios';

            if(sizeof($campos) <= 0){
                $this->campos_valores = array(
                    'data'           => NULL,
                    'primeiraDezena' => NULL,
                    'segundaDezena'  => NULL,
                    'terceiraDezena' => NULL,
                    'quartaDezena'   => NULL,
                    'quintaDezena'   => NULL,
                    'sextaDezena'    => NULL,
                    'acumulado'      => '1'
                );
            }
            else{
                $this->campos_valores = $campos;
            }
            $this->campopk = 'concurso';
        }
    }
?>