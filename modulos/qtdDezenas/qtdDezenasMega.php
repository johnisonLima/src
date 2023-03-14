<?php 
    require_once('../../classes/qtdDezenas.class.php');

    class qtdDezenasMega{
        public function selecionaTudo(){
            $qtd = new qtdDezenas();

            return retornaTodosRegistros($qtd);
        }// selecionaTudo        

        public function atualizar($qtdDezenas){
            $qtd = new qtdDezenas();

            $qtd->valorpk = 1;
            $qtd->setValor('qtdNum', $qtdDezenas);
            $qtd->atualizar($qtd);
            
            return true;
        }// atualizar
    }
    
    function retornaTodosRegistros($objeto){
        $objeto->selecionaTudo($objeto);
        $dados = array();
        while($res = $objeto->retornaDados()){
            if(isset($res->data)){
                $res->data = date("d/m/Y", strtotime($res->data));
            }
            $dados[] = $res;
        }
        return json_encode($dados);
    }
?>