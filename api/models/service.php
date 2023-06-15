<?php
require_once '../models/connection.php';
Class Service{

    use Connection;
    private int $id;
    private string $service;

    

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of service
     */ 
    public function getService()
    {
        return $this->service;
    }


    /**
     * Set the value of service
     *
     * @return  self
     */ 
    public function setService($service)
    {
        $this->service = $service;

        return $this;
    }

    public function getAllServices(){
        $query="SELECT service from services ";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $arrServices = [];
            if ($stmt->execute()) {
                while($row = $stmt->fetchColumn()){
                    $arrServices[]=$row;
                }
                
                return $arrServices;
            }
        }
    }
}

?>