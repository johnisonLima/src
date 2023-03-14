<?php 
    require_once('../../classes/qtdDezenas.class.php');

    class qtdDezenasMega{
        public function selecionaTudo(){
            $qtd = new qtdDezenas();

            return retornaTodosRegistros($qtd);
        }// selecionaTudo        
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