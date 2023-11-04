<?php 

require_once("AbstractModel.php");

class EquipmentModel extends AbstractModel
{

    public function getCarEquipments(int $id)
    {
       
        $query = "SELECT equipment , ce.equip_id FROM equipments
        JOIN car_equipments as ce ON ce.equip_id = equipments.id
        where ce.car_id = :id";

        try {
            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':id', $id, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    $equipments = [];
                
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $equipments[] = $row;
                    }
                   
                    return ["status"=>1,"equipments"=>$equipments];
                   
                } else {
                    throw new PDOException("Probleme pendant la recuperation des données");
                }
            }else{
                throw new PDOException("Probleme pendant la recuperation des données");
            }
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }


    public function getAllEquipments(){
        $query= "SELECT * FROM equipments ORDER BY id";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($stmt->execute()) {
                $equipments=[];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $equipments[]=$row;  
                }
                return ["status"=>1,"equipments"=>$equipments];
            }else{
                return $this->error("Erreur pendant la recuperation des données(equipments)");
            }
        }else{
            return $this->error("Erreur pendant la recuperation des données(equipments)");
        }
    } 


    public function addCarEquipment(int $carID ,int $equipID){
        if (!is_null($this->pdo)) {
            $query = "INSERT INTO car_equipments(car_id,equip_id) VALUES(:carID,:equipID)";
            $stmt= $this->pdo->prepare($query);
            $stmt->bindValue(":carID",$carID,PDO::PARAM_INT);
            $stmt->bindValue(":equipID",$equipID,PDO::PARAM_INT);

            if ($stmt->execute()) {
                return ["status"=>1,"message"=>"Equipement ajoutè avec succès"];
            }else{
                return ["status"=>0,"message"=>"Erreur pendant l'ajoute de l'equipment"];
            }
        }else{
           return ["status"=>0,"message"=>"Erreur pendant l'ajoute de l'equipment"];
        }
    }


    public function deleteCarEquipment(int $carID, int $equipID){
        if (!is_null($this->pdo)) {
           $query= "DELETE FROM car_equipments WHERE car_id = :carID AND equip_id = :equipID";
           $stmt = $this->pdo->prepare($query);
           $stmt->bindValue(":carID",$carID,PDO::PARAM_INT);
           $stmt->bindValue(":equipID",$equipID,PDO::PARAM_INT);

           if ($stmt->execute()) {
               return ["status"=> 1, "message"=>"Supprimè avec succès"];
           }else{
               return $this->error("Erreur prendant la suppression de l'equipment");
           }
        }else{
            return $this->error("probleme de connection au Database");
        }
    }


    public function addNewEquipment(string $equipment){
        $query = "INSERT INTO equipments(equipment) VALUE(:equipment)";
    
        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":equipment",$equipment);
    
            if ($stmt->execute()) {
              return ["status"=> 1, "message"=>"Nouvel equipment ajouté avec succès","equipId"=>$this->pdo->lastInsertId()];
            }else{
              return ["status"=> 0,'message'=>"Erreur: un problème est survenu, rententez"];
            }
        }else{
          return ["status"=> 0,'message'=>"Erreur: un problème est survenu, rententez"];
        }
    }

}

?>