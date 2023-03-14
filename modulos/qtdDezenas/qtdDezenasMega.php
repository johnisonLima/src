<?php 
    require_once('../../classes/qtdDezenas.class.php');

    class qtdDezenasMega{
        public function selecionaTudo(){
            $qtd = new qtdDezenas();

            return retornaTodosRegistros($qtd);
        }// selecionaTudo
    }
?>