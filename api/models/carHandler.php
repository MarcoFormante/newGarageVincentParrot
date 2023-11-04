#<?php


// require_once 'AbstractModel.php';


// Class carHandler extends AbstractModel 
// {

    // public function getAllEquipments(){
    //     $query= "SELECT * FROM equipments ORDER BY id";

    //     if (!is_null($this->pdo)) {
    //         $stmt = $this->pdo->prepare($query);
    //         if ($stmt->execute()) {
    //             $equipments=[];
    //             while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //                 $equipments[]=$row;  
    //             }
    //             echo json_encode(["status"=>1,"equipments"=>$equipments]);
    //         }else{
    //             echo json_encode(["status"=>0,"message"=>"Erreur pendant la recuperation des données(equipments)"]);
    //         }
    //     }
    // }

    

    // public function addEquipment(int $carID ,int $equipID){
    //     if (!is_null($this->pdo)) {
    //         $query = "INSERT INTO car_equipments(car_id,equip_id) VALUES(:carID,:equipID)";
    //         $stmt= $this->pdo->prepare($query);
    //         $stmt->bindValue(":carID",$carID,PDO::PARAM_INT);
    //         $stmt->bindValue(":equipID",$equipID,PDO::PARAM_INT);

    //         if ($stmt->execute()) {
    //             echo json_encode(["status"=>1,"message"=>"Equipement ajoutè avec succès"]);
    //         }else{
    //             echo json_encode(["status"=>0,"message"=>"Erreur pendant l'ajoute de l'equipment"]);
    //         }
    //     }else{
    //         echo json_encode(["status"=>0,"message"=>"Erreur pendant l'ajoute de l'equipment"]);
    //     }
    // }


//     public function createNewCar($thumbnail,$gallery,$details,$equipments){

//         $gearboxIsValid = preg_match("/manuelle|automatique/i",$details[9]);
//         $energyIsValid = preg_match("/Essence|gazole|électrique|gpl/i",$details[10]);
//         $numberInputsAreValids = $details[13] >= 0 && $details[3] > 0 && $details[4] > 0 && $details[2] > 0 && $details[11] > 0 && $details[5] && $details[8] > 0 && $details[7] > 0 && $details[12] > 0;

//         if (!$gearboxIsValid  ) {
//             echo json_encode(["status"=>0,"message"=>"Erreur: La valeur pour Boite de vitesse n'est pas la bonne valeur"]);
//            return;
//         }

//         if (!$energyIsValid ) {
//             echo json_encode(["status"=>0,"message"=>"Erreur: La valeur pour Energie n'est pas la bonne valeur"]);
//            return;
//         }

//         if (!$numberInputsAreValids ) {
//             echo json_encode(["status"=>0,"message"=>"Erreur: Les valeurs ne peuvent pas etre inferieur à zero,verifiez bien tous les champs"]);
//            return;
//         }

//         $path = $_SERVER['DOCUMENT_ROOT'] ."/app/public/images/uploads/" ;
//         $thumbnailName =  uniqid() . uniqid().".webp";
//         $galleryPathArray = [];

//         foreach ($_FILES['gallery']['tmp_name'] as $key => $value) {
//             $fileExtention = explode("/",mime_content_type($value))[1];
//             if (preg_match("/webp|jpeg|jpg|png/",$fileExtention)) {
//                 $fileName =  (uniqid() . random_int(20,999))  . uniqid().".webp";
//                 $galleryPathArray[$key] = $fileName; 
//             }else{
//                 throw new Exception("Erreur: le types de images acceptès sont webp,jpeg,png", 1);
//                 die();
//             }
//         }
//         $fileExtentionThumb = explode("/",mime_content_type($thumbnail['tmp_name']))[1];
//         if (preg_match("/webp|jpeg|jpg|png/",$fileExtentionThumb)) {
//           $thumbnailValid = true;
//         }else{
//             $thumbnailValid = false;
//             throw new Exception("Erreur: le types de images acceptès sont webp,jpeg,png , verifiez la photo principale (thumbnail)", 1);
//             die();
//         }

