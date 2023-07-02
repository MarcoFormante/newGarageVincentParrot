<?php

require_once 'connection.php';


Class carHandler{

    use Connection;

    public function getAllEquipments(){
        $query= "SELECT * FROM equipments ORDER BY id";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($stmt->execute()) {
                $equipments=[];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $equipments[]=$row;  
                }
                echo json_encode(["status"=>1,"equipments"=>$equipments]);
            }else{
                echo json_encode(["status"=>0,"message"=>"Erreur pendant la recuperation des données(equipments)"]);
            }
        }
    }


    public function createNewCar($thumbnail,$gallery,$details,$equipments){

        $path = $_SERVER['DOCUMENT_ROOT'] ."/app/public/images/uploads/" ;
        $thumbnailName =  uniqid() . uniqid().".jpg";
        $galleryPathArray = [];

        foreach ($_FILES['gallery']['tmp_name'] as $key => $value) {
            $fileName =  uniqid() . uniqid().".jpg";
            $galleryPathArray[$key] = $fileName; 
        }

        if (!is_null($this->pdo)) {
       //CAR CARD
        $carCardParams = [":make"=>$details[0],":model" =>$details[1],":thumbnail"=>$thumbnailName,":year"=>$details[3], ":km"=>$details[4] , ":price"=>$details[2],":offer"=>$details[13]];
        $queryCarCard = "INSERT INTO cars(make,model,thumbnail,year,km,price,offer) VALUES(:make,:model,:thumbnail,:year,:km,:price,:offer)";
        $stmtCarCard = $this->pdo->prepare($queryCarCard);
        
            foreach ($carCardParams as $key => $value) {
                if (preg_match("/:make|:model|:thumbnail/i",$key)) {
                    $stmtCarCard->bindValue($key,$value,PDO::PARAM_STR);
                }else{
                    $stmtCarCard->bindValue($key,$value,PDO::PARAM_INT);
                }
            }

            //DETAILS
            $carDetailsParams = [":vo_number"=>$details[12],":gearbox"=> $details[9],":din_power"=>$details[7],":fiscal_power"=>$details[8],":color"=>$details[6],":doors"=>$details[11],":seats"=>$details[5],":energy"=>$details[10]];
            $queryCarDetails = "INSERT INTO car_details(car_id,vo_number,gearbox,din_power,fiscal_power,color,doors,seats,energy) VALUES(:car_id,:vo_number,:gearbox,:din_power,:fiscal_power,:color,:doors,:seats,:energy)";
            $stmtCarDetails = $this->pdo->prepare($queryCarDetails);
        
                 
                  foreach ($carDetailsParams as $key => $value) {
                    if (preg_match("/:vo_number|:din_power|:fiscal_power|:doors|:seats/i",$key)) {
                        $stmtCarDetails->bindValue($key,$value,PDO::PARAM_INT);
                    }else{
                        $stmtCarDetails->bindValue($key,$value,PDO::PARAM_STR);
                    }
                }
                

                //EQUIPMENTS
                $queryCarEquipments = "INSERT INTO car_equipments(car_id,equip_id) VALUES";
                $hasEquipments = count($equipments) > 0;
                if ($hasEquipments) {
                    foreach ($equipments as $key => $value) {
                        if($key !== count($equipments) - 1){
                            $queryCarEquipments .="(:car_id$key,:equip_id$value),";
                        }else{
                            $queryCarEquipments .="(:car_id$key,:equip_id$value)";
                        }
                    }
                }

                $stmtCarEquipments = $this->pdo->prepare($queryCarEquipments);


                //CAR GALLERY
                $queryCarGallery = "INSERT INTO car_images(path,car_id) VALUES";
                $galleryLength = count($galleryPathArray);
                foreach ($galleryPathArray as $key => $value) {
                    if ($key !== $galleryLength - 1) {
                        $queryCarGallery .= "(:path$key,:car_id$key),";
                    }else{
                        $queryCarGallery .= "(:path$key,:car_id$key)";
                    }
                  
                }

            $stmtCarGallery = $this->pdo->prepare($queryCarGallery);

               


            $this->pdo->beginTransaction();
          
         try {

            $carId = "";
           if ($stmtCarCard->execute()) {
            echo "card eseguito";
            $carId = $this->pdo->lastInsertId();
           } else{
            throw new Error("Erreur pendant l'envois des données, rententez");
           }
          
            $stmtCarDetails->bindValue(':car_id',$carId,PDO::PARAM_INT);

            if ( $stmtCarDetails->execute()) {
                echo "carDetails eseguito";
            } else{
                throw new Exception("Error Processing Request", 1);
                
            }

            if ($hasEquipments) {
                foreach ($equipments as $key => $value) {
                    $stmtCarEquipments->bindValue(":car_id$key",$carId,PDO::PARAM_INT);
                    $stmtCarEquipments->bindValue(":equip_id$value",$value,PDO::PARAM_INT);      
                }
            }


            if ( $stmtCarEquipments->execute()) {
                echo "carEquipments eseguito";
            } else{
                throw new Exception("Error Processing Request", 1);
                
            }


            foreach ($galleryPathArray as $key => $value) {
                $stmtCarGallery->bindValue(":path$key",$value,PDO::PARAM_STR);
                $stmtCarGallery->bindValue(":car_id$key",$carId,PDO::PARAM_INT);

            }

            if ($stmtCarGallery->execute()) {
             echo "carGalleryOK";
            }else{
                echo "noCarGallery";
            }


         
         } catch (PDOException $e) {
            echo "error:".$e->getMessage();
           $this->pdo->rollBack();
           return ;
         }

               
         $this->pdo->commit();
                    
        uploadThumbnail($thumbnail,$path,$thumbnailName);
        uploadGalleryImages($gallery,$path,$galleryPathArray);
                
                
       
          
    }

        // uploadThumbnail($thumbnail,$path,$thumbnailName);
        // uploadGalleryImages($gallery,$path,$galleryPathArray);


    }

}


function uploadThumbnail($image,$path,$imageName){
    move_uploaded_file($image['tmp_name'], $path . $imageName);
}



function uploadGalleryImages($gallery,$path,$galleryPathArray){
    foreach ($gallery['tmp_name'] as $key => $imgTmp) {
       move_uploaded_file($imgTmp, $path . $galleryPathArray[$key]);
    } 
}