<?php

use function PHPSTORM_META\type;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once("AbstractModel.php");

class CarModel extends AbstractModel
{
    public function getAllCars($page, $filter)
    {
        try {

            $f = json_decode($filter, true);

            if (!is_array($f)) {
                throw new Exception("Probleme pendant la recuperation des données");
            }
            $filters = $this->sanitize($f);
            
            $arrayKeys = array_keys($filters);
            $requiredKeys = ["minKm", "maxKm", "minYear", "maxYear", "minPrice", "maxPrice", "offer"];
            foreach ($arrayKeys as $key => $value) {
                if (!in_array($requiredKeys[$key], $arrayKeys)) {
                    throw new Exception("Probleme pendant la recuperation des données");
                }
            }

            $withOffer = "";
            if (isset($filters['offer']) && $filters['offer'] === true) {
                $withOffer = 'AND offer > 0';
            }

            $queryCarCount = "SELECT COUNT(*) as count FROM cars 
            WHERE km BETWEEN ? AND  ? 
            AND year BETWEEN ? AND  ? 
            AND price BETWEEN ? - offer AND  ? $withOffer";

            $queryGetCars = "SELECT * FROM cars  
            WHERE km BETWEEN :minKm AND  :maxKm
            AND year BETWEEN :minYear AND :maxYear
            AND price - offer BETWEEN :minPrice  AND :maxPrice
            $withOffer ORDER BY id DESC LIMIT :page,12";


            if (!is_null($this->pdo)) {
               
                $stmt = $this->pdo->prepare($queryCarCount);
                $stmt2 = $this->pdo->prepare($queryGetCars);
                foreach ($filters as $f => $v) {
                   
                    if ($f !== "offer") {
                        $stmt2->bindValue(":$f", intval($v),PDO::PARAM_INT);
                    }
                }
                $stmt2->bindValue(":page", intval($page), PDO::PARAM_INT);
                //execution of two stmts to get Count & filtered cars
                $exeCount = $stmt->execute(
                    [
                        $filters["minKm"], $filters["maxKm"], $filters['minYear'],
                        $filters['maxYear'], $filters['minPrice'], $filters['maxPrice']
                    ]
                );
                $exeCars = $stmt2->execute();

                if ($exeCount) {
                    $count = $stmt->fetch(PDO::FETCH_COLUMN);
                } else {
                    throw new PDOException("Probleme pendant la recuperation des données");
                }
                if ($exeCars) {
                    $cars = [];
                    while ($row = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                        $cars[] = $row;
                    }
                 
                    $sanitizedCars = $this->sanitize($cars);
                    $sanitizedCount = $this->sanitize($count);
                    return ["status" => 1, "count" => $sanitizedCount, "cars" => $sanitizedCars];
                } else {
                   
                    throw new PDOException("Probleme pendant la recuperation des données");
                }
            } else {
                throw new PDOException("Probleme pendant la recuperation des données");
            }
        } catch (Exception $e) {
            return $this->error("Probleme pendant la recuperation des données");
        }
    }