//         if (!is_null($this->pdo) && $thumbnailValid === true) {
//        //CAR CARD
//         $carCardParams = [":make"=>$details[0],":model" =>$details[1],":thumbnail"=>$thumbnailName,":year"=>$details[3], ":km"=>$details[4] , ":price"=>$details[2],":offer"=>$details[13]];
//         $queryCarCard = "INSERT INTO cars(make,model,thumbnail,year,km,price,offer) VALUES(:make,:model,:thumbnail,:year,:km,:price,:offer)";
//         $stmtCarCard = $this->pdo->prepare($queryCarCard);
        
//             foreach ($carCardParams as $key => $value) {
//                 if (preg_match("/:make|:model|:thumbnail/i",$key)) {
//                     $stmtCarCard->bindValue($key,$value,PDO::PARAM_STR);
//                 }else{
//                     $stmtCarCard->bindValue($key,$value,PDO::PARAM_INT);
//                 }
//             }

          

//             //DETAILS
//             $carDetailsParams = [":vo_number"=>$details[12],":gearbox"=> $details[9],":din_power"=>$details[7],":fiscal_power"=>$details[8],":color"=>$details[6],":doors"=>$details[11],":seats"=>$details[5],":energy"=>$details[10]];
//             $queryCarDetails = "INSERT INTO car_details(car_id,vo_number,gearbox,din_power,fiscal_power,color,doors,seats,energy) VALUES(:car_id,:vo_number,:gearbox,:din_power,:fiscal_power,:color,:doors,:seats,:energy)";
//             $stmtCarDetails = $this->pdo->prepare($queryCarDetails);
            
            
                 
//                   foreach ($carDetailsParams as $key => $value) {
//                     if (preg_match("/:vo_number|:din_power|:fiscal_power|:doors|:seats/i",$key)) {
//                         $stmtCarDetails->bindValue($key,$value,PDO::PARAM_INT);
//                     }else{
//                         $stmtCarDetails->bindValue($key,$value,PDO::PARAM_STR);

//                     }
//                 }
                

//                 //EQUIPMENTS
//                 $queryCarEquipments = "INSERT INTO car_equipments(car_id,equip_id) VALUES";
//                 $hasEquipments = count($equipments) > 0;
//                 if ($hasEquipments ===  true) {
//                     foreach ($equipments as $key => $value) {
//                         if($key !== count($equipments) - 1){
//                             $queryCarEquipments .="(:car_id$key,:equip_id$value),";
//                         }else{
//                             $queryCarEquipments .="(:car_id$key,:equip_id$value)";
//                         }
//                     }
//                 }

//                 $stmtCarEquipments = $this->pdo->prepare($queryCarEquipments);


//                 //CAR GALLERY
//                 $queryCarGallery = "INSERT INTO car_images(path,car_id) VALUES";
//                 $galleryLength = count($galleryPathArray);
//                 foreach ($galleryPathArray as $key => $value) {
//                     if ($key !== $galleryLength - 1) {
//                         $queryCarGallery .= "(:path$key,:car_id$key),";
//                     }else{
//                         $queryCarGallery .= "(:path$key,:car_id$key)";
//                     }
                  
//                 }

//             $stmtCarGallery = $this->pdo->prepare($queryCarGallery);


//         $this->pdo->beginTransaction();
          
//         try {
//             $carId = "";
//             $stmtCarCardExecuted = $stmtCarCard->execute();
//             $carId = $this->pdo->lastInsertId();

//             $stmtCarDetails->bindValue(':car_id',$carId,PDO::PARAM_INT);
//             $stmtCarDetailsExecuted = $stmtCarDetails->execute();

//             if ($hasEquipments) {
//                 foreach ($equipments as $key => $value) {
//                     $stmtCarEquipments->bindValue(":car_id$key",$carId,PDO::PARAM_INT);
//                     $stmtCarEquipments->bindValue(":equip_id$value",$value,PDO::PARAM_INT);      
//                 }
//             }

