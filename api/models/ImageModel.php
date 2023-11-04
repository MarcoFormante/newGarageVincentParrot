<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once("AbstractModel.php");

class ImageModel extends AbstractModel
{


    public function getCarImages(int $id)
    {
        $query = "SELECT id,path FROM car_images WHERE car_id = :id";

        try {
            if (!is_null($this->pdo)) {
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':id', $id, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    $images = [];
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $images[] = $row;
                    }
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


    public function deleteSigleCarImage(int $id , string $path){
        if (!is_null($this->pdo)) {
            $query = "DELETE FROM car_images WHERE path = :path AND car_id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":path",$path,PDO::PARAM_STR);
            $stmt->bindValue(":id",$id,PDO::PARAM_INT);

            if ($stmt->execute()) {
                try {
                    return $this->deleteAllImagesFromFolder([$path]);
                } catch (\Throwable $th) {
                    return $this->error("Un probleme est survenu");
                }
             
            }else{
               return ["status"=> 0, "message"=>"Erreur: problème de connection, impossible de supprimer l'image"];
            }
        }else{
           return ["status"=> 0, "message"=>"Erreur: problème de connection, impossible de supprimer l'image"];
        }
    }


    public function addNewImages( int $carID,$gallery){
        $galleryPathArray = [];
    
        try {
            $this->pdo->beginTransaction();

            foreach ($gallery['tmp_name'] as $key => $value) {
                $fileExtention = explode("/",mime_content_type($value))[1];
                if (!getimagesize($value)) {
                    throw new Exception("Un file different que une image a été trouvé");
                }

                $width = getimagesize($value)[0];
                $height = getimagesize($value)[1];

                if ($width <= $height) {
                    throw new Exception("Que les photos horizontales sont acceptées");
                }
                if (preg_match("/webp|jpeg|jpg|png/",$fileExtention)) {
                    $fileName =  uniqid(10) . ".webp";
                    $galleryPathArray[$key] = $fileName; 
                }else{
                    throw new Exception("le types de images acceptès sont webp,jpeg,png", 1);
                   
                }
            }

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
                foreach ($galleryPathArray as $key => $value) {
                    $stmtCarGallery->bindValue(":path$key",$value,PDO::PARAM_STR);
                    $stmtCarGallery->bindValue(":car_id$key",$carID,PDO::PARAM_INT);
                }
                $path = $_SERVER['DOCUMENT_ROOT'] ."/EcfGarage/public/images/uploads/" ;
                    if ($stmtCarGallery->execute()) {
                        if ($this->uploadGalleryImages($gallery,$path,$galleryPathArray)) {
                            $this->pdo->commit();
                            return ["status"=> 1, "message"=>"Images Ajoutées avec succès", "imagePaths"=>$galleryPathArray];
                        }else{
                            $this->pdo->rollBack();
                            throw new Exception("Un probleme est survenu");
                        }
                    }else{
                        throw new Exception("Un probleme est survenu");
                    }
        } catch (Exception $e) {
            return $this->error($e->getMessage());
        }
    }




    private function uploadImage($image, $path, $imageName)
    {
        move_uploaded_file($image['tmp_name'], $path . $imageName);
    }


    protected function uploadGalleryImages($gallery, $path, $galleryPathArray)
    {
        $countImages = count($gallery['tmp_name']);
    
        foreach ($gallery['tmp_name'] as $key => $imgTmp) {
           
            $imageUploaded = move_uploaded_file($imgTmp, $path . $galleryPathArray[$key]);
            if ($imageUploaded) {
                if ($key === $countImages - 1) {
                    return true;
                 }
            }else{
                return false;
            }
            
        }
    }



    protected function deleteAllImagesFromFolder($images)
    {
        $path = $_SERVER['DOCUMENT_ROOT'] . "/EcfGarage/public/images/uploads/";
        foreach ($images as $key => $value) {
            unlink($path . $value);
        }
        return ["status" => 1, "message" => "Voiture supprimé avec succès"];
    }


}
