<?php
require_once 'AbstractModel.php';


Class ServiceModel extends AbstractModel
{

   
    public function getAllServices(){
        $query="SELECT * from services ";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $arrServices = [];
            if ($stmt->execute()) {
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $arrServices[]=$row;
                }
                
                return ["status"=>1,"services"=>$arrServices];
            }else{
                return $this->error("Erreur pendant la recuperation des services.");
            }
        }else{
            return $this->error("Erreur pendant la recuperation des services.");
        }
    }



    public function updateService(string $editType,int $id, string $value){
       $query ="";
      try {
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
                    return ['status'=>1,"message"=> "Service Modifié avec succès"];
                }else{
                   return ['status'=>1,"message"=> "Service supprimé avec succès"];
                }
             
            }else{ 
                throw new PDOException("Erreur pendant la modification du service, rententez.");
            }

        }else{
            throw new PDOException("Erreur pendant la modification du service, rententez.");
        }
      } catch (\Exception $e) {
        $this->error($e->getMessage());
      }
       
    }


    public function addNewService(string $value){
        $query = "INSERT INTO services(service) VALUE(:value)";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(':value',$value,PDO::PARAM_STR);

            if ($stmt->execute()) {
                return ['status'=>1,"message"=> "Service ajouté avec succés", "lastId"=> $this->pdo->lastInsertId()];
            }else{
                return $this->error("Erreur pendant l'ajout du nouveau service.");
            }

        }else{
            return $this->error("Erreur pendant l'ajout du nouveau service.");
        }
    }
}

?>