//             if ($hasEquipments === true) {
//                 $stmtCarEquipmentsExecuted = $stmtCarEquipments->execute(); 

//             }else{
//                 $stmtCarEquipments = null;
//                 $stmtCarEquipmentsExecuted = false;
//             }
           
//             foreach ($galleryPathArray as $key => $value) {
//                 $stmtCarGallery->bindValue(":path$key",$value,PDO::PARAM_STR);
//                 $stmtCarGallery->bindValue(":car_id$key",$carId,PDO::PARAM_INT);
//             }

//             $stmtCarGalleryExecuted = $stmtCarGallery->execute();

//             if ($stmtCarCardExecuted && $stmtCarDetailsExecuted && $stmtCarGalleryExecuted ) {
               
//                 if ($hasEquipments && $stmtCarEquipmentsExecuted) {
//                     uploadImage($thumbnail,$path,$thumbnailName);
//                     uploadGalleryImages($gallery,$path,$galleryPathArray);
//                     echo json_encode(["status"=> 1, "message"=>"Nouvelle voiture creé avec succès"]);
//                 }else if (!$hasEquipments) {
//                     uploadImage($thumbnail,$path,$thumbnailName);
//                     uploadGalleryImages($gallery,$path,$galleryPathArray);
//                     echo json_encode(["status"=> 1, "message"=>"Nouvelle voiture creé avec succès"]);
//                 }    
//             }
//         } catch (Exception $e) {
//           $this->pdo->rollBack();
//           echo json_encode(["status"=>0,"message"=>"error" . $e->getMessage()]);
//           return ;
//         }

               
//          $this->pdo->commit();
//     }
// }


// public function addNewEquipment(string $equipment){
//     $query = "INSERT INTO equipments(equipment) VALUE(:equipment)";

//     if (!is_null($this->pdo)) {
//         $stmt = $this->pdo->prepare($query);
//         $stmt->bindValue(":equipment",$equipment);

//         if ($stmt->execute()) {
//             echo json_encode(["status"=> 1, "message"=>"Nouvel equipment ajouté avec succès","equipId"=>$this->pdo->lastInsertId()]);
//         }else{
//             echo json_encode(["status"=> 0,'message'=>"Erreur: un problème est survenu, rententez"]);
//         }
//     }else{
//         echo json_encode(["status"=> 0,'message'=>"Erreur: un problème est survenu, rententez"]);
//     }
// }




// public function getAllCars( int $currentPage,string $filters,$filterValue){
//     if (!is_null($this->pdo)) {
   
//     switch ($filters) {
//         case 'Tout':
        
//         $query = "SELECT id,make,model,thumbnail,year,km,price,offer,created_at,cd.vo_number 
//             FROM cars  JOIN car_details as cd ON cd.car_id = cars.id 
//             ORDER BY cars.created_at ASC
//             LIMIT :currentPage,9";

//             $queryCountCars = "SELECT count(*) as count FROM cars ";
                    
//             $stmt = $this->pdo->prepare($query);
//             $stmt->bindValue(":currentPage",$currentPage,PDO::PARAM_INT);
          
//             $stmtCount = $this->pdo->prepare($queryCountCars);
          
        
//     break;

//         case 'Numero VO':
//             $query = "SELECT id,make,model,thumbnail,year,km,price,offer,created_at,cd.vo_number 
//             FROM cars INNER JOIN car_details as cd ON cd.car_id = cars.id  WHERE cd.vo_number = :filterValue 
//             ORDER BY cars.created_at ASC
//             LIMIT 1";
//             $queryCountCars = "SELECT 0 as count FROM cars ";
                    
//             $stmt = $this->pdo->prepare($query);
          
//             $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_INT);
//             $stmtCount = $this->pdo->prepare($queryCountCars);

           
//     break;
//         case 'ID':
//             $query = "SELECT id,make,model,thumbnail,year,km,price,offer,created_at,cd.vo_number 
//             FROM cars  JOIN car_details as cd ON cd.car_id = cars.id WHERE cars.id = :filterValue
//             ORDER BY cars.created_at ASC
//             LIMIT 1";
//             $queryCountCars = "SELECT 0 as count FROM cars ";
                    
