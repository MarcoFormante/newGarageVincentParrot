<?php 


abstract class AbstractModel 
{
    protected $pdo;

    public function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host=localhost;dbname=garage","root","");
        }catch (PDOException $e){
            exit("Erreur de connection");
        }
    }

    
    protected function error($message){
        return ['status'=>0,"message"=>"Erreur: "  . $message];
    }


    protected function Json($data){
        return json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    protected function showError($data){
        echo $this->Json($this->Error($data));
    }

    protected function sanitize($value){
      
        if (is_numeric($value)) {
            return $value + 0;
        }elseif(is_bool($value)){
            return $value ? true : false;
        }elseif(is_array($value)){
            $array =  array_map(function($data){
                return $this->sanitize($data);
            },$value);
            return $array;
        }else {
         return filter_var($value,FILTER_SANITIZE_SPECIAL_CHARS,FILTER_FLAG_NO_ENCODE_QUOTES);
        }
    }
   

    

}