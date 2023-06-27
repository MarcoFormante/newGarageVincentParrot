<?php
require_once '/xampp/htdocs/app/api/models/connection.php';
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
                while($row = $stmt->fetch(PDO::FETCH_COLUMN)){
                    $arrServices[]=$row;
                }
                
                return $arrServices;
            }
        }
    }

    public function getAllServicesADM(){
        $query="SELECT * from services ";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $arrServices = [];
            if ($stmt->execute()) {
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $arrServices[]=$row;
                }
                
                return $arrServices;
            }
        }
    }



    public function updateService(string $editType,int $id, string $value){
       $query ="";
      
        if ($editType === "update") {
             
            $query = "UPDATE services SET service = :value WHERE id = :id";
        }
        if($editType === "delete"){
            $query = "DELETE FROM services WHERE id = :id";
        }
      
        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($editType === "update") {
                $stmt->bindValue(':value',$value,PDO::PARAM_STR);
            }
          
            $stmt->bindValue(':id',$id,PDO::PARAM_INT);

            if ($stmt->execute()) {
                if ($editType === "update") {
                    echo json_encode(['status'=>1,"message"=> "Service Modifié avec succès"]);
                }else{
                    echo json_encode(['status'=>1,"message"=> "Service supprimé avec succès"]);
                }
             
            }else{
                echo json_encode(['status'=>0,"message"=> "Erreur pendant la modification du service, rententez."]);
            }

        }
    }


    public function addNewService(string $value){
        $query = "INSERT INTO services(service) VALUE(:value)";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(':value',$value,PDO::PARAM_STR);

            if ($stmt->execute()) {
                echo json_encode(['status'=>1,"message"=> "Service ajouté avec succés", "lastId"=> $this->pdo->lastInsertId()]);
            }else{
                echo json_encode(['status'=>0,"message"=> "Erreur pendant l'ajoute du nouveau service, rententez."]);
            }

        }
    }
}

?>