//             $stmt = $this->pdo->prepare($query);
           
//             $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_INT);
//             $stmtCount = $this->pdo->prepare($queryCountCars);
//     break;
//         case 'Brand':
//             $query = "SELECT  id,make,model,thumbnail,year,km,price,offer,created_at,cd.vo_number 
//             FROM cars  JOIN car_details as cd ON cd.car_id = cars.id WHERE make = :filterValue
//             ORDER BY cars.created_at ASC
//             LIMIT :currentPage,9";

//             $queryCountCars = "SELECT count(*) as count FROM cars WHERE make = :filterValue ";
                    
//             $stmt = $this->pdo->prepare($query);
//             $stmt->bindValue(":currentPage",$currentPage,PDO::PARAM_INT);
//             $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);

//             $stmtCount = $this->pdo->prepare($queryCountCars);
//             $stmtCount->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);
//     break;
//         case 'Model':
//             $query = "SELECT  id,make,model,thumbnail,year,km,price,offer,created_at,cd.vo_number 
//             FROM cars  JOIN car_details as cd ON cd.car_id = cars.id WHERE model = :filterValue
//             ORDER BY cars.created_at ASC
//             LIMIT :currentPage,9";

//             $queryCountCars = "SELECT count(*) as count FROM cars WHERE model = :filterValue ";
                    
//             $stmt = $this->pdo->prepare($query);
//             $stmt->bindValue(":currentPage",$currentPage,PDO::PARAM_INT);
//             $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);

//             $stmtCount = $this->pdo->prepare($queryCountCars);
//             $stmtCount->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);
//     break;
        
//         default:
//             # code...
//             break;
//     }
    

  
//     try{
//         $stmt->execute();
//         $stmtCount->execute();
//         $cars = [];
//         while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
//                 $cars[] = $row;
//         }
//         $count = $stmtCount->fetch(PDO::FETCH_COLUMN);
//         echo json_encode(["status"=> 1, "cars"=>$cars,"count"=>$count]);
            
//         } catch (PDOException $e) {
           
//             echo json_encode(["status"=> 0, "message"=>"Erreur: Un problème est survenu, impossible de recuperer les voitures /" . $e->getMessage()]);
//         }
        
//     }else{
//         echo json_encode(["status"=> 0, "message"=>"Erreur: Un problème est survenu, impossible de recuperer les voitures"]);
//       }
      
//     }
    




//     // public function deleteCar(int $id, string $thumbnail){
//     //     $queryDeleteCar = "DELETE FROM cars WHERE id = :id";
//     //     $queryGetImagesPath = "SELECT path FROM car_images WHERE car_id = :id";

//     //     if (!is_null($this->pdo)) {
//     //         $stmtImages = $this->pdo->prepare($queryGetImagesPath);
//     //         $stmtImages->bindValue(":id",$id,PDO::PARAM_INT);

//     //         $stmt = $this->pdo->prepare($queryDeleteCar);
//     //         $stmt->bindValue(":id",$id,PDO::PARAM_INT);

//     //     $this->pdo->beginTransaction();
//     //         try {
//     //             $stmtImages->execute();
//     //             $imagesArray = [];
//     //             while ($row = $stmtImages->fetch(PDO::FETCH_COLUMN)) {
//     //                $imagesArray[]= $row;
//     //             }
              
//     //             if (count($imagesArray) > 0) {
                    
//     //                 if ($stmt->execute()) {
                    
//     //                     $imagesArray[] = $thumbnail;
//     //                     deleteAllImagesFromFolder($imagesArray) ;     
//     //                 }else{
//     //                     echo json_encode(["status"=> 0, "message"=>"Erreur: Un problème est survenu, impossible de supprimer la voiture"]);
//     //                 }

//     //             }else{
//     //                 $stmt->execute();
//     //             }

