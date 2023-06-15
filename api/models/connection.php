<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


trait Connection {
    private $pdo;
   
            public function __construct(){
                    try {
                        $this->pdo = new PDO("mysql:host=localhost;dbname=garage","root","");
                     
                    }catch (PDOException $e){
                        exit("Erreur de connection : " . $e->getMessage());
                    }
                }    
} 

?>



