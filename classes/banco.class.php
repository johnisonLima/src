<?php 
    require_once(dirname(__FILE__).'/autoload.php'); 

    abstract class banco{
        //Propriedades
        private $servidor       = DBHOST;
        private $usuario        = DBUSER;
        private $senha          = DBPASS;
        private $nomeBanco      = DBNAME;
        private $conexao        = NULL;
        private $dataset        = NULL;
        private $linhasAfetadas = -1;     

        public function __construct(){
            $this->conecta();
        }// construct

        public function __destruct(){
            if($this->conexao != NULL){
                mysqli_close($this->conexao);
            }
        }// destruct

        // Métodos
        public function conecta(){
            $this->conexao = mysqli_connect(
                $this->servidor,
                $this->usuario,
                $this->senha,
                $this->nomeBanco
            ) or die 
            (
                $this->trataErro(
                    __FILE__,
                    __FUNCTION__,
                    mysqli_connect_errno(),
                    mysqli_connect_error(),
                    TRUE
                )
            );
        }// conecta

        public function selecionaTudo($objeto){
            if(!$this->verificaVazia($objeto)){
                $sql = "SELECT * FROM $objeto->tabela";
                if($objeto->extras_select != NULL){
                    $sql.= " ". $objeto->extras_select;
                }
                //echo($sql);
                return $this->executaSql($sql);
            }
            else{
                echo "Tabela vázia!";
            }
        }// selecionaTudo        

        public function executaSql($sql = NULL){
            if($sql != NULL){
                $query = mysqli_query($this->conexao, $sql) or ($this->trataErro(__FILE__, __FUNCTION__));
                $this->linhasAfetadas = mysqli_affected_rows($this->conexao);
                if(substr(trim(strtolower($sql)), 0, 6) == 'select'){
                    $this->dataset = $query;
                    return $query;
                }
                else{
                    return $this->linhasAfetadas = mysqli_affected_rows($this->conexao);
                }
            }
            else{
                $this->trataErro(__FILE__,__FUNCTION__, 'comando sql não informado na rotina', FALSE);
            }            
        }// executaSql

        public function retornaDados($tipo = NULL){
            switch (strtolower($tipo)) {
                case 'array':
                    return mysqli_fetch_array($this->dataset);
                    break;
                case 'assoc':
                    return mysqli_fetch_assoc($this->dataset);
                    break;
                case 'object':
                    return mysqli_fetch_object($this->dataset);
                    break;
                case 'all':
                    return mysqli_fetch_all($this->dataset, MYSQLI_BOTH);
                    break;
                default:
                    return mysqli_fetch_object($this->dataset);
                    break;
            }
        }// retornaDados

        public function verificaVazia($objeto){
            $sql = "SELECT * FROM $objeto->tabela";
            $sql.= " LIMIT 1";
            //echo($sql);
            $this->executaSql($sql);
            return ($this->linhasAfetadas === 0);
        }// verificaVazia

        public function trataErro($arquivo=NULL, $rotina=NULL, $numerro=NULL, $msgerro=NULL, $geraexcept=FALSE){
            if($arquivo == NULL)
                $arquivo = "Não informado";
            
            if($rotina == NULL)
                $rotina = "Não informado";

            if($numerro == NULL)
                $arquivo = mysqli_connect_errno($this->conexao);

            if($msgerro == NULL)
                $msgerro = mysqli_connect_errno($this->conexao);

            $result = 
                "Ocorreu um erro com os seguintes detalhes: <br>
                <strong>Arquivo: </strong>  $arquivo<br>
                <strong>Rotina: </strong>   $rotina<br>
                <strong>Código: </strong>   $numerro<br>
                <strong>Mensagem: </strong> $msgerro
            ";
            if($geraexcept == FALSE){
                echo($result);
            }
            else{
                exit($result);
            }
        }// trataerro
    }// banco
?>