//     //         }catch (Exception $e) {
//     //             $this->pdo->rollBack();
//     //             echo json_encode(["status"=> 0, "message"=>"Erreur: Un problème est survenu, impossible de supprimer la voiture"]);
//     //         }
     
  
//     //     }else{
//     //         echo json_encode(["status"=> 0, "message"=>"Erreur: problème de connection, impossible de supprimer la voiture"]);
//     //     }

//     //     $this->pdo->commit();
//     // }



//     // public function updateCar(string $table ,string $column, $value, int $id,string $imageData = null){
//     //     if (!is_null($this->pdo)) {
//     //         $valueIsImage = is_array($value);
//     //         $idTarget = $table === "cars" ? "id" : "car_id";
           
//     //         if (!$valueIsImage) {
//     //             $query = "UPDATE $table SET $column = :value WHERE $idTarget = :id ";
//     //             $stmt = $this->pdo->prepare($query);

//     //             if (is_int($value)) {
//     //                 $stmt->bindValue(":value",$value,PDO::PARAM_INT);
//     //             }else{
//     //                 $stmt->bindValue(":value",$value,PDO::PARAM_STR);
//     //             }

//     //             $stmt->bindValue(":id",$id,PDO::PARAM_INT);
//     //             if ($stmt->execute()) {
//     //                 echo json_encode(["status"=> 1, "message"=>"Modifié avec succès"]);
//     //             }else{
//     //                 echo json_encode(["status"=> 0, "message"=>"Erreur: Un probleme est survenu , impossible de effectuer la modification"]);
//     //             }
            
//     //         }else{

//     //             $fileExtention = explode("/",mime_content_type($value['tmp_name']))[1];
//     //             if (!preg_match("/jpeg|png|jpg|webp/i",strtolower($fileExtention))) {
//     //                 echo json_encode(["status"=> 0, "message"=>"Erreur: les types d'images acceptés sont jpeg et png"]);
//     //                 return;
//     //             }

//     //             $imageName =  uniqid() . uniqid().".webp";
//     //             $query = "UPDATE $table SET $column = :value WHERE $idTarget = :id ";
//     //             $stmt = $this->pdo->prepare($query);
//     //             $stmt->bindValue(":value",$imageName,PDO::PARAM_STR);
//     //             $stmt->bindValue(":id",$id,PDO::PARAM_INT);

//     //             $this->pdo->beginTransaction();
//     //             try {
//     //                $stmtExecuted = $stmt->execute();
//     //                if ($stmtExecuted) {
//     //                 $path = $_SERVER['DOCUMENT_ROOT'] ."/app/public/images/uploads/" ;
                   
//     //                 $imageMovedInFolder = move_uploaded_file($value["tmp_name"],$path . $imageName);
//     //                 if ($imageMovedInFolder) {
//     //                     if (unlink($path . $imageData)) {
//     //                         echo json_encode(["status"=> 1, "message"=>"Modifcation effectué avec succès","imageData" => $imageName]);
//     //                     }
//     //                 }
//     //             }
                        
//     //             } catch (Exception $e) {
//     //               $this->pdo->rollBack();
//     //               echo $e->getMessage();
//     //               echo json_encode(["status"=> 0, "message"=>"Erreur: Un probleme est survenu , impossible de effectuer la modification"]);
//     //             }

//     //             $this->pdo->commit();
//     //         }
        
//     //     }
//     // }


//     // public function deleteEquipment(int $carID, int $equipID){
//     //     if (!is_null($this->pdo)) {
//     //        $query= "DELETE FROM car_equipments WHERE car_id = :carID AND equip_id = :equipID";
//     //        $stmt = $this->pdo->prepare($query);
//     //        $stmt->bindValue(":carID",$carID,PDO::PARAM_INT);
//     //        $stmt->bindValue(":equipID",$equipID,PDO::PARAM_INT);

//     //        if ($stmt->execute()) {
//     //             echo json_encode(["status"=> 1, "message"=>"Supprimè avec succès"]);
//     //        }else{
//     //             echo json_encode(["status"=> 0, "message"=>"Erreur prendant la suppression de l'equipment , retentez"]);
//     //        }
//     //     }else{
//     //         echo json_encode(["status"=> 0, "message"=>"Erreur : probleme de connection au Database"]);
//     //     }
//     // }