    public function getCarImages(int $id)
    {
        $query = "SELECT id,path FROM car_images WHERE car_id = :id";

        try {
            $id = $this->sanitize($id);
            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':id', $id, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    $images = [];
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $images[] = $row;
                    }
                    $images = $this->sanitize($images);
                    return ["status" => 1, "images" => $images];
                } else {
                    throw new Exception("Erreur pendant la recuperation des images");
                }
            } else {
                throw new Exception("Erreur pendant la recuperation des images");
            }
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }


    public function deleteImageGallery(int $id , string $path){
        $id = $this->sanitize($id);
        $path = $this->sanitize($path);
        realpath($path);
        if (!is_null($this->pdo)) {
            $query = "DELETE FROM car_images WHERE path = :path AND car_id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":path",$path,PDO::PARAM_STR);
            $stmt->bindValue(":id",$id,PDO::PARAM_INT);

            if ($stmt->execute()) {
                $this->deleteAllImagesFromFolder([$path]);
            }else{
               return ["status"=> 0, "message"=>"Erreur: problème de connection, impossible de supprimer l'image"];
            }
        }else{
           return ["status"=> 0, "message"=>"Erreur: problème de connection, impossible de supprimer l'image"];
        }
    }



    public function getAllFilterParams()
    {
        $query = "SELECT MIN(km)as minKm ,MAX(km) as maxKm,
        MIN(year) as minYear, MAX(year) as maxYear,
       (MIN(price) - MAX(offer)) as minPrice , MAX(price) as maxPrice from cars";

        try {
            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);
                if ($stmt->execute()) {
                    $filters = $stmt->fetch(PDO::FETCH_ASSOC);
                    return ["status" => 1, "filters" => $filters];
                } else {
                    throw new Exception("Erreur pendant la recuperation des parametre de filtrage");
                }
            } else {
                throw new Exception("Erreur pendant la recuperation des parametre de filtrage");
            }
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }


    public function getOffers($limit)
    {
        $query = "SELECT * FROM cars WHERE offer > 0 ORDER BY id DESC LIMIT :limit,10 ";
        $query2 = "SELECT COUNT(*) FROM cars WHERE offer > 0";
        try {

            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
                $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $stmt2 = $this->pdo->prepare($query2);
                $cars = [];
                if ($stmt->execute()) {
                    if ($stmt->rowCount() > 0) {
                        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                            array_push($cars, $row);
                        }
                        if ($stmt2->execute()) {
                            $count = $stmt2->fetch(PDO::FETCH_ASSOC);
                            return ["status" => 1, "cars" => $cars, "count" => $count];
                        } else {
                            throw new Exception("Erreur pendant la recuperation des données", 0);
                        }
                    } else {
                        $query = "SELECT * FROM cars WHERE offer = 0 ORDER BY id DESC LIMIT 0,10";
                        $stmt = $this->pdo->prepare($query);
                        if ($stmt->execute()) {
                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                array_push($cars, $row);
                            }
                            return ["status" => 1, "cars" => $cars, "count" => 0];
                        } else {
                            throw new Exception("Erreur pendant la recuperation des données", 0);
                        }
                    }
                } else {
                    throw new Exception("Erreur pendant la recuperation des données", 0);
                }
            } else {
                throw new Exception("Erreur pendant la recuperation des données", 0);
            }
        } catch (Exception $e) {

            return $this->error("Erreur pendant la recuperation des données");
        }
    }

    private function checkImageSize(array $images){
    
        foreach ($images as $key => $value) {
           
            if (!getimagesize($value)) {
                return false;
            }

            $width = getimagesize($value)[0];
            $height = getimagesize($value)[1];
          
            if ($width <= $height) {
               return false;
            }

            return true;
        }
    }



    public function newCar($thumbnail, $gallery, $details, array $equipments = null)
    {
       

        try {
           
            if (!$this->checkImageSize($gallery['tmp_name']) || !$this->checkImageSize([$thumbnail['tmp_name']])) {
                throw new Exception("Vérifiez que les photos soient bien en format horizontal.");
            }

            $gearboxIsValid = preg_match("/manuelle|automatique/i", $details[9]);
            $energyIsValid = preg_match("/Essence|gazole|Électrique|gpl/i", $details[10]);
            $numberInputsAreValids =  $details[13] >= 0 &&  $details[3] > 0 &&  $details[4] > 0 &&  $details[2] > 0 &&  $details[11] > 0 &&  $details[5] &&  $details[8] > 0 &&  $details[7] > 0 &&  $details[12] > 0;

            if (!$gearboxIsValid) {
                throw new Exception("La valeur pour Boite de vitesse n'est pas la bonne valeur.");
            }elseif (!$energyIsValid ) {
                throw new Exception("La valeur pour Energie n'est pas la bonne valeur.");
            }elseif (!$numberInputsAreValids) {
                throw new Exception("Les nombres ne peuvent pas être des valeurs négatives");
            }
           
        
            $path = $_SERVER['DOCUMENT_ROOT'] . "/EcfGarage/public/images/uploads/";
            $thumbnailName =  uniqid(rand()) . ".webp";
            $galleryPathArray = [];

            foreach ($gallery['tmp_name'] as $key => $value) {
                $fileExtention = explode("/", mime_content_type($value))[1];
                if (preg_match("/webp/", $fileExtention)) {
                    $fileName =  uniqid(rand()) . ".webp";
                    $galleryPathArray[$key] = $fileName;
                } else {
                    throw new Exception("le format acceptè pour les images est webp");
                }
            }
            $fileExtentionThumb = explode("/", mime_content_type($thumbnail['tmp_name']))[1];
            if (preg_match("/webp/", $fileExtentionThumb)) {
                $thumbnailValid = true;
            } else {
                $thumbnailValid = false;
                throw new Exception("le type de image acceptès est webp");
            }

            if (!is_null($this->pdo) && $thumbnailValid === true) {
                //CAR CARD
                $carCardParams = [":make" => trim($details[0]), ":model" => trim($details[1]), ":thumbnail" => $thumbnailName, ":year" => trim($details[3]), ":km" => trim($details[4]), ":price" => trim($details[2]), ":offer" => abs(trim($details[13])),":vo_number" => trim($details[12]), ":gearbox" => $details[9], ":din_power" => trim($details[7]), ":fiscal_power" => trim($details[8]), ":color" => $details[6], ":doors" => trim($details[11]), ":seats" => trim($details[5]), ":energy" => trim($details[10])];
               
                $queryCarCard = 
                "INSERT INTO cars(make,model,thumbnail,year,km,price,offer,vo_number,gearbox,din_power,fiscal_power,color,doors,seats,energy) 
                VALUES(:make,:model,:thumbnail,:year,:km,:price,:offer,:vo_number,:gearbox,:din_power,:fiscal_power,:color,:doors,:seats,:energy)";

                $stmtCar = $this->pdo->prepare($queryCarCard);

                foreach ($carCardParams as $key => $value) {
                    if (preg_match("/:make|:model|:thumbnail|:gearbox|:color|:energy/i", $key)) {
                        $stmtCar->bindValue($key, $value, PDO::PARAM_STR);
                    } else {
                        $stmtCar->bindValue($key, abs($value), PDO::PARAM_INT);
                    }
                }

                //CAR GALLERY
                $queryCarGallery = "INSERT INTO car_images(path,car_id) VALUES";
                $galleryLength = count($galleryPathArray);
                foreach ($galleryPathArray as $key => $value) {
                    if ($key !== $galleryLength - 1) {
                        $queryCarGallery .= "(:path$key,:car_id$key),";
                    } else {
                        $queryCarGallery .= "(:path$key,:car_id$key)";
                    }
                }

                $stmtCarGallery = $this->pdo->prepare($queryCarGallery);

                //Start Transaction 
                $this->pdo->beginTransaction();

                $carId = "";
                if ( $stmtCar = $stmtCar->execute()) {
                
                    $carId = $this->pdo->lastInsertId();
                }else{
                   
                    throw new Exception("Un problème est survenu", 0);
                }

                 //EQUIPMENTS

                 if (is_array($equipments) && count($equipments) > 0 && $equipments[0] !== "") {
                    $queryCarEquipments = "INSERT INTO car_equipments(car_id,equip_id) VALUES";
                    foreach ($equipments as $key => $value) {
                            $key = $this->sanitize($key);
                            $value = $this->sanitize($value);
                        if ($key !== count($equipments) - 1) {
                            $queryCarEquipments .= "(:car_id$key,:equip_id$value),";
                        } else {
                            $queryCarEquipments .= "(:car_id$key,:equip_id$value)";
                        }
                    } 
                  
                    $stmtCarEquipments = $this->pdo->prepare($queryCarEquipments);
                }
              
                if (is_array($equipments) && count($equipments) > 0 && $equipments[0] !== "") {
                    foreach ($equipments as $key => $value) {
                        $key = $this->sanitize($key);
                        $value = $this->sanitize($value);
                        $stmtCarEquipments->bindValue(":car_id$key", $carId, PDO::PARAM_INT);
                        $stmtCarEquipments->bindValue(":equip_id$value", $value, PDO::PARAM_INT);
                    }
                    if ($stmtCarEquipments->execute()) {
                     
                    }else{
                        $this->pdo->rollBack();
                        throw new Exception("Un problème est survenu", 0);
                    }
                }

                foreach ($galleryPathArray as $key => $value) {
                    $key = $this->sanitize($key);
                    $value = $this->sanitize($value);
                    $stmtCarGallery->bindValue(":path$key", $value, PDO::PARAM_STR);
                    $stmtCarGallery->bindValue(":car_id$key", $carId, PDO::PARAM_INT);
                }

    
                if ($stmtCarGallery->execute()) {
                        if ($this->uploadThumbnail($thumbnail, $path, $thumbnailName) && $this->uploadGalleryImages($gallery, $path, $galleryPathArray)) {
                            $this->pdo->commit();
                            return ["status" => 1, "message" => "Nouvelle voiture creé avec succès"];                           
                        }else{
                            $this->pdo->rollBack();
                            throw new Exception("Un problème est survenu", 0);
                        }
                }else{
                    $this->pdo->rollBack();
                    throw new Exception("Un problème est survenu", 0);
                }
            }
        } catch (Exception $e) {
        
            return $this->error("Un problème est survenu");
        }
    }



    private function uploadThumbnail($image, $path, $imageName)
    {
        if ( move_uploaded_file($image['tmp_name'], $path . $imageName)) {
            return true;
        }else{
            return false;
        }
       
    }

    private function uploadGalleryImages($gallery, $path, $galleryPathArray)
    {
        $countImages = count($gallery['tmp_name']);

        foreach ($gallery['tmp_name'] as $key => $imgTmp) {
            $imageUploaded = move_uploaded_file($imgTmp, $path . $galleryPathArray[$key]);
            if ($imageUploaded) {
                if ($key === $countImages - 1) {
                    return true;
                }
            } else {
                return false;
            }
        }
    }


    private function deleteAllImagesFromFolder($images)
    {
        $path = $_SERVER['DOCUMENT_ROOT'] . "/EcfGarage/public/images/uploads/";
        foreach ($images as $key => $value) {
            if (file_exists($path . $value)) {
                unlink($path . $value);
            }
        }
        return ["status" => 1, "message" => "supprimé avec succès"];
    }




    public function getAllCarsAD( int $currentPage,string $filters,$filterValue){
        if (!is_null($this->pdo)) {
       
       $query = "";
            $stmt = null;
        if ($filters === "Tout") {
            $query = "SELECT * 
            FROM cars 
            ORDER BY created_at DESC
            LIMIT :currentPage,12";

            $queryCountCars = "SELECT count(*) as count FROM cars ";
                    
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":currentPage",$currentPage,PDO::PARAM_INT);
        
            $stmtCount = $this->pdo->prepare($queryCountCars);
            try{
                if ($stmt->execute()) {
                    $stmtCount->execute();
                }
                $cars = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $cars[] = $row;
                }
                $count = $stmtCount->fetch(PDO::FETCH_COLUMN);
                return ["status"=> 1, "cars"=>$cars,"count"=>$count];
                    
                } catch (PDOException $e) {
                   return $this->error("Un problème est survenu, impossible de recuperer les voitures");
                }

        }elseif ($filters === "Numero VO") {
            
            $query = "SELECT * 
                FROM cars WHERE vo_number = :filterValue";
                $queryCountCars = "SELECT 0 as count FROM cars ";
                        
                $stmt = $this->pdo->prepare($query);
              
                $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_INT);
                $stmtCount = $this->pdo->prepare($queryCountCars);
                try{
                    if ($filters &&$stmt->execute()) {
                        $stmtCount->execute();
                    }
                    $cars = [];
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                            $cars[] = $row;
                    }
                    $count = $stmtCount->fetch(PDO::FETCH_COLUMN);
                    return ["status"=> 1, "cars"=>$cars,"count"=>$count];
                        
                    } catch (PDOException $e) {
                       return $this->error("Un problème est survenu, impossible de recuperer les voitures ");
                    }
                
        }elseif ($filters === "ID") {
            $query = "SELECT * 
            FROM cars  WHERE id = :filterValue";
            $queryCountCars = "SELECT 0 as count FROM cars ";
                    
            $stmt = $this->pdo->prepare($query);
           
            $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_INT);
            $stmtCount = $this->pdo->prepare($queryCountCars);
            try{
                if ($filters &&$stmt->execute()) {
                    $stmtCount->execute();
                }
                $cars = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $cars[] = $row;
                }
                $count = $stmtCount->fetch(PDO::FETCH_COLUMN);
                return ["status"=> 1, "cars"=>$cars,"count"=>$count];
                    
                } catch (PDOException $e) {
                   return $this->error("Un problème est survenu, impossible de recuperer les voitures ");
                }

        }elseif($filters === "Brand"){
            $query = "SELECT  * 
            FROM cars 
            WHERE make = :filterValue
            ORDER BY created_at ASC
            LIMIT :currentPage,12";

            $queryCountCars = "SELECT count(*) as count FROM cars WHERE make = :filterValue ";
                    
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":currentPage",$currentPage,PDO::PARAM_INT);
            $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);

            $stmtCount = $this->pdo->prepare($queryCountCars);
            $stmtCount->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);
            try{
                if ($filters &&$stmt->execute()) {
                    $stmtCount->execute();
                }
                $cars = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $cars[] = $row;
                }
                $count = $stmtCount->fetch(PDO::FETCH_COLUMN);
                return ["status"=> 1, "cars"=>$cars,"count"=>$count];
                    
                } catch (PDOException $e) {
                   return $this->error("Un problème est survenu, impossible de recuperer les voitures ");
                }
        }elseif ($filters === "Model") {
            $query = "SELECT *
            FROM cars
            WHERE model = :filterValue
            ORDER BY created_at ASC
            LIMIT :currentPage,9";

            $queryCountCars = "SELECT count(*) as count FROM cars WHERE model = :filterValue ";
                    
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":currentPage",$currentPage,PDO::PARAM_INT);
            $stmt->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);

            $stmtCount = $this->pdo->prepare($queryCountCars);
            $stmtCount->bindValue(":filterValue",$filterValue,PDO::PARAM_STR);
            try{
                if ($filters &&$stmt->execute()) {
                    $stmtCount->execute();
                }
                $cars = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $cars[] = $row;
                }
                $count = $stmtCount->fetch(PDO::FETCH_COLUMN);
                return ["status"=> 1, "cars"=>$cars,"count"=>$count];
                    
                } catch (PDOException $e) {
                   return $this->error("Un problème est survenu, impossible de recuperer les voitures");
                }
        }

        }else{
            return $this->error("Un problème est survenu, impossible de recuperer les voitures");
        }
          
    }



    public function deleteCar(int $id, string $thumbnail){
        $queryDeleteCar = "DELETE FROM cars WHERE id = :id";
        $queryGetImagesPath = "SELECT path FROM car_images WHERE car_id = :id";

        if (!is_null($this->pdo)) {
            $stmtImages = $this->pdo->prepare($queryGetImagesPath);
            $stmtImages->bindValue(":id",$id,PDO::PARAM_INT);

            $stmt = $this->pdo->prepare($queryDeleteCar);
            $stmt->bindValue(":id",$id,PDO::PARAM_INT);

        $this->pdo->beginTransaction();

            try {
               $exeStmtImage = $stmtImages->execute();
                    if (!$exeStmtImage) {
                        return $this->error("Un problème est survenu, impossible de supprimer la voiture");
                    }
                
                $imagesArray = [];
                while ($row = $stmtImages->fetch(PDO::FETCH_COLUMN)) {
                   $imagesArray[]= $row;
                }
              
                if (count($imagesArray) > 0) {
                    
                    if ($stmt->execute()) {
                    
                        $imagesArray[] = $thumbnail;
                        if ($this->deleteAllImagesFromFolder($imagesArray)) {
                            $this->pdo->commit();
                            return ["status"=>1,"message"=> "Voiture supprimé avec succès"];
                        }     
                    }else{
                        $this->pdo->rollBack();
                        return $this->error("Un problème est survenu, impossible de supprimer la voiture");
                    }

                }else{
                    if ($stmt->execute()) {
                        $this->pdo->commit();
                        return ["status"=>1,"message"=> "Voiture supprimé avec succès"];
                    }
                }

            }catch (Exception $e) {
                $this->pdo->rollBack();
                return $this->error("Un problème est survenu, impossible de supprimer la voiture");
            }
     
        }else{
                return $this->error("Un problème est survenu, impossible de supprimer la voiture");
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
        }
    }

  


    public function updateCar(string $column, $value, int $id,string $imageData = null){
        if (!is_null($this->pdo)) {
            $valueIsImage = is_array($value) && getimagesize($value['tmp_name']);
            
            
            $columnNames = ["make","model","thumbnail","year","km","price","offer","vo_number","gearbox","din_power","fiscal_power","color","doors","seats","energy"];
            if (!in_array($column,$columnNames)) {
                return $this->error("Un probleme est survenu, impossible d'effectuer la modification");
            }
           
            $column = $this->sanitize($column);
            if (!$valueIsImage) {
                $query = "UPDATE cars SET $column = :value WHERE id = :id ";
                $stmt = $this->pdo->prepare($query);

                if (is_int($value)) {
                    $stmt->bindValue(":value",$value,PDO::PARAM_INT);
                }else{
                    $stmt->bindValue(":value",$value,PDO::PARAM_STR);
                }
              
                $stmt->bindValue(":id",$id,PDO::PARAM_INT);
                if ($stmt->execute()) {
                   return ["status"=> 1, "message"=>"Modifié avec succès"];
                }else{
                   return ["status"=> 0, "message"=>"Erreur: Un probleme est survenu , impossible de effectuer la modification"];
                }
            
            }else{

                $isValidImage = $this->checkImageSize([$value['tmp_name']]);
                if (!$isValidImage) {
                    return $this->error("Un probleme est survenu, impossible d'effectuer la modification, verifié que la photo soit bien en horizontale");
                }

                $fileExtention = explode("/",mime_content_type($value['tmp_name']))[1];
                if (!preg_match("/webp/i",strtolower($fileExtention))) {
                   return ["status"=> 0, "message"=>"Erreur: le type d'image accepté est WEBP"];
                }	
                
              

                $imageName =  uniqid(rand()) .".webp";
                $query = "UPDATE cars SET $column = :value WHERE id = :id ";
                $stmt = $this->pdo->prepare($query);
              
                $stmt->bindValue(":value",$imageName,PDO::PARAM_STR);
                $stmt->bindValue(":id",$id,PDO::PARAM_INT);

                $this->pdo->beginTransaction();
                try {
                   $stmtExecuted = $stmt->execute();
                   if ($stmtExecuted) {
                    $path = $_SERVER['DOCUMENT_ROOT'] ."/EcfGarage/public/images/uploads/" ;
                   
                    $imageMovedInFolder = move_uploaded_file($value["tmp_name"],$path . $imageName);
                    if ($imageMovedInFolder) {
                        if (file_exists($path . $imageData) && unlink($path . $imageData)) {
                            $this->pdo->commit();
                            return ["status"=> 1, "message"=>"Modification effectué avec succès","imageData" => $imageName];
                        }
                    }else{
                        $this->pdo->rollBack();
                        throw new Exception("Un problème est survenu");
                    }
                }
                        
                } catch (Exception $e) {
                    return $this->error("Un probleme est survenu, impossible d'effectuer la modification");
                }

              
            }
        
        }
    }

    

    
}
