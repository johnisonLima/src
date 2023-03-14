<?php
    require_once(dirname(__FILE__).'/autoload.php');

    class apostas extends base{
        public function __construct($campos = array()){
            parent:: __construct();

            $this->tabela = "apostas_";

            if(sizeof($campos) <= 0){
                $this->campos_valores = array(
                    "qtdNum"                => NULL,
                    "concurso"              => NULL,
                    "primeiraDezena"        => NULL,
                    "segundaDezena"         => NULL,
                    "terceiraDezena"        => NULL,
                    "quartaDezena"          => NULL,
                    "quintaDezena"          => NULL,
                    "sextaDezena"           => NULL,
                    "setimaDezena"          => NULL,
                    "oitavaDezena"          => NULL,
                    "nonaDezena"            => NULL,
                    "decimaDezena"          => NULL,
                    "decimaPrimeiraDezena"  => NULL,
                    "decimaSegundaDezena"   => NULL,
                    "decimaTerceiraDezena"  => NULL,
                    "decimaQuartaDezena"    => NULL,
                    "decimaQuintaDezena"    => NULL
                );
            }
            else{
                $this->campos_valores = $campos;
            }

            $this->campopk = "id";
        }// construct
    }// apostas
?>