//     // public function deleteImageGallery(int $id , string $path){
//     //     if (!is_null($this->pdo)) {
//     //         $query = "DELETE FROM car_images WHERE path = :path AND car_id = :id";
//     //         $stmt = $this->pdo->prepare($query);
//     //         $stmt->bindValue(":path",$path,PDO::PARAM_STR);
//     //         $stmt->bindValue(":id",$id,PDO::PARAM_INT);

//     //         if ($stmt->execute()) {
//     //             deleteAllImagesFromFolder([$path]);
//     //         }else{
//     //             echo json_encode(["status"=> 0, "message"=>"Erreur: problème de connection, impossible de supprimer l'image"]);
//     //         }
//     //     }else{
//     //         echo json_encode(["status"=> 0, "message"=>"Erreur: problème de connection, impossible de supprimer l'image"]);
//     //     }
//     // }



//     // public function addNewImages( int $carID,$gallery){
//     //     $galleryPathArray = [];
    
//     //     try {
//     //         foreach ($gallery['tmp_name'] as $key => $value) {
//     //             $fileExtention = explode("/",mime_content_type($value))[1];
//     //             if (preg_match("/webp|jpeg|jpg|png/",$fileExtention)) {
//     //                 $fileName =  (uniqid() . random_int(20,999))  . uniqid().".webp";
//     //                 $galleryPathArray[$key] = $fileName; 
//     //             }else{
//     //                 throw new Exception("Erreur: le types de images acceptès sont webp,jpeg,png", 1);
//     //                 die();
//     //             }
//     //         }

//     //         $queryCarGallery = "INSERT INTO car_images(path,car_id) VALUES";
//     //         $galleryLength = count($galleryPathArray);
//     //         foreach ($galleryPathArray as $key => $value) {
//     //             if ($key !== $galleryLength - 1) {
//     //                 $queryCarGallery .= "(:path$key,:car_id$key),";
//     //             }else{
//     //                 $queryCarGallery .= "(:path$key,:car_id$key)";
//     //             }
//     //         }
//     //             $stmtCarGallery = $this->pdo->prepare($queryCarGallery);
//     //             foreach ($galleryPathArray as $key => $value) {
//     //                 $stmtCarGallery->bindValue(":path$key",$value,PDO::PARAM_STR);
//     //                 $stmtCarGallery->bindValue(":car_id$key",$carID,PDO::PARAM_INT);
//     //             }
//     //             $path = $_SERVER['DOCUMENT_ROOT'] ."/app/public/images/uploads/" ;
//     //                 uploadGalleryImages($gallery,$path,$galleryPathArray) ;
//     //                 if ($stmtCarGallery->execute()) {
//     //                     echo json_encode(["status"=> 1, "message"=>"Images Ajoutées avec succès", "imagePaths"=>$galleryPathArray]);
//     //                 }else{
//     //                     echo json_encode(["status"=> 0, "message"=>"Erreur"]);
//     //                 }
                

//     //     } catch (Exception $e) {
//     //         throw new Exception("Erreur: $e", 1);
//     //     }

        
//     // }

// }




// function uploadImage($image,$path,$imageName){
//     move_uploaded_file($image['tmp_name'], $path . $imageName);
// }



// function uploadGalleryImages($gallery,$path,$galleryPathArray){
//     foreach ($gallery['tmp_name'] as $key => $imgTmp) {
//        move_uploaded_file($imgTmp, $path . $galleryPathArray[$key]);
//     } 

// }


// function deleteAllImagesFromFolder($images){
//     $path = $_SERVER['DOCUMENT_ROOT'] ."/app/public/images/uploads/" ;
//     foreach ($images as $key => $value) {
//         unlink($path . $value);
//     }
//     echo json_encode(["status"=> 1, "message"=>"Voiture supprimé avec succès"]);
   
// }