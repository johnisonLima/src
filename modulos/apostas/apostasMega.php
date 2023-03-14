<?php 
    require_once('../../classes/apostas.class.php');

    class apostasMega{
        public function inserir($campos = array()){
            $ap = new apostas();

            $ap->setValor('qtdNum', $campos['quantidadeDezenas']);
            $ap->setValor('concurso', $campos['concurso']);
            $ap->setValor('primeiraDezena', $campos['primeiraDezena']);
            $ap->setValor('segundaDezena', $campos['segundaDezena']);
            $ap->setValor('terceiraDezena', $campos['terceiraDezena']);
            $ap->setValor('quartaDezena', $campos['quartaDezena']);
            $ap->setValor('quintaDezena', $campos['quintaDezena']);
            $ap->setValor('sextaDezena', $campos['sextaDezena']);
            $ap->setValor('setimaDezena', $campos['setimaDezena']);
            $ap->setValor('oitavaDezena', $campos['oitavaDezena']);
            $ap->setValor('nonaDezena', $campos['nonaDezena']);
            $ap->setValor('decimaDezena', $campos['decimaDezena']);
            $ap->setValor('decimaPrimeiraDezena', $campos['decimaPrimeiraDezena']);
            $ap->setValor('decimaSegundaDezena', $campos['decimaSegundaDezena']);
            $ap->setValor('decimaTerceiraDezena', $campos['decimaTerceiraDezena']);
            $ap->setValor('decimaQuartaDezena', $campos['decimaQuartaDezena']);
            $ap->setValor('decimaQuintaDezena', $campos['decimaQuintaDezena']);

            $ap->inserir($ap);

            // Se houver linhas afetadas na última conexão com o banco inserção bem sucedida
            if($ap->SqlLinhasAfetadas() > 0){
                return true;
            }
            return false;
        }// inserir
    } // apostasMega
?>