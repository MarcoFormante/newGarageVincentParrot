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

   

    

}