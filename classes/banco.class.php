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

        public function inserir($objeto){
            $sql = "INSERT INTO $objeto->tabela (";

            for($i=0; $i<count($objeto->campos_valores); $i++){ 
                $sql.=key($objeto->campos_valores);
                if($i < count($objeto->campos_valores)-1){
                    $sql.= " ,";
                }
                else{
                    $sql.= ") ";
                }
                next($objeto->campos_valores);
            }

            reset($objeto->campos_valores);
            $sql.= "VALUES (";
            for($i=0; $i<count($objeto->campos_valores); $i++){
                if(is_null($objeto->campos_valores[key($objeto->campos_valores)])){
                    $sql.= 'NULL';
                }
                else if(is_numeric($objeto->campos_valores[key($objeto->campos_valores)])){
                    $sql.=$objeto->campos_valores[key($objeto->campos_valores)];
                }
                else{
                    $sql.="'".$objeto->campos_valores[key($objeto->campos_valores)]."'";
                }

                if($i < count($objeto->campos_valores)-1){
                    $sql.= ", ";
                }
                else{
                    $sql.= "); ";
                }
                next($objeto->campos_valores);
            }
            // echo($sql);
            return $this->executaSql($sql);
        }

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

        public function selecionaColuna($objeto, $coluna){
            if(!$this->verificaVazia($objeto)){
                $sql = "SELECT $coluna FROM $objeto->tabela";
                if($objeto->extras_select != NULL){
                    $sql.= " ". $objeto->extras_select;
                }
                //echo($sql);
                return $this->executaSql($sql);
            }
            else{
                echo "Tabela vázia!";
            }
        }// selecionaColuna

        public function atualizar($objeto){
            if(!$this->verificaVazia($objeto)){
                $sql = "UPDATE $objeto->tabela SET ";
                for($i=0; $i<count($objeto->campos_valores); $i++){
                    $sql.= key($objeto->campos_valores)." = ";
                    $sql.=is_numeric($objeto->campos_valores[key($objeto->campos_valores)]) ?
                    $objeto->campos_valores[key($objeto->campos_valores)] : "'".$objeto->campos_valores[key($objeto->campos_valores)]."'";
                    if($i< (count($objeto->campos_valores)-1)){
                        $sql.=", ";
                    }
                    else{
                        $sql.=" ";
                    }
                    next($objeto->campos_valores);
                }
                $sql.= " WHERE $objeto->campopk = ";
                $sql.= is_numeric($objeto->valorpk) ? $objeto->valorpk : "'".$objeto->valorpk."'";

                //echo($sql);
                return $this->executaSql($sql);
            }
            else{
                echo "Tabela vázia";
            }
        }

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

        public function SqlLinhasAfetadas(){
            return mysqli_affected_rows($this->conexao);
        }

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

        // Não pegar a função retornaMax
    }// banco
?>